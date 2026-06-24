"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared layout tokens for inner-page heroes and section bodies */
export const PAGE_CONTENT_CONTAINER =
  "w-full max-w-[1600px] mx-auto px-4 sm:px-4 sm:px-6 lg:px-16";
export const PAGE_HERO_CONTAINER = `${PAGE_CONTENT_CONTAINER} relative z-10`;
export const PAGE_HERO_EYEBROW =
  "text-[#1877F2] font-bold uppercase tracking-[0.28em] text-xs sm:text-sm mb-4 sm:mb-5 flex items-center gap-2.5 sm:gap-3";
export const PAGE_HERO_TITLE_CAMPAIGN =
  "text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-2xl";
export const PAGE_HERO_TITLE_UTILITY =
  "text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-2xl";
export const PAGE_HERO_DESCRIPTION =
  "text-sm sm:text-base md:text-lg xl:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl drop-shadow";
export const PAGE_HERO_SECTION_PT = "pt-28 sm:pt-32 md:pt-40";

/** Clears fixed site header (h-20 / h-24) plus safe-area — subpages without full PageHero */
export const PAGE_BELOW_HEADER_PT =
  "pt-[max(7rem,calc(env(safe-area-inset-top)+5rem))] md:pt-[max(8rem,calc(env(safe-area-inset-top)+6rem))]";

export type PageHeroVariant = "campaign" | "utility";

const variantLayout: Record<PageHeroVariant, string> = {
  campaign: "justify-end pb-6 sm:pb-8 lg:pb-10",
  utility: "justify-end pb-6 sm:pb-8 lg:pb-10",
};

interface PageHeroProps {
  variant?: PageHeroVariant;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  backLink?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  children?: ReactNode;
  animate?: boolean;
  className?: string;
}

function HeroBackground({
  imageSrc,
  imageAlt = "",
  imageClassName,
}: {
  imageSrc: string;
  imageAlt?: string;
  imageClassName?: string;
}) {
  return (
    <div className="absolute inset-0 z-0" aria-hidden={!imageAlt}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={cn(
          "w-full h-full object-cover object-center mix-blend-luminosity opacity-40 grayscale",
          imageClassName
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
    </div>
  );
}

/** Standard inner-page campaign / utility hero */
export function PageHero({
  variant = "campaign",
  eyebrow,
  title,
  description,
  meta,
  backLink,
  imageSrc,
  imageAlt = "",
  imageClassName,
  children,
  animate = false,
  className,
}: PageHeroProps) {
  const titleClass =
    variant === "campaign" ? PAGE_HERO_TITLE_CAMPAIGN : PAGE_HERO_TITLE_UTILITY;

  const titleContent = animate ? (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={cn(titleClass, "mb-4 sm:mb-5")}
    >
      {title}
    </motion.h1>
  ) : (
    <h1 className={cn(titleClass, "mb-4 sm:mb-5")}>{title}</h1>
  );

  const descriptionContent =
    description &&
    (animate ? (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={PAGE_HERO_DESCRIPTION}
      >
        {description}
      </motion.p>
    ) : (
      <p className={PAGE_HERO_DESCRIPTION}>{description}</p>
    ));

  return (
    <section
      className={cn(
        "relative w-full flex flex-col bg-[#050A14] text-white border-b border-white/5 overflow-hidden",
        PAGE_HERO_SECTION_PT,
        variantLayout[variant],
        className
      )}
    >
      {imageSrc ? (
        <HeroBackground imageSrc={imageSrc} imageAlt={imageAlt} imageClassName={imageClassName} />
      ) : (
        <div className="absolute inset-0 z-0 bg-[#050A14]" aria-hidden />
      )}

      <div className={PAGE_HERO_CONTAINER}>
        {backLink ? <div className="mb-6 sm:mb-8">{backLink}</div> : null}
        {eyebrow ? <div className={PAGE_HERO_EYEBROW}>{eyebrow}</div> : null}
        {titleContent}
        {descriptionContent}
        {meta ? <div className="mt-4 sm:mt-5">{meta}</div> : null}
        {children ? <div className="mt-6 sm:mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

interface ArticleHeroProps {
  backLink: ReactNode;
  badges?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  imageSrc: string;
  imageAlt?: string;
}

/** Article / detail-page hero — back link, category, title, meta */
export function ArticleHero({
  backLink,
  badges,
  title,
  meta,
  imageSrc,
  imageAlt = "",
}: ArticleHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full flex flex-col justify-end bg-[#050A14] text-white border-b border-white/5 overflow-hidden",
        PAGE_HERO_SECTION_PT,
        "pt-4 pb-6 sm:pb-8 lg:pb-10"
      )}
    >
      <HeroBackground imageSrc={imageSrc} imageAlt={imageAlt} imageClassName="opacity-30" />

      <div className={PAGE_HERO_CONTAINER}>
        <div className="mb-6 sm:mb-8">{backLink}</div>
        {badges ? <div className="mb-5 sm:mb-6">{badges}</div> : null}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 sm:mb-6 max-w-4xl">
          {title}
        </h1>
        {meta}
      </div>
    </section>
  );
}

/** Compact research listing band */
export function CompactPageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt = "",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  imageSrc: string;
  imageAlt?: string;
}) {
  return (
    <section
      className={cn(
        "relative w-full flex flex-col justify-end overflow-hidden bg-[#050A14] text-white border-b border-white/5",
        PAGE_HERO_SECTION_PT,
        "pt-4 pb-6 sm:pb-8 lg:pb-10"
      )}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center opacity-[0.16] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/85 to-[#050A14]/60" />
      </div>

      <div className={PAGE_HERO_CONTAINER}>
        <p className="text-[#1877F2] font-bold uppercase tracking-[0.28em] text-[10px] sm:text-xs mb-2 sm:mb-3">
          {eyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2 sm:mb-3 max-w-3xl">
          {title}
        </h1>
        {description ? (
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">{description}</p>
        ) : null}
      </div>
    </section>
  );
}

