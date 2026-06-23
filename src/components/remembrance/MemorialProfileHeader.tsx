"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import CandleOverlay from "@/components/remembrance/CandleOverlay";
import { PAGE_BELOW_HEADER_PT, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
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
}: MemorialProfileHeaderProps) {
  const router = useRouter();
  const displayName = formatName(officer.name);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/remembrance");
  };

  return (
    <header
      className={cn(
        "relative z-20 w-full bg-[#050A14] text-white pb-8 sm:pb-10 border-b border-white/10",
        PAGE_BELOW_HEADER_PT
      )}
    >
      <div className={PAGE_CONTENT_CONTAINER}>
        <button
          type="button"
          onClick={handleBack}
          className="relative z-20 inline-flex items-center gap-2 min-h-[44px] py-2 -ml-1 pl-1 pr-3 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider mb-5 sm:mb-6 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
          Wall of Remembrance
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] xl:grid-cols-[minmax(0,460px)_1fr] gap-8 lg:gap-12 xl:gap-16 items-end">
          {/* Portrait — full frame inside card */}
          <div className="relative w-full max-w-[460px] mx-auto lg:mx-0 aspect-[3/4] max-h-[min(85vw,560px)] lg:max-h-[620px] rounded-2xl overflow-hidden bg-[#0a0f18] shadow-[0_12px_48px_rgba(0,0,0,0.45)]">
            <div
              className="absolute inset-0 will-change-transform"
              style={{ transform: `scale(${portraitScale})` }}
            >
              <Image
                src={officer.image}
                alt={`Portrait of ${displayName}`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover object-[center_18%] sm:object-[center_15%]"
                style={{ filter: `grayscale(${portraitGrayscale}%)` }}
              />
            </div>

            <motion.div
              className="absolute inset-0 bg-amber-400/20 mix-blend-soft-light pointer-events-none"
              animate={{ opacity: warmGlowOpacity }}
              aria-hidden
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050A14]/95 pointer-events-none" />

            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1.5">
              <CandleOverlay
                isLit={isLit}
                isLoading={loading}
                onLight={onLightCandle}
                disabled={isLit || loading}
              />
              {!isLit && !loading && (
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80 pointer-events-none">
                  Tap to light
                </p>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-20 bg-gradient-to-t from-[#050A14] via-[#050A14]/88 to-transparent lg:hidden">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1877F2] mb-1">{officer.role}</p>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight mb-0.5">{displayName}</h1>
              <p className="text-[11px] text-slate-400 uppercase tracking-wide truncate">{officer.force}</p>
            </div>
          </div>

          {/* Meta — desktop beside portrait; mobile below */}
          <div className="pb-1 lg:pb-4">
            <div className="hidden lg:block mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1877F2] mb-2">{officer.role}</p>
              <h1 className="text-3xl xl:text-4xl font-black uppercase tracking-tight leading-tight mb-2">{displayName}</h1>
              <p className="text-sm text-slate-400 uppercase tracking-wide">{officer.force}</p>
              <p className="text-xs text-slate-500 mt-2 tabular-nums uppercase tracking-wider">
                Served {officer.years} · Age {officer.age} · {officer.stats.dateOfLoss}
              </p>
            </div>

            <p className="lg:hidden text-[10px] text-slate-500 mb-4 tabular-nums uppercase tracking-wider">
              {officer.years} · Age {officer.age} · {officer.stats.dateOfLoss}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div
                className={cn(
                  "inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl border transition-colors",
                  isLit
                    ? "bg-amber-500/15 border-amber-400/40 shadow-[0_0_24px_rgba(245,158,11,0.12)]"
                    : "bg-white/5 border-white/10"
                )}
              >
                <Flame className={cn("w-4 h-4", isLit ? "text-amber-400" : "text-slate-500")} />
                <span className={cn("text-lg font-bold tabular-nums", isLit ? "text-amber-100" : "text-white")}>
                  {candleCount.toLocaleString()}
                </span>
                <span className={cn("text-[10px] uppercase tracking-wide", isLit ? "text-amber-200/80" : "text-slate-500")}>
                  candles
                </span>
              </div>
              {tributeCount != null && tributeCount > 0 && (
                <div className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl bg-white/5 border border-white/10 text-[10px] text-slate-500 uppercase tracking-wide">
                  <span className="text-lg font-bold text-white tabular-nums">{tributeCount.toLocaleString()}</span>
                  tributes
                </div>
              )}
            </div>

            <div className="mt-4 sm:mt-5">
              {isLit ? (
                <div className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-100">
                  <Flame className="h-4 w-4 text-amber-400" aria-hidden />
                  You lit a candle
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={onLightCandle}
                  disabled={loading}
                  className="w-full sm:w-auto min-h-[48px] rounded-full bg-[#1877F2] px-8 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_24px_rgba(24,119,242,0.35)] hover:bg-[#1565d8] disabled:opacity-60"
                >
                  <Flame className="mr-2 h-4 w-4" aria-hidden />
                  {loading ? "Lighting…" : "Light a candle"}
                </Button>
              )}
            </div>

            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-sm text-[#1877F2] font-medium"
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
