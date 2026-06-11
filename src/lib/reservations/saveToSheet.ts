import type { ReservationPayload } from "@/lib/reservations/types";

const SHEETS_WEB_APP_URL =
  process.env.GOOGLE_SHEETS_WEB_APP_URL ??
  "https://script.google.com/macros/s/AKfycbwOusFi0qMKp2PXBGmTbEcj_UrytsvduiOsXmMBAzVM/dev";

export async function saveReservationToSheet(
  reservation: ReservationPayload
): Promise<void> {
  if (!SHEETS_WEB_APP_URL) {
    throw new Error("GOOGLE_SHEETS_WEB_APP_URL is not configured");
  }

  const response = await fetch(SHEETS_WEB_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
    redirect: "follow",
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Google Sheets sync failed (${response.status})${errorText ? `: ${errorText}` : ""}`
    );
  }
}
