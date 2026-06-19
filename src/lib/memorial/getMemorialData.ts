import { client } from "@/sanity/client";
import { projectId } from "@/sanity/env";
import {
  getFallbackMemorialById,
  getFallbackMemorialList,
  getFallbackRollPreview,
  getFallbackWallStats,
  normalizeMemorialDetail,
  normalizeMemorialSummary,
} from "./normalize";
import {
  memorialDetailQuery,
  memorialIdsQuery,
  memorialListQuery,
  memorialRollPreviewQuery,
} from "./queries";
import type {
  Memorial,
  MemorialDetailResult,
  MemorialListResult,
  MemorialSummary,
} from "./types";

function isSanityConfigured() {
  return Boolean(projectId && projectId !== "your-project-id");
}

export async function getAllMemorials(): Promise<MemorialListResult> {
  if (!isSanityConfigured()) {
    return { memorials: getFallbackMemorialList(), fromSanity: false };
  }

  try {
    const raw = await client.fetch<unknown[]>(memorialListQuery);
    if (!raw?.length) {
      return { memorials: getFallbackMemorialList(), fromSanity: false };
    }

    const memorials = raw
      .map((item, index) => normalizeMemorialSummary(item as Parameters<typeof normalizeMemorialSummary>[0], index))
      .filter((m): m is MemorialSummary => m !== null);

    return {
      memorials: memorials.length ? memorials : getFallbackMemorialList(),
      fromSanity: memorials.length > 0,
    };
  } catch (error) {
    console.warn("[memorial] List fetch failed, using fallback.", error);
    return { memorials: getFallbackMemorialList(), fromSanity: false };
  }
}

export async function getMemorialById(id: string): Promise<MemorialDetailResult> {
  const fallback = getFallbackMemorialById(id);
  if (!isSanityConfigured()) {
    return { memorial: fallback, fromSanity: false };
  }

  try {
    const raw = await client.fetch(memorialDetailQuery, { id });
    const memorial = normalizeMemorialDetail(raw);
    if (memorial) {
      return { memorial, fromSanity: true };
    }
    return { memorial: fallback, fromSanity: false };
  } catch (error) {
    console.warn(`[memorial] Detail fetch failed for id=${id}, using fallback.`, error);
    return { memorial: fallback, fromSanity: false };
  }
}

export async function getMemorialRollPreview(limit = 6): Promise<MemorialSummary[]> {
  if (!isSanityConfigured()) {
    return getFallbackRollPreview(limit);
  }

  try {
    const raw = await client.fetch<unknown[]>(memorialRollPreviewQuery);
    if (!raw?.length) return getFallbackRollPreview(limit);

    const preview = raw
      .map((item, index) => normalizeMemorialSummary(item as Parameters<typeof normalizeMemorialSummary>[0], index))
      .filter((m): m is MemorialSummary => m !== null)
      .slice(0, limit);

    return preview.length >= 3 ? preview : getFallbackRollPreview(limit);
  } catch (error) {
    console.warn("[memorial] Roll preview fetch failed, using fallback.", error);
    return getFallbackRollPreview(limit);
  }
}

export async function getMemorialIds(): Promise<string[]> {
  const fallbackIds = getFallbackMemorialList().map((m) => m.id);
  if (!isSanityConfigured()) return fallbackIds;

  try {
    const ids = await client.fetch<string[]>(memorialIdsQuery);
    return ids?.length ? ids : fallbackIds;
  } catch {
    return fallbackIds;
  }
}

export async function getWallStats() {
  const { memorials, fromSanity } = await getAllMemorials();
  if (!fromSanity) return getFallbackWallStats();

  return {
    totalCandles: memorials.reduce((sum, m) => sum + m.candleCount, 0),
    officersRemembered: memorials.length,
    forcesRepresented: new Set(memorials.map((m) => m.force)).size,
  };
}

/** Map memorial summary to homepage roll preview shape */
export function toRollHonourPreview(summary: MemorialSummary) {
  return {
    id: summary.id,
    name: summary.name,
    role: summary.rank,
    force: summary.force,
    years: summary.yearsServed,
    candleCount: summary.candleCount,
    imageUrl: summary.portraitImageUrl,
    quote: summary.quote,
  };
}

export type { Memorial, MemorialSummary };
