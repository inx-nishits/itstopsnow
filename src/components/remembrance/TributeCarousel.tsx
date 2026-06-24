"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MemorialTribute } from "@/lib/memorial/types";

interface TributeCarouselProps {
  tributes: MemorialTribute[];
  onSeeAll?: () => void;
}

export default function TributeCarousel({ tributes, onSeeAll }: TributeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (!tributes || tributes.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-sm font-bold text-[#010B19] uppercase tracking-widest pb-2 border-b-2 border-[#1877F2] inline-block mb-0">
          Remembered By
        </h2>
        {onSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            className="shrink-0 min-h-[36px] text-[#1877F2] hover:text-[#1565d8] text-[10px] uppercase tracking-wider font-bold transition-colors flex items-center gap-1"
          >
            SEE ALL TRIBUTES <span aria-hidden>→</span>
          </button>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tributes.map((tribute, idx) => (
          <div 
            key={idx} 
            className="shrink-0 w-[240px] sm:w-[340px] snap-start p-4 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-4xl sm:text-5xl text-[#D0E1F9] font-serif italic leading-none mb-1 block select-none pointer-events-none">“</span>
              <p className="text-slate-600 text-[12px] sm:text-[14px] leading-relaxed mb-4 sm:mb-8 italic">
                {tribute.text}
              </p>
            </div>
            <p className="text-[10px] sm:text-[11px] font-bold text-[#7E93A8] uppercase tracking-widest">— {tribute.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button 
          onClick={() => scrollBy(-320)}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2]/30 shadow-sm transition-all"
          aria-label="Previous tributes"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => scrollBy(320)}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2]/30 shadow-sm transition-all"
          aria-label="Next tributes"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
