"use client";

import { Search } from "lucide-react";
import ResearchSortMenu from "@/components/research/ResearchSortMenu";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
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
  return (
    <div className={PAGE_CONTENT_CONTAINER}>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4 lg:gap-6">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full lg:w-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.label)}
              className={cn(
                "min-h-[36px] sm:min-h-[48px] px-4 sm:px-6 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors cursor-pointer",
                activeCategory === category.label ? hybrid.editorialChipActive : hybrid.editorialChip
              )}
            >
              {category.label === "All" ? "All Reports" : category.label}
            </button>
          ))}
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
                "w-full pl-10 sm:pl-14 pr-4 sm:pr-6 py-2.5 sm:py-4 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold rounded-full focus:outline-none transition-colors",
                hybrid.editorialInput
              )}
              aria-label="Search research"
            />
          </div>

          <ResearchSortMenu sortBy={sortBy} onSortChange={onSortChange} />
        </div>
      </div>
    </div>
  );
}
