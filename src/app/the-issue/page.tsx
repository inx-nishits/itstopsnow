"use client";

import { motion, useInView, animate } from "framer-motion";
import { ShieldAlert, HeartPulse, Clock, SearchX, Briefcase, CheckCircle, ArrowRight, AlertTriangle, Scale, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialSection, CampaignSection } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useState } from "react";
import GetInvolvedModal from "@/components/global/GetInvolvedModal";

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

export default function TheIssuePage() {
  const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">

      <PageHero
        animate
        eyebrow={
          <>
            <ShieldAlert className="w-5 h-5 shrink-0" /> THE ISSUE
          </>
        }
        title={
          <>
            <span className="text-white">A SYSTEM </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              IN CRISIS.
            </span>
          </>
        }
        description="When those who protect the public are denied natural justice, transparency, and trauma support, the entire system breaks down."
        imageSrc="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1920"
        imageAlt="Police lights"
      />

      {/* THE FACTS STATISTICS SECTION */}
      {/* THE FACTS STATISTICS SECTION */}
      {/* THE FACTS STATISTICS SECTION */}
      <section className="bg-white py-10 sm:py-20 lg:py-24 border-b border-slate-100">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="text-left mb-6 sm:mb-8 lg:mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#010B19] mb-4 sm:mb-6">THE FACTS</h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium">The numbers don't lie. Our policing family is in crisis.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-slate-100">
            
            <div className="flex flex-col items-center text-center p-4 sm:p-8 lg:p-10 border-b md:border-b-0 border-r border-slate-100 group">
              <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-[#1877F2] mb-4 sm:mb-6" strokeWidth={1.5} />
              <h3 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1877F2] mb-3 sm:mb-4 tracking-tight">
                <AnimatedCounter from={0} to={68} suffix="%" duration={2} />
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 flex-1">Over two-thirds of gross misconduct investigations take longer than 12 months to resolve.</p>
              <p className="font-bold text-[9px] sm:text-[11px] uppercase tracking-widest text-[#1877F2]">PROLONGED INVESTIGATIONS</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 sm:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-slate-100 group">
              <SearchX className="w-7 h-7 sm:w-8 sm:h-8 text-[#1877F2] mb-4 sm:mb-6" strokeWidth={1.5} />
              <h3 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1877F2] mb-3 sm:mb-4 tracking-tight">
                <AnimatedCounter from={0} to={8.2} isFloat suffix="%" duration={2} />
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 flex-1">Only a tiny fraction of investigations result in convictions, despite millions in funding.</p>
              <p className="font-bold text-[9px] sm:text-[11px] uppercase tracking-widest text-[#1877F2]">IOPC CONVICTION RATE</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 sm:p-8 lg:p-10 border-r border-slate-100 md:border-r group">
              <HeartPulse className="w-7 h-7 sm:w-8 sm:h-8 text-[#1877F2] mb-4 sm:mb-6" strokeWidth={1.5} />
              <h3 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1877F2] mb-3 sm:mb-4 tracking-tight flex items-baseline justify-center">
                <AnimatedCounter from={0} to={1} duration={1} /> <span className="text-base sm:text-xl ml-1.5 sm:ml-2">in 3</span>
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 flex-1">Serving officers suffer from PTSD, exacerbated by the stress of investigations.</p>
              <p className="font-bold text-[9px] sm:text-[11px] uppercase tracking-widest text-[#1877F2]">CLINICAL PTSD</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 sm:p-8 lg:p-10 group">
              <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-[#1877F2] mb-4 sm:mb-6" strokeWidth={1.5} />
              <h3 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1877F2] mb-3 sm:mb-4 tracking-tight">
                <AnimatedCounter from={0} to={9000} suffix="+" duration={2} />
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 flex-1">Record numbers are resigning voluntarily, citing a culture of blame.</p>
              <p className="font-bold text-[9px] sm:text-[11px] uppercase tracking-widest text-[#1877F2]">OFFICERS RESIGNING</p>
            </div>
            
          </div>
          
          <div className="text-center mt-6 sm:mt-8">
             <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Sources: NPCC, Mind Blue Light Survey, Police Federation, IOPC Data</p>
          </div>
        </div>
      </section>

      {/* WHAT'S GOING WRONG AWARENESS CARDS */}
      {/* WHAT'S GOING WRONG AWARENESS CARDS */}
      <section className="bg-white py-10 sm:py-20 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="text-left mb-6 sm:mb-8 lg:mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#010B19] mb-4 sm:mb-6">WHAT'S GOING WRONG?</h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium">The problems run deep—and they are costing lives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            <div className="relative bg-[#050A14] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-row md:flex-col items-center md:items-start text-left gap-5 sm:gap-6 group overflow-hidden border border-slate-800">
              <img src="/app-1.png" alt="Prolonged Investigations" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/80 to-[#020611]/40" />
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#002868] border border-[#1877F2]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(24,119,242,0.2)]">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1877F2]" />
              </div>
              <div className="relative z-10 flex-1">
                <h3 className="text-white font-black text-sm sm:text-base md:text-lg uppercase tracking-wider mb-2">PROLONGED INVESTIGATIONS</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">Officers are routinely placed under investigation for years, suspended or placed on restricted duties.</p>
              </div>
              <div className="relative z-10 md:hidden shrink-0">
                 <ArrowRight className="w-5 h-5 text-slate-500" />
              </div>
            </div>

            <div className="relative bg-[#050A14] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-row md:flex-col items-center md:items-start text-left gap-5 sm:gap-6 group overflow-hidden border border-slate-800">
              <img src="/app-2.png" alt="Lack of Trauma Care" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/80 to-[#020611]/40" />
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#002868] border border-[#1877F2]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(24,119,242,0.2)]">
                <Activity className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1877F2]" />
              </div>
              <div className="relative z-10 flex-1">
                <h3 className="text-white font-black text-sm sm:text-base md:text-lg uppercase tracking-wider mb-2">LACK OF TRAUMA CARE</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">Post-incident procedures prioritize gathering evidence against the officer over providing psychological first aid.</p>
              </div>
              <div className="relative z-10 md:hidden shrink-0">
                 <ArrowRight className="w-5 h-5 text-slate-500" />
              </div>
            </div>

            <div className="relative bg-[#050A14] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-row md:flex-col items-center md:items-start text-left gap-5 sm:gap-6 group overflow-hidden border border-slate-800">
              <img src="/app-3.png" alt="Guilty Until Proven Innocent" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/80 to-[#020611]/40" />
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#002868] border border-[#1877F2]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(24,119,242,0.2)]">
                <Scale className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1877F2]" />
              </div>
              <div className="relative z-10 flex-1">
                <h3 className="text-white font-black text-sm sm:text-base md:text-lg uppercase tracking-wider mb-2">GUILTY UNTIL PROVEN</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">Officers face trial by media and anonymous malicious complaints with no consequences for false allegations.</p>
              </div>
              <div className="relative z-10 md:hidden shrink-0">
                 <ArrowRight className="w-5 h-5 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE IMPACT & CHANGE IS POSSIBLE SECTION */}
      {/* THE IMPACT & CHANGE IS POSSIBLE SECTION */}
      <section className="bg-white py-10 sm:py-20 lg:py-24 border-t border-slate-200">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* THE IMPACT (Left Column) */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#010B19] mb-4 sm:mb-6">THE IMPACT</h2>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium">This isn't just a policing issue. It's a human issue.</p>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center text-[#1877F2]">
                    <HeartPulse className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">Officers experience clinical depression, severe anxiety, and PTSD leading to tragic increases in suicide rates.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center text-[#1877F2]">
                    <Briefcase className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">Loss of overtime, suspension of pay progression, and massive legal fees to defend against false claims.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center text-[#1877F2]">
                    <ShieldAlert className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">Spouses and children carry the burden, leading to higher divorce rates and secondary trauma.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center text-[#1877F2]">
                    <SearchX className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">Fear of career-ending investigations causes risk-aversion, leading to fewer proactive stops.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center text-[#1877F2]">
                    <Activity className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">The mass exodus of highly trained officers leaves forces under-resourced and communities vulnerable.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center text-[#1877F2]">
                    <Scale className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">When officers cannot perform their duties with confidence, criminals are emboldened and the public is left less safe.</span>
                </li>
              </ul>
              <p className="text-[#1877F2] font-bold text-sm mt-8">We cannot protect the public if we don't protect those who protect the public.</p>
            </div>

            {/* CHANGE IS POSSIBLE (Right Column) */}
            <div className="bg-[#020611] rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">CHANGE IS POSSIBLE.</h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
                  But it starts with facing the truth. We need real action, real accountability and real support systems that truly work.
                </p>
                <ul className="space-y-3 mb-10">
                  <li className="flex items-start gap-3 text-white font-medium text-sm">
                    <CheckCircle className="w-5 h-5 text-[#1877F2] shrink-0" /> Better mental health and trauma support
                  </li>
                  <li className="flex items-start gap-3 text-white font-medium text-sm">
                    <CheckCircle className="w-5 h-5 text-[#1877F2] shrink-0" /> Fair, transparent misconduct processes
                  </li>
                  <li className="flex items-start gap-3 text-white font-medium text-sm">
                    <CheckCircle className="w-5 h-5 text-[#1877F2] shrink-0" /> A culture of openness, respect and accountability
                  </li>
                  <li className="flex items-start gap-3 text-white font-medium text-sm">
                    <CheckCircle className="w-5 h-5 text-[#1877F2] shrink-0" /> Stronger welfare for officers and their families
                  </li>
                  <li className="flex items-start gap-3 text-white font-medium text-sm">
                    <CheckCircle className="w-5 h-5 text-[#1877F2] shrink-0" /> Leadership that puts people before politics
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                  <Button type="button" onClick={() => setIsGetInvolvedOpen(true)} className="w-full sm:w-auto bg-[#1877F2] text-white hover:bg-blue-600 font-bold uppercase tracking-widest text-xs px-8 py-5 rounded shadow-lg transition-all">
                    GET INVOLVED <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <span className="text-slate-400 text-sm font-medium">Be part of the change.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <GetInvolvedModal
        isOpen={isGetInvolvedOpen}
        onClose={() => setIsGetInvolvedOpen(false)}
      />
    </div>
  );
}

