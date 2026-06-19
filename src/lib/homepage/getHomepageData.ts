import { client } from "@/sanity/client";
import { projectId } from "@/sanity/env";
import { getMemorialRollPreview, toRollHonourPreview } from "@/lib/memorial/getMemorialData";
import { HOMEPAGE_FALLBACK } from "./fallback";
import { normalizeVoices } from "./normalize";
import {
  homepageEventsQuery,
  homepageStatsQuery,
  homepageVoicesQuery,
} from "./queries";
import type {
  HomepageData,
  HomepageEventPreview,
  HomepageStat,
} from "./types";

function isSanityConfigured() {
  return Boolean(projectId && projectId !== "your-project-id");
}

function hasValidStats(stats: HomepageStat[] | null | undefined): stats is HomepageStat[] {
  return Array.isArray(stats) && stats.length > 0 && stats.every((s) => s.endValue > 0);
}

async function buildRollPreview() {
  const preview = await getMemorialRollPreview(6);
  return preview.map(toRollHonourPreview);
}

export async function getHomepageData(): Promise<HomepageData> {
  const rollPreview = await buildRollPreview();

  if (!isSanityConfigured()) {
    return { ...HOMEPAGE_FALLBACK, rollPreview };
  }

  try {
    const [stats, voicesRaw, events] = await Promise.all([
      client.fetch<HomepageStat[]>(homepageStatsQuery),
      client.fetch(homepageVoicesQuery),
      client.fetch<HomepageEventPreview[]>(homepageEventsQuery),
    ]);

    const voices = normalizeVoices(voicesRaw);

    const hasLiveData =
      hasValidStats(stats) ||
      (voices?.length ?? 0) > 0 ||
      (events?.length ?? 0) > 0;

    if (!hasLiveData) {
      return { ...HOMEPAGE_FALLBACK, rollPreview };
    }

    return {
      fromSanity: true,
      stats: hasValidStats(stats) ? stats : HOMEPAGE_FALLBACK.stats,
      voices,
      rollPreview,
      events: events?.length ? events : HOMEPAGE_FALLBACK.events,
    };
  } catch (error) {
    console.warn("[homepage] Sanity fetch failed, using fallback data.", error);
    return { ...HOMEPAGE_FALLBACK, rollPreview };
  }
}
