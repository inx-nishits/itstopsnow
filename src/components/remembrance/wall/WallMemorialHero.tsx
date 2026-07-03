"use client";

import { motion } from "framer-motion";
import { Users, CalendarDays, Shield, Heart } from "lucide-react";
import CandleOverlay from "@/components/remembrance/CandleOverlay";
import {
  PAGE_HERO_CONTAINER,
  PAGE_HERO_EYEBROW,
  PAGE_HERO_SECTION_PT,
  PAGE_HERO_TITLE_CAMPAIGN,
} from "@/components/layout/PageHero";

interface WallMemorialHeroProps {
  totalCandles: number;
  officersRemembered: number;
  forcesRepresented?: number;
  monthlyAverage?: number;
  notForgottenPercentage?: number;
  onLightCandleClick?: () => void;
}

/** Cinematic dark hero — aligned with site-wide inner page hero tokens */
export default function WallMemorialHero({
  totalCandles,
  officersRemembered,
  forcesRepresented,
  monthlyAverage,
  notForgottenPercentage,
  onLightCandleClick
}: WallMemorialHeroProps) {
  return (
    <section
      className={`relative w-full flex flex-col justify-end bg-[#050A14] overflow-hidden border-b border-white/5 ${PAGE_HERO_SECTION_PT}`}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/images/wall_memorial_bg_v6.png"
          alt="Wall of Remembrance Background"
          aria-hidden
          className="w-full h-full object-cover object-[85%_center] md:object-[right_15%] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050A14]/95 sm:from-[#050A14]/80 via-[#050A14]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/40 to-transparent" />
      </div>

      <div className={`${PAGE_HERO_CONTAINER} pt-4 pb-6 sm:pb-8 lg:pb-10 relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="pr-[25%] sm:pr-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-1">
              Wall of Remembrance
            </h1>
  
            <h2 className="text-xs sm:text-sm lg:text-base font-bold text-[#1877F2] uppercase tracking-wide mb-3 sm:mb-4">
              Behind every name was a life, a family and a story.
            </h2>
  
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-xl">
              We remember police officers and staff who have died by suicide. We honour their service, their sacrifice and their commitment. We will not forget.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="shrink-0 -mt-2">
              <CandleOverlay isLit={true} onLight={() => {}} disabled={true} />
            </div>
            <div>
              <div className="flex items-baseline gap-2 sm:gap-3 mb-0.5">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tabular-nums tracking-tight">
                  {totalCandles.toLocaleString()}
                </span>
                <span className="text-xs sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  Candles lit in remembrance
                </span>
              </div>
              <button
                type="button"
                onClick={onLightCandleClick}
                className="text-xs sm:text-sm font-semibold text-[#1877F2] hover:text-blue-400 flex items-center gap-1.5 group transition-colors"
              >
                Light a candle <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
              </button>
            </div>
          </div>

          <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2 mt-2">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#1877F2]" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-white tabular-nums leading-none mb-0.5">
                  {officersRemembered.toLocaleString()}
                </span>
                <span className="text-xs sm:text-xs font-bold uppercase tracking-widest text-slate-400 leading-tight">
                  Officers
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <CalendarDays className="w-6 h-6 sm:w-8 sm:h-8 text-[#1877F2]" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-white tabular-nums leading-none mb-0.5">
                  {monthlyAverage?.toLocaleString() || 124}
                </span>
                <span className="text-xs sm:text-xs font-bold uppercase tracking-widest text-slate-400 leading-tight">
                  Monthly Avg
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-[#1877F2]" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-white tabular-nums leading-none mb-0.5">
                  {forcesRepresented?.toLocaleString() || 12}
                </span>
                <span className="text-xs sm:text-xs font-bold uppercase tracking-widest text-slate-400 leading-tight">
                  Forces
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#1877F2]" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-white tabular-nums leading-none mb-0.5">
                  {notForgottenPercentage || 92}%
                </span>
                <span className="text-xs sm:text-xs font-bold uppercase tracking-widest text-slate-400 leading-tight">
                  Not Forgotten
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
