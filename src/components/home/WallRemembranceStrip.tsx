"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/home/SectionReveal";
import { MEMORIALS_FALLBACK } from "@/lib/memorial/fallback";
import type { RollHonourPreview } from "@/lib/homepage/types";

interface WallRemembranceStripProps {
  officers: RollHonourPreview[];
}

/** Clean outline candle icon */
function CandleIcon({ className = "", strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c1.5 2 2 3.5 0 5.5C10 6.5 10.5 5 12 3Z" />
      <path d="M12 8.5v2" />
      <path d="M9.5 10.5h5v9a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-9Z" />
      <path d="M7.5 21.5h9" />
    </svg>
  );
}

export default function WallRemembranceStrip({ officers }: WallRemembranceStripProps) {
  const totalCandles = MEMORIALS_FALLBACK.reduce((sum, m) => sum + m.candleCount, 0);
  const thousandCount = Math.floor(totalCandles / 1000);

  return (
    <section className="relative w-full overflow-hidden border-y border-white/[0.06] bg-[#010B19] py-5 sm:py-8 lg:py-10">
      {/* BG — candle field on right (reference: soft lights behind content) */}
      <div className="pointer-events-none absolute inset-0 bg-[#010B19]" aria-hidden>
        {/*
          Premium BG: soft top-right candle bokeh, clean navy left for content + glass candle.
        */}
        <div className="absolute -top-[12%] inset-x-0 bottom-0 sm:hidden">
          <Image
            src="/images/candle-bokeh-premium.png"
            alt=""
            fill
            className="object-cover object-[92%_0%] brightness-110 contrast-105"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, #010B19 0%, #010B19 22%, rgba(1,11,25,0.8) 40%, rgba(1,11,25,0.3) 60%, transparent 80%)",
            }}
          />
          <div
            className="absolute bottom-[-10%] left-[-8%] h-[70%] w-[55%]"
            style={{
              background:
                "radial-gradient(ellipse at 40% 70%, rgba(245,158,11,0.1) 0%, rgba(24,119,242,0.04) 35%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(1,11,25,0.1) 0%, transparent 28%, transparent 72%, rgba(1,11,25,0.35) 100%)",
            }}
          />
        </div>

        {/* Desktop: sharp clear candle BG (not soft bokeh) — quieter opacity */}
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/images/candle-bg-desktop-sharp.png"
            alt=""
            fill
            className="object-cover object-right opacity-45 brightness-100 contrast-100"
            sizes="100vw"
            quality={95}
            priority
          />
          {/* Stronger left navy — reduce BG visibility so content stays clear */}
          <div
            className="absolute inset-y-0 left-0 w-[52%] lg:w-[48%]"
            style={{
              background:
                "linear-gradient(90deg, #010B19 0%, #010B19 35%, rgba(1,11,25,0.85) 58%, rgba(1,11,25,0.35) 82%, transparent 100%)",
            }}
          />
          {/* Light bottom fade for CTAs only */}
          <div
            className="absolute inset-x-0 bottom-0 h-[30%]"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(1,11,25,0.25) 60%, rgba(1,11,25,0.55) 100%)",
            }}
          />
          {/* Extra desktop veil so candle field stays soft, not loud */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(1, 11, 25, 0.28)",
            }}
          />
        </div>

        {/* Blue–purple grading overlay (matches reference mood) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #010B19 0%, #010B19 28%, rgba(12,18,48,0.55) 48%, rgba(45,30,90,0.45) 68%, rgba(70,40,130,0.4) 85%, rgba(55,35,110,0.35) 100%)",
          }}
        />
        {/* Soft purple wash on right candle field */}
        <div
          className="absolute inset-y-0 right-0 w-[65%]"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 85% 40%, rgba(88, 50, 160, 0.45) 0%, rgba(40, 30, 100, 0.28) 40%, transparent 75%)",
          }}
        />
        {/* Top-to-bottom dark grade for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,10,30,0.2) 0%, rgba(8,10,30,0.15) 35%, rgba(5,8,22,0.45) 70%, rgba(1,11,25,0.85) 100%)",
          }}
        />
        {/* Soft vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 45% 40%, transparent 0%, transparent 50%, rgba(1,8,22,0.4) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-3 sm:px-6 lg:px-16">
        <SectionReveal delay={0.05}>
          {/* Horizontal layout — candle height matches content; no crop on mobile */}
          <div className="flex items-stretch gap-2.5 sm:items-center sm:gap-8 lg:gap-12">
            {/* Glass candle — feathered into section BG on mobile */}
            <div className="relative flex w-[32%] max-w-[120px] shrink-0 items-end self-stretch pt-3 sm:w-[180px] sm:max-w-none sm:items-center sm:pt-0 lg:w-[260px] xl:w-[300px]">
              {/* Warm floor glow — ties candle into section atmosphere */}
              <div
                className="pointer-events-none absolute -inset-x-3 bottom-0 h-10 rounded-full bg-amber-400/30 blur-2xl sm:inset-x-6 sm:h-8 sm:bg-amber-400/25 sm:blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 sm:hidden"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(245,158,11,0.12) 0%, transparent 70%)",
                }}
                aria-hidden
              />
              <div
                className="relative h-full min-h-[140px] w-full translate-y-1 sm:min-h-0 sm:aspect-[3/4] sm:h-auto sm:translate-y-0"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 68% 70% at 50% 48%, #000 38%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.4) 72%, transparent 90%)",
                  maskImage:
                    "radial-gradient(ellipse 68% 70% at 50% 48%, #000 38%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.4) 72%, transparent 90%)",
                }}
              >
                <Image
                  src="/images/isn-glass-candle.png"
                  alt="ISN remembrance candle"
                  fill
                  priority
                  className="object-contain object-bottom mix-blend-lighten brightness-105 contrast-105 sm:brightness-100 sm:contrast-100"
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 300px"
                />
              </div>
            </div>

            {/* Content — right of candle */}
            <div className="flex min-w-0 flex-1 flex-col justify-center text-left">
              <div className="mb-1.5 sm:mb-4 lg:mb-5">
                <span className="text-[1.65rem] font-black leading-none tracking-tight text-white tabular-nums xs:text-3xl sm:text-4xl lg:text-[3.5rem]">
                  {totalCandles.toLocaleString()}
                </span>
              </div>

              <p className="mb-2.5 text-[11px] font-medium leading-[1.35] text-white/90 sm:mb-5 sm:max-w-xl sm:text-base sm:leading-relaxed lg:mb-6 lg:text-lg">
                Honouring those we&apos;ve lost.
                <br />
                Standing with those who remain.
              </p>

              {officers.length > 0 && (
                <div className="mb-3 flex items-center -space-x-2.5 sm:mb-6 sm:-space-x-3 lg:mb-7">
                  {officers.slice(0, 3).map((off) => (
                    <div
                      key={off.id}
                      className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#010B19] bg-[#030712] shadow-md sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                    >
                      <Image
                        src={off.imageUrl}
                        alt={off.name}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                  ))}
                  <div
                    className="relative z-10 grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#010B19] bg-[#1877F2] shadow-md sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                    aria-label={`Plus ${thousandCount} thousand`}
                  >
                    <span className="text-[8px] font-bold leading-none tracking-tight text-white tabular-nums sm:text-[10px] lg:text-xs">
                      +{thousandCount}K
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-row items-center gap-2 sm:gap-4">
                <Link
                  href="/wall-of-remembrance"
                  className="inline-flex min-h-[38px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#1877F2] px-3 py-2 text-[10px] font-bold tracking-wide text-white shadow-[0_8px_24px_rgba(24,119,242,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#010B19] hover:shadow-[0_10px_28px_rgba(255,255,255,0.35)] sm:min-h-[56px] sm:gap-3 sm:px-9 sm:py-4 sm:text-sm lg:min-h-[60px] lg:px-11 lg:text-base"
                >
                  <CandleIcon className="h-4 w-4 sm:h-6 sm:w-6 lg:h-7 lg:w-7" strokeWidth={2} />
                  Light a Candle
                </Link>
                <Link
                  href="/wall-of-remembrance"
                  className="inline-flex min-h-[38px] shrink-0 items-center justify-center gap-1 rounded-full border border-white/30 bg-transparent px-3 py-2 text-[10px] font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#010B19] sm:min-h-[56px] sm:gap-2.5 sm:px-8 sm:py-4 sm:text-sm lg:min-h-[60px] lg:px-10 lg:text-base"
                >
                  Tribute
                  <ArrowRight className="h-4 w-4 shrink-0 sm:h-6 sm:w-6 lg:h-7 lg:w-7" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
