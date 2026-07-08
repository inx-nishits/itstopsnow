"use client";

import { useState } from "react";
import { FileText, Megaphone, Shield, Users, type LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { EditorialSection } from "@/components/layout/PageSection";
import { PageHero, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import FOIToolWizard from "@/components/take-action/FOIToolWizard";
import TakeActionLaunchpad from "@/components/take-action/TakeActionLaunchpad";

export default function TakeActionPage() {
  const [isFoiWizardOpen, setIsFoiWizardOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50">
      <PageHero
        className="!min-h-0 pb-8 md:pb-12 lg:pb-16"
        eyebrow={
          <>
            <Megaphone className="w-5 h-5 shrink-0" /> DRIVE THE CHANGE
          </>
        }
        title={
          <>
            <span className="text-white">TAKE </span>
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400 pr-2">
              ACTION.
            </span>
          </>
        }
        description="Choose how you want to make an impact. Write to your MP, submit a Freedom of Information request, or browse our ready-to-use letter templates."
        imageSrc="/images/take-action-hero.png"
        imageAlt="Person writing a formal letter"
        imageClassName="opacity-40 object-center scale-105"
      >
      </PageHero>

      {/* 2. ACTION BENEFITS STATISTICS STRIP */}
      <EditorialSection noPadding className="relative z-20 border-b border-slate-200 bg-white">
        <div className={`${PAGE_CONTENT_CONTAINER} grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100`}>
          {(
            [
              { icon: FileText, value: 4281, label: "LETTERS SENT", description: "To decision makers, and counting." },
              { icon: Users, value: 312, label: "MPS CONTACTED", description: "Across all constituencies." },
              { icon: Megaphone, value: 48, label: "CAMPAIGNS SUPPORTED", description: "Driving real reform." },
              { icon: Shield, value: 43, label: "POLICE FORCES ENGAGED", description: "Via FOI and letters." },
            ] as { icon: LucideIcon; value: number; label: string; description: string }[]
          ).map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`py-6 px-3 lg:py-8 lg:px-6 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors duration-500 text-center h-full ${index % 2 === 1 ? "border-l border-slate-100 md:border-l-0" : ""}`}
              >
                <StatIcon className="w-6 h-6 md:w-7 md:h-7 text-[#1877F2] shrink-0" strokeWidth={1.5} />
                <div className={`text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-[#1877F2] leading-none ${hybrid.editorialHeading}`}>
                  <AnimatedCounter from={0} to={stat.value} duration={2} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-900 leading-tight">{stat.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </EditorialSection>

      <TakeActionLaunchpad onOpenFoi={() => setIsFoiWizardOpen(true)} />

      <FOIToolWizard 
        isOpen={isFoiWizardOpen} 
        onClose={() => setIsFoiWizardOpen(false)} 
      />
    </div>
  );
}
