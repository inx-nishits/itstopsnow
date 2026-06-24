"use client";

import Link from "next/link";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import HomeHero from "@/components/home/HomeHero";
import SectionReveal from "@/components/home/SectionReveal";
import HomeEventsPreview from "@/components/home/HomeEventsPreview";
import InformationAlertBox from "@/components/home/InformationAlertBox";
import AwarenessStatisticsSection from "@/components/home/AwarenessStatisticsSection";
import type { HomepageData } from "@/lib/homepage/types";
import GetInvolvedModal from "@/components/global/GetInvolvedModal";
import FounderShowcase from "@/components/shared/FounderShowcase";

interface HomePageClientProps {
  data: HomepageData;
}

export default function HomePageClient({ data }: HomePageClientProps) {
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <div className="flex flex-col">
        <div className="order-3 md:order-1 w-full">
          <InformationAlertBox alert={data.informationAlert} />
        </div>
        <div className="order-1 md:order-2 w-full">
          <HomeHero onGetInvolvedClick={() => setIsGetInvolvedOpen(true)} />
        </div>
        <div className="order-2 md:order-3 w-full">
          <AwarenessStatisticsSection
            stats={data.stats}
            footnote={data.informationAlert.footnote}
          />
        </div>
      </div>

      {/* WHY IT STOPS NOW — light editorial */}
      <section className="theme-editorial relative bg-white text-[#010B19] py-16 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[min(800px,90vw)] h-[min(800px,90vw)] bg-[#1877F2]/[0.03] rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center">
            
            <SectionReveal className="flex flex-col justify-center lg:col-span-5">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Why It Stops Now</h2>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#010B19] tracking-tight leading-[1.12] mb-5 sm:mb-6 text-balance">
                EVERY NUMBER IS <br className="hidden lg:block" />
                <span className="text-slate-500">A LIFE LEFT BEHIND.</span>
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl font-medium">
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
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:min-h-[240px] lg:min-h-[280px]">
                <Image
                  src="/images/quote-bg.png"
                  alt="Supportive holding background"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010B19] via-[#010B19]/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#010B19]/40 md:to-[#010B19]/85" />
              </div>

              <div className="relative md:absolute md:inset-0 flex flex-col justify-end md:justify-center p-6 sm:p-8 md:p-10 lg:p-12 bg-[#010B19] md:bg-transparent">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#1877F2]/60 mb-3 sm:mb-4 md:text-[#1877F2]/50 shrink-0" />
                <p className="text-base sm:text-xl md:text-2xl text-white font-medium leading-[1.45] tracking-tight mb-5 sm:mb-6 md:mb-8 max-w-2xl text-balance">
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

          {/* Issue areas — editorial list on light surface */}
          <SectionReveal delay={0.12} className="mt-12 sm:mt-16 lg:mt-20 pt-10 sm:pt-12 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            
            <div className="py-5 md:py-0 border-b md:border-b-0 border-slate-200 md:border-l-2 md:border-[#1877F2]/25 md:pl-7 first:md:border-l-0 first:md:pl-0 group">
              <div className="w-10 h-10 bg-[#1877F2]/10 rounded-lg flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#010B19] tracking-wide mb-3">Systemic Failures</h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">The current investigative bodies act without accountability, leaving officers suspended in limbo for years for simply doing their duty.</p>
            </div>

            <div className="py-5 md:py-0 border-b md:border-b-0 border-slate-200 md:border-l-2 md:border-[#1877F2]/25 md:pl-7 group">
              <div className="w-10 h-10 bg-[#1877F2]/10 rounded-lg flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#010B19] tracking-wide mb-3">Mental Health Toll</h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">Prolonged investigations are destroying families and lives. We demand a 12-month time limit to prevent further psychological damage.</p>
            </div>

            <div className="py-5 md:py-0 md:border-l-2 md:border-[#1877F2]/25 md:pl-7 group">
              <div className="w-10 h-10 bg-[#1877F2]/10 rounded-lg flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#010B19] tracking-wide mb-3">Legal Protection</h3>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">Officers deserve immediate, robust legal support after critical incidents, untainted by political pressures or media narratives.</p>
            </div>

          </div>
          </SectionReveal>

        </div>
      </section>

      {/* OUR MISSION — dark campaign */}
      <section className="relative bg-[#030712] text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          
          <SectionReveal>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Our Mission</h2>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-[1.08] text-balance">
                A Future Where <br className="hidden md:block"/> No Officer <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Stands Alone.</span>
              </h3>
            </div>
            <p className="text-slate-400 text-base sm:text-lg max-w-lg font-medium leading-relaxed">
              We are building a comprehensive support system to ensure every officer is valued, supported, and protected throughout their service and beyond.
            </p>
          </div>
          </SectionReveal>
          
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:overflow-visible md:pb-0 scrollbar-none">
            
            {/* Pillar 1 */}
            <SectionReveal delay={0} className="min-w-[78vw] sm:min-w-[280px] md:min-w-0 snap-center">
            <div className="group relative p-5 md:p-6 lg:p-8 h-full bg-gradient-to-br from-[#1877F2]/[0.08] to-transparent border border-[#1877F2]/20 rounded-2xl hover:border-[#1877F2]/40 transition-colors duration-300 overflow-hidden min-h-[220px] sm:min-h-[240px]">
              <div className="absolute top-0 right-0 text-[96px] font-black text-white/[0.04] pointer-events-none leading-none tracking-tighter">1</div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1877F2]/15 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  </div>
                  <span className="text-slate-500 font-black tracking-widest text-[10px] uppercase">Pillar 01</span>
                </div>
                <div className="pt-8">
                  <h3 className="font-black text-lg sm:text-xl text-white mb-2 uppercase tracking-tighter leading-none">Raise Awareness</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Start conversations that create lasting, systemic change in public perception.</p>
                </div>
              </div>
            </div>
            </SectionReveal>

            {/* Pillar 2 */}
            <SectionReveal delay={0.05} className="min-w-[78vw] sm:min-w-[280px] md:min-w-0 snap-center">
            <div className="group relative p-5 md:p-6 lg:p-8 h-full bg-[#050A14] border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-300 overflow-hidden min-h-[220px] sm:min-h-[240px]">
              <div className="absolute top-0 right-0 text-[96px] font-black text-white/[0.04] pointer-events-none leading-none tracking-tighter">2</div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </div>
                  <span className="text-slate-500 font-black tracking-widest text-[10px] uppercase">Pillar 02</span>
                </div>
                <div className="pt-8">
                  <h3 className="font-black text-lg sm:text-xl text-white mb-2 uppercase tracking-tighter leading-none">Support Families</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Stand beside families in their darkest times, providing stability and care.</p>
                </div>
              </div>
            </div>
            </SectionReveal>

            {/* Pillar 3 */}
            <SectionReveal delay={0.1} className="min-w-[78vw] sm:min-w-[280px] md:min-w-0 snap-center">
            <div className="group relative p-5 md:p-6 lg:p-8 h-full bg-[#050A14] border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-300 overflow-hidden min-h-[220px] sm:min-h-[240px]">
              <div className="absolute top-0 right-0 text-[96px] font-black text-white/[0.04] pointer-events-none leading-none tracking-tighter">3</div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                  </div>
                  <span className="text-slate-500 font-black tracking-widest text-[10px] uppercase">Pillar 03</span>
                </div>
                <div className="pt-8">
                  <h3 className="font-black text-lg sm:text-xl text-white mb-2 uppercase tracking-tighter leading-none">Drive Change</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Push for systemic legislative change that saves lives and demands accountability.</p>
                </div>
              </div>
            </div>
            </SectionReveal>

            {/* Pillar 4 */}
            <SectionReveal delay={0.15} className="min-w-[78vw] sm:min-w-[280px] md:min-w-0 snap-center">
            <div className="group relative p-5 md:p-6 lg:p-8 h-full bg-gradient-to-br from-[#1877F2]/[0.08] to-transparent border border-[#1877F2]/20 rounded-2xl hover:border-[#1877F2]/40 transition-colors duration-300 overflow-hidden min-h-[220px] sm:min-h-[240px]">
              <div className="absolute top-0 right-0 text-[96px] font-black text-white/[0.04] pointer-events-none leading-none tracking-tighter">4</div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1877F2]/15 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                  </div>
                  <span className="text-slate-500 font-black tracking-widest text-[10px] uppercase">Pillar 04</span>
                </div>
                <div className="pt-8">
                  <h3 className="font-black text-lg sm:text-xl text-white mb-2 uppercase tracking-tighter leading-none">Build Community</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Ensure no one in blue ever stands alone through peer-to-peer support networks.</p>
                </div>
              </div>
            </div>
            </SectionReveal>

          </div>
        </div>
      </section>
      {/* MISSION STATEMENT BANNER — light editorial */}
      <section className="theme-editorial relative w-full py-16 sm:py-20 lg:py-28 bg-[#f4f5f7] text-[#010B19] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent pointer-events-none" />
        
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            
            <SectionReveal className="w-full lg:w-1/2">
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[min(560px,72vh)] shadow-xl border border-slate-200 group">
                <Image
                  src="/images/mission-support.png"
                  alt="Officers Standing Shoulder to Shoulder"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010B19]/70 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1877F2] animate-pulse"></div>
                  <span className="text-white text-xs font-black tracking-widest uppercase">The Mission</span>
                </div>
              </div>

              <div className="lg:absolute relative mt-6 lg:mt-0 lg:-bottom-8 lg:-right-8 xl:-right-12 w-full lg:w-[min(400px,90%)] ml-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl z-20">
                <Quote className="w-9 h-9 text-[#1877F2] mb-5 opacity-80" />
                <p className="text-[#010B19] text-base sm:text-lg lg:text-xl font-medium leading-relaxed mb-5 italic">
                  "This organization is not just about reform; it's about saving lives right now. They stepped in when no one else would listen."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-[2px] bg-[#1877F2]"></div>
                  <div>
                    <p className="text-[#010B19] font-bold text-xs uppercase tracking-widest">Sgt. David Miller</p>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">Police Federation</p>
                  </div>
                </div>
              </div>
            </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-[1px] bg-[#1877F2]"></div>
                <span className="text-[#1877F2] text-xs font-bold tracking-[0.3em] uppercase">Why We Stand</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#010B19] mb-6 sm:mb-8 leading-[1.06] text-balance">
                Our Mission <br/>
                <span className="text-[#1877F2]">Is Clear.</span>
              </h3>
              
              <div className="space-y-5 sm:space-y-6 border-l-2 border-slate-200 pl-6 sm:pl-8 lg:pl-10 relative">
                <div className="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-[#1877F2] to-transparent"></div>
                <p className="text-slate-800 text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium">
                  We are building an unshakeable foundation of support to ensure that no police officer or family member ever has to face the devastating consequences of systemic investigations alone. 
                </p>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  We stand for fairness, mental health advocacy, and swift justice. By providing urgent crisis intervention, independent legal support, and driving legislative reform, we ensure the protectors are protected.
                </p>
              </div>

              <div className="mt-8 sm:mt-10">
                <Link href="/about">
                  <Button className="bg-[#1877F2] text-white hover:bg-[#010B19] hover:text-white font-black px-8 sm:px-10 py-6 sm:py-7 rounded-full text-xs tracking-widest uppercase transition-all hover:-translate-y-0.5">
                    Discover Our Story
                  </Button>
                </Link>
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>


      {/* FOUNDING MEMBERS — dark campaign */}
      <FounderShowcase />

      <HomeEventsPreview events={data.events} />

      <GetInvolvedModal
        isOpen={isGetInvolvedOpen}
        onClose={() => setIsGetInvolvedOpen(false)}
      />

    </div>
  );
}

