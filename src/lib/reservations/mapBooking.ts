import type {
  ReservationPayload,
  ReservationRecordInput,
} from "@/lib/reservations/types";

function buildGuestName(detail: ReservationRecordInput): string {
  if (detail.name?.trim()) return detail.name.trim();
  const parts = [detail.firstname, detail.lastname].filter(Boolean);
  return parts.join(" ").trim();
}

function pickString(...values: Array<string | number | undefined>): string | undefined {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    const normalized = String(value).trim();
    if (normalized) return normalized;
  }
  return undefined;
}

function pickNumber(...values: Array<number | string | undefined>): number | undefined {
  for (const value of values) {
    if (value === undefined || value === null || value === "") continue;
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return undefined;
}

/** Normalize Zenchef event payloads into a consistent shape. */
export function normalizeZenchefBookingDetail(
  detail: ReservationRecordInput & Record<string, unknown>
): ReservationRecordInput {
  const raw = detail as Record<string, unknown>;

  return {
    bookingId: pickString(
      detail.bookingId,
      raw.reservationId as string | undefined,
      raw.id as string | undefined,
      raw.booking_id as string | undefined
    ),
    date: pickString(detail.date, raw.day as string | undefined),
    pax: pickNumber(
      detail.pax,
      raw.guests as number | string | undefined,
      raw.nb_guests as number | string | undefined
    ),
    slot: pickString(detail.slot, raw.time as string | undefined),
    room: pickString(detail.room, raw.roomName as string | undefined),
    firstname: pickString(detail.firstname, raw.firstName as string | undefined),
    lastname: pickString(detail.lastname, raw.lastName as string | undefined),
    name: pickString(detail.name),
    email: pickString(detail.email),
    phone: pickString(detail.phone, raw.phoneNumber as string | undefined),
  };
}

export function mapZenchefBookingToReservation(
  detail: ReservationRecordInput
): ReservationPayload {
  const normalized = normalizeZenchefBookingDetail(
    detail as ReservationRecordInput & Record<string, unknown>
  );
  const createdAt = new Date().toISOString();

  return {
    reservationId: normalized.bookingId ?? `ZC-${Date.now()}`,
    name: buildGuestName(normalized) || "—",
    email: normalized.email?.trim() || "—",
    phone: normalized.phone?.trim() || "—",
    date: normalized.date ?? "—",
    guests: normalized.pax ?? "—",
    status: "Confirmed",
    createdAt,
    slot: normalized.slot,
    room: normalized.room,
  };
}

export function hasMinimumBookingData(detail: ReservationRecordInput): boolean {
  const normalized = normalizeZenchefBookingDetail(
    detail as ReservationRecordInput & Record<string, unknown>
  );

  return Boolean(normalized.bookingId || normalized.date || normalized.pax);
}
