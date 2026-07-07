import { getMemorialRollPreview, toRollHonourPreview } from "@/lib/memorial/getMemorialData";
import { HOMEPAGE_FALLBACK } from "./fallback";
import type { HomepageData } from "./types";

async function buildRollPreview() {
  const preview = await getMemorialRollPreview(6);
  return preview.map(toRollHonourPreview);
}

export async function getHomepageData(): Promise<HomepageData> {
  const rollPreview = await buildRollPreview();

  return { ...HOMEPAGE_FALLBACK, rollPreview };
}
