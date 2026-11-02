export type BookingStatus = "pending"| "confirmed"| "cancelled";

export interface IBooking {
  _id?: string;
  studioId: string;
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  guests: number;
  totalHours: number;
  hourlyRate: number;
  securityDeposit: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt?: Date;
}