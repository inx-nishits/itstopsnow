"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Panoramic candle memorial at Westminster — fills full banner width;
 * officer, candles, and Parliament directly support remembrance + campaign.
 */
const HERO_IMAGE = "/Banner-Image.png";
const HERO_IMAGE_ALT =
  "Police officer standing before a candle memorial outside the Palace of Westminster";

/** Mobile crop — same memorial asset; officer, candles, and Westminster skyline */
const MOBILE_HERO_OBJECT_POSITION = "object-[58%_76%]";

const MARQUEE_ITEMS = [
  "DIGNITY",
  "ACCOUNTABILITY",
  "REFORM",
  "REMEMBRANCE",
  "VOICES",
  "TRUTH",
  "IT STOPS NOW",
] as const;

const HERO_PRIMARY_CTA_LABEL = "Get Involved";

/** Shared hero copy — desktop and mobile must match */
const HERO_EYEBROW = "Campaign for change";
const HERO_DESCRIPTION =
  "Championing officers and families. Demanding dignity, accountability, and an end to a system that treats people as expendable.";


const ease = [0.22, 1, 0.36, 1] as const;

const HEADER_OFFSET = "pt-[max(5rem,env(safe-area-inset-top)+4rem)] lg:pt-[max(6rem,env(safe-area-inset-top)+5rem)]";
const DESKTOP_MARQUEE_OFFSET = "lg:pb-[2.75rem]";

function MarqueeRow({ copyIndex }: { copyIndex: number }) {
  const sequence = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="flex shrink-0 items-center" aria-hidden={copyIndex > 0}>
      {sequence.map((item, i) => (
        <span
          key={`${copyIndex}-${item}-${i}`}
          className="flex items-center gap-3 px-6 py-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500 whitespace-nowrap"
        >
          <span className="text-[#1877F2]" aria-hidden>
            ◆
          </span>
          {item}
        </span>
      ))}
    </div>
  );
}

function CampaignMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full border-t border-[#1877F2]/30 bg-[#050A14] overflow-hidden",
        className
      )}
      aria-hidden
    >
      <div className="hero-marquee-track">
        <MarqueeRow copyIndex={0} />
        <MarqueeRow copyIndex={1} />
      </div>
    </div>
  );
}

const HERO_SECONDARY_CTA =
  "inline-flex items-center justify-center gap-2 w-full min-h-[52px] lg:min-h-[54px] px-6 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 border border-white/15 hover:border-white/30 hover:text-white transition-colors cursor-pointer";

function PrimaryCta({ className, compact, onClick }: { className?: string; compact?: boolean; onClick?: () => void }) {
  const content = (
    <span
      className={cn(
        "relative flex items-center justify-between gap-3 w-full rounded-full bg-[#1877F2] text-white font-bold uppercase tracking-[0.14em] overflow-hidden group transition-all hover:bg-[#1565d8] active:scale-[0.99] shadow-[0_10px_32px_rgba(24,119,242,0.38)] ring-2 ring-[#1877F2]/30",
        compact
          ? "min-h-[52px] px-5 text-[11px] tracking-[0.12em]"
          : "min-h-[52px] lg:min-h-[54px] px-6 text-xs"
      )}
    >
      <span
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        aria-hidden
      />
      <span className="relative">{HERO_PRIMARY_CTA_LABEL}</span>
      <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/15 group-hover:bg-white group-hover:text-[#1877F2] transition-colors">
        <ArrowRight className="w-3.5 h-3.5" />
      </span>
    </span>
  );

  return (
    <button type="button" onClick={onClick} className={cn("block cursor-pointer", className)}>
      {content}
    </button>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050A14]">
      {/* Desktop / tablet landscape — shared full-bleed layer */}
      <Image
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        fill
        priority
        sizes="100vw"
        className="hidden lg:block object-cover object-center min-w-full min-h-full scale-[1.03] brightness-[1.04] contrast-[1.05]"
      />
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#050A14] via-[#050A14]/88 to-transparent lg:via-[#050A14]/62" />
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-t from-[#050A14]/85 via-[#050A14]/10 to-[#050A14]/35" />
    </div>
  );
}

/** Mobile — vigil poster: diagonal photo + floating manifesto card */
function MobileHero({ animate, onGetInvolvedClick }: { animate: boolean; onGetInvolvedClick?: () => void }) {
  const M = animate ? motion.div : "div";

  return (
    <div
      className={cn(
        "lg:hidden relative z-10 flex flex-col bg-[#050A14]",
        HEADER_OFFSET
      )}
    >
      {/* Photo stage — diagonal cut; memorial crop (officer + candles + Westminster) */}
      <div
        className="relative flex-none h-[26dvh] min-h-[160px] max-h-[220px] w-full overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 86%, 0 100%)" }}
      >
        <Image
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover min-w-full min-h-full scale-[1.22] brightness-[1.06] contrast-[1.06]",
            MOBILE_HERO_OBJECT_POSITION
          )}
        />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050A14]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050A14]/90 via-[#050A14]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050A14]/55 via-transparent to-[#050A14]/25 pointer-events-none" />

        {/* Campaign poster accents */}
        <div
          className="absolute top-3 left-3 w-9 h-9 border-l-2 border-t-2 border-[#1877F2] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute right-0 top-[18%] bottom-[22%] w-[3px] bg-[#1877F2] shadow-[0_0_20px_#1877F2] pointer-events-none"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[18%] left-4 text-[4.5rem] font-black font-heading leading-none text-white/[0.06] select-none"
          aria-hidden
        >
          ISN
        </div>
      </div>

      {/* Floating manifesto card — overlaps photo, typography off-image */}
      <div className="relative z-20 -mt-6 mx-3 mb-5 shrink-0">
        <M
          {...(animate
            ? {
              initial: { opacity: 0, y: 28 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.15, ease },
            }
            : {})}
          className="relative overflow-hidden rounded-t-[1.75rem] rounded-b-lg border border-[#1877F2]/20 bg-[#050A14] shadow-[0_-20px_50px_rgba(0,0,0,0.65)]"
        >
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1877F2]/70 to-transparent"
            aria-hidden
          />

          <div className="py-3.5 px-3.5 sm:px-4">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-px w-8 bg-[#1877F2]" aria-hidden />
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#1877F2]">
                {HERO_EYEBROW}
              </p>
            </div>

            <h1 className="text-[clamp(1.45rem,4.8vw,1.85rem)] font-black uppercase tracking-tight leading-[1.02] mb-2.5 text-balance max-w-[18ch]">
              <span className="text-white">Behind every uniform </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] via-blue-400 to-cyan-400">
                is a human being.
              </span>
            </h1>

            <p className="font-sans text-[13px] sm:text-sm leading-relaxed text-slate-300 mb-3.5 line-clamp-3">
              {HERO_DESCRIPTION}
            </p>

            <div className="flex flex-col gap-2.5 pb-1">
              <PrimaryCta className="w-full" compact onClick={onGetInvolvedClick} />
              <div className="grid grid-cols-1 gap-2.5">
                <Link href="/stories" className={HERO_SECONDARY_CTA}>
                  Read Stories
                </Link>
                <Link href="/remembrance" className={HERO_SECONDARY_CTA}>
                  View Roll of Honour
                </Link>
              </div>
            </div>
          </div>
        </M>
      </div>
    </div>
  );
}

