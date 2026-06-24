"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Flame, Calendar, Shield, MessageCircle, Share2 } from "lucide-react";
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

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/wall-of-remembrance");
  };

  return (
    <header
      className="relative z-20 w-full text-white pb-4 sm:pb-8 pt-24 sm:pt-28 md:pt-32 border-b border-white/10 overflow-hidden"
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
        <button
          type="button"
          onClick={handleBack}
          className="relative z-20 inline-flex items-center gap-2 min-h-[44px] py-2 -ml-1 pl-1 pr-3 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-6 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
          Wall of Remembrance
        </button>        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,360px)_1fr] xl:grid-cols-[minmax(0,400px)_1fr] gap-2 lg:gap-10 xl:gap-12 lg:items-end">

          {/* MOBILE TOP BANNER LAYOUT (Portrait + Meta Side-by-Side) */}
          <div className="flex gap-4 sm:gap-6 lg:hidden mb-2">
            {/* Mobile Portrait */}
            <div className="relative w-[110px] sm:w-[150px] shrink-0 aspect-[4/4.5] sm:aspect-square rounded-xl overflow-hidden bg-[#0a0f18] shadow-lg border border-white/10">
              <div
                className="absolute inset-0 will-change-transform"
                style={{ transform: `scale(${portraitScale})` }}
              >
                <Image
                  src={officer.image}
                  alt={`Portrait of ${displayName}`}
                  fill
                  priority
                  sizes="150px"
                  className="object-cover object-[center_18%] sm:object-[center_15%]"
                  style={{ filter: `grayscale(${portraitGrayscale}%)` }}
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-amber-400/20 mix-blend-soft-light pointer-events-none"
                animate={{ opacity: warmGlowOpacity }}
                aria-hidden
              />
              <div className="absolute bottom-1 right-1 z-20 flex flex-col items-center gap-1.5 scale-[0.65] origin-bottom-right">
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
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">IN MEMORY OF</p>
              <h1 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-tight mb-1 break-words">
                <span className="block text-sm sm:text-base text-slate-200 mb-0.5">{officer.role}</span>
                {displayName}
              </h1>
              <p className="text-[10px] sm:text-[11px] text-[#1877F2] font-bold uppercase tracking-widest truncate mb-3">{officer.force}</p>

              <div className="flex flex-col gap-1.5 text-[10px] sm:text-[11px] text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">17 May 1987 - {officer.stats.dateOfLoss}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{officer.age} Years Old</span>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP PORTRAIT */}
          <div className="hidden lg:block relative w-full max-w-[360px] mx-auto lg:mx-0 aspect-square max-h-[360px] lg:max-h-[400px] rounded-xl overflow-hidden bg-[#0a0f18] shadow-[0_12px_48px_rgba(0,0,0,0.45)] border border-white/10">
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

          {/* Meta + Family Quote + Desktop CTAs */}
          <div className="pb-1 lg:pb-4 lg:pl-4 xl:pl-8">
            <div className="hidden lg:block mb-8">
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

            {/* Family Quote */}
            <blockquote className="text-[11px] sm:text-sm lg:text-lg xl:text-xl italic text-slate-300 leading-relaxed max-w-2xl">
              "He dedicated his life to helping others. He was the first person people called in a crisis, yet struggled silently with his own pain."
              <footer className="mt-2 lg:mt-4 text-[9px] sm:text-xs lg:text-sm font-bold text-slate-500 not-italic uppercase tracking-widest">— His Family</footer>
            </blockquote>

            {/* Desktop Action Buttons (Hidden on Mobile) */}
            <div className="hidden lg:grid mt-6 grid-cols-4 gap-3 max-w-[460px]">
              <button
                type="button"
                onClick={onLightCandle}
                disabled={isLit || loading}
                className={cn(
                  "col-span-2 flex flex-col items-center justify-center gap-1.5 min-h-[52px] px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]",
                  isLit
                    ? "bg-[#FFFDF5] text-[#D97706] border border-[#FCD34D] cursor-default shadow-sm"
                    : "bg-[#1877F2] hover:bg-[#1565d8] text-white border border-[#1877F2] shadow-[0_4px_20px_rgba(24,119,242,0.3)] active:scale-[0.98]",
                  (isLit || loading) && "cursor-not-allowed"
                )}
              >
                <Flame className={cn("w-5 h-5", isLit ? "text-[#F59E0B]" : "text-white", loading && "animate-pulse")} />
                {loading ? "Lighting…" : isLit ? "Candle lit" : "Light candle"}
              </button>

              <button
                type="button"
                onClick={onLeaveTribute}
                className="col-span-1 flex flex-col items-center justify-center gap-1.5 min-h-[52px] px-2 rounded-xl bg-white border border-slate-200 text-[#010B19] text-[9px] font-bold uppercase tracking-widest hover:border-[#1877F2]/35 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-[18px] h-[18px] text-[#1877F2]" />
                Tribute
              </button>

              <button
                type="button"
                onClick={onShare}
                className="col-span-1 flex flex-col items-center justify-center gap-1.5 min-h-[52px] px-2 rounded-xl bg-white border border-slate-200 text-[#010B19] text-[9px] font-bold uppercase tracking-widest hover:border-[#1877F2]/35 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
              >
                <Share2 className="w-[18px] h-[18px] text-[#1877F2]" />
                Share
              </button>
            </div>

            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-sm text-[#1877F2] font-medium"
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
