"use client";

import type { ReactNode } from "react";
import { Flame, MessageCircle, Share2, Download } from "lucide-react";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";

export type MemorialSectionId = "story" | "gallery" | "timeline" | "tributes";

const SECTIONS: { id: MemorialSectionId; label: string }[] = [
  { id: "story", label: "Story" },
  { id: "gallery", label: "Photos" },
  { id: "timeline", label: "Timeline" },
  { id: "tributes", label: "Tributes" },
];

interface MemorialActionBarProps {
  onLightCandle: () => void;
  onLeaveTribute: () => void;
  onShare: () => void;
  onDownloadPdf?: () => void;
  pdfLoading?: boolean;
  isLit: boolean;
  candleLoading: boolean;
}

/** Sticky action row — candle, tribute, share, PDF. */
export function MemorialActionBar({
  onLightCandle,
  onLeaveTribute,
  onShare,
  onDownloadPdf,
  pdfLoading,
  isLit,
  candleLoading,
}: MemorialActionBarProps) {
  return (
    <div className="sticky top-20 md:top-24 z-40 bg-[#f4f5f7]/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className={`${PAGE_CONTENT_CONTAINER} py-3 sm:py-4`}>
        <div className={cn("grid gap-2 sm:gap-2.5", onDownloadPdf ? "grid-cols-4" : "grid-cols-3")}>
          <ActionButton
            variant={isLit ? "candle-lit" : "candle-unlit"}
            icon={
              <Flame
                className={cn(
                  "w-[18px] h-[18px]",
                  isLit ? "text-amber-500" : "text-white",
                  candleLoading && "animate-pulse"
                )}
              />
            }
            label={candleLoading ? "Lighting…" : isLit ? "Candle lit" : "Light candle"}
            onClick={onLightCandle}
            disabled={isLit || candleLoading}
          />
          <ActionButton
            variant="default"
            icon={<MessageCircle className="w-[18px] h-[18px] text-[#1877F2]" />}
            label="Tribute"
            onClick={onLeaveTribute}
          />
          <ActionButton
            variant="default"
            icon={<Share2 className="w-[18px] h-[18px] text-[#1877F2]" />}
            label="Share"
            onClick={onShare}
          />
          {onDownloadPdf ? (
            <ActionButton
              variant="default"
              icon={<Download className="w-[18px] h-[18px] text-[#1877F2]" />}
              label={pdfLoading ? "…" : "PDF"}
              onClick={onDownloadPdf}
              disabled={pdfLoading}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface MemorialSectionTabsProps {
  activeSection: MemorialSectionId;
  onNavigate: (id: MemorialSectionId) => void;
  hasTimeline?: boolean;
}

/** Section tabs — lives inside the content column, sticky while scrolling. */
export function MemorialSectionTabs({
  activeSection,
  onNavigate,
  hasTimeline = true,
}: MemorialSectionTabsProps) {
  const sections = hasTimeline ? SECTIONS : SECTIONS.filter((s) => s.id !== "timeline");

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1"
      role="tablist"
      aria-label="Memorial sections"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={id}
            onClick={() => onNavigate(id)}
            className={cn(
              "shrink-0 min-h-[40px] px-4 sm:px-5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-[#1877F2] text-white shadow-[0_2px_8px_rgba(24,119,242,0.35)]"
                : "bg-white text-slate-600 border border-slate-200 hover:border-[#1877F2]/40 hover:text-[#1877F2] shadow-sm"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

type ActionVariant = "candle-unlit" | "candle-lit" | "default";

function ActionButton({
  icon,
  label,
  onClick,
  disabled,
  variant,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant: ActionVariant;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center gap-1 min-h-[58px] sm:min-h-[62px] px-2 rounded-xl text-[10px] sm:text-[11px] font-bold uppercase tracking-wide transition-all cursor-pointer",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]",
        disabled && "cursor-not-allowed",
        variant === "candle-unlit" && [
          "bg-[#1877F2] text-white border border-[#1877F2]",
          "shadow-[0_4px_16px_rgba(24,119,242,0.4)]",
          "hover:bg-[#1565d8] active:scale-[0.98]",
        ],
        variant === "candle-lit" && [
          "bg-amber-50 text-amber-800 border-2 border-amber-400/70",
          "shadow-[0_4px_16px_rgba(245,158,11,0.25)]",
          "cursor-default",
        ],
        variant === "default" && [
          "bg-white text-[#010B19] border border-slate-200",
          "shadow-sm hover:shadow-md hover:border-[#1877F2]/35 active:scale-[0.98]",
          "disabled:opacity-60 disabled:cursor-wait",
        ]
      )}
    >
      {icon}
      <span className="leading-tight text-center">{label}</span>
    </button>
  );
}
