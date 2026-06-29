"use client";

import { Search } from "lucide-react";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

interface WallSearchControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  resultCount: number;
  variant?: "default" | "sticky" | "campaign";
}

const CONTROL_HEIGHT = "h-10 sm:h-12";

export default function WallSearchControls({
  searchQuery,
  onSearchChange,
  resultCount,
  variant = "default",
}: WallSearchControlsProps) {
  const isCampaign = variant === "campaign";

  const fieldBase = cn(
    "w-full text-sm rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30",
    CONTROL_HEIGHT,
    isCampaign
      ? "bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-[#1877F2]/40"
      : cn(hybrid.editorialInput, "focus:ring-[#1877F2]/20")
  );

  return (
    <div className={cn(variant === "sticky" ? "py-1" : isCampaign ? "py-0" : "py-3")}>
      <div className="flex w-full">
        <div className="relative flex-1 min-w-0">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
            aria-hidden
          >
            <Search className={cn("w-4 h-4 shrink-0", isCampaign ? "text-slate-500" : "text-slate-400")} />
          </div>
          <input
            type="search"
            placeholder="Search by name or force…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(fieldBase, "pl-11 pr-4")}
            aria-label="Search memorial wall"
          />
        </div>
      </div>

      <p className={cn("text-[10px] sm:text-xs mt-1 sm:mt-2 text-right", isCampaign ? "text-slate-500" : hybrid.editorialMuted)}>
        {resultCount} {resultCount === 1 ? "life" : "lives"} on the wall
      </p>
    </div>
  );
}
