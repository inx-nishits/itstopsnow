"use client";

import React, { useState, useRef } from "react";
import { Shield, ShieldAlert, Heart, Activity, ExternalLink, Headphones, Smartphone, CheckCircle, HeartPulse, ChevronLeft, ChevronRight, Grid, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditorialSection, CampaignSection } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
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

      {/* 2. WHO IS POCKET SERGEANT */}
      <EditorialSection className="py-12 sm:py-20 lg:py-28 overflow-hidden">
        {/* Abstract SVG line art — top-right decoration */}
        <svg className="absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.07] pointer-events-none select-none" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="340" cy="80" r="180" stroke="#1877F2" strokeWidth="1"/>
          <circle cx="340" cy="80" r="130" stroke="#1877F2" strokeWidth="0.75"/>
          <circle cx="340" cy="80" r="80" stroke="#1877F2" strokeWidth="0.5"/>
          <line x1="0" y1="420" x2="420" y2="0" stroke="#1877F2" strokeWidth="0.5"/>
          <line x1="0" y1="380" x2="380" y2="0" stroke="#1877F2" strokeWidth="0.4"/>
          <line x1="0" y1="340" x2="340" y2="0" stroke="#1877F2" strokeWidth="0.3"/>
        </svg>
        {/* Abstract SVG line art — bottom-left decoration */}
        <svg className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-[0.05] pointer-events-none select-none" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="60" cy="240" r="160" stroke="#1877F2" strokeWidth="1"/>
          <circle cx="60" cy="240" r="100" stroke="#1877F2" strokeWidth="0.6"/>
          <line x1="0" y1="0" x2="300" y2="300" stroke="#1877F2" strokeWidth="0.5"/>
          <line x1="40" y1="0" x2="300" y2="260" stroke="#1877F2" strokeWidth="0.4"/>
        </svg>

        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

            {/* Left: Text content */}
            <div className="flex-1 min-w-0">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#1877F2]" />
                <span className="text-[#1877F2] font-bold text-xs tracking-[0.25em] uppercase">About Pocket Sergeant</span>
              </div>

              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8 leading-none ${hybrid.editorialHeading}`}>
                WHO IS<br />POCKET<br />SERGEANT?
              </h2>

              <p className={`${hybrid.editorialBody} leading-relaxed font-medium mb-6 text-sm sm:text-base md:text-lg max-w-xl`}>
                Pocket Sergeant is the UK&apos;s leading app for police officers and staff. Created by former police officer <strong className="text-[#010B19] font-bold">Paul Cooper</strong>, it was built to solve a simple problem: officers needed quick, reliable access to the law, operational guidance, and wellbeing resources while out on the street.
              </p>

              {/* Pull-quote bar */}
              <div className="border-l-[3px] border-[#1877F2] pl-5 py-1 mb-6 max-w-xl">
                <p className="text-[#010B19] font-semibold text-sm sm:text-base md:text-lg leading-relaxed italic">
                  "Our mission goes beyond making the job easier — we want to make it safer, mentally and emotionally."
                </p>
              </div>

              <p className={`${hybrid.editorialBody} leading-relaxed font-medium text-sm sm:text-base md:text-lg max-w-xl`}>
                Today, it is used by thousands of officers every single day. That&apos;s why we are funding the &lsquo;It Stops Now&rsquo; campaign.
              </p>
            </div>

            {/* Right: Visual stat cards */}
            <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-4">
              {/* Stat pill 1 */}
              <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden group hover:border-[#1877F2]/40 hover:shadow-md transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#1877F2]/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#010B19] tracking-tighter leading-none mb-1">10,000+</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Active Officers Daily</div>
                  </div>
                </div>
              </div>

              {/* Stat pill 2 */}
              <div className="relative bg-[#1877F2] rounded-2xl p-6 shadow-lg overflow-hidden group hover:bg-[#1565d8] transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white tracking-tighter leading-none mb-1">UK #1</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-100">Police App Platform</div>
                  </div>
                </div>
              </div>

              {/* Stat pill 3 */}
              <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden group hover:border-[#1877F2]/40 hover:shadow-md transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#1877F2]/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#010B19] tracking-tighter leading-none mb-1">100%</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Funded by Pocket Sergeant</div>
                  </div>
                </div>
              </div>

              {/* Founder badge */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#1877F2]/30 shrink-0">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" alt="Paul Cooper" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-[#010B19]">Paul Cooper</div>
                  <div className="text-[10px] text-slate-500 font-medium">Founder · Former Police Officer</div>
                </div>
                <div className="ml-auto shrink-0 bg-[#1877F2]/10 text-[#1877F2] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">Creator</div>
              </div>
            </div>

          </div>
        </div>
      </EditorialSection>




      {/* WHY SUPPORTING THIS MOVEMENT */}
      <section className="py-10 sm:py-20 lg:py-24 w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
        <div className="md:bg-[#050B14] md:rounded-2xl md:border md:border-white/5 overflow-hidden flex flex-col lg:flex-row relative items-stretch">
          
          {/* Left Text */}
          <div className="flex-1 pt-0 pb-8 md:p-12 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 text-balance max-w-md">
              WHY ARE THEY SUPPORTING<br />THIS MOVEMENT?
            </h2>
            <div className="w-8 h-1 bg-[#1877F2] mb-6"></div>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-md">
              Pocket Sergeant believes no officer should feel unsupported, silenced or forgotten. Supporting It Stops Now is part of a wider commitment to improving officer wellbeing and driving meaningful change across policing.
            </p>
          </div>

          {/* Middle Quote */}
          <div className="flex-1 pt-8 pb-4 md:p-12 lg:p-14 flex flex-col justify-center relative z-10">
            <div className="flex items-start gap-4 md:gap-6">
              <span className="text-[#1877F2] text-6xl md:text-7xl font-serif leading-none mt-1 shrink-0">“</span>
              <div>
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-6 sm:mb-8 max-w-sm">
                  We know the pressures of policing are real. We've been there. We created Pocket Sergeant to make a difference – and we support It Stops Now to help create lasting change for today's officers and those who come after us.
                </p>
                <div>
                  <div className="text-[#1877F2] font-bold text-sm md:text-base">Paul Cooper</div>
                  <div className="text-slate-400 text-xs md:text-sm">Founder, Pocket Sergeant</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[350px] shrink-0 relative min-h-[300px] lg:min-h-0 bg-[#020611] rounded-2xl md:rounded-none overflow-hidden mt-3 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] md:from-[#050B14] to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-[#050B14] z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
              alt="Paul Cooper" 
              className="absolute inset-0 w-full h-full object-cover object-top mix-blend-luminosity opacity-80"
            />
          </div>

        </div>
      </section>

      {/* FOUNDING MEMBERS SECTION */}
      <section className="py-10 sm:py-20 lg:py-24 relative overflow-hidden border-t border-white/5 bg-[#030712]">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          
          {/* Header with view toggle */}
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
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-12 sm:py-20 lg:py-28 bg-[#020811] relative overflow-hidden border-t border-white/5">
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
              <div key={idx} className={`flex items-start mb-8 md:mb-4 lg:mb-6 relative ${idx > 0 ? 'md:-mt-6 lg:-mt-8' : ''}`}>

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

