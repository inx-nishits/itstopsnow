"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Shield, ShieldAlert, Heart, Activity, ArrowRight, ExternalLink, Headphones, Download, Smartphone, CheckCircle, BarChart, Users, Star, Quote, HeartPulse } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditorialSection, CampaignSection } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";

function AnimatedCounter({ from, to, duration = 2, suffix = "", prefix = "", isFloat = false }: { from: number, to: number, duration?: number, suffix?: string, prefix?: string, isFloat?: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      if (node) {
        const controls = animate(from, to, {
          duration,
          ease: "easeOut",
          onUpdate(value) {
            const formattedValue = isFloat ? value.toFixed(1) : Math.round(value).toLocaleString();
            node.textContent = `${prefix}${formattedValue}${suffix}`;
          },
        });
        return () => controls.stop();
      }
    }
  }, [isInView, from, to, duration, prefix, suffix, isFloat]);

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
}

export default function AboutPage() {
  const [currentAppIndex, setCurrentAppIndex] = useState(0);
  const appImages = ["/app-1.png", "/app-2.png", "/app-3.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAppIndex((prev) => (prev + 1) % appImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [appImages.length]);

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
      <EditorialSection className="py-10 sm:py-20 lg:py-24">
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 sm:mb-6 ${hybrid.editorialHeading}`}>WHO IS POCKET SERGEANT?</h2>
              <p className={`${hybrid.editorialBody} leading-relaxed font-medium mb-4 sm:mb-6 text-sm sm:text-base md:text-lg`}>
                Pocket Sergeant is the UK's leading app for police officers and staff. Created by former police officer Paul Cooper, it was built to solve a simple problem: officers needed quick, reliable access to the law, operational guidance, and wellbeing resources while out on the street.
              </p>
              <p className={`${hybrid.editorialBody} leading-relaxed font-medium mb-6 sm:mb-8 text-sm sm:text-base md:text-lg`}>
                Today, it is used by thousands of officers every single day. But our mission goes beyond making the job easier. We want to make the job safer—mentally and emotionally. That's why we are funding the 'It Stops Now' campaign.
              </p>
            </div>
            
            {/* APP SHOWCASE / SCREENSHOTS */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#1877F2]/10 rounded-[2rem] transform rotate-2 blur-xl"></div>
              <div className="bg-[#050B14] rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-2xl relative z-10 overflow-hidden flex flex-col items-center">
                
                {/* Short App Description / Tagline */}
                <div className="text-center mb-10 max-w-sm relative z-30">
                  <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2] mx-auto mb-3" />
                  <p className="text-xs text-slate-400">Everything you need to navigate modern policing, right in your pocket. Built by officers, for officers.</p>
                </div>

                <div className="flex w-full justify-center items-center gap-4 h-[240px] sm:h-[300px] mb-8">
                  {appImages.map((img, idx) => {
                    const isActive = idx === currentAppIndex;
                    return (
                      <div 
                        key={img}
                        className={`relative transition-all duration-500 ease-out cursor-pointer ${
                          isActive 
                            ? "w-[140px] sm:w-[160px] scale-100 opacity-100 z-20 drop-shadow-[0_10px_20px_rgba(24,119,242,0.3)]" 
                            : "w-[100px] sm:w-[120px] scale-90 opacity-40 z-10 hover:opacity-80"
                        }`}
                        onClick={() => setCurrentAppIndex(idx)}
                      >
                        <img 
                          src={img} 
                          className="w-full h-full object-contain" 
                          alt={`App screenshot ${idx + 1}`} 
                        />
                      </div>
                    );
                  })}
                </div>
                
                {/* Store Downloads */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full border-t border-white/10 pt-6">
                  <a href="#" className="w-full">
                    <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center justify-center sm:justify-start gap-2 sm:gap-3 p-3 sm:px-6 sm:py-4 rounded-xl hover:bg-white/10 transition-colors w-full group">
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#1877F2] shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="text-[7px] sm:text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-tight">Download on the</div>
                        <div className="text-[11px] sm:text-sm font-bold leading-none mt-0.5 sm:mt-1 tracking-wide">App Store</div>
                      </div>
                    </button>
                  </a>
                  <a href="#" className="w-full">
                    <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center justify-center sm:justify-start gap-2 sm:gap-3 p-3 sm:px-6 sm:py-4 rounded-xl hover:bg-white/10 transition-colors w-full group">
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#1877F2] shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="text-[7px] sm:text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-tight">Get it on</div>
                        <div className="text-[11px] sm:text-sm font-bold leading-none mt-0.5 sm:mt-1 tracking-wide">Google Play</div>
                      </div>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* STATISTICS SECTION */}
      <section className="py-10 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1877F2]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-[#1877F2]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="text-center mb-8 lg:mb-16 max-w-3xl mx-auto px-2">
            <h2 className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 sm:mb-4">Our Reach</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 text-balance">IMPACT BY THE NUMBERS</h3>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-medium">Pocket Sergeant's organizational achievements and the community we've built.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {/* Card 1 */}
            <div className="group relative bg-[#050B14] rounded-2xl border border-white/5 p-4 sm:p-5 lg:p-8 transition-all duration-300 hover:border-[#1877F2]/40 hover:bg-white/[0.02] flex flex-col h-full shadow-2xl hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(24,119,242,0.15)]">
              <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-6">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-300 shrink-0">
                  <Users className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 group-hover:text-slate-300 transition-colors uppercase tracking-[0.15em] leading-tight">
                  Active Users
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-2 lg:mb-3">
                <div className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight transition-all duration-500 flex items-center gap-1.5 text-white group-hover:text-[#1877F2]">
                  <AnimatedCounter from={0} to={50} duration={2} />k+
                </div>
              </div>
              <p className="text-slate-500 text-[11px] sm:text-xs lg:text-sm leading-relaxed font-normal group-hover:text-slate-400 transition-colors mt-auto line-clamp-3">
                Active users across UK police forces relying on Pocket Sergeant daily.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-[#050B14] rounded-2xl border border-white/5 p-4 sm:p-5 lg:p-8 transition-all duration-300 hover:border-[#1877F2]/40 hover:bg-white/[0.02] flex flex-col h-full shadow-2xl hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(24,119,242,0.15)]">
              <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-6">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-300 shrink-0">
                  <Download className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 group-hover:text-slate-300 transition-colors uppercase tracking-[0.15em] leading-tight">
                  Downloads
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-2 lg:mb-3">
                <div className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight transition-all duration-500 flex items-center gap-1.5 text-white group-hover:text-[#1877F2]">
                  <AnimatedCounter from={0} to={200} duration={2} />k+
                </div>
              </div>
              <p className="text-slate-500 text-[11px] sm:text-xs lg:text-sm leading-relaxed font-normal group-hover:text-slate-400 transition-colors mt-auto line-clamp-3">
                Total app downloads since launch, showing widespread adoption.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-[#050B14] rounded-2xl border border-white/5 p-4 sm:p-5 lg:p-8 transition-all duration-300 hover:border-[#1877F2]/40 hover:bg-white/[0.02] flex flex-col h-full shadow-2xl hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(24,119,242,0.15)]">
              <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-6">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-300 shrink-0">
                  <Star className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 group-hover:text-slate-300 transition-colors uppercase tracking-[0.15em] leading-tight">
                  Avg Rating
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-2 lg:mb-3">
                <div className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight transition-all duration-500 flex items-center gap-1.5 text-white group-hover:text-[#1877F2]">
                  <AnimatedCounter from={0} to={4.8} isFloat duration={1.5} />
                </div>
              </div>
              <p className="text-slate-500 text-[11px] sm:text-xs lg:text-sm leading-relaxed font-normal group-hover:text-slate-400 transition-colors mt-auto line-clamp-3">
                Average rating on both App Store and Google Play.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-[#050B14] rounded-2xl border border-white/5 p-4 sm:p-5 lg:p-8 transition-all duration-300 hover:border-[#1877F2]/40 hover:bg-white/[0.02] flex flex-col h-full shadow-2xl hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(24,119,242,0.15)]">
              <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-6">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-300 shrink-0">
                  <BarChart className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 group-hover:text-slate-300 transition-colors uppercase tracking-[0.15em] leading-tight">
                  Years Active
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-2 lg:mb-3">
                <div className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight transition-all duration-500 flex items-center gap-1.5 text-white group-hover:text-[#1877F2]">
                  <AnimatedCounter from={0} to={10} duration={1.5} />+
                </div>
              </div>
              <p className="text-slate-500 text-[11px] sm:text-xs lg:text-sm leading-relaxed font-normal group-hover:text-slate-400 transition-colors mt-auto line-clamp-3">
                Years of continuous service providing operational guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

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

      {/* FUNDING TRANSPARENCY */}
      <EditorialSection className="py-10 sm:py-20 lg:py-24">
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 sm:mb-4">Accountability</h2>
            <h3 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 sm:mb-6 text-balance ${hybrid.editorialHeading}`}>FUNDING & TRANSPARENCY</h3>
            <p className={`${hybrid.editorialBody} text-sm sm:text-base md:text-lg leading-relaxed font-medium`}>
              'It Stops Now' is fully funded by Pocket Sergeant Ltd. We do not accept government funding, police federation grants, or corporate sponsorships. 100% of our resources go directly to the cause.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-5 md:p-10 group`}>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 md:w-7 md:h-7 text-[#1877F2]" />
              </div>
              <h3 className={`font-bold text-lg md:text-xl uppercase tracking-widest mb-3 md:mb-4 ${hybrid.editorialHeading}`}>Legal Counsel</h3>
              <p className={`${hybrid.editorialBody} text-sm leading-relaxed mb-4 md:mb-6`}>Providing robust legal defense and advice for officers facing protracted investigations.</p>
              <ul className="space-y-2 md:space-y-3">
                <li className={`flex items-start gap-3 text-sm font-medium ${hybrid.editorialBody}`}>
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Initial Consultation Fees
                </li>
                <li className={`flex items-start gap-3 text-sm font-medium ${hybrid.editorialBody}`}>
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Specialist Defense Lawyers
                </li>
              </ul>
            </div>

            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-5 md:p-10 group`}>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 md:w-7 md:h-7 text-[#1877F2]" />
              </div>
              <h3 className={`font-bold text-lg md:text-xl uppercase tracking-widest mb-3 md:mb-4 ${hybrid.editorialHeading}`}>Welfare Support</h3>
              <p className={`${hybrid.editorialBody} text-sm leading-relaxed mb-4 md:mb-6`}>Direct mental health support for officers and families suffering through systemic delays.</p>
              <ul className="space-y-2 md:space-y-3">
                <li className={`flex items-start gap-3 text-sm font-medium ${hybrid.editorialBody}`}>
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Psychological Evaluations
                </li>
                <li className={`flex items-start gap-3 text-sm font-medium ${hybrid.editorialBody}`}>
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Crisis Counseling Sessions
                </li>
              </ul>
            </div>

            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-5 md:p-10 group`}>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5 md:w-7 md:h-7 text-[#1877F2]" />
              </div>
              <h3 className={`font-bold text-lg md:text-xl uppercase tracking-widest mb-3 md:mb-4 ${hybrid.editorialHeading}`}>Campaign Logistics</h3>
              <p className={`${hybrid.editorialBody} text-sm leading-relaxed mb-4 md:mb-6`}>Funding the push for systemic, legislative change and public awareness events.</p>
              <ul className="space-y-2 md:space-y-3">
                <li className={`flex items-start gap-3 text-sm font-medium ${hybrid.editorialBody}`}>
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Parliamentary Lobbying
                </li>
                <li className={`flex items-start gap-3 text-sm font-medium ${hybrid.editorialBody}`}>
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Memorial Events & Advocacy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* PODCAST SECTION */}
      <CampaignSection className="py-10 sm:py-20 lg:py-24 border-b border-white/5">
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-[#1877F2]/20 rounded-full blur-[100px] pointer-events-none"></div>
              <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" alt="Podcast recording" className="w-full h-[250px] md:h-[350px] lg:h-[550px] xl:h-[600px] object-cover rounded-3xl relative z-10 border border-white/10 shadow-2xl grayscale mix-blend-luminosity opacity-80" />
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-[#1877F2] w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(24,119,242,0.5)] z-20 hover:scale-110 transition-transform cursor-pointer border-[3px] md:border-4 border-[#050B14]">
                <Headphones className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>
            
            <div className="lg:w-1/2 text-white relative z-10">
              <div className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 sm:mb-4 flex items-center gap-3">
                <Headphones className="w-4 h-4" /> OFFICIAL PODCAST
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 text-balance">THE POCKET SERGEANT PODCAST</h3>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-8 sm:mb-10">
                Join Paul Cooper and special guests as they discuss the real issues facing modern policing. From navigating the complexities of misconduct investigations to sharing survival strategies for mental health, we pull no punches.
              </p>
              
              <div className="space-y-4 mb-12">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-5 rounded-2xl flex items-center gap-6 hover:border-[#1877F2]/50 transition-colors cursor-pointer group">
                  <div className="w-14 h-14 bg-[#020611] rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                    <Headphones className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] tracking-widest text-[#1877F2] font-bold mb-2 uppercase">EPISODE 42</div>
                    <h4 className="font-bold text-base tracking-wide">When the system turns against you</h4>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">45 Min</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-5 rounded-2xl flex items-center gap-6 hover:border-[#1877F2]/50 transition-colors cursor-pointer group">
                  <div className="w-14 h-14 bg-[#020611] rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                    <Headphones className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] tracking-widest text-[#1877F2] font-bold mb-2 uppercase">EPISODE 41</div>
                    <h4 className="font-bold text-base tracking-wide">Surviving the IOPC: A former officer's story</h4>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">52 Min</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="https://open.spotify.com/show/pocket-sergeant" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-widest text-[10px] py-6 px-10 rounded-full transition-colors">
                    Listen on Spotify
                  </Button>
                </Link>
                <Link href="https://podcasts.apple.com/podcast/pocket-sergeant" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] py-6 px-10 rounded-full transition-colors">
                    Apple Podcasts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CampaignSection>

      {/* LEARN MORE ABOUT POCKET SERGEANT CTA SECTION */}
      <EditorialSection className="py-10 sm:py-20 lg:py-24">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1877F2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
          <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
            <h2 className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 sm:mb-4">Explore the App</h2>
            <h3 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 sm:mb-6 text-balance ${hybrid.editorialHeading}`}>LEARN MORE ABOUT POCKET SERGEANT</h3>
            <p className={`${hybrid.editorialBody} text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-10 sm:mb-12`}>Discover how our app supports officers on the front lines every day with essential resources, legal guidance, and wellbeing tools.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-5 md:p-10 flex flex-col text-left md:text-center group`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-widest ${hybrid.editorialHeading}`}>Operational Guidance</h3>
              <p className={`${hybrid.editorialBody} text-sm leading-relaxed mb-5 md:mb-8 flex-grow`}>Access up-to-date legal definitions, checklists, and procedural guidance instantly.</p>
              <Link href="https://pocketsergeant.co.uk/features" target="_blank" className="w-full">
                <button className="w-full border border-slate-300 bg-white hover:bg-slate-50 text-[#010B19] font-bold uppercase tracking-widest text-[11px] py-3 md:py-4 rounded-xl transition-all shadow-sm flex items-center justify-center group-hover:border-[#1877F2]/30">
                  View Features <ExternalLink className="w-3.5 h-3.5 ml-2 text-slate-400" />
                </button>
              </Link>
            </div>
            
            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-5 md:p-10 flex flex-col text-left md:text-center group`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-widest ${hybrid.editorialHeading}`}>Wellbeing Support</h3>
              <p className={`${hybrid.editorialBody} text-sm leading-relaxed mb-5 md:mb-8 flex-grow`}>Confidential tools and resources to help manage the psychological demands of the job.</p>
              <Link href="https://pocketsergeant.co.uk/wellbeing" target="_blank" className="w-full">
                <button className="w-full border border-slate-300 bg-white hover:bg-slate-50 text-[#010B19] font-bold uppercase tracking-widest text-[11px] py-3 md:py-4 rounded-xl transition-all shadow-sm flex items-center justify-center group-hover:border-[#1877F2]/30">
                  Get Support <ExternalLink className="w-3.5 h-3.5 ml-2 text-slate-400" />
                </button>
              </Link>
            </div>

            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-5 md:p-10 flex flex-col text-left md:text-center group`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1877F2]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-widest ${hybrid.editorialHeading}`}>Download Now</h3>
              <p className={`${hybrid.editorialBody} text-sm leading-relaxed mb-5 md:mb-8 flex-grow`}>Available on iOS and Android devices for all serving police officers and staff.</p>
              <Link href="https://pocketsergeant.co.uk/download" target="_blank" className="w-full">
                <button className="w-full bg-[#1877F2] hover:bg-[#1565d8] text-white font-bold uppercase tracking-widest text-[11px] py-3 md:py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:-translate-y-0.5 flex items-center justify-center">
                  Get The App
                </button>
              </Link>
            </div>
          </div>
        </div>
      </EditorialSection>

    </div>
  );
}

