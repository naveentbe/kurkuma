import { mapFormToReservation } from "@/lib/reservations/mapBooking";
import type { ReservationFormInput, ReservationPayload } from "@/lib/reservations/types";

export class ReservationSubmitError extends Error {
  constructor(
    message: string,
    readonly code: "NOT_CONFIGURED" | "ACCESS_DENIED" | "HTTP_ERROR" | "SYNC_FAILED"
  ) {
    super(message);
    this.name = "ReservationSubmitError";
  }
}

export function getClientSheetsWebAppUrl(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL?.trim() ?? "";
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

/**
 * Submit directly from the browser to the Google Apps Script web app.
 * This is the recommended approach for Next.js + Google Sheets.
 */
export async function submitReservationToSheet(
  input: ReservationFormInput
): Promise<void> {
  const webAppUrl = getClientSheetsWebAppUrl();

  if (!webAppUrl) {
    throw new ReservationSubmitError(
      "NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL is not configured in .env.local",
      "NOT_CONFIGURED"
    );
  }

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

export async function checkSheetsWebAppAccess(): Promise<{
  ok: boolean;
  status: number;
  message: string;
}> {
  const webAppUrl = getClientSheetsWebAppUrl();

  if (!webAppUrl) {
    return {
      ok: false,
      status: 0,
      message: "NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL is not configured",
    };
  }

  const response = await fetch(webAppUrl, { method: "GET", redirect: "follow" });
  const text = await response.text().catch(() => "");

  if (!response.ok || text.includes("Access denied")) {
    return {
      ok: false,
      status: response.status,
      message:
        "Access denied. In Apps Script: Deploy > New deployment > Web app > Execute as Me > Who has access: Anyone. Then open the /exec URL in an incognito window — you should see JSON, not a login page.",
    };
  }

  return {
    ok: true,
    status: response.status,
    message: text.slice(0, 120),
  };
}
