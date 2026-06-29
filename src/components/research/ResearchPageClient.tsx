"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ResearchHero from "@/components/research/ResearchHero";
import ResearchToolbar from "@/components/research/ResearchToolbar";
import ResearchFeaturedPublication from "@/components/research/ResearchFeaturedPublication";
import ResearchEvidenceList from "@/components/research/ResearchEvidenceList";
import { EditorialSection, EditorialStickyBar } from "@/components/layout/PageSection";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import { getEnabledResearchCategories, RESEARCH_ITEMS } from "@/lib/research/data";
import { matchesResearchSearch, sortResearchItems } from "@/lib/research/utils";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 4;

export default function ResearchPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => getEnabledResearchCategories(), []);

  const filteredResearch = useMemo(() => {
    return RESEARCH_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesCategory && matchesResearchSearch(item, searchQuery);
    });
  }, [searchQuery, activeCategory]);

  const sortedResearch = useMemo(
    () => sortResearchItems(filteredResearch, sortBy),
    [filteredResearch, sortBy]
  );

  const featuredPublication = useMemo(
    () => sortedResearch.find((item) => item.featured) ?? null,
    [sortedResearch]
  );

  const catalogItems = useMemo(
    () => sortedResearch.filter((item) => item.id !== featuredPublication?.id),
    [sortedResearch, featuredPublication]
  );

  const totalPages = Math.ceil(catalogItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedCatalog = catalogItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ResearchHero />

      <EditorialSection noPadding className="flex-1">
        <div className={`${PAGE_CONTENT_CONTAINER} pt-0 pb-10 sm:pb-20 lg:pb-24`}>
          <div className="sticky top-16 md:top-24 z-40 bg-[#f4f5f7]/95 backdrop-blur-xl mb-6 sm:mb-8 border-b border-slate-200">
            <ResearchToolbar
              categories={categories}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
          <div
            className={cn(
              "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-5 mb-6 sm:mb-8",
              hybrid.editorialBorder
            )}
          >
            <h2 className={cn("font-sans text-xl sm:text-2xl font-bold uppercase tracking-tight", hybrid.editorialHeading)}>
              Research & Evidence
            </h2>
            <div className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em]">
              Showing {sortedResearch.length} {sortedResearch.length === 1 ? "report" : "reports"}
            </div>
          </div>

          {sortedResearch.length === 0 ? (
            <div className={cn("text-center py-10 lg:py-20 rounded-3xl", hybrid.editorialCard)}>
              <Search className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p className={cn("font-bold uppercase tracking-widest text-sm", hybrid.editorialMuted)}>
                No reports found matching your search.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-[#1877F2] hover:text-[#010B19] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {featuredPublication ? (
                <ResearchFeaturedPublication
                  publication={featuredPublication}
                />
              ) : null}

              <ResearchEvidenceList items={paginatedCatalog} />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                variant="editorial"
                className={cn("mt-10 lg:mt-16 pt-10 border-t", hybrid.editorialBorder)}
              />
            </>
          )}
        </div>
      </EditorialSection>
    </div>
  );
}
