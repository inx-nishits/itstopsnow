"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { ShieldAlert, HeartPulse, Clock, SearchX, Briefcase, ArrowRight, Scale, Activity, Check } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";
import GetInvolvedModal from "@/components/global/GetInvolvedModal";
import SectionReveal from "@/components/home/SectionReveal";

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

const IMPACT_ITEMS = [
  {
    icon: HeartPulse,
    text: "Officers experience clinical depression, severe anxiety, and PTSD leading to tragic increases in suicide rates.",
  },
  {
    icon: Briefcase,
    text: "Loss of overtime, suspension of pay progression, and massive legal fees to defend against false claims.",
  },
  {
    icon: ShieldAlert,
    text: "Spouses and children carry the burden, leading to higher divorce rates and secondary trauma.",
  },
  {
    icon: SearchX,
    text: "Fear of career-ending investigations causes risk-aversion, leading to fewer proactive stops.",
  },
  {
    icon: Activity,
    text: "The mass exodus of highly trained officers leaves forces under-resourced and communities vulnerable.",
  },
  {
    icon: Scale,
    text: "When officers cannot perform their duties with confidence, criminals are emboldened and the public is left less safe.",
  },
] as const;

const SOLUTION_ITEMS = [
  "Better mental health and trauma support",
  "Fair, transparent misconduct processes",
  "A culture of openness, respect and accountability",
  "Stronger welfare for officers and their families",
  "Leadership that puts people before politics",
] as const;

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
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 flex-1">Over two-thirds of gross misconduct investigations take longer than 12 months to resolve.</p>
              <p className="font-bold text-xs sm:text-xs uppercase tracking-widest text-[#1877F2]">PROLONGED INVESTIGATIONS</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 sm:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-slate-100 group">
              <SearchX className="w-7 h-7 sm:w-8 sm:h-8 text-[#1877F2] mb-4 sm:mb-6" strokeWidth={1.5} />
              <h3 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1877F2] mb-3 sm:mb-4 tracking-tight">
                <AnimatedCounter from={0} to={8.2} isFloat suffix="%" duration={2} />
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 flex-1">Only a tiny fraction of investigations result in convictions, despite millions in funding.</p>
              <p className="font-bold text-xs sm:text-xs uppercase tracking-widest text-[#1877F2]">IOPC CONVICTION RATE</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 sm:p-8 lg:p-10 border-r border-slate-100 md:border-r group">
              <HeartPulse className="w-7 h-7 sm:w-8 sm:h-8 text-[#1877F2] mb-4 sm:mb-6" strokeWidth={1.5} />
              <h3 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1877F2] mb-3 sm:mb-4 tracking-tight flex items-baseline justify-center">
                <AnimatedCounter from={0} to={1} duration={1} /> <span className="text-base sm:text-xl ml-1.5 sm:ml-2">in 3</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 flex-1">Serving officers suffer from PTSD, exacerbated by the stress of investigations.</p>
              <p className="font-bold text-xs sm:text-xs uppercase tracking-widest text-[#1877F2]">CLINICAL PTSD</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 sm:p-8 lg:p-10 group">
              <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-[#1877F2] mb-4 sm:mb-6" strokeWidth={1.5} />
              <h3 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1877F2] mb-3 sm:mb-4 tracking-tight">
                <AnimatedCounter from={0} to={9000} suffix="+" duration={2} />
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 flex-1">Record numbers are resigning voluntarily, citing a culture of blame.</p>
              <p className="font-bold text-xs sm:text-xs uppercase tracking-widest text-[#1877F2]">OFFICERS RESIGNING</p>
            </div>
            
          </div>
          
          <div className="text-center mt-6 sm:mt-8">
             <p className="text-xs sm:text-xs text-slate-400 font-medium">Sources: NPCC, Mind Blue Light Survey, Police Federation, IOPC Data</p>
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

      {/* THE IMPACT & CHANGE IS POSSIBLE */}
      <section className="border-t border-slate-200 bg-white py-10 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            {/* THE IMPACT — original light layout */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <h2 className="mb-4 text-3xl font-black uppercase tracking-tighter text-[#010B19] sm:mb-6 md:text-4xl lg:text-5xl">
                  THE IMPACT
                </h2>
                <p className="text-sm font-medium leading-relaxed text-slate-600 sm:text-base md:text-lg">
                  This isn&apos;t just a policing issue. It&apos;s a human issue.
                </p>
              </div>

              <ul className="space-y-4">
                {IMPACT_ITEMS.map(({ icon: Icon, text }, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center text-[#1877F2]">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium leading-relaxed text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm font-bold text-[#1877F2]">
                We cannot protect the public if we don&apos;t protect those who protect the public.
              </p>
            </div>

            {/* CHANGE IS POSSIBLE — revamped card */}
            <SectionReveal delay={0.08}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#020611] p-6 shadow-xl sm:rounded-[1.75rem] sm:p-8 lg:p-10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(24,119,242,0.18)_0%,transparent_70%)]" />

                <div className="relative">
                  <div className="mb-4 flex items-center gap-3 sm:mb-5">
                    <div className="h-[2px] w-10 bg-[#1877F2]" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1877F2]">
                      The path forward
                    </span>
                  </div>

                  <h2 className="mb-4 text-2xl font-black uppercase leading-none tracking-tight text-white sm:text-3xl md:text-4xl">
                    Change is{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-300">
                      possible.
                    </span>
                  </h2>

                  <p className="mb-8 max-w-lg text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                    But it starts with facing the truth. We need real action, real accountability and support systems that truly work.
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {SOLUTION_ITEMS.map((item, index) => (
                      <div
                        key={item}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4",
                          index === SOLUTION_ITEMS.length - 1 && "sm:col-span-2"
                        )}
                      >
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium leading-snug text-white">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setIsGetInvolvedOpen(true)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1877F2] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(24,119,242,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 sm:w-auto"
                    >
                      Get involved
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <Link
                      href="/take-action"
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white sm:justify-end"
                    >
                      Take action now
                      <ArrowRight className="h-4 w-4 text-[#1877F2]" />
                    </Link>
                  </div>
                </div>
              </div>
            </SectionReveal>
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

