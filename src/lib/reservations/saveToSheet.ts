import type { ReservationPayload } from "@/lib/reservations/types";
import { getGoogleSheetsWebAppUrl } from "@/lib/env";

function getSheetsWebAppUrl(): string {
  return getGoogleSheetsWebAppUrl();
}

/**
 * Google Apps Script web apps redirect POST requests. Using text/plain avoids
 * CORS preflight issues and keeps the body intact through the redirect chain.
 *
 * Payload keys match the Google Sheet columns:
 * Created At, Restaurant, Booking Date, Booking Time, Guests, Seating,
 * Name, Phone, Email, Notes, Source URL, Submitted At
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
