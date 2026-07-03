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
          {/* Mobile: stacked layout — stats on top, avatars + button below */}
          <div className="flex flex-col gap-3 sm:hidden w-full">
            {/* Row 1: Candle + Stats */}
            <div className="flex items-center gap-3 w-full">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#02050b] shadow-inner">
                <Image
                  src="/images/candle_glow.png"
                  alt="Lit candle"
                  fill
                  className="object-cover scale-105"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="text-xl font-black text-white tracking-tight leading-none">
                  {totalCandles.toLocaleString()}
                </div>
                <div className="text-xs font-bold text-slate-400 tracking-wider mt-0.5 leading-tight">
                  Candles lit in remembrance
                </div>
                <Link
                  href="/wall-of-remembrance"
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#1877F2] hover:text-blue-400 transition-colors mt-1 w-fit"
                >
                  <span>Light a candle</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Row 2: Avatars + Button */}
            <div className="flex items-center justify-between w-full">
              {officers.length > 0 && (
                <div className="flex -space-x-3 items-center">
                  {officers.slice(0, 3).map((off) => (
                    <div
                      key={off.id}
                      className="relative w-11 h-11 rounded-full border-2 border-[#080F1E] overflow-hidden bg-[#030712] shadow-md shrink-0"
                    >
                      <Image
                        src={off.imageUrl}
                        alt={off.name}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                  ))}
                  <div
                    style={{ width: 44, height: 44, minWidth: 44 }}
                    className="relative z-10 flex items-center justify-center rounded-full border-2 border-[#080F1E] bg-[#1877F2] text-white font-black text-[8px] shadow-md shrink-0 whitespace-nowrap leading-none"
                  >
                    +{thousandCount}K
                  </div>
                </div>
              )}
              <Link href="/wall-of-remembrance" className="shrink-0">
                <button className="group bg-transparent hover:bg-white hover:text-[#010B19] text-white border border-white/20 text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 shadow-md min-h-[36px] flex items-center gap-1.5">
                  TRIBUTE
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Desktop: original side-by-side layout */}
          <div className="hidden sm:flex flex-row items-center justify-between gap-6 w-full">
            {/* Left Side: Candle & Stats */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#02050b] shadow-inner">
                <Image
                  src="/images/candle_glow.png"
                  alt="Lit candle"
                  fill
                  className="object-cover scale-105"
                />
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="text-2xl font-black text-white tracking-tight leading-none">
                  {totalCandles.toLocaleString()}
                </div>
                <div className="text-xs lg:text-sm font-bold text-slate-400 tracking-wider mt-1 leading-tight">
                  Candles lit in remembrance
                </div>
                <Link
                  href="/wall-of-remembrance"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1877F2] hover:text-blue-400 transition-colors mt-2 w-fit"
                >
                  <span>Light a candle</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Right Side: Avatars + Button */}
            <div className="flex items-center gap-6 shrink-0">
              {officers.length > 0 && (
                <div className="flex -space-x-3 items-center shrink-0">
                  {officers.slice(0, 3).map((off) => (
                    <div
                      key={off.id}
                      className="relative w-10 h-10 rounded-full border border-[#080F1E] overflow-hidden bg-[#030712] shadow-md shrink-0"
                    >
                      <Image
                        src={off.imageUrl}
                        alt={off.name}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                  ))}
                  <div
                    style={{ width: 40, height: 40, minWidth: 40 }}
                    className="relative z-10 flex items-center justify-center rounded-full border border-[#080F1E] bg-[#1877F2] text-white font-black text-[9px] shadow-md shrink-0 whitespace-nowrap leading-none"
                  >
                    +{thousandCount}K
                  </div>
                </div>
              )}
              <Link href="/wall-of-remembrance" className="shrink-0">
                <button className="group bg-transparent hover:bg-white hover:text-[#010B19] text-white border border-white/10 hover:border-white text-xs lg:text-sm font-black tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer min-h-[44px] flex items-center gap-2">
                  LEAVE A TRIBUTE
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
