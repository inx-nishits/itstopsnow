export type SupportFilterOption = "All" | "Apps" | "Podcasts" | "Books" | "Websites";

export type SupportTabSlug = "all" | "apps" | "podcasts" | "books" | "websites";

const SLUG_TO_FILTER: Record<SupportTabSlug, SupportFilterOption> = {
  all: "All",
  apps: "Apps",
  podcasts: "Podcasts",
  books: "Books",
  websites: "Websites",
};

const FILTER_TO_SLUG: Record<SupportFilterOption, SupportTabSlug> = {
  All: "all",
  Apps: "apps",
  Podcasts: "podcasts",
  Books: "books",
  Websites: "websites",
};

export function supportTabHref(slug: SupportTabSlug): string {
  if (slug === "all") return "/support";
  return `/support?tab=${slug}`;
}

export function parseSupportTabParam(tab: string | null): SupportFilterOption {
  if (!tab) return "All";
  const normalized = tab.toLowerCase() as SupportTabSlug;
  return SLUG_TO_FILTER[normalized] ?? "All";
}

export function supportFilterToSlug(filter: SupportFilterOption): SupportTabSlug {
  return FILTER_TO_SLUG[filter];
}
