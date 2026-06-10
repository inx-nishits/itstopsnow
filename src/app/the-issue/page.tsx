"use client";

import { motion } from "framer-motion";
import { Scale, Activity, FileText, ArrowRight, ShieldAlert, HeartPulse, Clock, FileWarning, SearchX, Briefcase, Plus, Minus, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TheIssuePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1920"
            alt="Police lights"
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5" /> THE ISSUE
            </h3>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2"
            >
              <span className="text-white">A SYSTEM </span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">IN CRISIS.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-2xl drop-shadow"
            >
              When those who protect the public are denied natural justice, transparency, and trauma support, the entire system breaks down.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. REALITY WE CAN'T IGNORE STRIP */}
      <section className="bg-[#050B14] border-y border-white/5 relative z-20">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-10 md:px-8 flex-1 text-center group hover:bg-white/5 transition-colors">
              <div className="text-5xl font-bold text-white font-sans mb-2 group-hover:scale-110 transition-transform">100+</div>
              <div className="text-[10px] uppercase tracking-widest text-[#1877F2] font-bold mt-2">Officers lost to suicide</div>
            </div>
            <div className="py-10 md:px-8 flex-1 text-center group hover:bg-white/5 transition-colors">
              <div className="text-5xl font-bold text-white font-sans mb-2 group-hover:scale-110 transition-transform">4+ Yrs</div>
              <div className="text-[10px] uppercase tracking-widest text-[#1877F2] font-bold mt-2">Average IOPC investigation</div>
            </div>
            <div className="py-10 md:px-8 flex-1 text-center group hover:bg-white/5 transition-colors">
              <div className="text-5xl font-bold text-white font-sans mb-2 group-hover:scale-110 transition-transform">70%</div>
              <div className="text-[10px] uppercase tracking-widest text-[#1877F2] font-bold mt-2">Of complaints are unsubstantiated</div>
            </div>
            <div className="py-10 md:px-8 flex-1 text-center group hover:bg-white/5 transition-colors">
              <div className="text-5xl font-bold text-white font-sans mb-2 group-hover:scale-110 transition-transform">0</div>
              <div className="text-[10px] uppercase tracking-widest text-[#1877F2] font-bold mt-2">Accountability for false claims</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FACTS & STATISTICS (Detailed) */}
      <section className="py-32 bg-[#020611] relative">
        <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-[#1877F2]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">The Evidence</h2>
            <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">THE HARD FACTS</h2>
            <p className="text-slate-400 text-lg leading-relaxed">The data reveals a devastating pattern of systemic failure in how police officers are treated during misconduct and post-incident investigations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-[#050B14] border border-white/10 p-12 rounded-3xl relative overflow-hidden group shadow-2xl hover:border-[#1877F2]/50 transition-colors">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#1877F2]/5 rounded-bl-[150px] -z-0 group-hover:bg-[#1877F2]/10 transition-colors"></div>
              <div className="w-20 h-20 bg-white/5 border border-white/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#1877F2] group-hover:text-white transition-colors relative z-10 shadow-lg">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-6xl text-white mb-4 font-sans tracking-tight relative z-10">68%</h3>
              <p className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-6 relative z-10">PROLONGED INVESTIGATIONS</p>
              <p className="text-slate-400 leading-relaxed text-lg relative z-10">Over two-thirds of gross misconduct investigations take longer than 12 months to resolve, leaving officers in a state of suspended trauma and career paralysis.</p>
            </div>
            
            <div className="bg-[#050B14] border border-white/10 p-12 rounded-3xl relative overflow-hidden group shadow-2xl hover:border-[#1877F2]/50 transition-colors">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#1877F2]/5 rounded-bl-[150px] -z-0 group-hover:bg-[#1877F2]/10 transition-colors"></div>
              <div className="w-20 h-20 bg-white/5 border border-white/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#1877F2] group-hover:text-white transition-colors relative z-10 shadow-lg">
                <SearchX className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-6xl text-white mb-4 font-sans tracking-tight relative z-10">8.2%</h3>
              <p className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-6 relative z-10">IOPC CONVICTION RATE</p>
              <p className="text-slate-400 leading-relaxed text-lg relative z-10">Despite years of scrutiny and millions in public funding, only a tiny fraction of Independent Office for Police Conduct investigations result in criminal convictions.</p>
            </div>
            
            <div className="bg-[#050B14] border border-white/10 p-12 rounded-3xl relative overflow-hidden group shadow-2xl hover:border-[#1877F2]/50 transition-colors">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#1877F2]/5 rounded-bl-[150px] -z-0 group-hover:bg-[#1877F2]/10 transition-colors"></div>
              <div className="w-20 h-20 bg-white/5 border border-white/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#1877F2] group-hover:text-white transition-colors relative z-10 shadow-lg">
                <HeartPulse className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-6xl text-white mb-4 font-sans tracking-tight relative z-10">1 in 5</h3>
              <p className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-6 relative z-10">CLINICAL PTSD</p>
              <p className="text-slate-400 leading-relaxed text-lg relative z-10">One in five serving officers suffer from undiagnosed or untreated Post Traumatic Stress Disorder, exacerbated directly by the stress of investigation processes.</p>
            </div>
            
            <div className="bg-[#050B14] border border-white/10 p-12 rounded-3xl relative overflow-hidden group shadow-2xl hover:border-[#1877F2]/50 transition-colors">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#1877F2]/5 rounded-bl-[150px] -z-0 group-hover:bg-[#1877F2]/10 transition-colors"></div>
              <div className="w-20 h-20 bg-white/5 border border-white/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#1877F2] group-hover:text-white transition-colors relative z-10 shadow-lg">
                <Briefcase className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-6xl text-white mb-4 font-sans tracking-tight relative z-10">9,000+</h3>
              <p className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-6 relative z-10">OFFICERS RESIGNING</p>
              <p className="text-slate-400 leading-relaxed text-lg relative z-10">Record numbers of highly trained officers are resigning voluntarily, citing the toxic culture of blame and lack of protection from their forces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT'S GOING WRONG (3 Pillars) */}
      <section className="py-32 bg-[#050B14] text-white border-t border-white/5 relative">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-[#1877F2]/5 blur-[150px] pointer-events-none rounded-full"></div>
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">The Flaws</h2>
            <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">WHAT IS GOING WRONG?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {/* Pillar 1 */}
            <div className="flex flex-col relative">
              <div className="text-[#1877F2] font-sans font-black text-8xl opacity-10 absolute -top-10 -left-6 pointer-events-none select-none">01</div>
              <h3 className="font-bold text-2xl uppercase tracking-widest mb-6 text-white">PROLONGED INVESTIGATIONS</h3>
              <div className="w-16 h-1 bg-[#1877F2] mb-8"></div>
              <p className="text-slate-400 leading-relaxed mb-6 text-base">
                Officers are routinely placed under investigation for years. During this time, they are often suspended or placed on restricted duties.
              </p>
              <p className="text-slate-400 leading-relaxed text-base">
                They cannot progress their careers, move house, or plan for the future. The psychological toll of waiting years for a decision that could end their career or result in prison is immeasurable.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col relative">
              <div className="text-[#1877F2] font-sans font-black text-8xl opacity-10 absolute -top-10 -left-6 pointer-events-none select-none">02</div>
              <h3 className="font-bold text-2xl uppercase tracking-widest mb-6 text-white">LACK OF TRAUMA CARE</h3>
              <div className="w-16 h-1 bg-[#1877F2] mb-8"></div>
              <p className="text-slate-400 leading-relaxed mb-6 text-base">
                When officers are involved in traumatic incidents—such as fatal shootings or severe accidents—they are immediately treated as suspects rather than victims of workplace trauma.
              </p>
              <p className="text-slate-400 leading-relaxed text-base">
                Post-incident procedures prioritize gathering evidence against the officer over providing immediate psychological first aid and welfare support.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col relative">
              <div className="text-[#1877F2] font-sans font-black text-8xl opacity-10 absolute -top-10 -left-6 pointer-events-none select-none">03</div>
              <h3 className="font-bold text-2xl uppercase tracking-widest mb-6 text-white">GUILTY UNTIL PROVEN INNOCENT</h3>
              <div className="w-16 h-1 bg-[#1877F2] mb-8"></div>
              <p className="text-slate-400 leading-relaxed mb-6 text-base">
                The current regulatory framework—including the IOPC and internal Professional Standards Departments—operates from a starting point of suspicion.
              </p>
              <p className="text-slate-400 leading-relaxed text-base">
                Officers face trial by media, anonymous malicious complaints are weaponized, and there are no consequences for members of the public who make entirely fabricated allegations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE HUMAN IMPACT (Officers, Families, Communities) */}
      <section className="py-32 bg-[#020611] border-t border-white/5 relative">
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Collateral Damage</h2>
            <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">THE RIPPLE EFFECT</h2>
            <p className="text-slate-400 text-lg leading-relaxed">A broken misconduct system doesn't just damage the individual officer. The collateral damage spans across families, colleagues, and the public they serve.</p>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-12 flex flex-col md:flex-row gap-10 items-center shadow-2xl hover:border-[#1877F2]/30 transition-colors">
              <div className="w-24 h-24 bg-[#050B14] border border-white/10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(24,119,242,0.15)]">
                <ShieldAlert className="w-10 h-10 text-[#1877F2]" />
              </div>
              <div>
                <h3 className="font-bold text-2xl uppercase tracking-widest text-white mb-4">IMPACT ON OFFICERS</h3>
                <p className="text-slate-400 text-base leading-relaxed mb-6">Officers subjected to disproportionate scrutiny suffer from clinical depression, PTSD, relationship breakdowns, and financial ruin due to lost overtime or suspension. The ultimate tragedy is the rising rate of police suicides directly linked to investigation anxiety.</p>
                <div className="flex gap-3">
                  <span className="text-[10px] font-bold bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] px-4 py-2 rounded-full uppercase tracking-widest">Suicide Risk</span>
                  <span className="text-[10px] font-bold bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] px-4 py-2 rounded-full uppercase tracking-widest">Career Loss</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-12 flex flex-col md:flex-row gap-10 items-center shadow-2xl hover:border-[#1877F2]/30 transition-colors">
              <div className="w-24 h-24 bg-[#050B14] border border-white/10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(24,119,242,0.15)]">
                <Heart className="w-10 h-10 text-[#1877F2]" />
              </div>
              <div>
                <h3 className="font-bold text-2xl uppercase tracking-widest text-white mb-4">IMPACT ON FAMILIES</h3>
                <p className="text-slate-400 text-base leading-relaxed mb-6">The burden is carried home. Spouses and children watch their loved ones deteriorate under the stress of multi-year investigations. Families are torn apart by the stress, secrecy requirements, and media intrusion when cases are publicized before any facts are established.</p>
                <div className="flex gap-3">
                  <span className="text-[10px] font-bold bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] px-4 py-2 rounded-full uppercase tracking-widest">Divorce Rates</span>
                  <span className="text-[10px] font-bold bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] px-4 py-2 rounded-full uppercase tracking-widest">Secondary Trauma</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-12 flex flex-col md:flex-row gap-10 items-center shadow-2xl hover:border-[#1877F2]/30 transition-colors">
              <div className="w-24 h-24 bg-[#050B14] border border-white/10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(24,119,242,0.15)]">
                <Activity className="w-10 h-10 text-[#1877F2]" />
              </div>
              <div>
                <h3 className="font-bold text-2xl uppercase tracking-widest text-white mb-4">IMPACT ON COMMUNITIES</h3>
                <p className="text-slate-400 text-base leading-relaxed mb-6">When officers are terrified of making a mistake, they become risk-averse. 'De-policing' occurs when officers avoid proactive stops or necessary use-of-force out of fear it will end their career. This leaves the public less safe and emboldens criminals.</p>
                <div className="flex gap-3">
                  <span className="text-[10px] font-bold bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] px-4 py-2 rounded-full uppercase tracking-widest">De-Policing</span>
                  <span className="text-[10px] font-bold bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] px-4 py-2 rounded-full uppercase tracking-widest">Public Safety Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EDUCATIONAL CONTENT / FAQ */}
      <section className="py-32 bg-[#050B14] border-t border-white/5">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Knowledge is Power</h2>
            <h2 className="font-sans text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-6">UNDERSTANDING THE PROCESS</h2>
            <p className="text-slate-400 text-lg">Frequently asked questions about police misconduct and investigations.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is the IOPC?", a: "The Independent Office for Police Conduct (IOPC) oversees the police complaints system in England and Wales. They investigate the most serious and sensitive incidents and allegations involving the police." },
              { q: "Why do investigations take so long?", a: "Investigations are often delayed by severe understaffing at the IOPC, bureaucratic red tape, delayed disclosure of evidence (like Body Worn Video), and a culture that refuses to quickly dismiss obviously false or malicious complaints." },
              { q: "What happens when an officer is 'suspended'?", a: "The officer must hand in their warrant card and equipment. They cannot act as a police officer, cannot access police premises without permission, and are often isolated from their colleagues and support networks for years." },
              { q: "What is Post-Incident Procedure (PIP)?", a: "A formal procedure implemented after an incident where death or serious injury has occurred following police contact. While designed to secure evidence, the rigid structure often leaves officers feeling like suspects immediately after experiencing extreme trauma." },
              { q: "Can the public make false complaints?", a: "Yes. Currently, there are virtually no legal or financial repercussions for members of the public who make deliberately false, malicious, or vexatious complaints against police officers, even when those complaints cost millions to investigate." }
            ].map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden shadow-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full bg-[#020611] px-8 py-6 flex items-center justify-between font-bold text-sm text-white uppercase tracking-widest hover:bg-white/5 transition-colors text-left"
                >
                  {faq.q}
                  {openFaq === i ? <Minus className="w-5 h-5 text-slate-500 shrink-0 ml-4" /> : <Plus className="w-5 h-5 text-[#1877F2] shrink-0 ml-4" />}
                </button>
                {openFaq === i && (
                  <div className="px-8 py-6 bg-[#050B14] text-slate-400 text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RESEARCH PREVIEW & CTA */}
      <section className="bg-[#020611] py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1877F2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-1/2">
              <FileWarning className="w-16 h-16 text-[#1877F2] mb-8" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight font-sans">READ THE EVIDENCE</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Don't just take our word for it. Review the independent academic studies, Parliamentary reports, and psychological evaluations proving the systemic failure.
              </p>
              <Link href="/research">
                <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 uppercase tracking-widest text-[10px] px-10 py-7 rounded-full transition-all">
                  View Research Library <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
              </Link>
            </div>

            <div className="md:w-1/2 bg-gradient-to-br from-[#1877F2]/20 to-[#050B14] border border-[#1877F2]/30 rounded-3xl p-12 text-white shadow-[0_0_50px_rgba(24,119,242,0.15)] relative">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1541872511475-cb56767676f6?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-10 mix-blend-luminosity mask-image-to-r pointer-events-none rounded-3xl" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">DEMAND REFORM NOW</h3>
                <p className="text-slate-300 text-base mb-10 leading-relaxed">
                  We have prepared a template letter demanding a time-limit on IOPC investigations. Find your local MP and send it in under 2 minutes.
                </p>
                <Link href="/take-action" className="block w-full">
                  <Button className="w-full bg-[#1877F2] text-white hover:bg-blue-600 font-bold uppercase tracking-widest text-[10px] py-7 rounded-full shadow-xl transition-all">
                    Contact Your MP Today
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
