import { NextResponse } from "next/server";
import {
  hasMinimumBookingData,
  mapZenchefBookingToReservation,
  normalizeZenchefBookingDetail,
} from "@/lib/reservations/mapBooking";
import { saveReservationToSheet } from "@/lib/reservations/saveToSheet";
import type { ReservationRecordInput } from "@/lib/reservations/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReservationRecordInput &
      Record<string, unknown>;

    const normalized = normalizeZenchefBookingDetail(body);

    if (!hasMinimumBookingData(normalized)) {
      return NextResponse.json(
        { error: "Missing booking data", received: body },
        { status: 400 }
      );
    }

    const reservation = mapZenchefBookingToReservation(normalized);
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
