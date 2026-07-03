"use client";

import { useState } from "react";
import { FileText, Megaphone, Shield, Clock } from "lucide-react";
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
          <div className="py-6 px-3 lg:py-8 lg:px-6 flex flex-col md:flex-row items-center md:items-center justify-center gap-3 hover:bg-slate-50 transition-colors duration-500 text-center md:text-left h-full">
            <FileText className="w-7 h-7 md:w-8 md:h-8 text-[#1877F2] shrink-0" strokeWidth={1.5} />
            <div className="max-w-[200px]">
              <h3 className="font-bold text-xs md:text-xs uppercase tracking-widest mb-1 text-slate-900 leading-tight">READY TEMPLATES</h3>
              <p className="text-slate-500 text-xs md:text-xs leading-tight">Professional &<br className="hidden md:block"/>effective letters.</p>
            </div>
          </div>
          <div className="py-6 px-3 lg:py-8 lg:px-6 flex flex-col md:flex-row items-center md:items-center justify-center gap-3 hover:bg-slate-50 transition-colors duration-500 border-l border-slate-100 md:border-l-0 text-center md:text-left h-full">
            <Clock className="w-7 h-7 md:w-8 md:h-8 text-[#1877F2] shrink-0" strokeWidth={1.5} />
            <div className="max-w-[200px]">
              <h3 className="font-bold text-xs md:text-xs uppercase tracking-widest mb-1 text-slate-900 leading-tight">SAVE TIME</h3>
              <p className="text-slate-500 text-xs md:text-xs leading-tight">Skip the blank page.<br className="hidden md:block"/>Make impact fast.</p>
            </div>
          </div>
          <div className="py-6 px-3 lg:py-8 lg:px-6 flex flex-col md:flex-row items-center md:items-center justify-center gap-3 hover:bg-slate-50 transition-colors duration-500 text-center md:text-left h-full">
            <Shield className="w-7 h-7 md:w-8 md:h-8 text-[#1877F2] shrink-0" strokeWidth={1.5} />
            <div className="max-w-[200px]">
              <h3 className="font-bold text-xs md:text-xs uppercase tracking-widest mb-1 text-slate-900 leading-tight">DRIVE CHANGE</h3>
              <p className="text-slate-500 text-xs md:text-xs leading-tight">Demand accountability<br className="hidden md:block"/>and reform.</p>
            </div>
          </div>
          <div className="py-6 px-3 lg:py-8 lg:px-6 flex flex-col justify-center items-center hover:bg-slate-50 transition-colors duration-500 border-l border-slate-100 md:border-l-0">
            <div className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-[#1877F2] leading-none mb-1 ${hybrid.editorialHeading}`}>
              <AnimatedCounter from={0} to={4281} duration={2} />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-900 mt-1">LETTERS SENT</div>
            <div className="text-xs text-slate-500">and counting.</div>
          </div>
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
