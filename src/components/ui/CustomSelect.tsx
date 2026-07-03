"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type CustomSelectOption<T extends string | number = string> = {
  value: T;
  label: string;
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
};

export default function CustomSelect<T extends string | number = string>({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  variant = "light",
  className,
  ariaLabel,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

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
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => !disabled && setOpen((current) => !current)}
        className={cn(
          "w-full rounded-md border px-3 py-3 text-left text-[13px] md:text-sm font-medium transition-colors flex items-center justify-between gap-2 focus:outline-none focus:ring-1 focus:ring-[#1877F2]/30",
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
          <ul
            role="listbox"
            className={cn(
              "absolute top-[calc(100%+6px)] left-0 right-0 max-h-60 overflow-y-auto rounded-xl border py-1.5 z-50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]",
              menuClasses
            )}
          >
            {options.map((option) => {
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
                      "w-full text-left px-4 py-2.5 text-[13px] md:text-sm font-medium transition-colors flex items-center justify-between gap-2",
                      isSelected ? activeOptionClasses : idleOptionClasses
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected ? <Check className="w-4 h-4 shrink-0" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
