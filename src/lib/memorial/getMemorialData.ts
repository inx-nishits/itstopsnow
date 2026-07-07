import {
  getFallbackMemorialById,
  getFallbackMemorialList,
  getFallbackRollPreview,
  getFallbackWallStats,
} from "./normalize";
import type {
  Memorial,
  MemorialDetailResult,
  MemorialListResult,
  MemorialSummary,
} from "./types";

export async function getAllMemorials(): Promise<MemorialListResult> {
  return { memorials: getFallbackMemorialList(), fromSanity: false };
}

export async function getMemorialById(id: string): Promise<MemorialDetailResult> {
  const fallback = getFallbackMemorialById(id);
  return { memorial: fallback, fromSanity: false };
}

export async function getMemorialRollPreview(limit = 6): Promise<MemorialSummary[]> {
  return getFallbackRollPreview(limit);
}

export async function getMemorialIds(): Promise<string[]> {
  return getFallbackMemorialList().map((m) => m.id);
}

export async function getWallStats() {
  return getFallbackWallStats();
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
