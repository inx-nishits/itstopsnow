"use client";

import Link from "next/link";
import { Quote, Calendar, ArrowRight, Mail, Heart, Clock, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function StatCounter({ end, suffix = "", prefix = "", isPulsing = false, decimals }: { end: number, suffix?: string, prefix?: string, isPulsing?: boolean, decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const resolvedDecimals = decimals ?? (end % 1 !== 0 ? 1 : 0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          setCount(value);
        }
      });
      return () => controls.stop();
    }
  }, [end, isInView]);

  return (
    <div ref={ref} className={`text-5xl lg:text-7xl font-black text-white tracking-tighter drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#1877F2] transition-all duration-500 flex items-center gap-2`}>
      {prefix}
      <span className={isPulsing ? 'animate-[pulse_3s_infinite] text-[#1877F2]' : ''}>
        {count.toLocaleString(undefined, {
          minimumFractionDigits: resolvedDecimals,
          maximumFractionDigits: resolvedDecimals
        })}
      </span>
      {suffix}
    </div>
  );
}

export default function Home() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-white font-sans">
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center bg-[#050A14] pt-24 pb-16 lg:pt-32 lg:pb-16 border-b border-white/5 overflow-hidden">
        
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
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-12 max-w-[1600px] pb-12">
          
          {/* Left Content */}
          <div className="w-full lg:w-full max-w-[1200px] pt-20 lg:pt-0">
            <h1 className="text-7xl md:text-[6rem] xl:text-[9rem] font-black leading-[0.9] mb-8 tracking-tighter uppercase drop-shadow-2xl py-2">
              <span className="text-white block">A SYSTEM</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400 block pr-4">IN CRISIS</span>
            </h1>
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium text-white mb-8 leading-tight tracking-tight drop-shadow-md max-w-4xl">
              Supporting the Men and Women who Protect Us.
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
        {/* INFORMATION ALERT BOX (Pinned to bottom of Hero) */}
        <div className="absolute bottom-0 left-0 w-full bg-[#1877F2] py-4 border-b border-white/10 z-20 shadow-[0_10px_30px_rgba(24,119,242,0.15)]">
          <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-wide">URGENT ACTION REQUIRED</p>
                <p className="text-white/80 text-xs font-medium">The Parliamentary Debate is scheduled for Nov 25th. Have you contacted your MP?</p>
              </div>
            </div>
            <Link href="/take-action">
              <Button className="bg-white text-[#1877F2] hover:bg-slate-100 font-bold px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Contact MP Now
              </Button>
            </Link>
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
              <Heart className="w-4 h-4 text-[#1877F2] animate-[pulse_3s_infinite]" fill="currentColor" />
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
                <div className="flex items-center justify-between flex-wrap gap-6 mt-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-[2px] bg-white/20 group-hover:bg-[#1877F2]/50 transition-colors duration-700"></div>
                    <span className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase">The Mission</span>
                  </div>
                  <button 
                    onClick={() => setIsGetInvolvedOpen(true)}
                    className="bg-[#1877F2] text-white hover:bg-white hover:text-black text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    Get Involved
                  </button>
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
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-[150px] font-black text-white/[0.08] group-hover:text-black/10 transition-colors duration-500 pointer-events-none leading-none tracking-tighter">1</div>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
                <div className="flex justify-between items-center">
                  <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors duration-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  </div>
                  <span className="text-slate-500 group-hover:text-white/80 transition-colors font-black tracking-widest text-xs uppercase">Pillar 01</span>
                </div>
                <div className="pt-16">
                  <h3 className="font-black text-2xl text-white mb-4 group-hover:text-white transition-colors duration-500 uppercase tracking-tighter leading-none">Raise <br/> Awareness</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500">Start conversations that create lasting, systemic change in public perception.</p>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-[#1877F2] transition-colors duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] hover:-translate-y-2">
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-[150px] font-black text-white/[0.08] group-hover:text-black/10 transition-colors duration-500 pointer-events-none leading-none tracking-tighter">2</div>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
                <div className="flex justify-between items-center">
                  <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors duration-500"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </div>
                  <span className="text-slate-500 group-hover:text-white/80 transition-colors font-black tracking-widest text-xs uppercase">Pillar 02</span>
                </div>
                <div className="pt-16">
                  <h3 className="font-black text-2xl text-white mb-4 group-hover:text-white transition-colors duration-500 uppercase tracking-tighter leading-none">Support <br/> Families</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500">Stand beside families in their darkest times, providing stability and care.</p>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-[#1877F2] transition-colors duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] hover:-translate-y-2">
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-[150px] font-black text-white/[0.08] group-hover:text-black/10 transition-colors duration-500 pointer-events-none leading-none tracking-tighter">3</div>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
                <div className="flex justify-between items-center">
                  <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors duration-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                  </div>
                  <span className="text-slate-500 group-hover:text-white/80 transition-colors font-black tracking-widest text-xs uppercase">Pillar 03</span>
                </div>
                <div className="pt-16">
                  <h3 className="font-black text-2xl text-white mb-4 group-hover:text-white transition-colors duration-500 uppercase tracking-tighter leading-none">Drive <br/> Change</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-500">Push for systemic legislative change that saves lives and demands accountability.</p>
                </div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-[#1877F2] transition-colors duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] hover:-translate-y-2">
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 text-[150px] font-black text-white/[0.08] group-hover:text-black/10 transition-colors duration-500 pointer-events-none leading-none tracking-tighter">4</div>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
                <div className="flex justify-between items-center">
                  <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors duration-500"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                  </div>
                  <span className="text-slate-500 group-hover:text-white/80 transition-colors font-black tracking-widest text-xs uppercase">Pillar 04</span>
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

      {/* VOICES OF COURAGE - 2x2 HORIZONTAL CARDS GRID */}
      <section className="relative bg-[#02050A] py-24 border-y border-white/5 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full bg-[#1877F2]/5 blur-[120px] pointer-events-none rounded-[100%]" />

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          
          <div className="text-center mb-20">
            <h2 className="text-[#1877F2] text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-[#1877F2]"></span>
              Voices of Courage
              <span className="w-8 h-px bg-[#1877F2]"></span>
            </h2>
            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white leading-tight">
              REAL STORIES. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-white/80">REAL PEOPLE.</span>
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Hear directly from the officers, staff, and families we've supported through their darkest moments.
            </p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { num: "01", name: "PC James Holloway", quote: "Left in Shadows", excerpt: "After 15 years of unblemished service, I was suspended for 3 years over a false claim. It ruined my family.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" },
              { num: "02", name: "PCSO Sarah Mitchell", quote: "Finding Light", excerpt: "The mental health toll was unimaginable. Without this support network, I wouldn't be here today.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" },
              { num: "03", name: "The Thompson Family", quote: "Family Strength", excerpt: "We watched him fade away waiting for answers that never came. The system is fundamentally broken.", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600" },
              { num: "04", name: "Sgt Mark Roberts", quote: "Breaking Point", excerpt: "The anxiety of the investigation was worse than the incidents we faced on the streets. We need systemic change.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600" },
            ].map((item, i) => (
              <div key={i} className="group relative bg-[#050A14] border border-white/10 hover:border-[#1877F2]/40 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(24,119,242,0.1)] hover:-translate-y-1 flex flex-col sm:flex-row">
                
                {/* Left Side: Image (Edge-to-edge full width) */}
                <div className="w-full sm:w-[40%] h-64 sm:h-auto bg-[#02050A] relative border-b sm:border-b-0 sm:border-r border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-[#1877F2]/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none mix-blend-overlay"></div>
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  {/* Highly Visible Case Number Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-[#1877F2] text-white rounded-md px-3 py-1.5 text-[10px] font-black tracking-widest uppercase shadow-[0_4px_15px_rgba(0,0,0,0.8)] border border-white/10">
                    Case {item.num}
                  </div>
                </div>

                {/* Right Side: Text Content */}
                <div className="w-full sm:w-[60%] p-8 flex flex-col justify-center">
                  <Quote className="w-8 h-8 text-[#1877F2]/30 mb-4 group-hover:text-[#1877F2] transition-colors" />
                  <h4 className="text-2xl font-black text-white mb-3 tracking-tight">"{item.quote}"</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {item.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm tracking-wide">{item.name}</p>
                    </div>
                    <Link href={`/stories/${i+1}`}>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] transition-colors group/btn">
                        <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <Link href="/stories">
               <Button className="border border-white/20 text-white bg-transparent hover:bg-white hover:text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full py-6 px-12 transition-all duration-300">
                 View All Stories
               </Button>
             </Link>
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

      {/* QUOTE CARDS SECTION (Supporting the Cinematic Quote) */}
      <section className="bg-[#0a1224] py-16 border-b border-white/5 relative z-10">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quote Card 1 */}
            <div className="bg-[#050A14] border border-[#1877F2]/20 rounded-2xl p-8 relative hover:-translate-y-2 transition-transform duration-500 shadow-lg group">
              <Quote className="w-10 h-10 text-[#1877F2]/20 absolute top-6 right-6 group-hover:scale-110 transition-transform" />
              <p className="text-slate-300 font-medium italic text-sm mb-6 relative z-10 leading-relaxed">
                "We are not asking for immunity. We are simply asking for fairness and for investigations to not drag out for years, destroying our mental health."
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-auto">
                <div className="w-8 h-8 rounded-full bg-[#1877F2]/20 flex items-center justify-center font-bold text-[#1877F2] text-xs">A</div>
                <div>
                  <p className="text-white text-xs font-bold tracking-wide">Anonymous Officer</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest">Metropolitan Police</p>
                </div>
              </div>
            </div>

            {/* Quote Card 2 */}
            <div className="bg-[#050A14] border border-[#1877F2]/20 rounded-2xl p-8 relative hover:-translate-y-2 transition-transform duration-500 shadow-lg group">
              <Quote className="w-10 h-10 text-[#1877F2]/20 absolute top-6 right-6 group-hover:scale-110 transition-transform" />
              <p className="text-slate-300 font-medium italic text-sm mb-6 relative z-10 leading-relaxed">
                "The lack of welfare support during these 4-year IOPC proceedings is a national scandal. It Stops Now is our only voice."
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-auto">
                <div className="w-8 h-8 rounded-full bg-[#1877F2]/20 flex items-center justify-center font-bold text-[#1877F2] text-xs">P</div>
                <div>
                  <p className="text-white text-xs font-bold tracking-wide">Police Federation Rep</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest">National Body</p>
                </div>
              </div>
            </div>

            {/* Quote Card 3 */}
            <div className="bg-[#050A14] border border-[#1877F2]/20 rounded-2xl p-8 relative hover:-translate-y-2 transition-transform duration-500 shadow-lg group">
              <Quote className="w-10 h-10 text-[#1877F2]/20 absolute top-6 right-6 group-hover:scale-110 transition-transform" />
              <p className="text-slate-300 font-medium italic text-sm mb-6 relative z-10 leading-relaxed">
                "My partner was completely cleared of all charges, but the 3-year wait took a toll we can never repair. This system must change."
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-auto">
                <div className="w-8 h-8 rounded-full bg-[#1877F2]/20 flex items-center justify-center font-bold text-[#1877F2] text-xs">S</div>
                <div>
                  <p className="text-white text-xs font-bold tracking-wide">Spouse of Officer</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest">Family Member</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MISSION PILLARS (Formerly Quote Cards) */}
      <section className="bg-[#010b19] pb-24 border-b border-white/5 relative z-10">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 -mt-12">
            
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

      {/* FOUNDING MEMBERS - EDITORIAL PROFILE REVAMP */}
      <section className="bg-[#010610] py-32 border-b border-white/5 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1877F2]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-[#1877F2] text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-[#1877F2]"></span>
              The Team
              <span className="w-8 h-px bg-[#1877F2]"></span>
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-6">
              Founding Members
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              The dedicated individuals who turned their own experiences into a nationwide movement for change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              { 
                name: "Paul Cooper", 
                role: "Founder & Ex-Officer", 
                bio: "Paul served for 15 years as a frontline officer before being subjected to a grueling 3-year IOPC investigation following a high-pressure incident. Although completely cleared, the systemic lack of support inspired him to found It Stops Now.", 
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" 
              },
              { 
                name: "Sarah Jenkins", 
                role: "Legal Director", 
                bio: "Sarah is a leading human rights and defense attorney who specializes in representing public servants. She leads the legal advocacy arm, fighting for fair representation and pushing for legislative changes to protect officers' rights.", 
                img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
              },
              { 
                name: "Michael Davis", 
                role: "Head of Welfare", 
                bio: "As a former police psychologist, Michael has treated hundreds of officers suffering from severe PTSD. He directs our support networks, providing confidential counseling, peer-to-peer support, and urgent crisis intervention.", 
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
              }
            ].map((member, i) => (
              <div key={i} className="group flex flex-col h-full">
                
                {/* Mobile Layout (Static - Always Visible) */}
                <div className="md:hidden flex flex-col bg-[#050A14] border border-white/10 rounded-3xl p-6 shadow-xl h-full">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-[#02050A]">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="absolute inset-0 w-full h-full object-cover object-top" 
                    />
                  </div>
                  <div className="flex flex-col flex-grow pl-4 border-l-2 border-[#1877F2]">
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                      {member.name}
                    </h4>
                    <p className="text-[#1877F2] font-bold text-xs uppercase tracking-widest mb-4">
                      {member.role}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Desktop Layout (3D Flipping Card) */}
                <div className="hidden md:block perspective-1000 w-full h-[520px] relative">
                  <div className={`w-full h-full duration-700 preserve-3d transition-transform ${flippedCards[i] ? 'rotate-y-180' : ''}`}>
                    
                    {/* Front Face */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-[#050A14] border border-white/10 rounded-3xl p-6 flex flex-col">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-xl bg-[#02050A]">
                        <img 
                          src={member.img} 
                          alt={member.name} 
                          className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                      </div>
                      <div className="flex flex-col flex-grow pl-4 border-l-2 border-white/10 group-hover:border-[#1877F2] transition-colors duration-500">
                        <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-[#1877F2] transition-colors duration-300">
                          {member.name}
                        </h4>
                        <p className="text-[#1877F2] font-bold text-xs uppercase tracking-widest mb-4">
                          {member.role}
                        </p>
                        <button 
                          onClick={() => toggleFlip(i)} 
                          className="mt-auto inline-flex items-center text-white text-xs font-bold uppercase tracking-widest hover:text-[#1877F2] transition-colors cursor-pointer text-left self-start"
                        >
                          <span className="w-8 h-[1px] bg-white group-hover:bg-[#1877F2] mr-4 transition-colors"></span>
                          View Bio
                        </button>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#0a1120] border border-white/10 rounded-3xl p-8 flex flex-col">
                      <div className="flex flex-col flex-grow pl-4 border-l-2 border-[#1877F2]">
                        <h4 className="text-2xl font-black text-[#1877F2] uppercase tracking-tight mb-1">
                          {member.name}
                        </h4>
                        <p className="text-white font-bold text-xs uppercase tracking-widest mb-6">
                          {member.role}
                        </p>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                          {member.bio}
                        </p>
                        <button 
                          onClick={() => toggleFlip(i)} 
                          className="mt-auto inline-flex items-center text-white text-xs font-bold uppercase tracking-widest hover:text-[#1877F2] transition-colors cursor-pointer text-left self-start"
                        >
                          <span className="w-8 h-[1px] bg-[#1877F2] mr-4 transition-colors"></span>
                          View Photo
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT CAMPAIGN PROMOTION BANNER */}
      <section className="relative bg-[#050A14] py-24 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent mix-blend-screen pointer-events-none" />
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="bg-[#0c1322] border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-full lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                  About The Campaign
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
                Our Inception & <span className="text-[#1877F2]">The Mission</span>
              </h3>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
                Founded by ex-officers, legal professionals, and psychologists, *It Stops Now* arose directly from the front line. We saw first-hand the devastating toll that prolonged, unaccountable investigations take on officers and their loved ones.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                We advocate for reform, provide immediate crisis welfare support, and coordinate national legal defense efforts to restore fairness and support to those who stand in harm's way for our safety.
              </p>
            </div>
            <div className="w-full lg:w-auto shrink-0">
              <Link href="/about">
                <Button className="w-full lg:w-auto bg-[#1877F2] text-white hover:bg-white hover:text-black font-bold px-10 py-8 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-500 shadow-xl hover:-translate-y-1">
                  Read Our Story <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS & EVENTS SECTION - PREMIUM BENTO REVAMP */}
      <section className="relative bg-[#02050A] py-32 border-t border-white/5 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#1877F2]/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
          
          <div className="text-center mb-20">
            <h2 className="text-[#1877F2] text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-[#1877F2]"></span>
              News & Action
              <span className="w-8 h-px bg-[#1877F2]"></span>
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">
              The Latest Updates
            </h3>
          </div>
          
          {/* Premium Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Main Featured News (Left, 7 columns) */}
            <div className="lg:col-span-7 group relative rounded-[2rem] overflow-hidden border border-white/10 min-h-[500px] lg:h-[600px] flex items-end shadow-2xl bg-[#050A14]">
              <img 
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200" 
                alt="Parliament"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-[#02050A]/80 to-transparent"></div>
              
              <div className="relative z-10 p-8 md:p-12 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-[#1877F2] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-[0_0_15px_rgba(24,119,242,0.5)]">
                    Featured News
                  </span>
                  <span className="text-slate-300 text-xs font-bold tracking-widest uppercase flex items-center">
                    <Calendar className="w-3 h-3 mr-2 text-[#1877F2]" /> Oct 12, 2026
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight group-hover:text-[#1877F2] transition-colors duration-500">
                  Parliamentary Debate on Investigation Time Limits
                </h3>
                <p className="text-slate-300 text-base md:text-lg mb-8 line-clamp-2 max-w-2xl font-medium">
                  The Home Secretary has announced a formal review following our relentless campaign for a 12-month hard limit on all IOPC proceedings.
                </p>
                
                <Link href="/news" className="inline-flex items-center text-white bg-white/10 hover:bg-white hover:text-black backdrop-blur-md transition-colors duration-300 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full border border-white/20 hover:border-white">
                  Read Full Story <ArrowRight className="w-4 h-4 ml-3" />
                </Link>
              </div>
            </div>

            {/* Right Side Stack: Events (Right, 5 columns) */}
            <div className="lg:col-span-5 h-full">
              
              {/* Upcoming Events Box */}
              <div className="bg-[#050A14] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none group-hover:bg-[#1877F2]/5 transition-colors duration-700"></div>
                
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-8 flex items-center">
                  <Calendar className="w-6 h-6 text-[#1877F2] mr-3" /> Upcoming Events
                </h3>
                
                <div className="space-y-4 relative z-10">
                  {[
                    { date: "NOV 11", title: "Annual Memorial Service", loc: "St Paul's Cathedral, London" },
                    { date: "NOV 25", title: "Parliament Lobby Day", loc: "Westminster, London" },
                    { date: "DEC 05", title: "Officer Welfare Seminar", loc: "Online Virtual Event" }
                  ].map((evt, i) => (
                    <div key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[#1877F2]/10 transition-colors duration-300 border border-transparent hover:border-[#1877F2]/20 cursor-pointer group/item">
                      {/* Date Badge */}
                      <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0 group-hover/item:bg-[#1877F2] group-hover/item:border-[#1877F2] transition-colors duration-300 shadow-inner">
                        <span className="text-[10px] font-black text-slate-400 group-hover/item:text-white/80 uppercase tracking-widest leading-none mb-1 transition-colors">{evt.date.split(' ')[0]}</span>
                        <span className="text-2xl font-black text-white leading-none transition-colors">{evt.date.split(' ')[1]}</span>
                      </div>
                      
                      {/* Event Info */}
                      <div>
                        <h4 className="font-bold text-white text-lg mb-1 group-hover/item:text-[#1877F2] transition-colors">{evt.title}</h4>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center">
                          <Clock className="w-3 h-3 mr-1.5 text-slate-500" /> {evt.loc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link href="/events" className="inline-flex items-center text-slate-400 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest">
                    View Full Calendar <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>


      {/* MAKE A DIFFERENCE TODAY */}
      <section className="relative bg-[#02050A] py-16 lg:py-24 border-t border-white/10 overflow-hidden">
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="bg-[#1877F2] rounded-[3rem] py-16 px-8 md:py-20 md:px-16 lg:py-24 lg:px-20 relative overflow-hidden flex flex-col justify-center text-center items-center shadow-[0_30px_60px_rgba(24,119,242,0.3)] border border-white/10">
            
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

      {/* POCKET SERGEANT SPONSORSHIP BANNER */}
      <section className="relative bg-[#02050A] py-12 border-t border-white/5">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest">PROUDLY SUSTAINED BY</p>
              <p className="text-slate-400 text-sm">Pocket Sergeant Ltd — Supporting UK Policing</p>
            </div>
          </div>
          <div className="flex gap-6 items-center flex-wrap">
            <span className="text-slate-500 text-xs font-medium">Fully funded, zero public donation dependencies.</span>
            <a 
              href="https://pocketsergeant.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#1877F2] hover:text-white text-xs font-bold uppercase tracking-widest flex items-center transition-colors"
            >
              Learn More <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>
        </div>
      </section>

      {/* GET INVOLVED MODAL */}
      <AnimatePresence>
        {isGetInvolvedOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGetInvolvedOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#050b18] border border-white/10 rounded-3xl w-full max-w-lg p-8 md:p-10 relative overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setIsGetInvolvedOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-2">
                GET INVOLVED
              </h3>
              <p className="text-[#1877F2] font-bold text-xs uppercase tracking-widest mb-6">
                Stand with those who protect us
              </p>

              {/* Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your information has been registered. Together, we can make a difference.");
                setIsGetInvolvedOpen(false);
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm" placeholder="Your Name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Role / Force</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm" placeholder="e.g. PC / Supporter" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Telephone</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm" placeholder="Phone Number" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Your Message</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2] text-sm resize-none" placeholder="How would you like to support the movement?"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#1877F2] text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(24,119,242,0.3)] cursor-pointer">
                  Submit Details
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
