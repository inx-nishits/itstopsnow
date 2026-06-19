export interface HomepageStat {
  id: string;
  label: string;
  endValue: number;
  prefix?: string;
  suffix?: string;
  suffixText?: string;
  isPulsing?: boolean;
  duration?: number;
  description: string;
}

export interface HomepageVoice {
  id: string;
  name: string;
  relationship: string;
  quote: string;
  /** Portrait or contextual photo URL */
  imageUrl: string;
  featured?: boolean;
}

export interface RollHonourPreview {
  id: string;
  name: string;
  role: string;
  force: string;
  years: string;
  candleCount: number;
  imageUrl: string;
  quote?: string;
}

export interface HomepageEventPreview {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  badge?: string;
  href: string;
}

export interface HomepageData {
  stats: HomepageStat[];
  voices: HomepageVoice[];
  rollPreview: RollHonourPreview[];
  events: HomepageEventPreview[];
  /** True when Sanity returned live documents */
  fromSanity: boolean;
}
