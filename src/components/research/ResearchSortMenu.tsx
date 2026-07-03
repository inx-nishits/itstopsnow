"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "date" as const, label: "Latest" },
  { value: "title" as const, label: "Title A–Z" },
];

interface ResearchSortMenuProps {
  sortBy: "date" | "title";
  onSortChange: (value: "date" | "title") => void;
  className?: string;
}

export default function ResearchSortMenu({ sortBy, onSortChange, className }: ResearchSortMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const activeOption = SORT_OPTIONS.find((option) => option.value === sortBy) ?? SORT_OPTIONS[0];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[36px] sm:min-h-[48px] px-4 sm:px-5 rounded-full text-xs sm:text-xs font-bold uppercase tracking-widest transition-all cursor-pointer",
          open ? hybrid.editorialChipActive : hybrid.editorialChip
        )}
      >
        <SlidersHorizontal className="w-4 h-4 shrink-0 opacity-80" />
        <span>{activeOption.label}</span>
        <ChevronDown
          className={cn("w-3.5 h-3.5 shrink-0 opacity-70 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[12.5rem] rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_50px_rgba(1,11,25,0.12)]"
          role="presentation"
        >
          <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
            Sort by
          </p>
          <ul id={listboxId} role="listbox" aria-label="Sort reports" className="space-y-0.5">
            {SORT_OPTIONS.map((option) => {
              const isActive = option.value === sortBy;
              return (
                <li key={option.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      onSortChange(option.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left text-xs font-bold uppercase tracking-widest transition-colors min-h-[44px]",
                      isActive
                        ? "bg-[#1877F2]/10 text-[#1877F2]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#010B19]"
                    )}
                  >
                    <span>{option.label}</span>
                    {isActive ? <Check className="w-4 h-4 shrink-0" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
