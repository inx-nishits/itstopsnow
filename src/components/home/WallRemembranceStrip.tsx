"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame } from "lucide-react";
import SectionReveal from "@/components/home/SectionReveal";
import { MEMORIALS_FALLBACK } from "@/lib/memorial/fallback";
import type { RollHonourPreview } from "@/lib/homepage/types";

interface WallRemembranceStripProps {
  officers: RollHonourPreview[];
}

export default function WallRemembranceStrip({ officers }: WallRemembranceStripProps) {
  // Sum fallback candle counts for dynamic total (equals exactly 23,272)
  const totalCandles = MEMORIALS_FALLBACK.reduce((sum, m) => sum + m.candleCount, 0);
  const thousandCount = Math.floor(totalCandles / 1000);

  return (
    <section className="relative w-full bg-gradient-to-r from-[#080F1E] to-[#040813] border-y border-white/5 overflow-hidden py-3.5 sm:py-5">
      {/* Subtle glow highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[#1877F2]/[0.05] rounded-full blur-[60px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-16 relative z-10">
        <SectionReveal delay={0.05}>
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-6 w-full">
            
            {/* Left Side: Candle & Stats */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="relative w-9 h-9 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#02050b] shadow-inner">
                <Image
                  src="/images/candle_glow.png"
                  alt="Lit candle"
                  fill
                  className="object-cover scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm sm:text-2xl font-black text-white tracking-tight leading-none">
                  {totalCandles.toLocaleString()}
                </span>
                <span className="text-[7px] sm:text-xs font-bold text-slate-400 tracking-[0.05em] sm:tracking-[0.08em] uppercase mt-0.5 sm:mt-1">
                  CANDLES LIT IN REMEMBRANCE
                </span>
                <Link
                  href="/wall-of-remembrance"
                  className="inline-flex items-center gap-1 text-[9px] sm:text-sm font-bold text-[#1877F2] hover:text-blue-400 transition-colors mt-0.5 sm:mt-1.5 cursor-pointer"
                >
                  <span>Light a candle</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Right Side Group: Avatars + Button */}
            <div className="flex items-center gap-2 sm:gap-6 shrink-0">
              {/* Overlapping Avatars */}
              {officers.length > 0 && (
                <div className="flex -space-x-2 sm:-space-x-3 items-center shrink-0">
                  {officers.slice(0, 3).map((off) => (
                    <div
                      key={off.id}
                      className="relative w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-[#080F1E] overflow-hidden bg-[#030712] shadow-md shrink-0"
                    >
                      <Image
                        src={off.imageUrl}
                        alt={off.name}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                  ))}
                  <div className="relative z-10 flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-[#080F1E] bg-[#1877F2]/15 text-[#1877F2] font-black text-[8px] sm:text-[11px] shadow-md shrink-0 tracking-tighter">
                    +{thousandCount}K
                  </div>
                </div>
              )}

              {/* Leave Tribute Button */}
              <Link href="/wall-of-remembrance" className="shrink-0">
                <button className="bg-transparent hover:bg-white hover:text-[#010B19] text-white border border-white/10 hover:border-white text-[8px] sm:text-xs font-black tracking-widest uppercase px-2.5 py-1.5 sm:px-6 sm:py-3.5 rounded-full transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer min-h-[30px] sm:min-h-[44px]">
                  <span className="hidden sm:inline">LEAVE A TRIBUTE</span>
                  <span className="inline sm:hidden">TRIBUTE</span>
                </button>
              </Link>
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
