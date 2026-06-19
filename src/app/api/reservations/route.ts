import { NextResponse } from "next/server";
import { GOOGLE_SHEETS_WEB_APP_URL } from "@/lib/constants";
import {
  hasMinimumReservationData,
  mapFormToReservation,
  normalizeReservationInput,
} from "@/lib/reservations/mapBooking";
import { saveReservationToSheet } from "@/lib/reservations/saveToSheet";
import type { ReservationFormInput } from "@/lib/reservations/types";

export async function GET() {
  const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "GET",
    redirect: "follow",
  });
  const text = await response.text().catch(() => "");

  const ok = response.ok && !text.includes("Access denied");

  return NextResponse.json(
    {
      ok,
      status: response.status,
      message: ok
        ? "Google Sheets webhook is reachable"
        : "Google Sheets webhook returned Access denied — redeploy Apps Script with Anyone access",
    },
    { status: ok ? 200 : 503 }
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReservationFormInput &
      Record<string, unknown>;

    const normalized = normalizeReservationInput(body);

    if (!hasMinimumReservationData(normalized)) {
      return NextResponse.json(
        { error: "Missing required reservation fields", received: body },
        { status: 400 }
      );
    }

    const referer = request.headers.get("referer") ?? undefined;
    const reservation = mapFormToReservation(normalized, { sourceUrl: referer });
    await saveReservationToSheet(reservation);

    return NextResponse.json({ success: true, reservation });
  } catch (error) {
    console.error("[reservations]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save reservation",
      },
      { status: 500 }
    );
  }
}
