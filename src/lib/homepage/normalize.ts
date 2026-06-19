import { urlForImage } from "@/lib/sanity/imageUrl";
import { HOMEPAGE_FALLBACK } from "./fallback";
import type { HomepageVoice, RollHonourPreview } from "./types";

const PORTRAIT_FALLBACK = "/images/quote-bg.png";

type SanityVoice = Omit<HomepageVoice, "imageUrl"> & {
  imageUrl?: string | null;
  portraitImage?: unknown;
};

type SanityRoll = Omit<RollHonourPreview, "imageUrl"> & {
  imageUrl?: string | null;
  portraitImage?: unknown;
  candleCount?: number | null;
};

export function normalizeVoices(live: SanityVoice[] | null | undefined): HomepageVoice[] {
  if (!live?.length) return HOMEPAGE_FALLBACK.voices;

  const normalized = live
    .map((voice, index) => ({
      id: voice.id,
      name: voice.name,
      relationship: voice.relationship,
      quote: voice.quote,
      imageUrl:
        voice.imageUrl ||
        urlForImage(voice.portraitImage, 800) ||
        HOMEPAGE_FALLBACK.voices[index % HOMEPAGE_FALLBACK.voices.length]?.imageUrl ||
        PORTRAIT_FALLBACK,
      featured: voice.featured,
    }))
    .filter((voice) => voice.name && voice.quote);

  return normalized.length >= 2 ? normalized : HOMEPAGE_FALLBACK.voices;
}

export function normalizeRollPreview(
  live: SanityRoll[] | null | undefined
): RollHonourPreview[] {
  if (!live?.length) return HOMEPAGE_FALLBACK.rollPreview;

  const normalized = live
    .map((officer, index) => ({
      id: String(officer.id),
      name: officer.name,
      role: officer.role || "",
      force: officer.force || "",
      years: officer.years || "",
      candleCount: officer.candleCount ?? 0,
      imageUrl:
        officer.imageUrl ||
        urlForImage(officer.portraitImage, 600) ||
        HOMEPAGE_FALLBACK.rollPreview[index % HOMEPAGE_FALLBACK.rollPreview.length]
          ?.imageUrl ||
        PORTRAIT_FALLBACK,
      quote: officer.quote,
    }))
    .filter((officer) => officer.name && officer.imageUrl);

  return normalized.length >= 3 ? normalized.slice(0, 6) : HOMEPAGE_FALLBACK.rollPreview;
}
