export interface MemorialTimelineEvent {
  title: string;
  date: string;
  description: string;
}

export interface MemorialTribute {
  name: string;
  relationship: string;
  timeAgo: string;
  text: string;
}

/** Lightweight shape for Wall grid and Roll preview */
export interface MemorialSummary {
  id: string;
  name: string;
  rank: string;
  force: string;
  region: string;
  yearsServed: string;
  quote: string;
  portraitImageUrl: string;
  candleCount: number;
  tributeCount: number;
}

/** Full memorial record for detail pages */
export interface Memorial extends MemorialSummary {
  age: number;
  dateOfLoss: string;
  biography: string;
  familyQuote: string;
  gallery: string[];
  timeline: MemorialTimelineEvent[];
  tributes: MemorialTribute[];
  rememberedCount: number;
  /** Sanity document _id when loaded from CMS */
  sanityId?: string;
}

export interface MemorialListResult {
  memorials: MemorialSummary[];
  fromSanity: boolean;
}

export interface MemorialDetailResult {
  memorial: Memorial | null;
  fromSanity: boolean;
}
