import type { ReservationPayload } from "@/lib/reservations/types";

function getSheetsWebAppUrl(): string {
  const url = process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim();

  if (!url) {
    throw new Error(
      "GOOGLE_SHEETS_WEB_APP_URL is not configured. Add your deployed Apps Script /exec URL to .env.local"
    );
  }

  return url;
}

/**
 * Google Apps Script web apps redirect POST requests. Using text/plain avoids
 * CORS preflight issues and keeps the body intact through the redirect chain.
 */
export async function saveReservationToSheet(
  reservation: ReservationPayload
): Promise<void> {
  const webAppUrl = getSheetsWebAppUrl();

  const response = await fetch(webAppUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      reservationId: reservation.reservationId,
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      guests: reservation.guests,
      status: reservation.status,
      slot: reservation.slot ?? "",
      room: reservation.room ?? "",
    }),
    redirect: "follow",
    cache: "no-store",
  });

  const responseText = await response.text().catch(() => "");

  if (!response.ok) {
    const hint =
      response.status === 401 || response.status === 403
        ? " Check Apps Script deployment: Execute as Me, access Anyone."
        : "";

    throw new Error(
      `Google Sheets sync failed (${response.status})${hint}${responseText ? `: ${responseText.slice(0, 200)}` : ""}`
    );
  }

  try {
    const parsed = JSON.parse(responseText) as { success?: boolean; error?: string };
    if (parsed.error) {
      throw new Error(parsed.error);
    }
    if (parsed.success === false) {
      throw new Error("Google Sheets sync returned success: false");
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return;
    }
    throw error;
  }
}
