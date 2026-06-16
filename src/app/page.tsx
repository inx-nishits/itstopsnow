"use client";

import Link from "next/link";
import { Quote, Calendar, ArrowRight, Mail, Heart, Clock, AlertTriangle, X, Users, Scale, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function StatCounter({ end, suffix = "", prefix = "", isPulsing = false, decimals, duration = 2.5 }: { end: number, suffix?: string, prefix?: string, isPulsing?: boolean, decimals?: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const resolvedDecimals = decimals ?? (end % 1 !== 0 ? 1 : 0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(value);
        }
      });
      return () => controls.stop();
    }
  }, [end, isInView, duration]);

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

const STATS_DATA = [
  {
    id: "officers",
    label: "Officers Supported",
    endValue: 42850,
    prefix: "",
    suffix: "+",
    icon: Users,
    duration: 2.0,
    description: "Policing professionals and first responders supported nationwide through our mental health and welfare advocacy networks."
  },
  {
    id: "lives",
    label: "Lives Saved",
    endValue: 12,
    prefix: "",
    suffix: "",
    suffixText: " of 13",
    icon: Heart,
    duration: 4.5,
    isPulsing: true,
    description: "Active interventions preventing officer suicide during traumatic multi-year misconduct investigations."
  },
  {
    id: "victories",
    label: "Legal Victories",
    endValue: 38,
    prefix: "",
    suffix: "",
    icon: Scale,
    duration: 2.0,
    description: "Successful challenges against disproportionate suspension terms and unsubstantiated misconduct charges."
  },
  {
    id: "funds",
    label: "Funds Secured",
    endValue: 14.2,
    prefix: "£",
    suffix: "M",
    icon: ShieldCheck,
    duration: 2.0,
    description: "In welfare grants, psychological therapy funding, and legal aid secured for officers and their families."
  }
];

