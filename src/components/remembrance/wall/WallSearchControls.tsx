"use client";

import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

interface WallSearchControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  resultCount: number;
  hasActiveSort: boolean;
  onClearSort: () => void;
  variant?: "default" | "sticky" | "campaign";
}

export default function WallSearchControls({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  resultCount,
  hasActiveSort,
  onClearSort,
  variant = "default",
}: WallSearchControlsProps) {
  const isCampaign = variant === "campaign";

  return (
    <div className={cn(variant === "sticky" ? "py-1" : isCampaign ? "py-0" : "py-3")}>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
        <div className="relative flex-1 min-w-0">
          <Search
            className={cn(
              "w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none",
              isCampaign ? "text-slate-500" : "text-slate-400"
            )}
          />
          <input
            type="search"
            placeholder="Search by name or force…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "w-full text-sm pl-11 pr-4 min-h-[48px] rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30",
              isCampaign
                ? "bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-[#1877F2]/40"
                : cn(hybrid.editorialInput, "focus:ring-[#1877F2]/20")
            )}
            aria-label="Search memorial wall"
          />
        </div>

        <SortSelect label="Sort" value={sortBy} onChange={onSortChange} dark={isCampaign}>
          <option value="All">Default order</option>
          <option value="Recently">Recently added</option>
          <option value="MostTributed">Most tributed</option>
        </SortSelect>
      </div>

      {hasActiveSort && (
        <button
          type="button"
          onClick={onClearSort}
          className="text-xs text-[#1877F2] hover:text-white hover:underline mt-2 min-h-[44px] transition-colors"
        >
          Reset sort
        </button>
      )}

      <p className={cn("text-xs mt-2", isCampaign ? "text-slate-500" : hybrid.editorialMuted)}>
        {resultCount} {resultCount === 1 ? "life" : "lives"} on the wall
      </p>
    </div>
  );
}

function SortSelect({
  label,
  value,
  onChange,
  children,
  dark,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 sm:min-w-[200px]">
      <span
        className={cn(
          "text-[10px] font-medium uppercase tracking-wider",
          dark ? "text-slate-500" : hybrid.editorialMuted
        )}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "text-sm px-3 min-h-[48px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30",
          dark
            ? "bg-[#020611] border border-white/10 text-slate-200 focus:border-[#1877F2]/40"
            : cn(hybrid.editorialInput)
        )}
      >
        {children}
      </select>
    </label>
  );
}
