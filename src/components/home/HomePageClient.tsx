"use client";

import Link from "next/link";
import Image from "next/image";
import { Quote, Megaphone, Heart, Scale, Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FounderShowcase from "@/components/shared/FounderShowcase";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import HomeHero from "@/components/home/HomeHero";
import SectionReveal from "@/components/home/SectionReveal";
import HomeEventsPreview from "@/components/home/HomeEventsPreview";
import InformationAlertBox from "@/components/home/InformationAlertBox";
import AwarenessStatisticsSection from "@/components/home/AwarenessStatisticsSection";
import type { HomepageData } from "@/lib/homepage/types";
import GetInvolvedModal from "@/components/global/GetInvolvedModal";

import ReadStoriesSection from "@/components/home/ReadStoriesSection";
import WallRemembranceStrip from "@/components/home/WallRemembranceStrip";
import SupportResourcesTeaser from "@/components/home/SupportResourcesTeaser";


interface HomePageClientProps {
  data: HomepageData;
}

export default function HomePageClient({ data }: HomePageClientProps) {
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);
  const { email, setEmail, isSubscribing, isSubscribed, error, subscribe } = useNewsletterSubscribe();

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <div className="flex flex-col">
        <div className="order-7 md:order-1 w-full">
          <InformationAlertBox alert={data.informationAlert} />
        </div>
        <div className="order-1 md:order-2 w-full">
          <HomeHero onGetInvolvedClick={() => setIsGetInvolvedOpen(true)} />
        </div>
        <div className="order-2 md:order-3 w-full">
          {/* WHY IT STOPS NOW — light editorial */}
          <section className="theme-editorial relative bg-white text-[#010B19] py-10 sm:py-20 lg:py-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-[min(800px,90vw)] h-[min(800px,90vw)] bg-[#1877F2]/[0.03] rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

            <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center">
                
                <SectionReveal className="flex flex-col justify-center lg:col-span-5">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                    <h2 className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">Why It Stops Now</h2>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#010B19] mb-4 sm:mb-6 text-balance">
                    EVERY NUMBER IS <br className="hidden lg:block" />
                    <span className="text-slate-500">A LIFE LEFT BEHIND.</span>
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-8 sm:mb-10 max-w-xl">
                    Every number represents a parent, a child, a partner and a friend left behind. Every story reminds us that officers' lives matter too.
                  </p>
                  <div>
                    <Link href="/the-issue">
                      <Button className="border border-slate-300 text-[#010B19] bg-transparent hover:bg-[#010B19] hover:text-white font-bold px-8 sm:px-10 py-6 sm:py-7 rounded-full text-xs tracking-widest uppercase transition-all hover:-translate-y-0.5">
                        LEARN THE FACTS
                      </Button>
                    </Link>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.08} className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] lg:rounded-[2.5rem] group shadow-xl border border-slate-200">
                  {/* Mobile-first: photography above quote */}
                  <div className="relative w-full aspect-[21/9] sm:aspect-[16/9] md:aspect-auto md:min-h-[240px] lg:min-h-[280px]">
                    <Image
                      src="/images/quote-bg.png"
                      alt="Supportive holding background"
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010B19] via-[#010B19]/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#010B19]/40 md:to-[#010B19]/85" />
                  </div>

                  <div className="relative md:absolute md:inset-0 flex flex-col justify-end md:justify-center p-5 sm:p-8 md:p-10 lg:p-12 bg-[#010B19] md:bg-transparent">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#1877F2]/60 mb-3 sm:mb-4 md:text-[#1877F2]/50 shrink-0" />
                    <p className="text-sm sm:text-base sm:text-xl md:text-2xl text-white font-medium leading-[1.45] tracking-tight mb-5 sm:mb-6 md:mb-8 max-w-2xl text-balance">
                      &ldquo;To protect and serve others, they gave everything. Now,{" "}
                      <span className="text-[#1877F2]">it&apos;s our turn to protect them.</span>&rdquo;
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-8 sm:w-10 h-[2px] bg-[#1877F2]/50 md:bg-white/25 shrink-0" />
                        <span className="text-slate-300 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                          The Mission
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsGetInvolvedOpen(true)}
                        className="w-full sm:w-auto bg-[#1877F2] text-white hover:bg-white hover:text-[#010B19] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-[0_8px_24px_rgba(24,119,242,0.35)] ring-2 ring-[#1877F2]/20 min-h-[48px]"
                      >
                        Get Involved
                      </button>
                    </div>
                  </div>
                </div>
                </SectionReveal>

              </div>

            </div>
          </section>
        </div>
        <div className="order-3 md:order-4 w-full">
          <ReadStoriesSection />
        </div>
        <div className="order-4 md:order-5 w-full">
          <WallRemembranceStrip officers={data.rollPreview} />
        </div>
        <div className="order-5 md:order-6 w-full">
          <SupportResourcesTeaser />
        </div>
      </div>

      {/* OUR MISSION & WHAT WE DO — SIDE BY SIDE ON DESKTOP */}
      <section className="relative bg-[#010B19] text-white overflow-hidden">

        {/* ── KEYFRAMES injected once ── */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes glowPulse {
            0%,100% { opacity: 0.12; }
            50%      { opacity: 0.25; }
          }
          .glow-pulse { animation: glowPulse 4s ease-in-out infinite; }
          @keyframes scanline {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          .scanline {
            animation: scanline 8s linear infinite;
            background: linear-gradient(to bottom, transparent, rgba(24,119,242,0.04), transparent);
          }
        `}} />

        {/* ── Desktop two-column / Mobile stacked ── */}
        <div className="flex flex-col lg:flex-row lg:min-h-[700px]">

          {/* ══════════════════════════════
              LEFT — OUR MISSION
          ══════════════════════════════ */}
          <div className="relative flex-1 flex items-center lg:min-h-0">

            {/* Badge full-bleed background (left column only) */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/police_badge_realistic.png"
                alt=""
                fill
                className="object-cover object-center opacity-25 scale-110"
                priority
              />
              {/* Vignette — on desktop fade right-edge into the adjacent column */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#010B19] via-[#010B19]/75 to-[#010B19]/50 lg:to-[#010B19]/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010B19] via-transparent to-[#010B19]/60" />
              <div className="scanline absolute inset-x-0 top-0 h-1/3 pointer-events-none" />
            </div>

            {/* Ambient glow */}
            <div className="glow-pulse absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* Mission text */}
            <div className="relative z-10 w-full px-5 sm:px-10 lg:px-14 xl:px-20 py-6 sm:py-16 lg:py-20">
              <SectionReveal>
                <div className="inline-flex items-center gap-3 mb-2 sm:mb-6 lg:mb-8">
                  <div className="h-px w-10 bg-[#1877F2]" />
                  <span className="text-[#1877F2] text-xs sm:text-sm font-black tracking-[0.3em] uppercase">Our Mission</span>
                </div>

                <h3 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-[-0.03em] leading-[0.88] text-white mb-0 sm:mb-6 lg:mb-8">
                  TO PROTECT<br />
                  THOSE WHO<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] via-blue-300 to-blue-500">
                    PROTECT US.
                  </span>
                </h3>

                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md font-medium hidden sm:block">
                  No officer or family should ever face trauma, investigation, or loss alone. We stand with them.
                </p>
              </SectionReveal>
            </div>

            {/* Desktop right-edge vertical separator */}
            <div className="hidden lg:block absolute right-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[#1877F2]/20 to-transparent" />
          </div>

          {/* ══════════════════════════════
              RIGHT — WHAT WE DO PILLARS
          ══════════════════════════════ */}
          <div className="relative flex-1 bg-[#020c1b] py-6 sm:py-10 lg:py-0 flex items-center">

            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            {/* Mobile: fade top edge from mission section colour */}
            <div className="lg:hidden absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#010B19] to-transparent pointer-events-none" />

            <div className="relative z-10 w-full px-5 sm:px-10 lg:px-10 xl:px-14 lg:py-20">

              {/* Header row */}
              <SectionReveal>
                <div className="flex items-end justify-between mb-5 sm:mb-8 lg:mb-10 gap-4 flex-wrap">
                  <div>
                    <div className="inline-flex items-center gap-3 mb-2">
                      <div className="h-px w-10 bg-[#1877F2]" />
                      <span className="text-[#1877F2] text-xs sm:text-sm font-black tracking-[0.3em] uppercase">What We Do</span>
                    </div>
                    <h4 className="text-lg sm:text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white leading-tight">
                      Four pillars of <span className="text-[#1877F2]">action.</span>
                    </h4>
                  </div>
                  <button
                    onClick={() => setIsGetInvolvedOpen(true)}
                    className="hidden sm:inline-flex shrink-0 items-center gap-3 bg-[#1877F2] hover:bg-white hover:text-[#010B19] text-white font-black text-xs tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 group cursor-pointer shadow-[0_8px_24px_rgba(24,119,242,0.35)]"
                  >
                    Get Involved
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </SectionReveal>

              {/* 2 × 2 Pillar Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">

                {/* Pillar 1 */}
                <SectionReveal delay={0.05}>
                  <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-[#0c1a30] backdrop-blur-sm p-4 sm:p-6 overflow-hidden transition-all duration-500 hover:border-[#1877F2]/40 hover:shadow-[0_20px_60px_rgba(24,119,242,0.12)]">
                    <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-5xl font-black text-white/[0.04] select-none leading-none">01</span>
                    <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-transparent group-hover:bg-[#1877F2] transition-all duration-300" />
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-400 mb-3 shadow-md">
                      <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h5 className="font-black text-xs sm:text-sm text-white uppercase tracking-wider mb-1 group-hover:text-[#1877F2] transition-colors duration-300 leading-tight">
                      Raise Awareness
                    </h5>
                    <p className="text-slate-400 text-[11px] sm:text-xs leading-snug font-medium group-hover:text-slate-200 transition-colors duration-300 hidden sm:block">
                      Start conversations that challenge stigma and drive change.
                    </p>
                  </div>
                </SectionReveal>

                {/* Pillar 2 */}
                <SectionReveal delay={0.1}>
                  <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-[#0c1a30] backdrop-blur-sm p-4 sm:p-6 overflow-hidden transition-all duration-500 hover:border-[#1877F2]/40 hover:shadow-[0_20px_60px_rgba(24,119,242,0.12)]">
                    <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-5xl font-black text-white/[0.04] select-none leading-none">02</span>
                    <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-transparent group-hover:bg-[#1877F2] transition-all duration-300" />
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-400 mb-3 shadow-md">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h5 className="font-black text-xs sm:text-sm text-white uppercase tracking-wider mb-1 group-hover:text-[#1877F2] transition-colors duration-300 leading-tight">
                      Support
                    </h5>
                    <p className="text-slate-400 text-[11px] sm:text-xs leading-snug font-medium group-hover:text-slate-200 transition-colors duration-300 hidden sm:block">
                      Practical resources, crisis guidance, and real community.
                    </p>
                  </div>
                </SectionReveal>

                {/* Pillar 3 */}
                <SectionReveal delay={0.15}>
                  <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-[#0c1a30] backdrop-blur-sm p-4 sm:p-6 overflow-hidden transition-all duration-500 hover:border-[#1877F2]/40 hover:shadow-[0_20px_60px_rgba(24,119,242,0.12)]">
                    <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-5xl font-black text-white/[0.04] select-none leading-none">03</span>
                    <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-transparent group-hover:bg-[#1877F2] transition-all duration-300" />
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-400 mb-3 shadow-md">
                      <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h5 className="font-black text-xs sm:text-sm text-white uppercase tracking-wider mb-1 group-hover:text-[#1877F2] transition-colors duration-300 leading-tight">
                      Advocate
                    </h5>
                    <p className="text-slate-400 text-[11px] sm:text-xs leading-snug font-medium group-hover:text-slate-200 transition-colors duration-300 hidden sm:block">
                      Campaign for reform, fairness, and accountability.
                    </p>
                  </div>
                </SectionReveal>

                {/* Pillar 4 */}
                <SectionReveal delay={0.2}>
                  <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-[#0c1a30] backdrop-blur-sm p-4 sm:p-6 overflow-hidden transition-all duration-500 hover:border-[#1877F2]/40 hover:shadow-[0_20px_60px_rgba(24,119,242,0.12)]">
                    <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-5xl font-black text-white/[0.04] select-none leading-none">04</span>
                    <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-transparent group-hover:bg-[#1877F2] transition-all duration-300" />
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-400 mb-3 shadow-md">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h5 className="font-black text-xs sm:text-sm text-white uppercase tracking-wider mb-1 group-hover:text-[#1877F2] transition-colors duration-300 leading-tight">
                      Remember
                    </h5>
                    <p className="text-slate-400 text-[11px] sm:text-xs leading-snug font-medium group-hover:text-slate-200 transition-colors duration-300 hidden sm:block">
                      Honour every officer lost — never forgotten.
                    </p>
                  </div>
                </SectionReveal>
              </div>

              {/* Mobile-only CTA */}
              <SectionReveal delay={0.25}>
                <button
                  onClick={() => setIsGetInvolvedOpen(true)}
                  className="sm:hidden w-full mt-3 flex items-center justify-between bg-[#1877F2] hover:bg-blue-700 text-white font-black text-sm tracking-widest uppercase px-5 py-4 rounded-2xl transition-all duration-300 shadow-[0_8px_20px_rgba(24,119,242,0.3)] cursor-pointer group"
                >
                  <span>Get Involved</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SectionReveal>

            </div>
          </div>

        </div>
      </section>


      {/* FOUNDER & FOUNDING MEMBERS */}
      <FounderShowcase />

      {/* STATISTICS */}
      <AwarenessStatisticsSection
        stats={data.stats}
        footnote={data.informationAlert.footnote}
      />



      <HomeEventsPreview events={data.events} />


      {/* NEWSLETTER */}
      <section className="relative bg-[#010B19] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,119,242,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1877F2]/30 to-transparent" />
        <div className="relative z-10 w-full max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-3 mb-4 justify-center">
              <div className="h-px w-8 bg-[#1877F2]" />
              <span className="text-[#1877F2] text-xs font-black tracking-[0.3em] uppercase">Stay Informed</span>
              <div className="h-px w-8 bg-[#1877F2]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-3 leading-tight">
              Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">Movement.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Get updates on campaigns, support resources, and advocacy wins — direct to your inbox.
            </p>

            {isSubscribed ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#1877F2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-black text-lg uppercase tracking-wider">You&apos;re in!</p>
                <p className="text-slate-400 text-sm">Thank you for joining. Watch your inbox.</p>
              </div>
            ) : (
              <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/[0.05] border border-white/10 focus:border-[#1877F2]/60 text-white placeholder-slate-500 text-sm font-medium px-5 py-4 rounded-2xl outline-none transition-colors duration-200"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="shrink-0 bg-[#1877F2] hover:bg-white hover:text-[#010B19] disabled:opacity-60 text-white font-black text-xs tracking-widest uppercase px-7 py-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-[0_8px_24px_rgba(24,119,242,0.3)]"
                >
                  {isSubscribing ? "Joining..." : "Subscribe"}
                </button>
              </form>
            )}
            {error && <p className="mt-3 text-red-400 text-xs font-medium">{error}</p>}
          </SectionReveal>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1877F2]/20 to-transparent" />
      </section>

      <GetInvolvedModal
        isOpen={isGetInvolvedOpen}
        onClose={() => setIsGetInvolvedOpen(false)}
      />

    </div>
  );
}

