export interface ReservationPayload {
  reservationId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number | string;
  status: string;
  createdAt: string;
  slot?: string;
  room?: string;
}

export interface ReservationRecordInput {
  bookingId?: string;
  date?: string;
  pax?: number;
  slot?: string;
  room?: string;
  firstname?: string;
  lastname?: string;
  name?: string;
  email?: string;
  phone?: string;
}
