"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import ResearchSortMenu from "@/components/research/ResearchSortMenu";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";
import type { ResearchCategory } from "@/lib/research/types";

interface ResearchToolbarProps {
  categories: ResearchCategory[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: "date" | "title";
  onSortChange: (value: "date" | "title") => void;
}

export default function ResearchToolbar({
  categories,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ResearchToolbarProps) {
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;

    const activeTab = container.querySelector(
      `[data-tab-id="${activeCategory}"]`
    ) as HTMLElement | null;

    if (!activeTab) return;

    const scrollLeft =
      activeTab.offsetLeft - container.offsetWidth / 2 + activeTab.offsetWidth / 2;

    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeCategory]);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-4 py-2 sm:py-3">
        <div className="-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-16 lg:px-16 md:mx-0 md:px-0 min-w-0 flex-1">
          <div
            ref={tabsContainerRef}
            className="flex min-w-0 w-full items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide scroll-px-4 md:scroll-px-0 pb-1 md:pb-0"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                data-tab-id={category.label}
                onClick={() => onCategoryChange(category.label)}
                className={cn(
                  "flex items-center justify-center gap-2 px-5 sm:px-6 h-12 sm:h-11 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all border shrink-0 cursor-pointer",
                  activeCategory === category.label 
                    ? "bg-[#1877F2] text-white border-[#1877F2]" 
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {category.label === "All" ? "All Reports" : category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 w-full lg:w-auto">
          <div className="relative grow lg:w-80">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="search"
              placeholder="SEARCH REPORTS..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={cn(
                "w-full pl-10 sm:pl-14 pr-4 sm:pr-6 h-12 sm:h-11 text-sm sm:text-xs uppercase tracking-widest font-bold rounded-full focus:outline-none transition-colors",
                hybrid.editorialInput
              )}
              aria-label="Search research"
            />
          </div>

          <ResearchSortMenu sortBy={sortBy} onSortChange={onSortChange} />
        </div>
      </div>
  );
}
