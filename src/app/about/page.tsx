"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Shield, ShieldAlert, Heart, Activity, ArrowRight, ExternalLink, Headphones, Download, Smartphone, CheckCircle, BarChart, Users, Star, Quote, HeartPulse } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        
        {/* Full-Screen Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1920" 
            alt="Protest movement" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity grayscale"
          />
          {/* Dark gradient overlay to blend image into the background and ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        {/* Content Container (Matching Homepage full width) */}
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5" /> OUR SUPPORTER
            </h3>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl xl:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2"
            >
              <span className="text-white">DRIVEN BY THOSE<br/></span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">WHO KNOW THE JOB.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-3xl drop-shadow"
            >
              It Stops Now is proudly funded and supported by Pocket Sergeant – the essential app created by police, for police. We believe that officer wellbeing and reform are not optional; they are critical.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. WHO IS POCKET SERGEANT */}
      <section className="py-20 md:py-32 relative">
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">WHO IS POCKET SERGEANT?</h2>
              <p className="text-slate-400 leading-relaxed mb-4 text-lg">
                Pocket Sergeant is the UK's leading app for police officers and staff. Created by former police officer Paul Cooper, it was built to solve a simple problem: officers needed quick, reliable access to the law, operational guidance, and wellbeing resources while out on the street.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                Today, it is used by thousands of officers every single day. But our mission goes beyond making the job easier. We want to make the job safer—mentally and emotionally. That's why we are funding the 'It Stops Now' campaign.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex gap-8 mt-6 border-t border-white/10 pt-6">
                <div>
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-1">TRUSTED BY</h4>
                  <p className="text-xl font-bold text-[#1877F2] font-sans leading-none">50,000+</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Active Officers</p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-1">CREATED BY</h4>
                  <p className="text-xl font-bold text-slate-200 uppercase tracking-wide leading-none">Former Police</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">We lived the job.</p>
                </div>
              </div>
            </div>
            
            {/* APP SHOWCASE / SCREENSHOTS */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#1877F2]/10 rounded-[2rem] transform rotate-2 blur-xl"></div>
              <div className="bg-[#050B14] rounded-[2rem] p-8 border border-white/10 shadow-2xl relative z-10 overflow-hidden flex flex-col items-center">
                
                {/* Short App Description / Tagline */}
                <div className="text-center mb-10 max-w-sm relative z-30">
                  <Smartphone className="w-8 h-8 text-[#1877F2] mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">The Officer's Essential Toolkit</h3>
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
                <div className="flex flex-wrap justify-center gap-4 w-full border-t border-white/10 pt-6">
                  <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center gap-3 px-6 py-4 rounded-xl hover:bg-white/10 transition-colors">
                    <Download className="w-5 h-5 text-[#1877F2]" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Download on the</div>
                      <div className="text-sm font-bold leading-none mt-1 tracking-wide">App Store</div>
                    </div>
                  </button>
                  <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center gap-3 px-6 py-4 rounded-xl hover:bg-white/10 transition-colors">
                    <Download className="w-5 h-5 text-[#1877F2]" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Get it on</div>
                      <div className="text-sm font-bold leading-none mt-1 tracking-wide">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-24 bg-[#050B14] border-t border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1877F2]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Our Reach</h2>
            <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">IMPACT BY THE NUMBERS</h2>
            <p className="text-slate-400 text-lg leading-relaxed">Pocket Sergeant's organizational achievements and the community we've built.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#020611] border border-white/10 p-10 rounded-3xl relative overflow-hidden group shadow-xl">
              <div className="w-14 h-14 bg-white/5 border border-white/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-8 relative z-10">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-5xl text-white mb-4 font-sans tracking-tight relative z-10">
                <AnimatedCounter from={0} to={50} suffix="k+" duration={2} />
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm relative z-10">Active users across UK police forces relying on Pocket Sergeant daily.</p>
            </div>

            <div className="bg-[#020611] border border-white/10 p-10 rounded-3xl relative overflow-hidden group shadow-xl">
              <div className="w-14 h-14 bg-white/5 border border-white/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-8 relative z-10">
                <Download className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-5xl text-white mb-4 font-sans tracking-tight relative z-10">
                <AnimatedCounter from={0} to={200} suffix="k+" duration={2} />
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm relative z-10">Total app downloads since launch, showing widespread adoption.</p>
            </div>

            <div className="bg-[#020611] border border-white/10 p-10 rounded-3xl relative overflow-hidden group shadow-xl">
              <div className="w-14 h-14 bg-white/5 border border-white/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-8 relative z-10">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-5xl text-white mb-4 font-sans tracking-tight relative z-10">
                <AnimatedCounter from={0} to={4.8} isFloat duration={1.5} />
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm relative z-10">Average rating on both App Store and Google Play.</p>
            </div>

            <div className="bg-[#020611] border border-white/10 p-10 rounded-3xl relative overflow-hidden group shadow-xl">
              <div className="w-14 h-14 bg-white/5 border border-white/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-8 relative z-10">
                <BarChart className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-5xl text-white mb-4 font-sans tracking-tight relative z-10">
                <AnimatedCounter from={0} to={10} suffix="+" duration={1.5} />
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm relative z-10">Years of continuous service providing operational guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SUPPORTING THIS MOVEMENT */}
      <section className="py-32 bg-[#020611] border-t border-white/5 relative">
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Our Commitment</h2>
            <h2 className="font-sans text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8">WHY WE SUPPORT THIS MOVEMENT</h2>
            <p className="text-slate-400 text-lg leading-relaxed">We see the reality of policing every day through our user base. We couldn't stand by and watch the system break our colleagues.</p>
          </div>
          
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#050B14] to-[#020611] border border-[#1877F2]/20 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Quote className="w-32 h-32 text-white" />
            </div>
            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" 
                  alt="Paul Cooper" 
                  className="w-48 h-48 rounded-full object-cover border-4 border-[#1877F2]/30 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <div>
                <Quote className="w-8 h-8 text-[#1877F2] mb-6" />
                <p className="text-xl md:text-2xl font-serif text-white leading-relaxed italic mb-8">
                  "Having served as an officer myself, I know the immense pressure the job places on you. When I saw the rising number of colleagues suffering from PTSD and leaving the force due to disproportionate and prolonged investigations, I knew Pocket Sergeant had to step up. We are funding 'It Stops Now' because those who protect the public deserve natural justice and care, not a system designed to find fault at all costs."
                </p>
                <div className="flex flex-col border-l-2 border-[#1877F2] pl-4">
                  <span className="font-bold text-lg text-white uppercase tracking-wider">Paul Cooper</span>
                  <span className="text-[#1877F2] text-sm font-bold uppercase tracking-widest">Founder, Pocket Sergeant / Former Police Officer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING TRANSPARENCY */}
      <section className="py-32 bg-[#050B14] border-y border-white/5 relative">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Accountability</h2>
            <h2 className="font-sans text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8">FUNDING & TRANSPARENCY</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              'It Stops Now' is fully funded by Pocket Sergeant Ltd. We do not accept government funding, police federation grants, or corporate sponsorships. 100% of our resources go directly to the cause.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#020611] to-[#050B14] border border-white/10 rounded-3xl p-10 hover:border-[#1877F2]/50 transition-all duration-500 shadow-xl group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-[#1877F2]" />
              </div>
              <h3 className="font-bold text-xl uppercase tracking-widest mb-4 text-white">Legal Counsel</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Providing robust legal defense and advice for officers facing protracted investigations.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Initial Consultation Fees
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Specialist Defense Lawyers
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#020611] to-[#050B14] border border-white/10 rounded-3xl p-10 hover:border-[#1877F2]/50 transition-all duration-500 shadow-xl group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-[#1877F2]" />
              </div>
              <h3 className="font-bold text-xl uppercase tracking-widest mb-4 text-white">Welfare Support</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Direct mental health support for officers and families suffering through systemic delays.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Psychological Evaluations
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Crisis Counseling Sessions
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#020611] to-[#050B14] border border-white/10 rounded-3xl p-10 hover:border-[#1877F2]/50 transition-all duration-500 shadow-xl group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7 text-[#1877F2]" />
              </div>
              <h3 className="font-bold text-xl uppercase tracking-widest mb-4 text-white">Campaign Logistics</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Funding the push for systemic, legislative change and public awareness events.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Parliamentary Lobbying
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#1877F2] mt-0.5" /> Memorial Events & Advocacy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PODCAST SECTION */}
      <section className="py-32 bg-[#020611] border-b border-white/5">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-[#1877F2]/20 rounded-full blur-[100px] pointer-events-none"></div>
              <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" alt="Podcast recording" className="w-full h-auto rounded-3xl relative z-10 border border-white/10 shadow-2xl grayscale mix-blend-luminosity opacity-80" />
              <div className="absolute bottom-8 right-8 bg-[#1877F2] w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(24,119,242,0.5)] z-20 hover:scale-110 transition-transform cursor-pointer border-4 border-[#050B14]">
                <Headphones className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="lg:w-1/2 text-white relative z-10">
              <div className="text-[#1877F2] text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                <Headphones className="w-4 h-4" /> OFFICIAL PODCAST
              </div>
              <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">THE POCKET SERGEANT PODCAST</h2>
              <p className="text-slate-400 leading-relaxed mb-10 text-lg">
                Join Paul Cooper and special guests as they discuss the real issues facing modern policing. From navigating the complexities of misconduct investigations to sharing survival strategies for mental health, we pull no punches.
              </p>
              
              <div className="space-y-4 mb-12">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-6 hover:border-[#1877F2]/50 transition-colors cursor-pointer group">
                  <div className="w-14 h-14 bg-[#020611] rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                    <Headphones className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] tracking-widest text-[#1877F2] font-bold mb-2 uppercase">EPISODE 42</div>
                    <h4 className="font-bold text-base tracking-wide">When the system turns against you</h4>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">45 Min</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-6 hover:border-[#1877F2]/50 transition-colors cursor-pointer group">
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
                <Button className="bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-widest text-[10px] py-6 px-10 rounded-full transition-colors">
                  Listen on Spotify
                </Button>
                <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] py-6 px-10 rounded-full transition-colors">
                  Apple Podcasts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARN MORE ABOUT POCKET SERGEANT CTA SECTION */}
      <section className="py-32 bg-gradient-to-b from-[#050B14] to-[#020611] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1877F2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Explore the App</h2>
            <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8 text-white">LEARN MORE ABOUT POCKET SERGEANT</h2>
            <p className="text-slate-400 mb-12 text-xl leading-relaxed">Discover how our app supports officers on the front lines every day with essential resources, legal guidance, and wellbeing tools.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#020611] border border-white/10 rounded-3xl p-10 flex flex-col items-center text-center hover:border-[#1877F2]/50 transition-all duration-300 shadow-xl group">
              <div className="w-16 h-16 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-8 h-8 text-[#1877F2]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Operational Guidance</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">Access up-to-date legal definitions, checklists, and procedural guidance instantly.</p>
              <Link href="https://pocketsergeant.co.uk/features" target="_blank" className="w-full">
                <Button variant="outline" className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] py-6 rounded-lg transition-colors">
                  View Features <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-[#020611] border border-white/10 rounded-3xl p-10 flex flex-col items-center text-center hover:border-[#1877F2]/50 transition-all duration-300 shadow-xl group">
              <div className="w-16 h-16 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-8 h-8 text-[#1877F2]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Wellbeing Support</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">Confidential tools and resources to help manage the psychological demands of the job.</p>
              <Link href="https://pocketsergeant.co.uk/wellbeing" target="_blank" className="w-full">
                <Button variant="outline" className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] py-6 rounded-lg transition-colors">
                  Get Support <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-[#020611] border border-white/10 rounded-3xl p-10 flex flex-col items-center text-center hover:border-[#1877F2]/50 transition-all duration-300 shadow-xl group">
              <div className="w-16 h-16 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-[#1877F2]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Download Now</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">Available on iOS and Android devices for all serving police officers and staff.</p>
              <Link href="https://pocketsergeant.co.uk/download" target="_blank" className="w-full">
                <Button className="w-full bg-[#1877F2] text-white hover:bg-blue-600 font-bold uppercase tracking-widest text-[10px] py-6 rounded-lg transition-colors">
                  Get The App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
