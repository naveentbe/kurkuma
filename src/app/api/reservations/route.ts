import { NextResponse } from "next/server";
import { mapZenchefBookingToReservation } from "@/lib/reservations/mapBooking";
import { saveReservationToSheet } from "@/lib/reservations/saveToSheet";
import type { ReservationRecordInput } from "@/lib/reservations/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReservationRecordInput;

    if (!body.bookingId && !body.date) {
      return NextResponse.json(
        { error: "Missing booking data" },
        { status: 400 }
      );
    }

    const reservation = mapZenchefBookingToReservation(body);
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
