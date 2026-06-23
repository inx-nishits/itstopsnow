"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

interface ResearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function ResearchPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: ResearchPaginationProps) {
  if (totalPages <= 1) return null;

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav
      className={cn("flex flex-col items-center gap-4 sm:gap-5", className)}
      aria-label="Publication pagination"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 tabular-nums">
        Page <span className="text-[#1877F2]">{currentPage}</span> of {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={!canGoPrev}
          aria-label="Previous page"
          className={cn(
            "inline-flex items-center justify-center gap-2 min-h-[48px] px-4 sm:px-5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
            hybrid.editorialChip,
            !canGoPrev && "opacity-40 cursor-not-allowed hover:bg-slate-100"
          )}
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 px-1">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex items-center justify-center min-w-[48px] min-h-[48px] px-3 rounded-full text-sm font-black tabular-nums transition-all",
                  isActive
                    ? "bg-[#1877F2] text-white shadow-[0_10px_30px_rgba(24,119,242,0.28)] ring-4 ring-[#1877F2]/15 scale-[1.02]"
                    : cn(hybrid.editorialChip, "hover:border-[#1877F2]/30 hover:text-[#1877F2]")
                )}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={!canGoNext}
          aria-label="Next page"
          className={cn(
            "inline-flex items-center justify-center gap-2 min-h-[48px] px-4 sm:px-5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
            hybrid.editorialChip,
            !canGoNext && "opacity-40 cursor-not-allowed hover:bg-slate-100"
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </nav>
  );
}
