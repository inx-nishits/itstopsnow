"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Flame, MessageCircle, Share2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import CandleOverlay from "@/components/remembrance/CandleOverlay";
import { colourRestorationLabel } from "@/lib/candleGrayscale";
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

interface MemorialVigilHeroProps {
  officer: MemorialOfficer;
  candleCount: number;
  isLit: boolean;
  loading: boolean;
  message: string;
  portraitGrayscale: number;
  portraitScale: number;
  warmGlowOpacity: number;
  onLightCandle: () => void;
  onLeaveTribute: () => void;
  onShare?: () => void;
  onDownloadPdf?: () => void;
  pdfLoading?: boolean;
}

export default function MemorialVigilHero({
  officer,
  candleCount,
  isLit,
  loading,
  message,
  portraitGrayscale,
  portraitScale,
  warmGlowOpacity,
  onLightCandle,
  onLeaveTribute,
  onShare,
  onDownloadPdf,
  pdfLoading,
}: MemorialVigilHeroProps) {
  const restorationHint = colourRestorationLabel(candleCount);
  const displayName = formatName(officer.name);

  const portraitLayer = (
    <>
      <div className="absolute inset-0 origin-center" style={{ transform: `scale(${portraitScale})` }}>
        <Image
          src={officer.image}
          alt={`Portrait of ${displayName}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top"
          style={{ filter: `grayscale(${portraitGrayscale}%)` }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050A14]/85 to-transparent pointer-events-none" />
      <motion.div
        className="absolute inset-0 bg-amber-500/15 mix-blend-soft-light pointer-events-none"
        animate={{ opacity: warmGlowOpacity }}
        aria-hidden
      />
    </>
  );

  return (
    <header className="relative w-full bg-[#050A14]">
      {/* ——— Mobile: app-style portrait + bottom sheet ——— */}
      <div className="lg:hidden flex flex-col">
        <div className="relative h-[46dvh] min-h-[260px] max-h-[400px] overflow-hidden">
          {portraitLayer}

          <Link
            href="/remembrance"
            className="absolute top-[max(4.5rem,env(safe-area-inset-top)+3.5rem)] left-4 z-30 inline-flex items-center gap-2 min-h-[44px] px-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-slate-200 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <span className="absolute top-[max(4.5rem,env(safe-area-inset-top)+3.5rem)] right-4 z-20 text-[10px] uppercase tracking-wider text-slate-300 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {restorationHint}
          </span>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
            <CandleOverlay isLit={isLit} isLoading={loading} onLight={onLightCandle} disabled={isLit} />
            {!isLit && (
              <p className="text-[10px] text-white/70 uppercase tracking-[0.18em]">Tap to light</p>
            )}
          </div>
        </div>

        <div className="relative z-10 -mt-5 rounded-t-[1.75rem] bg-[#050A14] border-t border-white/10 px-5 pt-5 pb-6 shadow-[0_-12px_40px_rgba(0,0,0,0.4)]">
          <div className="flex justify-center mb-4" aria-hidden>
            <span className="block w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1877F2] bg-[#1877F2]/10 px-3 py-1 rounded-full border border-[#1877F2]/20">
              {officer.role}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{officer.force}</span>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight uppercase mb-3 leading-tight">
            {displayName}
          </h1>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500 uppercase tracking-wider mb-4">
            <span>Served {officer.years}</span>
            <span aria-hidden>·</span>
            <span>Age {officer.age}</span>
            <span aria-hidden>·</span>
            <span>{officer.stats.dateOfLoss}</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 mb-4">
            <Flame className={cn("w-5 h-5 shrink-0", isLit ? "text-amber-400" : "text-slate-600")} />
            <div className="min-w-0">
              <p className="text-lg font-bold text-white tabular-nums">{candleCount.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">Candles lit on this memorial</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onLightCandle}
              disabled={isLit || loading}
              className={cn(
                "min-h-[50px] rounded-xl text-xs font-bold uppercase tracking-wider",
                isLit
                  ? "bg-white/5 text-slate-500 border border-white/10"
                  : "bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
              )}
            >
              {loading ? "Lighting…" : isLit ? "Candle lit" : "Light candle"}
            </Button>
            <Button
              onClick={onLeaveTribute}
              variant="outline"
              className="min-h-[50px] rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10 text-xs uppercase tracking-wider"
            >
              Leave tribute
            </Button>
          </div>

          <AnimatePresence>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-sm text-[#1877F2] font-medium text-center"
                role="status"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ——— Desktop: cinematic split ——— */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] xl:grid-cols-[minmax(0,1fr)_480px] min-h-[min(85vh,780px)]">
        <div className="relative min-h-[520px] overflow-hidden">
          {portraitLayer}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            <CandleOverlay isLit={isLit} isLoading={loading} onLight={onLightCandle} disabled={isLit} />
            {!isLit && (
              <p className="text-[10px] text-white/70 uppercase tracking-[0.2em]">Click to light</p>
            )}
          </div>
          <div className="absolute top-28 right-8 z-20">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              {restorationHint}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center px-10 xl:px-14 py-12 border-l border-white/10 bg-[#050A14]">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/remembrance" className="hover:text-white transition-colors">Wall</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300 truncate">{displayName}</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1877F2] bg-[#1877F2]/10 px-3 py-1 rounded-full border border-[#1877F2]/20">
              {officer.role}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{officer.force}</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight uppercase mb-4 leading-[1.05]">
            {displayName}
          </h1>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 uppercase tracking-wider mb-6">
            <span>Served {officer.years}</span>
            <span>Age {officer.age}</span>
            <span>{officer.stats.dateOfLoss}</span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-8">
            <Flame className={cn("w-6 h-6", isLit ? "text-amber-400" : "text-slate-600")} />
            <div>
              <p className="text-2xl font-bold text-white tabular-nums">{candleCount.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-600">Candles lit</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={onLightCandle}
              disabled={isLit || loading}
              className={cn(
                "min-h-[52px] text-xs font-bold uppercase tracking-widest",
                isLit ? "bg-white/5 text-slate-500 border border-white/10" : "bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
              )}
            >
              {loading ? "Lighting…" : isLit ? "Candle lit" : "Light a candle"}
            </Button>
            <Button
              onClick={onLeaveTribute}
              variant="outline"
              className="min-h-[52px] border-white/20 bg-transparent text-white hover:bg-white/5 text-xs uppercase tracking-widest"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Leave tribute
            </Button>
            {onShare && (
              <Button
                onClick={onShare}
                variant="outline"
                className="min-h-[48px] border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-xs uppercase tracking-widest"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share memorial
              </Button>
            )}
            {onDownloadPdf && (
              <Button
                onClick={onDownloadPdf}
                disabled={pdfLoading}
                variant="ghost"
                className="min-h-[44px] text-slate-500 hover:text-white text-xs uppercase tracking-widest"
              >
                <Download className="w-4 h-4 mr-2" />
                {pdfLoading ? "Generating PDF…" : "Book of condolence PDF"}
              </Button>
            )}
          </div>

          <AnimatePresence>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
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
    </header>
  );
}
