"use client";

import { motion, useInView, animate } from "framer-motion";
import { ShieldAlert, HeartPulse, Clock, SearchX, Briefcase, CheckCircle, ArrowRight, AlertTriangle, Scale, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialSection, CampaignSection } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { useEffect, useRef, useState } from "react";
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
    <div className="flex flex-col min-h-screen font-sans pb-12 lg:pb-24">

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
      <EditorialSection>
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="text-center mb-12 lg:mb-24 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">The Facts</h2>
            <h2 className={`font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight ${hybrid.editorialHeading} mb-6`}>THE HARD TRUTH</h2>
            <p className={`${hybrid.editorialBody} text-lg leading-relaxed`}>The data reveals a devastating pattern of systemic failure in how police officers are treated during misconduct and post-incident investigations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-6 md:p-10 relative overflow-hidden group`}>
              <div className="w-16 h-16 bg-[#1877F2]/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1877F2] group-hover:text-white transition-colors relative z-10">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className={`font-bold text-5xl max-sm:text-4xl ${hybrid.editorialHeading} mb-4 font-sans tracking-tight relative z-10`}>
                <AnimatedCounter from={0} to={68} suffix="%" duration={2} />
              </h3>
              <p className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-4 relative z-10">PROLONGED INVESTIGATIONS</p>
              <p className={`${hybrid.editorialBody} leading-relaxed text-sm relative z-10`}>Over two-thirds of gross misconduct investigations take longer than 12 months to resolve, leaving officers in career paralysis.</p>
            </div>
            
            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-6 md:p-10 relative overflow-hidden group`}>
              <div className="w-16 h-16 bg-[#1877F2]/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1877F2] group-hover:text-white transition-colors relative z-10">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className={`font-bold text-5xl max-sm:text-4xl ${hybrid.editorialHeading} mb-4 font-sans tracking-tight relative z-10`}>
                <AnimatedCounter from={0} to={8.2} isFloat suffix="%" duration={2} />
              </h3>
              <p className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-4 relative z-10">IOPC CONVICTION RATE</p>
              <p className={`${hybrid.editorialBody} leading-relaxed text-sm relative z-10`}>Despite years of scrutiny and millions in public funding, only a tiny fraction of investigations result in convictions.</p>
            </div>
            
            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-6 md:p-10 relative overflow-hidden group`}>
              <div className="w-16 h-16 bg-[#1877F2]/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1877F2] group-hover:text-white transition-colors relative z-10">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className={`font-bold text-5xl max-sm:text-4xl ${hybrid.editorialHeading} mb-4 font-sans tracking-tight relative z-10 flex items-baseline`}>
                <AnimatedCounter from={0} to={1} duration={1} /> <span className="text-2xl ml-2">in 5</span>
              </h3>
              <p className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-4 relative z-10">CLINICAL PTSD</p>
              <p className={`${hybrid.editorialBody} leading-relaxed text-sm relative z-10`}>One in five serving officers suffer from PTSD, exacerbated directly by the stress of investigation processes.</p>
            </div>
            
            <div className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-6 md:p-10 relative overflow-hidden group`}>
              <div className="w-16 h-16 bg-[#1877F2]/10 text-[#1877F2] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1877F2] group-hover:text-white transition-colors relative z-10">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className={`font-bold text-5xl max-sm:text-4xl ${hybrid.editorialHeading} mb-4 font-sans tracking-tight relative z-10`}>
                <AnimatedCounter from={0} to={9000} suffix="+" duration={2} />
              </h3>
              <p className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-4 relative z-10">OFFICERS RESIGNING</p>
              <p className={`${hybrid.editorialBody} leading-relaxed text-sm relative z-10`}>Record numbers of highly trained officers are resigning voluntarily, citing a toxic culture of blame and lack of protection.</p>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* WHAT'S GOING WRONG AWARENESS CARDS */}
      <CampaignSection variant="deep">
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="text-center mb-10 lg:mb-20 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">The Flaws</h2>
            <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">WHAT IS GOING WRONG?</h2>
            <p className="text-slate-400 text-lg leading-relaxed">The current framework is designed to find fault, not facts, leaving officers isolated and criminalized for doing their jobs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative rounded-3xl overflow-hidden group min-h-[350px] sm:min-h-[400px] border border-white/10">
              <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800" alt="Prolonged Investigations" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/80 to-transparent"></div>
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <Clock className="w-10 h-10 text-[#1877F2] mb-6 shadow-xl drop-shadow-[0_0_15px_rgba(24,119,242,0.5)]" />
                <h3 className="font-bold text-2xl uppercase tracking-widest text-white mb-4">PROLONGED INVESTIGATIONS</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Officers are routinely placed under investigation for years, suspended or placed on restricted duties, effectively freezing their careers and lives.</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden group min-h-[350px] sm:min-h-[400px] border border-white/10">
              <img src="https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=800" alt="Lack of Trauma Care" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/80 to-transparent"></div>
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <Activity className="w-10 h-10 text-[#1877F2] mb-6 shadow-xl drop-shadow-[0_0_15px_rgba(24,119,242,0.5)]" />
                <h3 className="font-bold text-2xl uppercase tracking-widest text-white mb-4">LACK OF TRAUMA CARE</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Post-incident procedures prioritize gathering evidence against the officer over providing psychological first aid after traumatic, life-altering events.</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden group min-h-[350px] sm:min-h-[400px] border border-white/10">
              <img src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&q=80&w=800" alt="Guilty Until Proven Innocent" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/80 to-transparent"></div>
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <Scale className="w-10 h-10 text-[#1877F2] mb-6 shadow-xl drop-shadow-[0_0_15px_rgba(24,119,242,0.5)]" />
                <h3 className="font-bold text-2xl uppercase tracking-widest text-white mb-4">GUILTY UNTIL PROVEN INNOCENT</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Officers face trial by media and anonymous malicious complaints with no consequences for members of the public who make fabricated allegations.</p>
              </div>
            </div>
          </div>
        </div>
      </CampaignSection>

      {/* THE IMPACT INFORMATIONAL SECTION */}
      <EditorialSection>
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">Collateral Damage</h2>
            <h2 className={`font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight ${hybrid.editorialHeading} mb-6`}>THE IMPACT</h2>
            <p className={`${hybrid.editorialBody} text-lg leading-relaxed max-w-3xl mx-auto`}>A broken misconduct system doesn't just damage the individual officer. The collateral damage spans across families, colleagues, and the public they serve.</p>
          </div>

          <div className={`${hybrid.editorialCard} p-5 sm:p-10 md:p-16 shadow-sm`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className={`font-bold text-2xl ${hybrid.editorialHeading} mb-8 border-b ${hybrid.editorialBorder} pb-4`}>On the Individual</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-[#1877F2] shrink-0 mt-0.5" />
                    <div>
                      <strong className={`block ${hybrid.editorialHeading} mb-1 uppercase tracking-wider text-sm`}>Severe Mental Health Decline</strong>
                      <span className={`${hybrid.editorialBody} text-sm leading-relaxed`}>Officers experience clinical depression, severe anxiety, and PTSD leading to tragic increases in suicide rates.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-[#1877F2] shrink-0 mt-0.5" />
                    <div>
                      <strong className={`block ${hybrid.editorialHeading} mb-1 uppercase tracking-wider text-sm`}>Financial Ruin</strong>
                      <span className={`${hybrid.editorialBody} text-sm leading-relaxed`}>Loss of overtime, suspension of pay progression, and massive legal fees to defend against false claims.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-[#1877F2] shrink-0 mt-0.5" />
                    <div>
                      <strong className={`block ${hybrid.editorialHeading} mb-1 uppercase tracking-wider text-sm`}>Family Breakdown</strong>
                      <span className={`${hybrid.editorialBody} text-sm leading-relaxed`}>Spouses and children carry the burden, leading to higher divorce rates and secondary trauma from intense media intrusion.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={`font-bold text-2xl ${hybrid.editorialHeading} mb-8 border-b ${hybrid.editorialBorder} pb-4`}>On the Community</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className={`block ${hybrid.editorialHeading} mb-1 uppercase tracking-wider text-sm`}>De-Policing</strong>
                      <span className={`${hybrid.editorialBody} text-sm leading-relaxed`}>Fear of career-ending investigations causes risk-aversion, leading to fewer proactive stops and necessary interventions.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className={`block ${hybrid.editorialHeading} mb-1 uppercase tracking-wider text-sm`}>Loss of Experience</strong>
                      <span className={`${hybrid.editorialBody} text-sm leading-relaxed`}>The mass exodus of highly trained, experienced officers leaves forces under-resourced and communities vulnerable.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className={`block ${hybrid.editorialHeading} mb-1 uppercase tracking-wider text-sm`}>Public Safety Risk</strong>
                      <span className={`${hybrid.editorialBody} text-sm leading-relaxed`}>When officers cannot perform their duties with confidence, criminals are emboldened and the public is left less safe.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* CHANGE IS POSSIBLE CTA PANEL */}
      <CampaignSection variant="deep" className="overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1877F2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
          <div className="bg-gradient-to-br from-[#1877F2]/20 to-[#020611] border border-[#1877F2]/30 rounded-3xl p-6 sm:p-12 lg:p-20 shadow-[0_0_50px_rgba(24,119,242,0.15)] flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <AlertTriangle className="w-16 h-16 text-[#1877F2] mb-8" />
              <h2 className="text-3xl max-sm:text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">CHANGE IS POSSIBLE</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                The time for performative sympathy is over. We demand concrete legislative changes to protect the officers who protect us.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-white font-medium uppercase tracking-widest text-sm">
                  <ArrowRight className="w-5 h-5 text-[#1877F2]" /> Time limits on IOPC investigations
                </li>
                <li className="flex items-center gap-3 text-white font-medium uppercase tracking-widest text-sm">
                  <ArrowRight className="w-5 h-5 text-[#1877F2]" /> Accountability for malicious false complaints
                </li>
                <li className="flex items-center gap-3 text-white font-medium uppercase tracking-widest text-sm">
                  <ArrowRight className="w-5 h-5 text-[#1877F2]" /> Mandatory trauma support protocols
                </li>
              </ul>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <Button
                type="button"
                onClick={() => setIsGetInvolvedOpen(true)}
                className="w-full md:w-auto bg-[#1877F2] text-white hover:bg-blue-600 font-bold uppercase tracking-[0.2em] text-xs px-12 py-8 rounded-full shadow-xl transition-all"
              >
                Get Involved Now
              </Button>
            </div>
          </div>
        </div>
      </CampaignSection>

      <GetInvolvedModal
        isOpen={isGetInvolvedOpen}
        onClose={() => setIsGetInvolvedOpen(false)}
      />

    </div>
  );
}

