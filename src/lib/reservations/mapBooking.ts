import type {
  ReservationPayload,
  ReservationRecordInput,
} from "@/lib/reservations/types";

function buildGuestName(detail: ReservationRecordInput): string {
  if (detail.name?.trim()) return detail.name.trim();
  const parts = [detail.firstname, detail.lastname].filter(Boolean);
  return parts.join(" ").trim();
}

export function mapZenchefBookingToReservation(
  detail: ReservationRecordInput
): ReservationPayload {
  const createdAt = new Date().toISOString();

  return {
    reservationId: detail.bookingId ?? `ZC-${Date.now()}`,
    name: buildGuestName(detail) || "—",
    email: detail.email?.trim() || "—",
    phone: detail.phone?.trim() || "—",
    date: detail.date ?? "—",
    guests: detail.pax ?? "—",
    status: "Confirmed",
    createdAt,
    slot: detail.slot,
    room: detail.room,
  };
}
