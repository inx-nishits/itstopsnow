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
const HERO_IMAGE = "/bannerBg.png";
const HERO_IMAGE_ALT =
  "Police officer standing before a candle memorial outside the Palace of Westminster";

/** Mobile — officers facing camera; clear human presence for narrow screens */
const MOBILE_HERO_IMAGE = "/images/mission-support.png";
const MOBILE_HERO_IMAGE_ALT = "UK police officers standing together in service";

const MARQUEE_ITEMS = [
  "DIGNITY",
  "ACCOUNTABILITY",
  "REFORM",
  "REMEMBRANCE",
  "VOICES",
  "TRUTH",
  "IT STOPS NOW",
] as const;

const EDITORIAL_LINKS = [
  { num: "01", label: "Read their stories", href: "/stories" },
  { num: "02", label: "Wall of Remembrance", href: "/remembrance" },
  { num: "03", label: "Understand the issue", href: "/the-issue" },
] as const;

const MOBILE_QUICK_LINKS = [
  { label: "Stories", href: "/stories" },
  { label: "Remembrance", href: "/remembrance" },
  { label: "The issue", href: "/the-issue" },
] as const;

/** Matches header nav + /take-action page hero */
const HERO_PRIMARY_CTA_LABEL = "Take Action";

const ease = [0.22, 1, 0.36, 1] as const;

const HEADER_OFFSET = "pt-[max(5rem,env(safe-area-inset-top)+4rem)] lg:pt-[max(6rem,env(safe-area-inset-top)+5rem)]";
/** Desktop — clearance for absolute bottom ticker */
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

function EditorialLink({
  num,
  label,
  href,
  compact,
}: {
  num: string;
  label: string;
  href: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between gap-3 border-b border-white/10 last:border-b-0 cursor-pointer",
        compact ? "py-2" : "py-2.5 lg:py-3"
      )}
    >
      <span className="flex items-center gap-2.5 min-w-0">
        <span className="text-[9px] font-black text-[#1877F2] tabular-nums tracking-widest shrink-0">
          {num}
        </span>
        <span className="text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-white transition-colors truncate">
          {label}
        </span>
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#1877F2] group-hover:translate-x-0.5 transition-all shrink-0" />
    </Link>
  );
}

