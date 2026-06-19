"use client";

import { useEffect, useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResearchHero from "@/components/research/ResearchHero";
import ResearchToolbar from "@/components/research/ResearchToolbar";
import ResearchFeaturedPublication from "@/components/research/ResearchFeaturedPublication";
import ResearchEvidenceList from "@/components/research/ResearchEvidenceList";
import ResearchViewerModal from "@/components/research/ResearchViewerModal";
import { RESEARCH_ITEMS } from "@/lib/research/data";
import type { ResearchItem } from "@/lib/research/types";

const ITEMS_PER_PAGE = 4;

export default function ResearchPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Date");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeReport, setActiveReport] = useState<ResearchItem | null>(null);

  const filteredResearch = useMemo(() => {
    return RESEARCH_ITEMS.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const sortedResearch = useMemo(() => {
    const list = [...filteredResearch];
    if (sortBy === "Title") {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list.sort((a, b) => b.id.localeCompare(a.id));
  }, [filteredResearch, sortBy]);

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

      {/* Light reading / publication area */}
      <section className="theme-editorial flex-1 bg-[#f4f5f7] text-[#010B19]">
        <div className="w-full px-5 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16 max-w-[900px] mx-auto">
          <ResearchToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={sortedResearch.length}
          />

          {sortedResearch.length === 0 ? (
            <div className="text-center py-16 sm:py-24 bg-white rounded-xl border border-slate-200 px-6">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-[#010B19] mb-2">No reports found</h2>
              <p className="text-sm text-slate-500 mb-6">Try adjusting your search or category.</p>
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              {featuredPublication && (
                <ResearchFeaturedPublication
                  publication={featuredPublication}
                  onViewReport={setActiveReport}
                />
              )}

              <ResearchEvidenceList items={paginatedCatalog} onViewReport={setActiveReport} />

              {totalPages > 1 && (
                <nav
                  className="flex flex-wrap items-center justify-center gap-3 mt-10 pt-8 border-t border-slate-200"
                  aria-label="Publication pagination"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-slate-300 text-slate-700 disabled:opacity-40 min-h-[44px]"
                  >
                    Previous
                  </Button>
                  <span className="text-xs text-slate-500 tabular-nums">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-slate-300 text-slate-700 disabled:opacity-40 min-h-[44px]"
                  >
                    Next
                  </Button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      <ResearchViewerModal report={activeReport} onClose={() => setActiveReport(null)} />
    </div>
  );
}
