export interface ReservationPayload {
  createdAt: string;
  restaurant: string;
  bookingDate: string;
  bookingTime: string;
  guests: number | string;
  seating: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  sourceUrl: string;
  submittedAt: string;
}

export interface ReservationFormInput {
  date?: string;
  pax?: number;
  slot?: string;
  room?: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  sourceUrl?: string;
}
