"use client";

import CandleOverlay from "@/components/remembrance/CandleOverlay";
import { useCandleRitual } from "@/components/remembrance/useCandleRitual";
import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";

interface CandleExperienceProps {
  memorialId: string;
  initialCount: number;
  onLit?: () => void;
}

/**
 * Standalone candle card — for embedded contexts.
 * Memorial detail uses MemorialVigilHero + useCandleRitual directly.
 */
export default function CandleExperience({ memorialId, initialCount, onLit }: CandleExperienceProps) {
  const { candleCount, isLit, loading, message, lightCandle } = useCandleRitual({
    memorialId,
    initialCount,
  });

  const handleLight = async () => {
    await lightCandle();
    onLit?.();
  };

  return (
    <div className="relative p-8 rounded-2xl bg-[#010B19] border border-white/10 flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center mb-6 relative z-10">
        <h3 className="font-serif text-2xl text-white mb-2">Light a Candle</h3>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          Take a moment to pause and remember their service.
        </p>
      </div>

      <CandleOverlay isLit={isLit} isLoading={loading} onLight={handleLight} disabled={isLit} />

      <div className="mt-6 text-center relative z-10">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Flame className={`w-4 h-4 ${isLit ? "text-amber-500" : "text-slate-500"}`} />
          <span className="text-xl font-serif text-white tabular-nums">{candleCount.toLocaleString()}</span>
        </div>

        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-amber-500/90 font-medium max-w-xs mx-auto"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
