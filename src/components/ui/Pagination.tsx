"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Light editorial chips (default) or dark campaign */
  variant?: "editorial" | "campaign";
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "editorial",
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const chip =
    variant === "editorial"
      ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10";
  const chipActive =
    variant === "editorial"
      ? "bg-[#1877F2] text-white shadow-[0_0_20px_rgba(24,119,242,0.3)]"
      : "bg-[#1877F2] text-white shadow-[0_0_20px_rgba(24,119,242,0.3)]";
  const disabled = "opacity-50 cursor-not-allowed";

  return (
    <div className={cn("flex justify-center items-center gap-3", className)}>
      <Button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        variant="outline"
        className={cn("w-12 h-12 p-0 rounded-full", chip, currentPage === 1 && disabled)}
        aria-label="Previous page"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>

      {Array.from({ length: totalPages }).map((_, idx) => {
        const page = idx + 1;
        return (
          <Button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "w-12 h-12 p-0 rounded-full font-bold text-sm transition-colors",
              currentPage === page ? chipActive : chip
            )}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Button>
        );
      })}

      <Button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        variant="outline"
        className={cn("w-12 h-12 p-0 rounded-full", chip, currentPage === totalPages && disabled)}
        aria-label="Next page"
      >
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
