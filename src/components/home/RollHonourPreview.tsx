"use client";

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import SectionReveal from "@/components/home/SectionReveal";
import MemorialWallTile from "@/components/remembrance/wall/MemorialWallTile";
import type { RollHonourPreview as RollOfficer } from "@/lib/homepage/types";

interface RollHonourPreviewProps {
  officers: RollOfficer[];
}

export default function RollHonourPreviewSection({ officers }: RollHonourPreviewProps) {
  if (!officers.length) return null;

  return (
    <section
      className="relative w-full bg-[#030712] text-white overflow-hidden"
      aria-labelledby="roll-honour-heading"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="relative w-full max-w-[1600px] mx-auto px-6 lg:px-16 py-12 sm:py-14 lg:py-20">
        <SectionReveal delay={0.06}>
          <div className="lg:grid lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-x-10 xl:gap-x-14 lg:items-end mb-6 sm:mb-8">
            <header className="mb-8 lg:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-[#1877F2]" aria-hidden />
                <p className="text-xs font-bold text-[#1877F2] tracking-[0.25em] uppercase">
                  Roll of Honour
                </p>
              </div>
              <h3
                id="roll-honour-heading"
                className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight mb-4"
              >
                Every name mattered.{" "}
                <span className="text-slate-500 font-normal">Every life remembered.</span>
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                Light a candle. Watch their portrait come alive in colour. Join those who refuse to
                let our fallen officers be forgotten.
              </p>
              <Link
                href="/remembrance"
                className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-[#1877F2] hover:text-white transition-colors min-h-[44px]"
              >
                View Wall of Remembrance
                <ArrowRight className="w-4 h-4" />
              </Link>
            </header>

            <div
              className="-mx-6 sm:mx-0 grid grid-cols-3 sm:grid-cols-6 gap-[2px] overflow-hidden"
              role="list"
              aria-label="Officers on the Roll of Honour"
            >
              {officers.map((officer) => (
                <div key={officer.id} role="listitem">
                  <MemorialWallTile
                    id={officer.id}
                    name={officer.name}
                    imageUrl={officer.imageUrl}
                    candleCount={officer.candleCount}
                    force={officer.force}
                    years={officer.years}
                  />
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/remembrance"
            className="lg:hidden flex items-center justify-center gap-2 w-full min-h-[52px] mt-6 rounded-2xl bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-sm font-semibold transition-colors"
          >
            View Wall of Remembrance
            <ArrowRight className="w-4 h-4" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
