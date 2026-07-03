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
        imageSrc="/images/uk_police_london_v2.png"
        imageAlt="UK Police Officers facing London at dusk"
      />

      <AboutMovementSection />




      {/* WHY SUPPORTING + FOUNDING MEMBERS — single dark section */}
      <section className="relative overflow-hidden bg-[#030712] border-t border-white/5">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">

          {/* Why supporting */}
          <div className="pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 lg:pb-14">
            <div className="relative w-full bg-gradient-to-r from-[#1877F2]/40 via-blue-500/10 to-transparent p-[1.5px] rounded-3xl shadow-2xl">
              <div className="relative w-full bg-[#050A14] rounded-3xl min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#1877F2]/5 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 rounded-3xl bg-[#050A14]">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200" 
                    alt="Paul Cooper" 
                    className="absolute top-0 right-0 w-[120%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-full object-cover object-top lg:object-[center_15%] translate-x-[25%] sm:translate-x-[20%] md:translate-x-[15%] lg:translate-x-[10%] mix-blend-luminosity opacity-100 sm:opacity-70" 
                    style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%)', maskImage: 'linear-gradient(to right, transparent, black 25%)' }}
                  />
                  {/* Strong fade gradient from left to transparent on the right, keeping text legible */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[35%] sm:from-[40%] md:from-[45%] via-[#050A14]/90 via-[55%] sm:via-[60%] to-transparent pointer-events-none" />
                  {/* Mobile bottom-to-top gradient to ensure text readability if it stacks */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] from-[5%] via-[#050A14]/60 to-transparent sm:hidden pointer-events-none" />
                </div>

                {/* Foreground Content: Info */}
                <div className="w-[70%] sm:w-[80%] md:w-[75%] lg:w-[65%] flex flex-col justify-center text-left relative z-10 p-5 sm:p-8 lg:p-12 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px]">
                  
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-3 sm:mb-6 text-balance leading-[1.1]">
                    WHY ARE THEY SUPPORTING<br className="hidden sm:block" /> THIS MOVEMENT?
                  </h2>
                  
                  <div className="w-6 sm:w-8 h-1 bg-[#1877F2] mb-3 sm:mb-6" />
                  
                  <p className="hidden sm:block text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-6 lg:mb-8 pr-4 sm:pr-0">
                    Pocket Sergeant believes no officer should feel unsupported, silenced or forgotten. Supporting It Stops Now is part of a wider commitment to improving officer wellbeing and driving meaningful change across policing.
                  </p>
                  <p className="sm:hidden text-slate-300 text-xs leading-relaxed font-medium mb-4 pr-1">
                    Pocket Sergeant believes no officer should feel unsupported. Backing this movement reflects our commitment to improving officer wellbeing.
                  </p>
                  
                  <div className="relative flex items-start gap-2 sm:gap-4 text-left pr-1 sm:pr-0">
                    <span className="text-[#1877F2] text-4xl sm:text-6xl font-serif leading-none mt-1 shrink-0">&ldquo;</span>
                    <div className="flex flex-col">
                      <p className="hidden sm:block text-slate-300 italic text-xs sm:text-sm lg:text-base leading-relaxed font-medium mt-1 lg:mt-2 mb-4">
                        We know the pressures of policing are real. We&apos;ve been there. We created Pocket Sergeant to make a difference – and we support It Stops Now to help create lasting change for today&apos;s officers and those who come after us.
                      </p>
                      <p className="sm:hidden text-slate-300 italic text-xs leading-relaxed font-medium mt-1 mb-3">
                        We know the pressures of policing are real. We created Pocket Sergeant to make a difference, and we back It Stops Now to help create lasting change.
                      </p>
                      <div>
                        <div className="text-[#1877F2] font-bold text-xs sm:text-sm md:text-base">Paul Cooper</div>
                        <div className="text-slate-400 text-xs sm:text-xs">Founder, Pocket Sergeant</div>
                      </div>
                    </div>
                  </div>
                  
                </div>
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 max-w-[1600px] mx-auto mt-8 md:mt-12 px-2 sm:px-0">
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
      <section className="pt-12 sm:pt-20 lg:pt-28 pb-4 sm:pb-6 lg:pb-8 bg-[#020811] relative border-t border-white/5">
        
        {/* Background Image — Positioned on the top right */}
        <div className="absolute top-0 right-0 w-full md:w-[600px] h-[500px] pointer-events-none opacity-90">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#020811]/60 to-[#020811] z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020811] z-10" />
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover object-right-top" />
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#1877F2]/3 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[#1877F2]/3 rounded-full blur-[120px]" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-14 items-start">
            
            {/* Section header — Left aligned on all screens */}
            <div className="lg:col-span-5 text-left mb-12 lg:mb-0 lg:sticky lg:top-32 max-w-[70%] sm:max-w-none">
              <div className="flex items-center justify-start gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#1877F2]" />
                <span className="text-[#1877F2] font-bold text-xs tracking-[0.25em] uppercase">How We Got Here</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight lg:tracking-tighter text-white leading-[0.95] mb-5 text-balance">
                A MOVEMENT BORN<br className="hidden sm:block" /> FROM{" "}
                <span className="text-[#1877F2]">REALITY.</span>
              </h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-lg">
                This movement exists because of the stories we heard, the pain we witnessed and the change we knew needed to happen.
              </p>
            </div>

            {/* Timeline — Right column on desktop, compact layout */}
            <div className="lg:col-span-7 relative">
              {/* Vertical line through the centre of the dot column (left-aligned) */}
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#1877F2]/80 via-[#1877F2]/40 to-[#1877F2]/10 pointer-events-none" />

              {[
                {
                  period: "2019 – 2022",
                  title: "YEARS OF LISTENING",
                  body: "We listened to serving officers, former officers and families across the UK. The same themes kept coming up: trauma, isolation, lengthy investigations and a lack of support.",
                },
                {
                  period: "2022 – 2023",
                  title: "A GROWING NEED",
                  body: "More stories emerged. Too many officers were suffering in silence. We saw the urgent need for awareness, support and reform.",
                },
                {
                  period: "2024",
                  title: "A DECISION TO ACT",
                  body: "Rather than simply talking about the problem, we decided to build a movement that would do something about it.",
                },
                {
                  period: "2025",
                  title: "IT STOPS NOW WAS CREATED",
                  body: "It Stops Now was founded to raise awareness, support officers and families, share real stories and campaign for meaningful change.",
                },
                {
                  period: "TODAY & BEYOND",
                  title: "BUILDING A STRONGER FUTURE TOGETHER",
                  body: "We're a growing movement of officers, families and supporters standing together to ensure no one in policing has to face these challenges alone.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start mb-6 md:mb-8 last:mb-0 relative">
                  
                  {/* Dot column */}
                  <div className="shrink-0 w-[38px] flex justify-center pt-[22px] relative z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#1877F2] border-2 border-[#020811] shadow-[0_0_12px_rgba(24,119,242,0.7)]" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0 pl-2 lg:pl-4">
                    <div className="bg-[#050B18] border border-white/[0.07] rounded-2xl py-4 px-4 lg:p-6 hover:border-[#1877F2]/30 transition-colors group relative overflow-hidden text-left shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
                      <div className="text-[#1877F2] font-bold text-xs tracking-[0.25em] uppercase mb-1 lg:mb-2">{item.period}</div>
                      <h3 className="text-white font-black uppercase tracking-normal sm:tracking-tight text-base sm:text-xl leading-tight mb-2 lg:mb-3">{item.title}</h3>
                      <p className="text-slate-400 text-[14px] leading-normal font-medium">{item.body}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <BioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </div>
  );
}

