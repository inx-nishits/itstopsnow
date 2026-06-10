"use client";

import Link from "next/link";
import { Quote, Calendar, ArrowRight, Mail, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, animate, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function StatCounter({ end, suffix = "", prefix = "", isPulsing = false }: { end: number, suffix?: string, prefix?: string, isPulsing?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [end, isInView]);

  return (
    <div ref={ref} className={`text-5xl lg:text-7xl font-black text-white tracking-tighter drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#1877F2] transition-all duration-500 flex items-center gap-2 ${isPulsing ? 'animate-pulse text-[#1877F2]' : ''}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-white font-sans">
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-48 lg:pt-40 lg:pb-56 border-b border-white/5">
        
        {/* Full-Screen Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/bannerBg.png" 
            alt="UK Female Police Officer" 
            className="w-full h-full object-cover object-[70%_center] opacity-90 mix-blend-luminosity"
          />
          {/* Dark gradient overlay to blend image into the background and ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[30%] via-[#050A14]/40 via-[60%] to-transparent to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-12">
          
          {/* Left Content */}
          <div className="w-full lg:w-full max-w-[1200px] pt-20 lg:pt-0">
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2">
              <span className="text-white">A SYSTEM </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400 pr-2 lg:pr-4">IN CRISIS</span>
            </h1>
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium text-white mb-8 leading-tight tracking-tight drop-shadow-md">
              Supporting the Men and<br />Women who Protect Us.
            </h2>

            <p className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-3xl drop-shadow">
              We champion the mental health, legal rights, and wellbeing of officers nationwide. Your dedicated ally against the pressures of duty.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link href="/take-action">
                <Button className="w-full sm:w-auto bg-[#1877F2] text-white hover:bg-white hover:text-black font-bold px-8 py-7 rounded-full text-sm tracking-wide transition-colors">
                  GET INVOLVED
                </Button>
              </Link>
              <Link href="/stories">
                <Button className="border border-white w-full sm:w-auto bg-transparent text-white hover:bg-white hover:text-black font-bold px-8 py-7 rounded-full text-sm tracking-wide transition-colors backdrop-blur-sm">
                  READ STORIES
                </Button>
              </Link>
              <Link href="/remembrance">
                <Button className="border border-white/50 w-full sm:w-auto bg-white/5 text-white hover:bg-white hover:text-black font-bold px-8 py-7 rounded-full text-sm tracking-wide transition-colors backdrop-blur-sm">
                  VIEW ROLL OF HONOUR
                </Button>
              </Link>
            </div>
          </div>
          {/* Right Content / Supporting visual - Hidden on mobile, subtle on desktop */}
          <div className="hidden lg:block w-full lg:w-1/3 opacity-30 mix-blend-screen pointer-events-none">
             {/* We can add a conceptual graphic or abstract shapes here later */}
          </div>

        </div>
      </section>

      {/* STATS SECTION - Brutalist / High-End Modern */}
      <section className="relative z-20 bg-[#02050A] border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x lg:divide-x divide-white/10">
          
          {/* Stat 1 */}
          <div className="p-10 lg:p-16 flex flex-col justify-center group hover:bg-white/[0.02] transition-colors duration-500">
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_10px_#1877F2] group-hover:scale-150 transition-transform duration-500" />
              OFFICERS SUPPORTED
            </div>
            <StatCounter end={42850} suffix="+" />
          </div>

          {/* Stat 2 */}
          <div className="p-10 lg:p-16 flex flex-col justify-center group hover:bg-white/[0.02] transition-colors duration-500">
            <div className="text-[10px] md:text-xs font-bold text-[#1877F2] uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
              <Heart className="w-4 h-4 text-[#1877F2] animate-pulse" fill="currentColor" />
              LIVES SAVED
            </div>
            <div className="flex items-end">
              <StatCounter end={12} isPulsing={true} />
              <span className="text-3xl font-black text-slate-600 ml-2 pb-1">of 13</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-10 lg:p-16 flex flex-col justify-center group hover:bg-white/[0.02] transition-colors duration-500">
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_10px_#1877F2] group-hover:scale-150 transition-transform duration-500" />
              LEGAL VICTORIES
            </div>
            <StatCounter end={38} />
          </div>

          {/* Stat 4 */}
          <div className="p-10 lg:p-16 flex flex-col justify-center group hover:bg-white/[0.02] transition-colors duration-500">
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1877F2] shadow-[0_0_10px_#1877F2] group-hover:scale-150 transition-transform duration-500" />
              FUNDS SECURED
            </div>
            <StatCounter end={14.2} prefix="£" suffix="M" />
          </div>

        </div>
      </section>

      {/* WHY IT STOPS NOW */}
      <section className="relative bg-[#02050A] py-32 lg:py-48 border-b border-white/10 overflow-hidden">
        {/* Abstract Background Element to match top section */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1877F2]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            {/* Left side: Context */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Why It Stops Now</h2>
              </div>
              <h3 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8">
                EVERY NUMBER IS <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">A LIFE LEFT BEHIND.</span>
              </h3>
              <p className="text-slate-400 text-lg lg:text-xl leading-relaxed mb-12 max-w-xl font-medium">
                Every number represents a parent, a child, a partner and a friend left behind. Every story reminds us that officers' lives matter too.
              </p>
              <div>
                <Link href="/the-issue">
                  <Button className="border border-white/20 text-white bg-transparent hover:bg-white hover:text-black font-bold px-10 py-7 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                    LEARN THE FACTS
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side: Quote */}
            <div className="relative p-10 md:p-16 lg:p-20 border border-white/10 bg-[#0a1120]/50 backdrop-blur-2xl rounded-[3rem] group hover:bg-[#0a1120]/80 transition-colors duration-700 shadow-2xl">
              <Quote className="w-24 h-24 text-[#1877F2]/10 absolute top-8 left-8 group-hover:scale-110 group-hover:text-[#1877F2]/30 transition-all duration-700" />
              <div className="relative z-10">
                <p className="text-3xl md:text-5xl text-white font-medium leading-[1.2] tracking-tight mb-10">
                  "To protect and serve others, they gave everything. Now, <span className="text-[#1877F2]">it's our turn to protect them.</span>"
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[2px] bg-white/20 group-hover:bg-[#1877F2]/50 transition-colors duration-700"></div>
                  <span className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase">The Mission</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="relative bg-[#02050A] py-32 border-b border-white/10">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Our Mission</h2>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                A Future Where <br className="hidden md:block"/> No Officer <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Stands Alone.</span>
              </h3>
            </div>
            <p className="text-slate-400 text-lg max-w-lg font-medium leading-relaxed">
              We are building a comprehensive support system to ensure every officer is valued, supported, and protected throughout their service and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-[#1877F2] transition-colors duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] hover:-translate-y-2">
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-[150px] font-black text-white/[0.03] group-hover:text-black/10 transition-colors duration-500 pointer-events-none leading-none tracking-tighter">1</div>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
                <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors duration-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </div>
                <div className="pt-16">
                  <h3 className="font-black text-2xl text-white mb-4 group-hover:text-white transition-colors duration-500 uppercase tracking-tighter leading-none">Raise <br/> Awareness</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500">Start conversations that create lasting, systemic change in public perception.</p>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-[#1877F2] transition-colors duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] hover:-translate-y-2">
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-[150px] font-black text-white/[0.03] group-hover:text-black/10 transition-colors duration-500 pointer-events-none leading-none tracking-tighter">2</div>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
                <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors duration-500"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <div className="pt-16">
                  <h3 className="font-black text-2xl text-white mb-4 group-hover:text-white transition-colors duration-500 uppercase tracking-tighter leading-none">Support <br/> Families</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500">Stand beside families in their darkest times, providing stability and care.</p>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-[#1877F2] transition-colors duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] hover:-translate-y-2">
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-[150px] font-black text-white/[0.03] group-hover:text-black/10 transition-colors duration-500 pointer-events-none leading-none tracking-tighter">3</div>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
                <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors duration-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                </div>
                <div className="pt-16">
                  <h3 className="font-black text-2xl text-white mb-4 group-hover:text-white transition-colors duration-500 uppercase tracking-tighter leading-none">Drive <br/> Change</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500">Push for systemic legislative change that saves lives and demands accountability.</p>
                </div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-[#1877F2] transition-colors duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] hover:-translate-y-2">
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-[150px] font-black text-white/[0.03] group-hover:text-black/10 transition-colors duration-500 pointer-events-none leading-none tracking-tighter">4</div>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
                <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors duration-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                </div>
                <div className="pt-16">
                  <h3 className="font-black text-2xl text-white mb-4 group-hover:text-white transition-colors duration-500 uppercase tracking-tighter leading-none">Build <br/> Community</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500">Ensure no one in blue ever stands alone through peer-to-peer support networks.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VOICES OF COURAGE - STANDARD GRID */}
      <section className="relative bg-[#02050A] py-32 border-y border-white/5 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1877F2]/10 via-[#030712]/0 to-[#030712]/0 pointer-events-none" />

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 pb-8 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Voices of Courage</h2>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-white leading-none">
                REAL STORIES.<br/> REAL PEOPLE.
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Hear directly from the officers, staff, and families we've supported through their darkest moments.
              </p>
            </div>
            <Link href="/stories" className="shrink-0 w-full sm:w-auto">
              <Button className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full py-8 px-12 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                VIEW ALL STORIES
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: "01", name: "PC James Holloway", quote: "Left in Shadows", excerpt: "After 15 years of unblemished service, I was suspended for 3 years over a false claim. It ruined my family.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" },
              { num: "02", name: "PCSO Sarah Mitchell", quote: "Finding Light", excerpt: "The mental health toll was unimaginable. Without this support network, I wouldn't be here today.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" },
              { num: "03", name: "The Thompson Family", quote: "Family Strength", excerpt: "We watched him fade away waiting for answers that never came. The system is fundamentally broken.", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600" },
            ].map((item, i) => (
              <div key={i} className="group flex flex-col bg-[#050A14] border border-white/10 rounded-3xl overflow-hidden hover:border-[#1877F2]/50 transition-colors shadow-2xl">
                <div className="h-64 relative overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] to-transparent"></div>
                  <div className="absolute bottom-4 left-6 bg-[#1877F2] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">Story {item.num}</div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <Quote className="w-8 h-8 text-[#1877F2]/40 mb-4" />
                  <h3 className="font-black text-2xl text-white mb-4 uppercase leading-tight group-hover:text-[#1877F2] transition-colors">"{item.quote}"</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{item.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                    <p className="text-[#1877F2] font-bold text-[10px] uppercase tracking-widest">{item.name}</p>
                    <Link href="/stories/1" className="text-white hover:text-[#1877F2] transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CINEMATIC QUOTE SECTION */}
      <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden">
        {/* Deep Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#010b19] via-[#050A14] to-[#0a1224]" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1877F2]/10 via-transparent to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <Quote className="w-16 h-16 md:w-24 md:h-24 text-[#1877F2] opacity-30 mx-auto mb-10 transform -scale-x-100" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-[1.1] tracking-tight mb-12 drop-shadow-2xl">
            "We are fighting for the day when the uniform is a symbol of pride, not a target for endless scrutiny."
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#1877F2]" />
            <p className="text-[#1877F2] font-bold tracking-[0.2em] text-sm md:text-base uppercase">The It Stops Now Movement</p>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1877F2]" />
          </div>
        </div>
      </section>

      {/* MISSION PILLARS (Formerly Quote Cards) */}
      <section className="bg-[#010b19] pb-24 border-b border-white/5 relative z-10">
        <div className="w-full px-6 lg:px-16 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto -mt-12">
            
            {/* Pillar 1 */}
            <div className="bg-[#050A14]/90 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl hover:border-[#1877F2]/40 hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Systemic Failures</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The current investigative bodies act without accountability, leaving officers suspended in limbo for years for simply doing their duty.</p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#050A14]/90 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl hover:border-[#1877F2]/40 hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Mental Health Toll</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Prolonged investigations are destroying families and lives. We demand a 12-month time limit to prevent further psychological damage.</p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#050A14]/90 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl hover:border-[#1877F2]/40 hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Legal Protection</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Officers deserve immediate, robust legal support after critical incidents, untainted by political pressures or media narratives.</p>
            </div>

          </div>
        </div>
      </section>

      {/* FOUNDER SHOWCASE (3D Flip Cards) */}
      <section className="bg-[#030712] py-24 border-b border-white/5 overflow-hidden">
        <div className="w-full px-6 lg:px-16 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-4 text-white">FOUNDING MEMBERS</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">The team behind the movement. Tap or hover to view biographies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="group h-[450px] perspective-[1000px] cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] focus-within:[transform:rotateY(180deg)] active:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#0a1224] rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600" alt="Paul Cooper" className="w-full h-[60%] object-cover grayscale opacity-80" />
                  <div className="p-6 flex flex-col justify-center flex-grow bg-gradient-to-t from-[#0a1224] via-[#0a1224] to-transparent absolute bottom-0 w-full h-[50%]">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Paul Cooper</h3>
                    <p className="text-[#1877F2] text-xs font-bold uppercase tracking-widest mb-4">Founder & Ex-Officer</p>
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
                      Click / Hover to View Bio
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1877F2] rounded-2xl border border-blue-400 overflow-hidden p-8 flex flex-col">
                  <Quote className="w-10 h-10 text-white/30 mb-4" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4">Biography</h3>
                  <p className="text-blue-50 text-sm leading-relaxed overflow-y-auto pr-2">
                    Paul served for 15 years as a frontline officer before being subjected to a grueling 3-year IOPC investigation following a high-pressure incident. Although completely cleared of any wrongdoing, the systemic lack of support and the psychological toll inspired him to found It Stops Now. His mission is to ensure no other officer faces the isolation and career-destroying limbo that he endured.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group h-[450px] perspective-[1000px] cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] focus-within:[transform:rotateY(180deg)] active:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#0a1224] rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" alt="Sarah Jenkins" className="w-full h-[60%] object-cover grayscale opacity-80" />
                  <div className="p-6 flex flex-col justify-center flex-grow bg-gradient-to-t from-[#0a1224] via-[#0a1224] to-transparent absolute bottom-0 w-full h-[50%]">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Sarah Jenkins</h3>
                    <p className="text-[#1877F2] text-xs font-bold uppercase tracking-widest mb-4">Legal Director</p>
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
                      Click / Hover to View Bio
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1877F2] rounded-2xl border border-blue-400 overflow-hidden p-8 flex flex-col">
                  <Quote className="w-10 h-10 text-white/30 mb-4" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4">Biography</h3>
                  <p className="text-blue-50 text-sm leading-relaxed overflow-y-auto pr-2">
                    Sarah is a leading human rights and defense attorney who specializes in representing public servants. Over the past decade, she has witnessed the erosion of due process for police officers in the face of public pressure. She leads the legal advocacy arm of It Stops Now, fighting for fair representation and pushing for legislative changes to protect officers' rights.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group h-[450px] perspective-[1000px] cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] focus-within:[transform:rotateY(180deg)] active:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#0a1224] rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" alt="Michael Davis" className="w-full h-[60%] object-cover grayscale opacity-80" />
                  <div className="p-6 flex flex-col justify-center flex-grow bg-gradient-to-t from-[#0a1224] via-[#0a1224] to-transparent absolute bottom-0 w-full h-[50%]">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Michael Davis</h3>
                    <p className="text-[#1877F2] text-xs font-bold uppercase tracking-widest mb-4">Head of Welfare</p>
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
                      Click / Hover to View Bio
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1877F2] rounded-2xl border border-blue-400 overflow-hidden p-8 flex flex-col">
                  <Quote className="w-10 h-10 text-white/30 mb-4" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4">Biography</h3>
                  <p className="text-blue-50 text-sm leading-relaxed overflow-y-auto pr-2">
                    As a former police psychologist, Michael has treated hundreds of officers suffering from severe PTSD and anxiety induced not just by the job, but by the adversarial nature of misconduct inquiries. He directs our support networks, providing confidential counseling, peer-to-peer support, and urgent crisis intervention for officers pushed to the brink.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEWS & EVENTS SECTION */}
      <section className="relative bg-[#02050A] py-24 border-t border-white/10 overflow-hidden">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[2px] bg-[#1877F2]"></div>
            <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Latest Updates</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* News Column */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 text-white">Recent News</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Parliamentary Debate on Investigation Time Limits", date: "Oct 12, 2026", img: "https://images.unsplash.com/photo-1541872511475-cb56767676f6?auto=format&fit=crop&q=80&w=600" },
                  { title: "New Mental Health Support Fund Launched", date: "Oct 05, 2026", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" }
                ].map((news, i) => (
                  <div key={i} className="group bg-[#050A14] rounded-2xl border border-white/10 overflow-hidden hover:border-[#1877F2]/50 transition-colors">
                    <div className="h-48 overflow-hidden relative">
                      <img src={news.img} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="News" />
                    </div>
                    <div className="p-6">
                      <p className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center"><Calendar className="w-3 h-3 mr-2" /> {news.date}</p>
                      <h4 className="text-white font-bold text-lg leading-tight mb-4 group-hover:text-[#1877F2] transition-colors">{news.title}</h4>
                      <Link href="/news" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center">
                        Read Article <ArrowRight className="w-3 h-3 ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events Column & Newsletter */}
            <div className="flex flex-col gap-12">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 text-white">Upcoming Events</h3>
                <div className="space-y-4">
                  {[
                    { title: "Annual Memorial Service", date: "Nov 11", loc: "London" },
                    { title: "Parliament Lobby Day", date: "Nov 25", loc: "Westminster" }
                  ].map((evt, i) => (
                    <div key={i} className="flex items-center gap-6 bg-[#050A14] p-5 rounded-xl border border-white/10 hover:border-[#1877F2]/30 transition-colors">
                      <div className="flex flex-col items-center justify-center bg-[#1877F2]/10 text-[#1877F2] rounded-lg w-16 h-16 shrink-0">
                        <span className="text-[10px] uppercase font-bold">{evt.date.split(' ')[0]}</span>
                        <span className="text-xl font-black leading-none">{evt.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">{evt.title}</h4>
                        <p className="text-slate-500 text-xs flex items-center"><Clock className="w-3 h-3 mr-1" /> {evt.loc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1877F2]/20 to-[#050A14] p-8 rounded-2xl border border-[#1877F2]/30 text-center">
                <Mail className="w-8 h-8 text-[#1877F2] mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Join the Newsletter</h3>
                <p className="text-slate-400 text-xs mb-6">Get the latest campaign updates straight to your inbox.</p>
                <div className="flex flex-col gap-3">
                  <input type="email" placeholder="Email Address" className="bg-[#02050A] border border-white/20 rounded-md px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1877F2]" />
                  <Button className="w-full bg-[#1877F2] text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs">Subscribe</Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* MAKE A DIFFERENCE TODAY */}
      <section className="relative bg-[#02050A] py-24 lg:py-40 border-t border-white/10 overflow-hidden">
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="bg-[#1877F2] rounded-[3rem] p-12 md:p-20 lg:p-32 relative overflow-hidden flex flex-col justify-center text-center items-center shadow-[0_30px_60px_rgba(24,119,242,0.3)] border border-white/10">
            
            {/* Dynamic Background Image */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1521634586221-a36c84c1f1ec?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1877F2] to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10 w-full max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8 text-white drop-shadow-xl">
                MAKE A DIFFERENCE <br className="hidden md:block"/> TODAY
              </h2>
              <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed font-medium drop-shadow-md">
                Your action today can save a life tomorrow. Demand accountability from the authorities and demand a 12-month limit on investigations.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full items-center">
                <Link href="/take-action/contact-mp" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-white text-[#1877F2] hover:bg-[#02050A] hover:text-white font-bold px-12 py-8 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-500 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2">
                    CONTACT YOUR MP
                  </Button>
                </Link>
                <Link href="/stories/submit" className="w-full sm:w-auto">
                  <Button className="border-2 border-white w-full sm:w-auto bg-transparent text-white hover:bg-white hover:text-[#1877F2] font-bold px-12 py-8 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:-translate-y-2">
                    SHARE YOUR STORY
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
