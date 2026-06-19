"use client";

import { Search } from "lucide-react";
import { RESEARCH_CATEGORIES } from "@/lib/research/data";

interface ResearchToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  resultCount: number;
}

export default function ResearchToolbar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
}: ResearchToolbarProps) {
  return (
    <div className="border-b border-slate-200 pb-6 mb-8 sm:mb-10">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            placeholder="Search titles or authors…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-900 text-sm pl-11 pr-4 min-h-[48px] rounded-lg focus:outline-none focus:border-[#1877F2]/40 focus:ring-2 focus:ring-[#1877F2]/10 placeholder:text-slate-400"
            aria-label="Search research"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
            {RESEARCH_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition-colors min-h-[36px] ${
                  activeCategory === cat
                    ? "bg-[#010B19] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <label htmlFor="research-sort" className="text-xs text-slate-500">
              Sort
            </label>
            <select
              id="research-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs font-medium px-3 min-h-[36px] rounded-lg focus:outline-none focus:border-[#1877F2]/40"
            >
              <option value="Date">Latest</option>
              <option value="Title">Title A–Z</option>
            </select>
            <span className="text-xs text-slate-400 tabular-nums hidden sm:inline">
              {resultCount} {resultCount === 1 ? "report" : "reports"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