function FounderCard({ member }: { member: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] min-h-[500px] [perspective:1000px] group">
      <motion.div 
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 [backface-visibility:hidden] flex flex-col bg-[#050A14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          style={{ transform: "translateZ(1px)" }}
        >
          <div className="relative w-full h-[55%] shrink-0">
            <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top grayscale mix-blend-luminosity opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/10 to-transparent pointer-events-none"></div>
          </div>
          <div className="p-6 flex flex-col flex-grow relative z-10 bg-[#050A14]">
            <div className="flex flex-col flex-grow justify-center overflow-hidden">
              <div className="mb-2">
                <span className="text-[#1877F2] font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">{member.role}</span>
              </div>
              <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-3 drop-shadow-md">{member.name}</h4>
              <div className="bg-white/5 border-l-2 border-[#1877F2] p-3 md:p-4 rounded-r-xl relative">
                <Quote className="w-4 h-4 text-[#1877F2] absolute top-2 right-2 opacity-20" />
                <p className="text-slate-300 text-xs md:text-sm italic font-medium relative z-10 line-clamp-4">"{member.quote}"</p>
              </div>
            </div>
            
            <div className="mt-4 shrink-0">
              <Button 
                onClick={() => setIsFlipped(true)}
                className="w-full border border-white/20 text-white bg-transparent hover:bg-white hover:text-black font-bold py-5 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 cursor-pointer"
              >
                View Bio
              </Button>
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          onClick={() => setIsFlipped(false)}
          className="absolute inset-0 [backface-visibility:hidden] flex flex-col bg-[#1877F2] rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(24,119,242,0.4)] overflow-hidden cursor-pointer" 
          style={{ transform: "rotateY(180deg) translateZ(1px)" }}
        >
           {/* Decorative background elements */}
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
           
           <div className="flex flex-col h-full relative z-10">
             <div className="mb-4 pb-4 border-b border-white/20 shrink-0">
                <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-1">{member.name}</h4>
                <span className="text-white/80 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">{member.role}</span>
             </div>
             
             <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
               <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                 {member.bio}
               </p>
             </div>
             
             <Button 
              onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
              className="mt-4 shrink-0 w-full bg-white text-[#1877F2] hover:bg-slate-100 font-bold py-5 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              Back
            </Button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);

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
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-12 max-w-[1600px] pb-32 md:pb-20">
          
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
          <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div className="flex items-start md:items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full shrink-0">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-wide">TAKE ACTION TODAY</p>
                <p className="text-white/80 text-xs font-medium">Your support is vital to our cause. Find out how you can get involved and make a difference.</p>
              </div>
            </div>
            <Link href="/take-action" className="w-full md:w-auto">
              <Button className="w-full md:w-auto bg-white text-[#1877F2] hover:bg-slate-100 font-bold px-6 py-3 md:py-2 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-2 md:mt-0">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AWARENESS STATISTICS SECTION */}
      <section className="relative z-20 bg-[#02050A] py-24 border-b border-white/10 overflow-hidden">
        {/* Glow effect behind the cards to fit the premium theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[#1877F2]/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS_DATA.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={stat.id} 
                  className="group relative bg-[#050A14] border border-white/10 hover:border-[#1877F2]/40 rounded-3xl p-8 transition-all duration-500 hover:shadow-[0_0_35px_rgba(24,119,242,0.15)] flex flex-col h-full hover:-translate-y-1"
                >
                  {/* Card Header: Icon & Label */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-500 shadow-lg">
                      <IconComponent className={`w-6 h-6 ${stat.isPulsing ? 'animate-[pulse_1.5s_infinite]' : ''}`} />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-[0.2em]">
                      {stat.label}
                    </span>
                  </div>

                  {/* Card Body: Main Statistic Number */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <StatCounter 
                      end={stat.endValue} 
                      prefix={stat.prefix} 
                      suffix={stat.suffix} 
                      duration={stat.duration} 
                      isPulsing={stat.isPulsing}
                    />
                    {stat.suffixText && (
                      <span className="text-2xl font-black text-slate-500 tracking-tight pb-1">
                        {stat.suffixText}
                      </span>
                    )}
                  </div>

                  {/* Card Footer: Supporting Description */}
                  <p className="text-slate-400 text-sm leading-relaxed font-normal group-hover:text-slate-300 transition-colors">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY IT STOPS NOW */}
      <section className="relative bg-[#02050A] py-32 lg:py-48 border-b border-white/10 overflow-hidden">
        {/* Abstract Background Element to match top section */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1877F2]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Context */}
            <div className="flex flex-col justify-center lg:col-span-5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.3em] uppercase">Why It Stops Now</h2>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-6">
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

            {/* Right side: Quote with Cinematic Image Support (Side-by-Side layout with larger image) */}
            <div className="relative p-8 md:p-12 border border-white/10 bg-[#0a1120]/85 backdrop-blur-2xl rounded-[3rem] group hover:border-[#1877F2]/30 transition-all duration-500 shadow-2xl overflow-hidden lg:col-span-7">
              <div className="flex flex-col md:flex-row gap-8 items-stretch">
                
                {/* Quote Text & Actions (Left Side) */}
                <div className="flex-1 flex flex-col justify-between relative z-10">
                  <div className="relative">
                    <Quote className="w-12 h-12 text-[#1877F2]/10 mb-4 group-hover:scale-110 group-hover:text-[#1877F2]/30 transition-all duration-500" />
                    <p className="text-2xl md:text-3xl text-white font-medium leading-[1.3] tracking-tight mb-8">
                      "To protect and serve others, they gave everything. Now, <span className="text-[#1877F2]">it's our turn to protect them.</span>"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between flex-wrap gap-4 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-[2px] bg-white/20 group-hover:bg-[#1877F2]/50 transition-colors duration-500"></div>
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

                {/* Styled Visible Image Container (Right Side) - Increased size */}
                <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500 min-h-[260px] md:min-h-auto">
                  <img 
                    src="/images/quote-bg.png" 
                    alt="Supportive holding background" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle color highlight overlay on hover */}
                  <div className="absolute inset-0 bg-[#1877F2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

              </div>
            </div>

          </div>

          {/* QUOTE CARDS SECTION (Icon, Title, Short Description) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-16 mt-20 border-t border-white/10 relative z-10">
            
            {/* Quote Card 1 */}
            <div className="bg-[#050A14]/90 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl hover:border-[#1877F2]/40 hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Systemic Failures</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The current investigative bodies act without accountability, leaving officers suspended in limbo for years for simply doing their duty.</p>
            </div>

            {/* Quote Card 2 */}
            <div className="bg-[#050A14]/90 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl hover:border-[#1877F2]/40 hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-[#1877F2]/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[#1877F2]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide mb-4">Mental Health Toll</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Prolonged investigations are destroying families and lives. We demand a 12-month time limit to prevent further psychological damage.</p>
            </div>

            {/* Quote Card 3 */}
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
      {/* MISSION STATEMENT BANNER - PREMIUM REVAMP */}
      <section className="relative w-full py-24 lg:py-40 bg-[#02050A] border-y border-white/5 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#1877F2]/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Image Side with Overlapping Glass Card */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] lg:aspect-auto lg:h-[700px] shadow-2xl group">
                <img 
                  src="/images/mission-support.png" 
                  alt="Officers Standing Shoulder to Shoulder" 
                  className="w-full h-full object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                {/* Deep dramatic overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#02050A] via-transparent to-[#1877F2]/10 opacity-80 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute inset-0 bg-[#1877F2]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000 pointer-events-none"></div>
                
                {/* Embedded Badge */}
                <div className="absolute top-8 left-8 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#1877F2] animate-pulse"></div>
                  <span className="text-white text-xs font-black tracking-widest uppercase shadow-black drop-shadow-md">The Mission</span>
                </div>
              </div>

              {/* Overlapping Glass Quote Card */}
              <div className="lg:absolute relative -mt-16 lg:mt-0 lg:-bottom-10 right-0 lg:-right-16 w-[90%] sm:w-[400px] ml-auto lg:ml-0 bg-[#050b16]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform lg:hover:-translate-y-2 transition-transform duration-500 z-20">
                <Quote className="w-10 h-10 text-[#1877F2] mb-6 opacity-80" />
                <p className="text-white text-lg lg:text-xl font-medium leading-relaxed mb-6 italic">
                  "This organization is not just about reform; it's about saving lives right now. They stepped in when no one else would listen."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-[#1877F2]"></div>
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-widest">Sgt. David Miller</p>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">Police Federation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Side */}
            <div className="w-full lg:w-1/2 pt-8 lg:pt-0 pb-8 lg:pb-0 pl-0 lg:pl-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[#1877F2]"></div>
                <span className="text-[#1877F2] text-xs font-bold tracking-[0.3em] uppercase">Why We Stand</span>
              </div>
              
              <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-8 leading-[1.05] drop-shadow-lg">
                Our Mission <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-cyan-400">Is Clear.</span>
              </h3>
              
              <div className="space-y-6 border-l-2 border-white/5 pl-8 lg:pl-10 relative">
                <div className="absolute left-[-2px] top-0 w-[2px] h-1/3 bg-gradient-to-b from-[#1877F2] to-transparent"></div>
                <p className="text-slate-300 text-xl lg:text-2xl leading-relaxed font-medium">
                  We are building an unshakeable foundation of support to ensure that no police officer or family member ever has to face the devastating consequences of systemic investigations alone. 
                </p>
                <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
                  We stand for fairness, mental health advocacy, and swift justice. By providing urgent crisis intervention, independent legal support, and driving legislative reform, we ensure the protectors are protected.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <Link href="/about">
                  <Button className="bg-[#1877F2] text-white hover:bg-white hover:text-black font-black px-10 py-7 rounded-full text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:shadow-[0_0_30px_rgba(24,119,242,0.5)] hover:-translate-y-1">
                    Discover Our Story
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* FOUNDING MEMBERS - ALTERNATING EDITORIAL REVAMP */}
      <section className="bg-[#02050A] py-32 border-b border-white/5 relative overflow-hidden">
        
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 mb-20 text-center">
          <h2 className="text-[#1877F2] text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#1877F2]"></span>
            The Architects
            <span className="w-8 h-px bg-[#1877F2]"></span>
          </h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Founding Members
          </h3>
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              { 
                name: "Paul Cooper", 
                role: "Founder & Ex-Officer", 
                quote: "No officer should ever have to stand alone in the dark.",
                bio: "Paul served for 15 years as a frontline officer before being subjected to a grueling 3-year IOPC investigation. Although completely cleared, the systemic lack of support inspired him to found It Stops Now.", 
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200"
              },
              { 
                name: "Sarah Jenkins", 
                role: "Legal Director", 
                quote: "Justice is not just for the public; it must protect the protectors too.",
                bio: "Sarah is a leading human rights and defense attorney who specializes in representing public servants. She leads the legal advocacy arm, fighting for fair representation and pushing for legislative changes.", 
                img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"
              },
              { 
                name: "Michael Davis", 
                role: "Head of Welfare", 
                quote: "Welfare is not an afterthought; it is a frontline necessity.",
                bio: "As a former police psychologist, Michael has treated hundreds of officers suffering from severe PTSD. He directs our support networks, providing confidential counseling and urgent crisis intervention.", 
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200"
              }
            ].map((member, i) => (
              <FounderCard key={i} member={member} />
            ))}
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
