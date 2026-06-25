"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Flame, MessageCircle, Share2, User, Star, MessageSquare, Heart } from "lucide-react";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";

export type MemorialSectionId = "story" | "timeline" | "tributes" | "candle" | "support";

const SECTIONS: { id: MemorialSectionId; label: string; icon: React.ElementType }[] = [
  { id: "story", label: "Their Story", icon: User },
  { id: "timeline", label: "Service & Career", icon: Star },
  { id: "tributes", label: "Remembered By", icon: MessageSquare },
];

interface MemorialActionBarProps {
  onLightCandle: () => void;
  onLeaveTribute: () => void;
  onShare: () => void;
  isLit: boolean;
  candleLoading: boolean;
}

/** Sticky action row — candle, tribute, share. */
export function MemorialActionBar({
  onLightCandle,
  onLeaveTribute,
  onShare,
  isLit,
  candleLoading,
}: MemorialActionBarProps) {
  return (
    <div className="hidden lg:block sticky top-20 md:top-24 z-40 bg-[#f4f5f7]/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className={`${PAGE_CONTENT_CONTAINER} py-3 sm:py-4`}>
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 max-w-md">
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !activeSection) return;
    const activeTab = containerRef.current.querySelector(`[data-tab-id="${activeSection}"]`);
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1"
      role="tablist"
      aria-label="Memorial sections"
    >
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            data-tab-id={id}
            aria-selected={isActive}
            aria-controls={id}
            onClick={() => onNavigate(id)}
            className={cn(
              "shrink-0 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-[56px] sm:min-w-0 min-h-[48px] sm:min-h-[44px] px-1 sm:px-5 rounded-none sm:rounded-full text-[9px] sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer border-b-2 sm:border-b-0",
              isActive
                ? "text-[#1877F2] border-[#1877F2] sm:bg-white sm:text-[#010B19] sm:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                : "text-slate-500 border-transparent hover:text-slate-800 sm:hover:bg-white/60"
            )}
          >
            <Icon className={cn("w-[18px] h-[18px] sm:w-4 sm:h-4", isActive ? "text-[#1877F2]" : "text-slate-400")} />
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
        "flex flex-col items-center justify-center gap-1.5 min-h-[58px] sm:min-h-[64px] px-2 rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]",
        disabled && "cursor-not-allowed",
        variant === "candle-unlit" && [
          "bg-[#1877F2] text-white border border-[#1877F2]",
          "shadow-sm",
          "hover:bg-[#1565d8] active:scale-[0.98]",
        ],
        variant === "candle-lit" && [
          "bg-[#FFFDF5] text-[#D97706] border border-[#FCD34D]",
          "cursor-default",
        ],
        variant === "default" && [
          "bg-white text-[#010B19] border border-slate-200",
          "hover:border-[#1877F2]/35 active:scale-[0.98]",
          "disabled:opacity-60 disabled:cursor-wait",
        ]
      )}
    >
      {icon}
      <span className="leading-tight text-center">{label}</span>
    </button>
  );
}
