"use client";

import { Flame, MessageCircle, Share2 } from "lucide-react";

interface MemorialMobileDockProps {
  isLit: boolean;
  loading: boolean;
  onLightCandle: () => void;
  onLeaveTribute: () => void;
  onShare: () => void;
}

export default function MemorialMobileDock({
  isLit,
  loading,
  onLightCandle,
  onLeaveTribute,
  onShare,
}: MemorialMobileDockProps) {
  return (
    <div
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-[#050A14]/96 backdrop-blur-2xl border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      role="toolbar"
      aria-label="Memorial actions"
    >
      <div className="flex items-stretch gap-2 px-2 pt-2">
        <button
          type="button"
          onClick={onLightCandle}
          disabled={isLit || loading}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[48px] rounded-xl text-xs font-semibold transition-all active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2] ${
            isLit
              ? "bg-[#1f2937] text-slate-300 border border-white/10"
              : "bg-[#1f2937] text-white border border-white/10 shadow-sm"
          }`}
        >
          <Flame className={`w-4 h-4 ${isLit ? "text-amber-400" : "text-slate-400"}`} />
          {loading ? "Lighting…" : isLit ? "Candle lit" : "Light candle"}
        </button>

        <button
          type="button"
          onClick={onLeaveTribute}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[48px] rounded-xl bg-[#1f2937] border border-white/10 text-slate-300 text-xs font-semibold active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2]"
        >
          <MessageCircle className="w-4 h-4 text-slate-400" />
          Tribute
        </button>

        <button
          type="button"
          onClick={onShare}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[48px] rounded-xl bg-[#1f2937] border border-white/10 text-slate-300 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2]"
        >
          <Share2 className="w-4 h-4 text-slate-400" />
          Share
        </button>
      </div>
    </div>
  );
}
