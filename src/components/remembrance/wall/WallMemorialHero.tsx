"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import {
  PAGE_HERO_CONTAINER,
  PAGE_HERO_EYEBROW,
  PAGE_HERO_SECTION_PT,
  PAGE_HERO_TITLE_CAMPAIGN,
} from "@/components/layout/PageHero";

interface WallMemorialHeroProps {
  totalCandles: number;
  officersRemembered: number;
}

/** Cinematic dark hero — aligned with site-wide inner page hero tokens */
export default function WallMemorialHero({ totalCandles, officersRemembered }: WallMemorialHeroProps) {
  return (
    <section
      className={`relative w-full min-h-[min(52dvh,420px)] sm:min-h-[58dvh] lg:min-h-[65vh] flex flex-col justify-end bg-[#050A14] overflow-hidden border-b border-white/5 ${PAGE_HERO_SECTION_PT}`}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/images/uk_police_memorial_bg.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[15%] via-[#050A14]/75 via-[55%] to-[#050A14]/30 to-[90%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/40 to-transparent" />
      </div>

      <div className={`${PAGE_HERO_CONTAINER} pb-10 sm:pb-14 lg:pb-20`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h2 className={PAGE_HERO_EYEBROW}>
            <Flame className="w-4 h-4 shrink-0" aria-hidden />
            Wall of Remembrance
          </h2>

          <h1
            id="wall-heading"
            className={`${PAGE_HERO_TITLE_CAMPAIGN} mb-4 sm:mb-6`}
          >
            <span className="text-white block">Every name</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400 block">
              mattered.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-8">
            Honour those we lost. Light a candle on their memorial and watch their portrait return to
            colour — one light at a time.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm px-5 py-3 min-w-[120px]">
              <p className="text-2xl sm:text-3xl font-black text-white tabular-nums">{officersRemembered}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Lives remembered</p>
            </div>
            <div className="rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/25 backdrop-blur-sm px-5 py-3 min-w-[120px]">
              <p className="text-2xl sm:text-3xl font-black text-[#1877F2] tabular-nums">
                {totalCandles.toLocaleString()}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" aria-hidden />
                Candles lit
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
