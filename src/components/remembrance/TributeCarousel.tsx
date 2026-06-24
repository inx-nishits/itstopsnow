"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import type { MemorialTribute } from "@/lib/memorial/types";

interface TributeCarouselProps {
  tributes: MemorialTribute[];
}

const AUTO_ADVANCE_MS = 5000;

export default function TributeCarousel({ tributes }: TributeCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;
    container.scrollTo({
      left: child.offsetLeft - container.offsetLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(index);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || tributes.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % tributes.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, tributes.length, scrollToIndex]);

  return (
    <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {tributes.length} tributes
      </p>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Tribute messages"
      >
        {tributes.map((tribute, i) => (
          <div
            key={`${tribute.name}-${i}`}
            className="snap-start shrink-0 w-[85vw] sm:w-[340px]"
            role="group"
            aria-roledescription="slide"
            aria-label={`Tribute ${i + 1} of ${tributes.length}`}
            aria-hidden={i !== activeIndex}
          >
            <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <p className="mb-6 flex-1 text-[15px] leading-relaxed text-slate-600">
                &ldquo;{tribute.text}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10 text-sm font-bold text-[#1877F2]">
                  {tribute.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#010B19]">{tribute.name}</p>
                  <p className="truncate text-[11px] text-slate-500">
                    {tribute.relationship ? `${tribute.relationship} · ` : ""}
                    {tribute.timeAgo}
                  </p>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {tributes.length > 1 && (
        <div className="flex justify-center gap-2" role="tablist" aria-label="Tribute slides">
          {tributes.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => scrollToIndex(i)}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2] ${
                i === activeIndex ? "px-3" : ""
              }`}
              aria-label={`Go to tribute ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all ${
                  i === activeIndex ? "h-1.5 w-6 bg-[#1877F2]" : "h-1.5 w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-hidden
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

