"use client";

import { Flame, MessageCircle, Share2, Download } from "lucide-react";

interface MemorialMobileDockProps {
  isLit: boolean;
  loading: boolean;
  onLightCandle: () => void;
  onLeaveTribute: () => void;
  onShare: () => void;
  onDownloadPdf?: () => void;
  pdfLoading?: boolean;
}

export default function MemorialMobileDock({
  isLit,
  loading,
  onLightCandle,
  onLeaveTribute,
  onShare,
  onDownloadPdf,
  pdfLoading,
}: MemorialMobileDockProps) {
  return (
    <div
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-[#050A14]/96 backdrop-blur-2xl border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      role="toolbar"
      aria-label="Memorial actions"
    >
      <div className="flex items-stretch gap-2 px-3 pt-2.5">
        <button
          type="button"
          onClick={onLightCandle}
          disabled={isLit || loading}
          className={`flex-1 flex flex-col items-center justify-center gap-1 min-h-[56px] rounded-2xl text-[11px] font-semibold transition-all active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2] ${
            isLit
              ? "bg-white/5 text-slate-400 border border-white/10"
              : "bg-[#1877F2] text-white shadow-[0_4px_16px_rgba(24,119,242,0.35)]"
          }`}
        >
          <Flame className={`w-5 h-5 ${isLit ? "text-amber-400" : ""}`} />
          {loading ? "Lighting…" : isLit ? "Candle lit" : "Light candle"}
        </button>

        <button
          type="button"
          onClick={onLeaveTribute}
          className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[56px] rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-[11px] font-semibold active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2]"
        >
          <MessageCircle className="w-5 h-5 text-slate-400" />
          Tribute
        </button>

        <button
          type="button"
          onClick={onShare}
          className="flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[56px] rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-[11px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2]"
        >
          <Share2 className="w-5 h-5 text-slate-400" />
          Share
        </button>

        {onDownloadPdf && (
          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={pdfLoading}
            className="flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[56px] rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-[11px] font-semibold disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1877F2]"
          >
            <Download className="w-5 h-5 text-slate-400" />
            PDF
          </button>
        )}
      </div>
    </div>
  );
}
