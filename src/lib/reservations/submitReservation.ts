import { GOOGLE_SHEETS_WEB_APP_URL } from "@/lib/constants";
import { mapFormToReservation } from "@/lib/reservations/mapBooking";
import type { ReservationFormInput, ReservationPayload } from "@/lib/reservations/types";

export class ReservationSubmitError extends Error {
  constructor(
    message: string,
    readonly code: "ACCESS_DENIED" | "HTTP_ERROR" | "SYNC_FAILED" | "API_ERROR"
  ) {
    super(message);
    this.name = "ReservationSubmitError";
  }
}

export function getSheetsWebAppUrl(): string {
  return GOOGLE_SHEETS_WEB_APP_URL;
}

function buildSheetPayload(reservation: ReservationPayload) {
  return {
    createdAt: reservation.createdAt,
    restaurant: reservation.restaurant,
    bookingDate: reservation.bookingDate,
    bookingTime: reservation.bookingTime,
    guests: reservation.guests,
    seating: reservation.seating,
    name: reservation.name,
    phone: reservation.phone,
    email: reservation.email,
    notes: reservation.notes,
    sourceUrl: reservation.sourceUrl,
    submittedAt: reservation.submittedAt,
  };
}

async function submitDirectToGoogle(
  input: ReservationFormInput,
  webAppUrl: string
): Promise<void> {
  const reservation = mapFormToReservation(input, {
    sourceUrl: typeof window !== "undefined" ? window.location.href : "",
  });

  const response = await fetch(webAppUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(buildSheetPayload(reservation)),
    redirect: "follow",
  });

  const responseText = await response.text().catch(() => "");

  if (!response.ok) {
    if (response.status === 403 || responseText.includes("Access denied")) {
      throw new ReservationSubmitError(
        "Google Apps Script returned Access denied (403). Redeploy with Execute as Me and Who has access: Anyone.",
        "ACCESS_DENIED"
      );
    }

    throw new ReservationSubmitError(
      `Google Sheets sync failed (${response.status})`,
      "HTTP_ERROR"
    );
  }

  try {
    const parsed = JSON.parse(responseText) as { success?: boolean; error?: string };
    if (parsed.error) {
      throw new ReservationSubmitError(parsed.error, "SYNC_FAILED");
    }
    if (parsed.success === false) {
      throw new ReservationSubmitError("Google Sheets sync returned success: false", "SYNC_FAILED");
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return;
    }
    throw error;
  }
}

async function submitViaApiRoute(input: ReservationFormInput): Promise<void> {
  const response = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      sourceUrl:
        input.sourceUrl ??
        (typeof window !== "undefined" ? window.location.href : ""),
    }),
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
    success?: boolean;
  };

  if (!response.ok) {
    const message = data.error ?? `API request failed (${response.status})`;

    if (message.includes("403") || message.includes("Access denied")) {
      throw new ReservationSubmitError(message, "ACCESS_DENIED");
    }

    throw new ReservationSubmitError(message, "API_ERROR");
  }
}

/** Submit reservation data to Google Sheets. */
export async function submitReservationToSheet(
  input: ReservationFormInput
): Promise<void> {
  try {
    await submitDirectToGoogle(input, GOOGLE_SHEETS_WEB_APP_URL);
  } catch (error) {
    if (error instanceof ReservationSubmitError && error.code !== "HTTP_ERROR") {
      throw error;
    }
    await submitViaApiRoute(input);
  }
}

export async function checkSheetsWebAppAccess(): Promise<{
  ok: boolean;
  status: number;
  message: string;
}> {
  const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "GET",
    redirect: "follow",
  });
  const text = await response.text().catch(() => "");

  if (!response.ok || text.includes("Access denied")) {
    return {
      ok: false,
      status: response.status,
      message:
        "Access denied. In Apps Script: Deploy > New deployment > Web app > Execute as Me > Who has access: Anyone.",
    };
  }

  return {
    ok: true,
    status: response.status,
    message: text.slice(0, 120),
  };
}
