export interface RawEvent {
  name: string;
  date: string;
  endDate?: string;
  location: string;
  address: string;
  description: string;
  url: string;
  source: string;
  estimatedAttendance?: number;
  imageUrl?: string;
}
