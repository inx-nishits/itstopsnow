"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type CustomSelectOption<T extends string | number = string> = {
  value: T;
  label: string;
  /** Optional secondary line shown under the label (e.g. template description) */
  description?: string;
};

type CustomSelectProps<T extends string | number = string> = {
  value: T | "";
  onChange: (value: T) => void;
  options: CustomSelectOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  variant?: "light" | "dark";
  className?: string;
  ariaLabel?: string;
  /** Show a type-to-filter search input inside the dropdown */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Open the menu automatically when options become available */
  autoOpen?: boolean;
  /** Allow multi-line option labels instead of single-line truncation */
  multilineOptions?: boolean;
};

const MENU_GAP = 6;
const DEFAULT_MENU_MAX_HEIGHT = 240;

export default function CustomSelect<T extends string | number = string>({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  variant = "light",
  className,
  ariaLabel,
  searchable = false,
  searchPlaceholder = "Type to search...",
  autoOpen = false,
  multilineOptions = false,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousOptionsLengthRef = useRef(0);

  const selected = options.find((option) => option.value === value);

  const visibleOptions = searchable && query.trim()
    ? options.filter((option) => {
        const q = query.trim().toLowerCase();
        return (
          option.label.toLowerCase().includes(q) ||
          option.description?.toLowerCase().includes(q)
        );
      })
    : options;

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    if (searchable) {
      searchInputRef.current?.focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, searchable]);

  useEffect(() => {
    if (autoOpen && options.length > 0 && previousOptionsLengthRef.current === 0) {
      setOpen(true);
    }
    previousOptionsLengthRef.current = options.length;
  }, [autoOpen, options.length]);

  useLayoutEffect(() => {
    if (!open) return;

    const updatePlacement = () => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      if (!trigger || !menu) return;

      const triggerRect = trigger.getBoundingClientRect();
      const menuHeight = menu.offsetHeight;
      const spaceBelow = window.innerHeight - triggerRect.bottom - MENU_GAP;
      const spaceAbove = triggerRect.top - MENU_GAP;
      const shouldOpenUp = spaceBelow < menuHeight && spaceAbove > spaceBelow;

      setPlacement(shouldOpenUp ? "top" : "bottom");
    };

    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);

    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open, visibleOptions.length, searchable]);

  const triggerClasses =
    variant === "dark"
      ? "bg-[#051024] border-white/10 text-white hover:border-white/20 focus:border-[#1877F2]"
      : "bg-white border-slate-300 text-slate-900 hover:border-slate-400 focus:border-[#1877F2]";

  const menuClasses =
    variant === "dark" ? "bg-[#051024] border-white/10" : "bg-white border-slate-100";

  const activeOptionClasses =
    variant === "dark" ? "text-[#1877F2] bg-white/5" : "text-[#1877F2] bg-blue-50/50";

  const idleOptionClasses =
    variant === "dark" ? "text-slate-300 hover:bg-white/5" : "text-slate-600 hover:bg-slate-50";

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => !disabled && setOpen((current) => !current)}
        className={cn(
          "w-full rounded-md border px-3 py-3 text-left text-[14px] md:text-sm font-medium transition-colors flex items-center justify-between gap-2 focus:outline-none focus:ring-1 focus:ring-[#1877F2]/30",
          disabled && "opacity-50 cursor-not-allowed",
          triggerClasses
        )}
      >
        <span className={cn("truncate", !selected && (variant === "dark" ? "text-slate-500" : "text-slate-500"))}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn("w-4 h-4 shrink-0 opacity-60 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div
            ref={menuRef}
            className={cn(
              "absolute left-0 right-0 rounded-xl border z-50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden",
              placement === "bottom" ? "top-[calc(100%+6px)]" : "bottom-[calc(100%+6px)]",
              menuClasses
            )}
          >
            {searchable && (
              <div className={cn("flex items-center gap-2 border-b px-3 py-2", variant === "dark" ? "border-white/10" : "border-slate-100")}>
                <Search className="w-4 h-4 shrink-0 opacity-50" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setOpen(false);
                    }
                    if (e.key === "Enter" && visibleOptions.length > 0) {
                      e.preventDefault();
                      onChange(visibleOptions[0].value);
                      setOpen(false);
                    }
                  }}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  className={cn(
                    "w-full bg-transparent text-[14px] md:text-sm font-medium focus:outline-none",
                    variant === "dark" ? "text-white placeholder:text-slate-500" : "text-slate-900 placeholder:text-slate-400"
                  )}
                />
              </div>
            )}
            <ul role="listbox" className="overflow-y-auto py-1.5" style={{ maxHeight: DEFAULT_MENU_MAX_HEIGHT }}>
              {visibleOptions.length === 0 ? (
                <li className={cn("px-4 py-3 text-[13px] font-medium", variant === "dark" ? "text-slate-500" : "text-slate-400")}>
                  No matches found.
                </li>
              ) : (
                visibleOptions.map((option) => {
                  const isSelected = option.value === value;

                  return (
                    <li key={String(option.value)} role="option" aria-selected={isSelected}>
                      <button
                        type="button"
                        onClick={() => {
                          onChange(option.value);
                          setOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-[14px] md:text-sm font-medium transition-colors flex items-center justify-between gap-2",
                          isSelected ? activeOptionClasses : idleOptionClasses
                        )}
                      >
                        <span className="min-w-0">
                          <span className={cn("block", multilineOptions ? "whitespace-normal leading-snug" : "truncate")}>
                            {option.label}
                          </span>
                          {option.description ? (
                            <span className={cn("block text-xs font-normal", multilineOptions ? "whitespace-normal leading-snug" : "truncate", variant === "dark" ? "text-slate-500" : "text-slate-400")}>
                              {option.description}
                            </span>
                          ) : null}
                        </span>
                        {isSelected ? <Check className="w-4 h-4 shrink-0" /> : null}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
