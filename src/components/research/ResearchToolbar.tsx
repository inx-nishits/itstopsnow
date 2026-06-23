"use client";

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
  return (
    <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.label)}
              className={cn(
                "min-h-[48px] px-6 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors cursor-pointer",
                activeCategory === category.label ? hybrid.editorialChipActive : hybrid.editorialChip
              )}
            >
              {category.label === "All" ? "All Reports" : category.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="relative grow lg:w-80">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="search"
              placeholder="SEARCH REPORTS..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={cn(
                "w-full pl-14 pr-6 py-4 text-[10px] uppercase tracking-widest font-bold rounded-full focus:outline-none transition-colors",
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
