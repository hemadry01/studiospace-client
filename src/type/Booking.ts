export interface IBooking {
  _id: string;
  studioId: string;
  studioTitle: string;
  username: string;
  email: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  address: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
  ownerEmail: string;
  totalHours: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}