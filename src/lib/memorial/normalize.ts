import { urlForImage } from "@/lib/sanity/imageUrl";
import type { Memorial, MemorialSummary, MemorialTimelineEvent, MemorialTribute } from "./types";
import { MEMORIALS_BY_ID, MEMORIALS_FALLBACK } from "./fallback";

const PORTRAIT_FALLBACK =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600";

type PortableTextBlock = {
  _type?: string;
  children?: { text?: string }[];
};

function blocksToPlainText(blocks: unknown): string {
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((b): b is PortableTextBlock => typeof b === "object" && b !== null)
    .map((block) =>
      block.children?.map((child) => child.text ?? "").join("") ?? ""
    )
    .filter(Boolean)
    .join("\n\n");
}

function formatTimeAgo(isoDate: string | undefined): string {
  if (!isoDate) return "Recently";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${days >= 14 ? "s" : ""} ago`;
  if (days < 365) return `${Math.floor(days / 30)} month${days >= 60 ? "s" : ""} ago`;
  return `${Math.floor(days / 365)} year${days >= 730 ? "s" : ""} ago`;
}

type SanitySummary = Partial<MemorialSummary> & {
  portraitImage?: unknown;
  portraitImageUrl?: string | null;
};

type SanityDetail = SanitySummary &
  Partial<Omit<Memorial, keyof MemorialSummary>> & {
    biography?: unknown;
    gallery?: (string | null)[] | unknown;
    timeline?: MemorialTimelineEvent[];
    tributes?: (MemorialTribute & { timeAgo?: string })[];
    familyQuote?: string | null;
    rememberedCount?: number | null;
  };

function resolvePortraitUrl(
  url: string | null | undefined,
  imageRef: unknown,
  fallbackId?: string
): string {
  if (url) return url;
  const built = urlForImage(imageRef, 1200);
  if (built) return built;
  if (fallbackId && MEMORIALS_BY_ID[fallbackId]) {
    return MEMORIALS_BY_ID[fallbackId].portraitImageUrl;
  }
  return PORTRAIT_FALLBACK;
}

function resolveGallery(
  urls: (string | null)[] | unknown,
  imageRefs: unknown,
  portrait: string,
  fallbackId?: string
): string[] {
  const fromUrls = Array.isArray(urls)
    ? urls.filter((u): u is string => Boolean(u))
    : [];
  if (fromUrls.length > 0) return fromUrls;

  if (Array.isArray(imageRefs)) {
    const built = imageRefs
      .map((ref) => urlForImage(ref, 800))
      .filter((u): u is string => Boolean(u));
    if (built.length > 0) return built;
  }

  if (fallbackId && MEMORIALS_BY_ID[fallbackId]) {
    return MEMORIALS_BY_ID[fallbackId].gallery;
  }
  return [portrait];
}

export function normalizeMemorialSummary(raw: SanitySummary, index = 0): MemorialSummary | null {
  if (!raw.id || !raw.name) return null;

  const fallback = MEMORIALS_BY_ID[raw.id];
  const portraitImageUrl = resolvePortraitUrl(
    raw.portraitImageUrl,
    raw.portraitImage,
    raw.id
  );

  return {
    id: raw.id,
    name: raw.name,
    rank: raw.rank || fallback?.rank || "",
    force: raw.force || fallback?.force || "",
    region: raw.region || fallback?.region || "",
    yearsServed: raw.yearsServed || fallback?.yearsServed || "",
    quote: raw.quote || fallback?.quote || "",
    portraitImageUrl,
    candleCount: raw.candleCount ?? fallback?.candleCount ?? 0,
    tributeCount: raw.tributeCount ?? fallback?.tributeCount ?? 0,
  };
}

export function normalizeMemorialDetail(raw: SanityDetail | null): Memorial | null {
  if (!raw?.id || !raw.name) return null;

  const fallback = MEMORIALS_BY_ID[raw.id];
  const portraitImageUrl = resolvePortraitUrl(
    raw.portraitImageUrl,
    raw.portraitImage,
    raw.id
  );

  const biography =
    blocksToPlainText(raw.biography) ||
    fallback?.biography ||
    "";

  const gallery = resolveGallery(
    (raw as { galleryUrls?: (string | null)[] }).galleryUrls,
    raw.gallery,
    portraitImageUrl,
    raw.id
  );

  const timeline =
    raw.timeline?.length ? raw.timeline : fallback?.timeline ?? [];

  const tributes = (raw.tributes?.length ? raw.tributes : fallback?.tributes ?? []).map(
    (t) => ({
      name: t.name,
      relationship: t.relationship,
      timeAgo: t.timeAgo?.includes("T") ? formatTimeAgo(t.timeAgo) : (t.timeAgo ?? "Recently"),
      text: t.text,
    })
  );

  return {
    id: raw.id,
    sanityId: raw.sanityId,
    name: raw.name,
    rank: raw.rank || fallback?.rank || "",
    force: raw.force || fallback?.force || "",
    region: raw.region || fallback?.region || "",
    yearsServed: raw.yearsServed || fallback?.yearsServed || "",
    quote: raw.quote || fallback?.quote || "",
    portraitImageUrl,
    candleCount: raw.candleCount ?? fallback?.candleCount ?? 0,
    tributeCount: raw.tributeCount ?? fallback?.tributeCount ?? 0,
    age: raw.age ?? fallback?.age ?? 0,
    dateOfLoss: raw.dateOfLoss || fallback?.dateOfLoss || "",
    biography,
    familyQuote: raw.familyQuote || fallback?.familyQuote || "",
    gallery,
    timeline,
    tributes,
    rememberedCount: raw.rememberedCount ?? fallback?.rememberedCount ?? 0,
  };
}

export function memorialToSummary(m: Memorial): MemorialSummary {
  return {
    id: m.id,
    name: m.name,
    rank: m.rank,
    force: m.force,
    region: m.region,
    yearsServed: m.yearsServed,
    quote: m.quote,
    portraitImageUrl: m.portraitImageUrl,
    candleCount: m.candleCount,
    tributeCount: m.tributeCount,
  };
}

export function getFallbackMemorialList(): MemorialSummary[] {
  return MEMORIALS_FALLBACK.map(memorialToSummary);
}

export function getFallbackMemorialById(id: string): Memorial | null {
  return MEMORIALS_BY_ID[id] ?? null;
}

export function getFallbackRollPreview(limit = 6): MemorialSummary[] {
  return [...MEMORIALS_FALLBACK]
    .sort((a, b) => b.candleCount - a.candleCount)
    .slice(0, limit)
    .map(memorialToSummary);
}

/** Aggregate stats for Wall of Remembrance header */
export function getFallbackWallStats() {
  const memorials = MEMORIALS_FALLBACK;
  const totalCandles = memorials.reduce((sum, m) => sum + m.candleCount, 0);
  const forces = new Set(memorials.map((m) => m.force)).size;
  return {
    totalCandles,
    officersRemembered: memorials.length,
    forcesRepresented: forces,
  };
}
