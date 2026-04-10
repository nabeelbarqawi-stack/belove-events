export type EventType =
  | "Festival"
  | "Concert"
  | "Fitness"
  | "Market"
  | "Sports"
  | "College"
  | "Pop-up"
  | "Community"
  | "Other";

export type SamplingViability = "High" | "Medium" | "Low";

export type EventStatus = "pending" | "approved" | "skipped" | "saved";

export interface BeLoveEvent {
  id: string;
  name: string;
  date: string; // ISO string
  endDate?: string;
  location: string;
  address: string;
  estimatedAttendance: number;
  eventType: EventType;
  isOutdoor: boolean;
  isRecurring: boolean;
  recurringPattern?: string;
  sourceUrl: string;
  source: string;
  description: string;
  imageUrl?: string;

  // AI Scoring
  brandFitScore: number; // 1-10
  audienceFit: string;
  samplingViability: SamplingViability;
  activationIdea: string;
  permitConsiderations: string;
  reasoning: string;

  // Workflow
  status: EventStatus;
  discoveredAt: string;
  calendarAdded: boolean;
}

export interface WeeklyDigest {
  weekOf: string;
  totalDiscovered: number;
  topEvents: BeLoveEvent[];
  approved: number;
  skipped: number;
}
