"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollableTabRowProps {
  children: ReactNode;
  activeTabId?: string;
  className?: string;
  /** Tailwind gradient start color for edge fades, e.g. `from-[#f4f5f7]` */
  fadeFromClass?: string;
}

/** Horizontal filter tabs with desktop prev/next controls when content overflows. */
export function ScrollableTabRow({
  children,
  activeTabId,
  className,
  fadeFromClass = "from-white",
}: ScrollableTabRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const overflow = el.scrollWidth > el.clientWidth + 2;
    setCanScrollLeft(overflow && el.scrollLeft > 4);
    setCanScrollRight(
      overflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 4
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  useEffect(() => {
    updateScrollState();
  }, [children, updateScrollState]);

  useEffect(() => {
    if (!activeTabId || !scrollRef.current) return;

    const activeEl = scrollRef.current.querySelector(
      `[data-tab-id="${activeTabId}"]`
    ) as HTMLElement | null;

    if (!activeEl) return;

    const container = scrollRef.current;
    const target =
      activeEl.offsetLeft - container.clientWidth / 2 + activeEl.offsetWidth / 2;

    container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeTabId]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.65;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const showArrows = canScrollLeft || canScrollRight;

  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-1 items-center gap-1 md:gap-2",
        className
      )}
    >
      {showArrows ? (
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Show previous tabs"
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-[#1877F2]/40 hover:text-[#1877F2] disabled:pointer-events-none disabled:opacity-30 md:flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      ) : null}

      <div className="relative min-w-0 flex-1">
        {canScrollLeft ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-8 bg-gradient-to-r to-transparent md:block",
              fadeFromClass
            )}
            aria-hidden
          />
        ) : null}
        {canScrollRight ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-8 bg-gradient-to-l to-transparent md:block",
              fadeFromClass
            )}
            aria-hidden
          />
        ) : null}

        <div
          ref={scrollRef}
          className="flex min-w-0 items-center gap-2 overflow-x-auto scroll-smooth scrollbar-hide pb-1 sm:gap-3 md:pb-0"
        >
          {children}
        </div>
      </div>

      {showArrows ? (
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Show next tabs"
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-[#1877F2]/40 hover:text-[#1877F2] disabled:pointer-events-none disabled:opacity-30 md:flex"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
