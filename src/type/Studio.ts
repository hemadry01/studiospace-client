export interface IStudio {
  _id: string;
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
  rating?: number;
  reviews?: number;
  images?: string[];
  timeSlots?: string[];
}