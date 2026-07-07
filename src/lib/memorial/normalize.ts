import type { Memorial, MemorialSummary } from "./types";
import { MEMORIALS_BY_ID, MEMORIALS_FALLBACK } from "./fallback";

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
    monthlyRemembranceAvg: Math.round(totalCandles / Math.max(memorials.length, 1) / 12),
    notForgottenPercent: 98,
  };
}
