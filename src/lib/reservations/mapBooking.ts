import { SITE } from "@/lib/constants";
import type {
  ReservationFormInput,
  ReservationPayload,
} from "@/lib/reservations/types";

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

export function normalizeReservationInput(
  input: ReservationFormInput & Record<string, unknown>
): ReservationFormInput {
  const raw = input as Record<string, unknown>;

  return {
    date: pickString(input.date, raw.bookingDate as string | undefined),
    pax: pickNumber(input.pax, raw.guests as number | string | undefined),
    slot: pickString(input.slot, raw.bookingTime as string | undefined, raw.time as string | undefined),
    room: pickString(input.room, raw.seating as string | undefined),
    name: pickString(input.name),
    email: pickString(input.email),
    phone: pickString(input.phone),
    notes: pickString(input.notes) ?? "",
    sourceUrl: pickString(input.sourceUrl, raw.sourceURL as string | undefined),
  };
}

export function mapFormToReservation(
  input: ReservationFormInput,
  options?: { sourceUrl?: string }
): ReservationPayload {
  const normalized = normalizeReservationInput(
    input as ReservationFormInput & Record<string, unknown>
  );
  const now = new Date().toISOString();

  return {
    createdAt: now,
    restaurant: SITE.name,
    bookingDate: normalized.date ?? "—",
    bookingTime: normalized.slot ?? "—",
    guests: normalized.pax ?? "—",
    seating: normalized.room ?? "—",
    name: normalized.name ?? "—",
    phone: normalized.phone ?? "—",
    email: normalized.email ?? "—",
    notes: normalized.notes ?? "",
    sourceUrl: normalized.sourceUrl ?? options?.sourceUrl ?? "",
    submittedAt: now,
  };
}

export function hasMinimumReservationData(input: ReservationFormInput): boolean {
  const normalized = normalizeReservationInput(
    input as ReservationFormInput & Record<string, unknown>
  );

  return Boolean(
    normalized.date &&
      normalized.pax &&
      normalized.slot &&
      normalized.name &&
      normalized.email &&
      normalized.phone
  );
}
