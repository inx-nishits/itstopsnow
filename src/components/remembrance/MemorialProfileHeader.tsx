"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Flame, Calendar, Shield, MessageCircle, Share2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import CandleOverlay from "@/components/remembrance/CandleOverlay";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";

function formatName(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}

export interface MemorialOfficer {
  name: string;
  role: string;
  force: string;
  years: string;
  age: number;
  image: string;
  stats: { dateOfLoss: string };
}

interface MemorialProfileHeaderProps {
  officer: MemorialOfficer;
  candleCount: number;
  tributeCount?: number;
  isLit: boolean;
  loading: boolean;
  message: string;
  portraitGrayscale: number;
  portraitScale: number;
  warmGlowOpacity: number;
  onLightCandle: () => void;
  onLeaveTribute: () => void;
  onShare: () => void;
}

/** Compact profile header — dark site theme, full portrait frame. */
export default function MemorialProfileHeader({
  officer,
  candleCount,
  tributeCount,
  isLit,
  loading,
  message,
  portraitGrayscale,
  portraitScale,
  warmGlowOpacity,
  onLightCandle,
  onLeaveTribute,
  onShare,
}: MemorialProfileHeaderProps) {
  const router = useRouter();
  const displayName = formatName(officer.name);
  const firstName = officer.name.split(' ')[0];

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/wall-of-remembrance");
  };

  return (
    <header
      className="relative z-20 w-full text-white pb-6 sm:pb-10 pt-24 sm:pt-28 md:pt-32 border-b border-white/10 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/uk_police_memorial_bg.png"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[#050A14]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/90 to-transparent" />
      </div>

      <div className={cn(PAGE_CONTENT_CONTAINER, "relative z-10")}>
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <button
            type="button"
            onClick={handleBack}
            className="relative z-20 inline-flex items-center gap-2 min-h-[44px] py-2 -ml-1 pl-1 pr-3 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
            Wall of Remembrance
          </button>
          
          <button
            type="button"
            onClick={onShare}
            className="relative z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2] shadow-sm"
            aria-label="Share memorial"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,360px)_1fr] xl:grid-cols-[minmax(0,400px)_1fr] gap-6 lg:gap-10 xl:gap-12 lg:items-end">

          {/* MOBILE TOP BANNER LAYOUT (Portrait + Meta Side-by-Side) */}
          <div className="flex gap-4 sm:gap-6 lg:hidden mb-2">
            {/* Mobile Portrait */}
            <div className="relative w-[160px] sm:w-[200px] shrink-0 aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0f18] shadow-lg border border-white/10">
              <div
                className="absolute inset-0 will-change-transform"
                style={{ transform: `scale(${portraitScale})` }}
              >
                <Image
                  src={officer.image}
                  alt={`Portrait of ${displayName}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 160px, 200px"
                  className="object-cover object-[center_18%] sm:object-[center_15%]"
                  style={{ filter: `grayscale(${portraitGrayscale}%)` }}
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-amber-400/20 mix-blend-soft-light pointer-events-none"
                animate={{ opacity: warmGlowOpacity }}
                aria-hidden
              />
              <div className="absolute bottom-1 right-1 z-20 flex flex-col items-center gap-1.5 scale-[0.65] sm:scale-75 origin-bottom-right">
                <CandleOverlay
                  isLit={isLit}
                  isLoading={loading}
                  onLight={onLightCandle}
                  disabled={isLit || loading}
                />
              </div>
            </div>

            {/* Mobile Meta Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">IN MEMORY OF</p>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-[1.1] mb-1 break-words">
                <span className="block text-sm sm:text-base text-slate-200 mb-0.5">{officer.role}</span>
                {displayName}
              </h1>
              <p className="text-xs text-[#1877F2] font-bold uppercase tracking-widest truncate mb-4">{officer.force}</p>

              <div className="flex flex-col gap-2 text-xs sm:text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="truncate">17 May 1987 - {officer.stats.dateOfLoss}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="truncate">{officer.age} Years Old</span>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP PORTRAIT */}
          <div className="hidden lg:block relative w-full max-w-[360px] mx-auto lg:mx-0 aspect-[3/4] max-h-[480px] rounded-xl overflow-hidden bg-[#0a0f18] shadow-[0_12px_48px_rgba(0,0,0,0.45)] border border-white/10">
            <div
              className="absolute inset-0 will-change-transform"
              style={{ transform: `scale(${portraitScale})` }}
            >
              <Image
                src={officer.image}
                alt={`Portrait of ${displayName}`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 400px"
                className="object-cover object-[center_18%] sm:object-[center_15%]"
                style={{ filter: `grayscale(${portraitGrayscale}%)` }}
              />
            </div>

            <motion.div
              className="absolute inset-0 bg-amber-400/20 mix-blend-soft-light pointer-events-none"
              animate={{ opacity: warmGlowOpacity }}
              aria-hidden
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#050A14]/90 pointer-events-none" />

            <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center gap-1.5">
              <CandleOverlay
                isLit={isLit}
                isLoading={loading}
                onLight={onLightCandle}
                disabled={isLit || loading}
              />
            </div>
          </div>

          {/* Meta + Family Quote + Interactive Button */}
          <div className="pb-1 lg:pb-4 lg:pl-4 xl:pl-8 flex flex-col gap-6">
            <div className="hidden lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">IN MEMORY OF</p>
              <h1 className="text-[40px] xl:text-[56px] font-black uppercase tracking-tight leading-[1.05] mb-5">
                <span className="block text-2xl xl:text-[32px] text-slate-200 mb-2">{officer.role}</span>
                {displayName}
              </h1>
              <p className="text-sm font-bold text-[#1877F2] uppercase tracking-[0.15em] mb-8">{officer.force}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-slate-500" />
                  <span>17 May 1987 - {officer.stats.dateOfLoss}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-slate-500" />
                  <span>{officer.age} Years Old</span>
                </div>
              </div>
            </div>

            {/* Interactive Candle Button */}
            <button
              onClick={onLightCandle}
              disabled={isLit || loading}
              className={cn(
                "w-full lg:max-w-md flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-300 text-left group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]",
                isLit
                  ? "bg-[#1877F2]/10 border-[#1877F2]/30 shadow-[0_0_15px_rgba(24,119,242,0.15)] cursor-default"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-[0.99] cursor-pointer"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-16 pointer-events-none scale-90 sm:scale-100 origin-center flex items-end justify-center">
                  <CandleOverlay isLit={isLit} isLoading={loading} onLight={() => { }} disabled={true} interactive={false} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 transition-colors">
                    {isLit ? "Candle Lit" : "Light a Candle"}
                  </h3>
                  <p className="text-xs text-slate-400 transition-colors">
                    {isLit ? `Thank you for remembering ${firstName}` : "Leave a tribute and show your support"}
                  </p>
                </div>
              </div>
              {!isLit && (
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              )}
            </button>

            {/* Family Quote */}
            <div className="relative pl-8 lg:pl-10 mt-2">
              <span className="absolute left-0 top-[-8px] text-[#24344d] text-5xl lg:text-6xl font-serif leading-none select-none" aria-hidden>
                “
              </span>
              <blockquote className="text-[13px] sm:text-[15px] lg:text-lg italic text-slate-300 leading-relaxed max-w-2xl relative z-10">
                He dedicated his life to helping others. He was the first person people called in a crisis, yet struggled silently with his own pain.
                <footer className="mt-3 text-xs sm:text-xs font-bold text-slate-500 not-italic uppercase tracking-widest">— His Family</footer>
              </blockquote>
            </div>

            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-sm text-[#1877F2] font-medium"
                  role="status"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