function PrimaryCta({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/take-action" className={cn("block cursor-pointer", className)}>
      <span
        className={cn(
          "relative flex items-center justify-between gap-3 w-full bg-[#1877F2] text-white font-bold uppercase tracking-[0.14em] overflow-hidden group transition-colors hover:bg-[#1565d8] active:scale-[0.99]",
          compact
            ? "min-h-[48px] px-4 text-xs tracking-[0.12em]"
            : "min-h-[50px] lg:min-h-[52px] px-5 text-xs"
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
    </Link>
  );
}

function MobilePrimaryCta({ className }: { className?: string }) {
  return (
    <Link href="/take-action" className={cn("group block cursor-pointer", className)}>
      <span className="relative flex items-center justify-between gap-3 w-full min-h-[46px] pl-4 pr-1.5 bg-[#1877F2] overflow-hidden transition-colors hover:bg-[#1565d8] active:scale-[0.99] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,0_0)]">
        <span
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/12 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          aria-hidden
        />
        <span className="relative font-sans text-sm font-semibold text-white tracking-[0.02em]">
          {HERO_PRIMARY_CTA_LABEL}
        </span>
        <span className="relative flex items-center justify-center w-9 h-9 bg-white/15 group-hover:bg-white group-hover:text-[#1877F2] text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </span>
      </span>
    </Link>
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
function MobileHero({ animate }: { animate: boolean }) {
  const M = animate ? motion.div : "div";

  return (
    <div
      className={cn(
        "lg:hidden relative z-10 flex flex-col bg-[#050A14]",
        HEADER_OFFSET
      )}
    >
      {/* Photo stage — diagonal cut, faces unobstructed */}
      <div
        className="relative flex-none h-[26dvh] w-full overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 86%, 0 100%)" }}
      >
        <Image
          src={MOBILE_HERO_IMAGE}
          alt={MOBILE_HERO_IMAGE_ALT}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_8%] scale-[1.1] brightness-[1.08] contrast-[1.06]"
        />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050A14]/75 to-transparent pointer-events-none" />

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
      <div className="relative z-20 -mt-6 mx-3 shrink-0">
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
          <div
            className="pointer-events-none absolute -right-1 -top-1 text-[4.25rem] font-black font-heading leading-none text-[#1877F2]/[0.07] select-none"
            aria-hidden
          >
            01
          </div>

          <div className="flex gap-0">
            <div
              className="w-1.5 shrink-0 my-3 ml-3 rounded-full bg-gradient-to-b from-[#1877F2] via-blue-500 to-cyan-400"
              aria-hidden
            />
            <div className="flex-1 min-w-0 py-3 pr-3 pl-2">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.26em] text-[#1877F2] mb-1.5">
                The manifesto
              </p>

              <h1 className="mb-1.5">
                <span className="block font-heading text-[1.2rem] font-light italic leading-snug text-slate-300">
                  Behind every uniform
                </span>
                <span className="block font-heading text-[1.7rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#1877F2]">
                  is a person.
                </span>
              </h1>

              <p className="font-sans text-[13px] leading-[1.5] text-slate-400 mb-2.5 line-clamp-2">
                Honour the fallen. Fight for reform. Stand with every officer treated as
                expendable.
              </p>

              <MobilePrimaryCta />

              <nav
                aria-label="Explore the campaign"
                className="flex gap-2 mt-2 overflow-x-auto scrollbar-none"
              >
                {MOBILE_QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="shrink-0 px-3 py-1.5 rounded-full border border-[#1877F2]/30 bg-[#1877F2]/[0.08] font-sans text-[11px] font-semibold text-slate-200 hover:bg-[#1877F2]/20 hover:border-[#1877F2]/50 cursor-pointer transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/about"
                className="inline-flex items-center gap-1 mt-2 font-sans text-xs font-medium text-slate-500 hover:text-[#1877F2] cursor-pointer transition-colors"
              >
                Read our mission
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </M>
      </div>
    </div>
  );
}

/** Desktop — copy column over full-bleed memorial photograph */
function DesktopHero({ animate }: { animate: boolean }) {
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
                Campaign for change
              </p>
            </div>

            <h1 className="text-[2.65rem] xl:text-[3.35rem] 2xl:text-[3.75rem] font-black uppercase tracking-tight leading-[0.98] mb-4">
              <span className="text-white block">Behind every</span>
              <span className="text-white block">uniform</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] via-blue-400 to-cyan-400 block">
                is a human being.
              </span>
            </h1>

            <p className="text-sm xl:text-base text-slate-300 leading-relaxed max-w-md mb-5 line-clamp-2">
              Championing officers and families. Demanding dignity, accountability, and an end to
              a system that treats people as expendable.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <PrimaryCta className="w-auto min-w-[220px]" />
              <Link
                href="/about"
                className="inline-flex items-center gap-2 min-h-[50px] px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 border border-white/15 hover:border-white/30 hover:text-white transition-colors cursor-pointer"
              >
                Our mission
              </Link>
            </div>
          </M>

          <M
            {...(animate
              ? {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.55, delay: 0.2, ease },
                }
              : {})}
            className="max-w-sm border-t border-white/10 pt-4 shrink-0"
          >
            {EDITORIAL_LINKS.map((link) => (
              <EditorialLink key={link.href} {...link} />
            ))}
          </M>
        </div>
      </div>

      {/* Right — panoramic memorial shows through from full-bleed layer */}
      <div className="col-span-6 xl:col-span-5 min-h-0 pointer-events-none" aria-hidden />
    </div>
  );
}

export default function HomeHero() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <>
      {/* Mobile — content height only; no forced viewport fill */}
      <section
        className="relative overflow-hidden bg-[#050A14] lg:hidden"
        aria-label="Campaign hero"
      >
        <MobileHero animate={animate} />
        <CampaignMarquee className="relative z-30 w-full max-w-none" />
      </section>

      {/* Desktop — full viewport with pinned marquee */}
      <section
        className="relative hidden h-dvh max-h-dvh overflow-hidden bg-[#050A14] lg:block"
        aria-label="Campaign hero"
      >
        <HeroBackground />
        <DesktopHero animate={animate} />
        <CampaignMarquee className="absolute bottom-0 left-0 right-0 z-30 w-full max-w-none" />
      </section>
    </>
  );
}
