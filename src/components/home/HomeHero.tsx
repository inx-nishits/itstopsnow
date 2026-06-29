"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const HERO_IMAGE_ALT =
  "Police officer at night — representing the hidden crisis of police suicide and trauma";

/** Responsive hero art — portrait crop on mobile, panoramic memorial on desktop. */
const HERO_IMAGES = {
  mobile: {
    src: "/hero-bg-v4.png",
    objectPosition: "object-[85%_15%]",
  },
  desktop: {
    src: "/hero-bg-v4.png",
    objectPosition: "object-[85%_15%]",
  },
} as const;

const HERO_EYEBROW = "Police suicide. The hidden crisis.";
const HERO_TAGLINE = "Every police suicide is one too many.";
const HERO_DESCRIPTION =
  "Raising awareness of police suicide, trauma, mental health and the support officers need before it's too late.";
const HERO_FOOTER = "For officers. For families. For the future.";

const ease = [0.22, 1, 0.36, 1] as const;

const HEADER_OFFSET =
  "pt-[max(5.5rem,env(safe-area-inset-top)+4.5rem)] md:pt-[max(6rem,env(safe-area-inset-top)+5rem)]";

const heroCtaBase = cn(
  "group relative inline-flex items-center justify-center gap-2 sm:gap-3",
  "h-10 sm:h-11 px-4 sm:px-8 rounded-[5px] w-fit shrink-0",
  "text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.1em]",
  "transition-all duration-200"
);

function HeroCtaPrimaryButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        heroCtaBase,
        "bg-[#1877F2] text-white hover:bg-[#1565d8] active:bg-[#1256c4] cursor-pointer"
      )}
    >
      <span className="truncate">{label}</span>
      <ArrowRight className="size-3.5 shrink-0 opacity-90 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} aria-hidden />
    </button>
  );
}

function HeroCtaSecondaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center w-fit shrink-0",
        "text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.1em]",
        "transition-all duration-200 text-white",
        "gap-1.5 sm:gap-3",
        "px-0 sm:px-6 h-auto py-1 sm:py-0 sm:h-11",
        "border-transparent sm:border sm:border-white/20 sm:rounded-[5px]",
        "bg-transparent sm:hover:border-white/40 sm:hover:bg-white/5",
        "underline sm:no-underline hover:underline sm:hover:no-underline underline-offset-4"
      )}
    >
      <span className="truncate">{label}</span>
      <ArrowUpRight className="size-3.5 shrink-0 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} aria-hidden />
    </Link>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050A14]">
      <Image
        src={HERO_IMAGES.mobile.src}
        alt={HERO_IMAGE_ALT}
        fill
        priority
        sizes="100vw"
        className={cn(
          "lg:hidden object-cover min-w-full min-h-full scale-[1.06]",
          HERO_IMAGES.mobile.objectPosition,
          "brightness-[1.03] contrast-[1.07]"
        )}
      />
      <Image
        src={HERO_IMAGES.desktop.src}
        alt={HERO_IMAGE_ALT}
        fill
        priority
        sizes="100vw"
        className={cn(
          "hidden lg:block object-cover min-w-full min-h-full scale-[1.03]",
          HERO_IMAGES.desktop.objectPosition,
          "brightness-[1.05] contrast-[1.06]"
        )}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-0% via-[#050A14]/94 via-[34%] sm:via-[38%] lg:via-[#050A14]/82 lg:via-[46%] to-transparent to-[78%] lg:to-[68%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/88 via-[#050A14]/10 to-[#050A14]/35 lg:from-[#050A14]/75" />
    </div>
  );
}

function HeroContent({
  animate,
  onGetInvolvedClick,
}: {
  animate: boolean;
  onGetInvolvedClick?: () => void;
}) {
  const M = animate ? motion.div : "div";

  return (
    <div
      className={cn(
        "relative z-10 flex flex-col justify-center",
        HEADER_OFFSET,
        "pb-4 sm:pb-8 lg:pb-12",
        "lg:min-h-[100dvh] lg:max-h-dvh"
      )}
    >
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto max-w-[1600px]">
        <div className="w-full max-w-[18rem] sm:max-w-[26rem] lg:max-w-[42rem] xl:max-w-[48rem]">
          <M
            {...(animate
              ? {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, ease },
              }
              : {})}
          >
            <p className="text-[10px] sm:text-[11px] lg:text-xs font-bold uppercase tracking-[0.22em] lg:tracking-[0.26em] text-[#1877F2] mb-4 sm:mb-5 lg:mb-6">
              <span className="block sm:inline">Police suicide.</span>
              <span className="block sm:inline sm:ml-2">The hidden crisis.</span>
            </p>

            <h1 className="font-black uppercase tracking-tight leading-[1.02] mb-3 sm:mb-4 lg:mb-5">
              <span className="block text-[1.5rem] sm:text-[1.85rem] lg:text-[2.75rem] xl:text-[3.15rem] text-white">
                Behind the
              </span>
              <span className="block text-[1.5rem] sm:text-[1.85rem] lg:text-[2.75rem] xl:text-[3.15rem] text-[#1877F2]">
                uniform
              </span>
            </h1>

            <p className="text-[13px] sm:text-base lg:text-lg xl:text-xl font-bold text-white leading-snug mb-2.5 sm:mb-4 lg:mb-5">
              {HERO_TAGLINE}
            </p>

            <p className="text-[12px] sm:text-sm lg:text-base xl:text-md text-white/80 leading-relaxed mb-6 sm:mb-7 lg:mb-9 max-w-[17rem] sm:max-w-none lg:max-w-xl">
              {HERO_DESCRIPTION}
            </p>

            <div className="flex flex-row flex-wrap lg:flex-nowrap items-center gap-3 sm:gap-4 lg:gap-3 xl:gap-4 mb-5 sm:mb-8 lg:mb-10 w-full">
              <HeroCtaPrimaryButton label="Get Involved" onClick={onGetInvolvedClick} />
              <HeroCtaSecondaryLink href="/stories" label="Read the stories" />
              <HeroCtaSecondaryLink href="/wall-of-remembrance" label="View Roll of Honour" />
            </div>

            <div className="flex items-center gap-2.5 lg:gap-3 text-white/80">
              <ShieldCheck className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-[#1877F2] shrink-0" strokeWidth={2} />
              <p className="text-[11px] sm:text-xs lg:text-sm leading-relaxed">{HERO_FOOTER}</p>
            </div>
          </M>
        </div>
      </div>
    </div>
  );
}

export default function HomeHero({ onGetInvolvedClick }: { onGetInvolvedClick?: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section className="relative overflow-hidden bg-[#050A14] lg:h-dvh lg:max-h-dvh" aria-label="Campaign hero">
      <HeroBackground />
      <HeroContent animate={animate} onGetInvolvedClick={onGetInvolvedClick} />
    </section>
  );
}

