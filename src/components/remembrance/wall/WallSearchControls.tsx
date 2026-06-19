"use client";

import type { ReactNode } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

interface WallSearchControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isFilterOpen: boolean;
  onToggleFilters: () => void;
  onOpenMobileFilters: () => void;
  selectedForce: string;
  onForceChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (value: string) => void;
  selectedRegion: string;
  onRegionChange: (value: string) => void;
  selectedYear: string;
  onYearChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  forceOptions: string[];
  resultCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  variant?: "default" | "sticky" | "campaign";
}

export default function WallSearchControls({
  searchQuery,
  onSearchChange,
  isFilterOpen,
  onToggleFilters,
  onOpenMobileFilters,
  selectedForce,
  onForceChange,
  selectedRole,
  onRoleChange,
  selectedRegion,
  onRegionChange,
  selectedYear,
  onYearChange,
  sortBy,
  onSortChange,
  forceOptions,
  resultCount,
  hasActiveFilters,
  onClearFilters,
  variant = "default",
}: WallSearchControlsProps) {
  const isCampaign = variant === "campaign";

  return (
    <div className={cn(variant === "sticky" ? "py-1" : isCampaign ? "py-0" : "py-3")}>
      <div className="flex gap-2 w-full">
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

        <button
          type="button"
          onClick={onOpenMobileFilters}
          className={cn(
            "md:hidden shrink-0 flex items-center justify-center min-h-[48px] min-w-[48px] px-3 rounded-xl border text-xs font-semibold transition-colors",
            isCampaign
              ? hasActiveFilters
                ? "bg-[#1877F2] text-white border-[#1877F2]"
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              : hasActiveFilters
                ? hybrid.editorialChipActive
                : hybrid.editorialChip
          )}
          aria-label="Open filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onToggleFilters}
          className={cn(
            "hidden md:flex shrink-0 items-center justify-center gap-2 min-h-[48px] px-4 rounded-xl border text-xs font-semibold transition-colors",
            isCampaign
              ? isFilterOpen || hasActiveFilters
                ? "bg-[#1877F2] text-white border-[#1877F2]"
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              : isFilterOpen || hasActiveFilters
                ? hybrid.editorialChipActive
                : hybrid.editorialChip
          )}
          aria-expanded={isFilterOpen}
          aria-controls="wall-filters-desktop"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            id="wall-filters-desktop"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden md:block overflow-hidden"
          >
            <div className="pt-4 pb-2 grid grid-cols-2 lg:grid-cols-5 gap-3">
              <FilterSelect label="Force" value={selectedForce} onChange={onForceChange} dark={isCampaign}>
                <option value="All">All forces</option>
                {forceOptions.map((force) => (
                  <option key={force} value={force}>
                    {force}
                  </option>
                ))}
              </FilterSelect>
              <FilterSelect label="Role" value={selectedRole} onChange={onRoleChange} dark={isCampaign}>
                <option value="All">All roles</option>
                <option value="PC">Police Constable</option>
                <option value="PCSO">PCSO</option>
                <option value="DC">Detective Constable</option>
              </FilterSelect>
              <FilterSelect label="Region" value={selectedRegion} onChange={onRegionChange} dark={isCampaign}>
                <option value="All">All regions</option>
                <option value="London">London & South</option>
                <option value="Midlands">Midlands</option>
                <option value="North">North England</option>
                <option value="Scotland">Scotland</option>
              </FilterSelect>
              <FilterSelect label="Year" value={selectedYear} onChange={onYearChange} dark={isCampaign}>
                <option value="All">All years</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </FilterSelect>
              <FilterSelect label="Sort" value={sortBy} onChange={onSortChange} dark={isCampaign}>
                <option value="All">Default order</option>
                <option value="Recently">Recently added</option>
                <option value="MostTributed">Most tributed</option>
              </FilterSelect>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="text-xs text-[#1877F2] hover:text-white hover:underline mb-2 min-h-[44px] transition-colors"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p className={cn("text-xs mt-2", isCampaign ? "text-slate-500" : hybrid.editorialMuted)}>
        {resultCount} {resultCount === 1 ? "life" : "lives"} on the wall
      </p>
    </div>
  );
}

function FilterSelect({
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
    <label className="flex flex-col gap-1.5">
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
