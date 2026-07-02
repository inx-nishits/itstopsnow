"use client";

import React, { useState, useRef } from "react";
import { Shield, ChevronLeft, ChevronRight, Grid, LayoutGrid } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import AboutMovementSection from "@/components/about/AboutMovementSection";
import { FOUNDERS, FounderCard, BioModal } from "@/components/shared/FounderShowcase";

export default function AboutPage() {
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -370, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 370, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      <PageHero
        animate
        eyebrow={
          <>
            <Shield className="w-5 h-5 shrink-0" /> OUR SUPPORTER
          </>
        }
        title={
          <>
            <span className="text-white">DRIVEN BY THOSE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              WHO KNOW THE JOB.
            </span>
          </>
        }
        description="It Stops Now is proudly funded and supported by Pocket Sergeant – the essential app created by police, for police. We believe that officer wellbeing and reform are not optional; they are critical."
        imageSrc="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1920"
        imageAlt="Protest movement"
      />

      <AboutMovementSection />




      {/* WHY SUPPORTING + FOUNDING MEMBERS — single dark section */}
      <section className="relative overflow-hidden bg-[#030712] border-t border-white/5">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">

          {/* Why supporting */}
          <div className="pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 lg:pb-14">
            <div className="bg-[#050B14] rounded-2xl border border-white/5 overflow-hidden flex flex-col lg:flex-row relative items-stretch">
              <div className="flex-1 pt-0 pb-8 md:p-12 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 text-balance max-w-md">
                  WHY ARE THEY SUPPORTING<br />THIS MOVEMENT?
                </h2>
                <div className="w-8 h-1 bg-[#1877F2] mb-6" />
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-md">
                  Pocket Sergeant believes no officer should feel unsupported, silenced or forgotten. Supporting It Stops Now is part of a wider commitment to improving officer wellbeing and driving meaningful change across policing.
                </p>
              </div>

              <div className="flex-1 pt-8 pb-4 md:p-12 lg:p-14 flex flex-col justify-center relative z-10">
                <div className="flex items-start gap-4 md:gap-6">
                  <span className="text-[#1877F2] text-6xl md:text-7xl font-serif leading-none mt-1 shrink-0">&ldquo;</span>
                  <div>
                    <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-6 sm:mb-8 max-w-sm">
                      We know the pressures of policing are real. We&apos;ve been there. We created Pocket Sergeant to make a difference – and we support It Stops Now to help create lasting change for today&apos;s officers and those who come after us.
                    </p>
                    <div>
                      <div className="text-[#1877F2] font-bold text-sm md:text-base">Paul Cooper</div>
                      <div className="text-slate-400 text-xs md:text-sm">Founder, Pocket Sergeant</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[350px] shrink-0 relative min-h-[300px] lg:min-h-0 bg-[#020611] rounded-2xl lg:rounded-none overflow-hidden mt-3 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] lg:from-[#050B14] to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-[#050B14] z-10" />
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
                  alt="Paul Cooper"
                  className="absolute inset-0 w-full h-full object-cover object-top mix-blend-luminosity opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Founding members — flows directly below */}
          <div className="pb-10 sm:pb-20 lg:pb-24 pt-6 sm:pt-8 lg:pt-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-10 md:border-b md:border-white/5 md:pb-6">
            <div className="text-left">
              <span className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-2 block">Founding Members</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white text-balance leading-none">
                THE PEOPLE BEHIND THE MISSION
              </h2>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-medium mt-3 max-w-2xl">
                A dedicated team with lived experience and a shared passion for change.
              </p>
            </div>
            
            <div className="flex shrink-0">
              <button
                onClick={() => setViewMode(viewMode === "carousel" ? "grid" : "carousel")}
                className="flex items-center gap-2 border border-white/10 hover:border-[#1877F2] bg-white/5 hover:bg-[#1877F2]/10 text-white rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                {viewMode === "carousel" ? (
                  <>
                    <Grid className="w-4 h-4 text-[#1877F2]" /> View All Grid
                  </>
                ) : (
                  <>
                    <LayoutGrid className="w-4 h-4 text-[#1877F2]" /> Show Carousel
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Conditional layout (Carousel vs Grid) */}
          {viewMode === "carousel" ? (
            <div className="relative w-full max-w-[1600px] mx-auto mt-8 md:mt-12 group">
              {/* Scroll Buttons */}
              <button 
                onClick={scrollLeft}
                className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-[#050A14]/90 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors shadow-xl"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button 
                onClick={scrollRight}
                className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-[#050A14]/90 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors shadow-xl"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 sm:gap-6 snap-x snap-mandatory scrollbar-hide px-4 sm:px-8 pb-4"
              >
                {FOUNDERS.map((member, i) => (
                  <div key={`${member.name}-${i}`} className="snap-center shrink-0 w-[85vw] max-w-[340px] md:max-w-[370px]">
                    <FounderCard member={member} onOpenBio={() => setSelectedMember(member)} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto mt-8 md:mt-12">
              {FOUNDERS.map((member, i) => (
                <div key={`${member.name}-${i}`} className="w-full">
                  <FounderCard member={member} onOpenBio={() => setSelectedMember(member)} />
                </div>
              ))}
            </div>
          )}

          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="pt-12 sm:pt-20 lg:pt-28 pb-4 sm:pb-6 lg:pb-8 bg-[#020811] relative overflow-hidden border-t border-white/5">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#1877F2]/3 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[#1877F2]/3 rounded-full blur-[120px]" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">

          {/* Section header — centred */}
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#1877F2]" />
              <span className="text-[#1877F2] font-bold text-xs tracking-[0.25em] uppercase">How We Got Here</span>
              <div className="w-8 h-[2px] bg-[#1877F2]" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-4">
              A MOVEMENT BORN<br className="hidden sm:block" /> FROM{" "}
              <span className="text-[#1877F2]">REALITY.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
              This movement exists because of the stories we heard, the pain we witnessed and the change we knew needed to happen.
            </p>
          </div>

          {/* Timeline — alternating left/right on desktop, single-column on mobile */}
          <div className="relative max-w-3xl lg:max-w-5xl mx-auto">

            {/* Vertical line through the centre of the dot column */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#1877F2]/80 via-[#1877F2]/40 to-[#1877F2]/10 md:-translate-x-px pointer-events-none" />

            {[
              {
                period: "2019 – 2022",
                title: "YEARS OF LISTENING",
                body: "We listened to serving officers, former officers and families across the UK. The same themes kept coming up: trauma, isolation, lengthy investigations and a lack of support.",
                side: "right",
              },
              {
                period: "2022 – 2023",
                title: "A GROWING NEED",
                body: "More stories emerged. Too many officers were suffering in silence. We saw the urgent need for awareness, support and reform.",
                side: "left",
              },
              {
                period: "2024",
                title: "A DECISION TO ACT",
                body: "Rather than simply talking about the problem, we decided to build a movement that would do something about it.",
                side: "right",
              },
              {
                period: "2025",
                title: "IT STOPS NOW WAS CREATED",
                body: "It Stops Now was founded to raise awareness, support officers and families, share real stories and campaign for meaningful change.",
                side: "left",
              },
              {
                period: "TODAY & BEYOND",
                title: "BUILDING A STRONGER FUTURE TOGETHER",
                body: "We're a growing movement of officers, families and supporters standing together to ensure no one in policing has to face these challenges alone.",
                side: "right",
              },
            ].map((item, idx) => (
              <div key={idx} className={`flex items-start mb-8 md:mb-4 lg:mb-6 last:mb-0 relative ${idx > 0 ? 'md:-mt-6 lg:-mt-8' : ''}`}>

                {/* ── MOBILE layout (hidden on md+): [dot-col] [card] ── */}
                <>
                  {/* Dot column — always to the LEFT of the card on mobile */}
                  <div className="md:hidden shrink-0 w-[38px] flex justify-center pt-[22px] relative z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#1877F2] border-2 border-[#020811] shadow-[0_0_12px_rgba(24,119,242,0.7)]" />
                  </div>

                  {/* Card — mobile, takes remaining width */}
                  <div className="md:hidden flex-1 min-w-0">
                    <div className="bg-[#050B18] border border-white/[0.07] rounded-2xl p-5 hover:border-[#1877F2]/30 transition-colors group relative overflow-hidden text-left">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
                      <div className="text-[#1877F2] font-bold text-[10px] tracking-[0.25em] uppercase mb-2">{item.period}</div>
                      <h3 className="text-white font-black uppercase tracking-tight text-base leading-tight mb-3">{item.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.body}</p>
                    </div>
                  </div>
                </>

                {/* ── DESKTOP layout (hidden on mobile): [card/spacer] [dot-col] [spacer/card] ── */}
                <div className={`hidden md:flex flex-1 items-start gap-0 ${item.side === "left" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Content card half */}
                  <div className={`flex-1 ${item.side === "left" ? "pl-10" : "pr-10"}`}>
                    <div className="bg-[#050B18] border border-white/[0.07] rounded-2xl p-6 hover:border-[#1877F2]/30 transition-colors group relative overflow-hidden text-left">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
                      <div className="text-[#1877F2] font-bold text-xs tracking-[0.25em] uppercase mb-2">{item.period}</div>
                      <h3 className="text-white font-black uppercase tracking-tight text-xl leading-tight mb-3">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.body}</p>
                    </div>
                  </div>

                  {/* Dot — centred between both halves, in flex flow, never overlapping */}
                  <div className="shrink-0 w-[38px] flex justify-center pt-7 relative z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#1877F2] border-2 border-[#020811] shadow-[0_0_12px_rgba(24,119,242,0.7)]" />
                  </div>

                  {/* Empty spacer half */}
                  <div className="flex-1" />
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>


      <BioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </div>
  );
}