/** Desktop — copy column over full-bleed memorial photograph */
function DesktopHero({ animate, onGetInvolvedClick }: { animate: boolean; onGetInvolvedClick?: () => void }) {
  const M = animate ? motion.div : "div";

  return (
    <div
      className={cn(
        "hidden lg:grid lg:grid-cols-12 h-full min-h-0 relative z-10",
        HEADER_OFFSET,
        DESKTOP_MARQUEE_OFFSET
      )}
    >
      <div className="relative col-span-6 xl:col-span-7 flex flex-col min-h-0 pl-12 xl:pl-16 pr-8 xl:pr-10 overflow-hidden pb-10">
        <div
          className="pointer-events-none absolute -left-6 top-16 text-[9rem] xl:text-[11rem] font-black uppercase leading-none text-white/[0.04] select-none tracking-tighter"
          aria-hidden
        >
          ISN
        </div>

        <div className="relative z-10 flex flex-col justify-center flex-1 min-h-0 py-2">
          <M
            {...(animate
              ? {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.65, ease },
              }
              : {})}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="h-px w-10 bg-[#1877F2]" aria-hidden />
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#1877F2]">
                {HERO_EYEBROW}
              </p>
            </div>

            <h1 className="text-[clamp(2.15rem,3.6vw,3.35rem)] font-black uppercase tracking-tight leading-[1.02] mb-4 text-balance max-w-[14ch]">
              <span className="text-white">Behind every uniform </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] via-blue-400 to-cyan-400">
                is a human being.
              </span>
            </h1>

            <p className="text-sm xl:text-base text-slate-300 leading-relaxed max-w-md mb-5 line-clamp-3">
              {HERO_DESCRIPTION}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <PrimaryCta className="w-auto min-w-[240px] shrink-0" onClick={onGetInvolvedClick} />
              <Link href="/stories" className={cn(HERO_SECONDARY_CTA, "w-auto shrink-0")}>
                Read Stories
              </Link>
              <Link href="/remembrance" className={cn(HERO_SECONDARY_CTA, "w-auto shrink-0")}>
                View Roll of Honour
              </Link>
            </div>
          </M>
        </div>
      </div>

      {/* Right — panoramic memorial shows through from full-bleed layer */}
      <div className="col-span-6 xl:col-span-5 min-h-0 pointer-events-none" aria-hidden />
    </div>
  );
}

export default function HomeHero({ onGetInvolvedClick }: { onGetInvolvedClick?: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <>
      {/* Mobile — content height only; no forced viewport fill */}
      <section
        className="relative overflow-hidden bg-[#050A14] lg:hidden pb-4"
        aria-label="Campaign hero"
      >
        <MobileHero animate={animate} onGetInvolvedClick={onGetInvolvedClick} />
        <CampaignMarquee className="relative z-30 w-full max-w-none mt-1" />
      </section>

      {/* Desktop — full viewport with pinned marquee */}
      <section
        className="relative hidden h-dvh max-h-dvh overflow-hidden bg-[#050A14] lg:block"
        aria-label="Campaign hero"
      >
        <HeroBackground />
        <DesktopHero animate={animate} onGetInvolvedClick={onGetInvolvedClick} />
        <CampaignMarquee className="absolute bottom-0 left-0 right-0 z-30 w-full max-w-none" />
      </section>
    </>
  );
}
