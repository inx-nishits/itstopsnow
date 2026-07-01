"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronsDown, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

const HERO_IMAGE_ALT =
  "Police officer at night — representing the hidden crisis of police suicide and trauma";

/** Responsive hero art — portrait crop on mobile, panoramic memorial on desktop. */
const HERO_IMAGES = {
  mobile: {
    src: "/hero-bg-v4.png",
    objectPosition: "object-[70%_center] sm:object-[75%_center]",
  },
  desktop: {
    src: "/hero-bg-v4.png",
    objectPosition: "object-[70%_center] lg:object-[75%_25%]",
  },
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

const HEADER_OFFSET =
  "pt-[max(5.5rem,env(safe-area-inset-top)+4.5rem)] md:pt-[max(6rem,env(safe-area-inset-top)+5rem)]";

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

      <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-0% via-[#050A14]/80 via-45% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
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
    <div className="relative z-10 w-full min-h-[100dvh] flex flex-col justify-end pt-32 pb-24 sm:pt-32 sm:pb-28 lg:pt-24 lg:pb-16 xl:pt-28 xl:pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto max-w-[1600px]">
        <div className="w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[42rem] xl:max-w-[48rem]">
          <M
            {...(animate
              ? {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, ease },
              }
              : {})}
          >
            <p className="text-[10px] sm:text-[11px] lg:text-xs font-bold uppercase tracking-[0.22em] lg:tracking-[0.26em] text-[#1877F2] mb-3 sm:mb-5 lg:mb-6">
              <span className="block sm:inline">Police suicide.</span>
              <span className="block sm:inline sm:ml-2">The hidden crisis.</span>
            </p>

            <h1 
              className={cn("flex flex-col uppercase mb-5 sm:mb-6 lg:mb-6 tracking-normal", anton.className)}
              style={{ lineHeight: 0.95 }}
            >
              <span className="text-white text-[5.5rem] sm:text-[6.5rem] lg:text-[5rem] xl:text-[6rem]">BEHIND</span>
              <span className="text-white text-[3.5rem] sm:text-[4.5rem] lg:text-[3.5rem] xl:text-[4.5rem]">EVERY BADGE</span>
              <span className="text-[#1877F2] text-[3.5rem] sm:text-[4.5rem] lg:text-[3.5rem] xl:text-[4.5rem]">IS A LIFE</span>
              <div className="flex flex-col lg:flex-row lg:gap-3 xl:gap-4">
                <span className="text-white text-[3.5rem] sm:text-[4.5rem] lg:text-[3.5rem] xl:text-[4.5rem]">WORTH</span>
                <span className="text-white text-[3.5rem] sm:text-[4.5rem] lg:text-[3.5rem] xl:text-[4.5rem]">FIGHTING FOR<span className="text-[#1877F2]">.</span></span>
              </div>
            </h1>

            <p className="text-[16px] sm:text-lg lg:text-xl text-white/95 leading-relaxed mb-6 sm:mb-8 lg:mb-6 max-w-[20rem] sm:max-w-[32rem] lg:max-w-[45rem] xl:max-w-[50rem] font-medium tracking-wide">
              Police suicide is a crisis we can't ignore. Together, we can break the silence, support our officers, and save lives.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-4 w-full">
              <button 
                onClick={onGetInvolvedClick} 
                className="flex items-center justify-center shrink-0 gap-3 w-[220px] h-12 rounded-md bg-[#1877F2] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#1565d8] transition-colors"
              >
                <span>JOIN THE MOVEMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <Link 
                href="/stories" 
                className="group flex items-center justify-center shrink-0 gap-3 w-[220px] h-12 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white text-[12px] font-bold uppercase tracking-widest transition-all"
              >
                <span>Read the Stories</span>
                <ArrowUpRight className="w-4 h-4 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link 
                href="/wall-of-remembrance" 
                className="group flex items-center shrink-0 gap-2 text-white/90 hover:text-white transition-colors sm:ml-2"
              >
                <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-widest border-b border-white/30 group-hover:border-white/80 pb-0.5 transition-colors">
                  View Wall of Remembrance
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

          </M>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={() => {
          const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 80;
          window.scrollTo({ top: window.innerHeight - headerHeight, behavior: 'smooth' });
        }}
        className="absolute bottom-10 lg:bottom-12 left-0 right-0 w-full flex justify-center lg:justify-end lg:px-12 xl:px-20 z-20 pointer-events-auto cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center text-white/60 animate-bounce group-hover:text-white transition-colors">
          <span className="text-[10px] font-bold tracking-widest uppercase mb-1">Scroll to learn more</span>
          <ChevronsDown className="w-5 h-5 opacity-80" />
        </div>
      </button>
    </div>
  );
}

export default function HomeHero({ onGetInvolvedClick }: { onGetInvolvedClick?: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section className="relative overflow-hidden bg-[#050A14] min-h-[100dvh]" aria-label="Campaign hero">
      <HeroBackground />
      <HeroContent animate={animate} onGetInvolvedClick={onGetInvolvedClick} />
    </section>
  );
}

