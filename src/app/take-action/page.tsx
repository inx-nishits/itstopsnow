"use client";

import { useState } from "react";
import { FileText, Target, Users, Megaphone, ArrowRight, Shield, Clock, Search, Mail } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useRouter } from "next/navigation";
import { EditorialSection } from "@/components/layout/PageSection";
import { PageHero, PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import FOIToolWizard from "@/components/take-action/FOIToolWizard";

export default function TakeActionPage() {
  const router = useRouter();
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
              <h3 className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest mb-1 text-slate-900 leading-tight">READY TEMPLATES</h3>
              <p className="text-slate-500 text-[10px] md:text-[11px] leading-tight">Professional &<br className="hidden md:block"/>effective letters.</p>
            </div>
          </div>
          <div className="py-6 px-3 lg:py-8 lg:px-6 flex flex-col md:flex-row items-center md:items-center justify-center gap-3 hover:bg-slate-50 transition-colors duration-500 border-l border-slate-100 md:border-l-0 text-center md:text-left h-full">
            <Clock className="w-7 h-7 md:w-8 md:h-8 text-[#1877F2] shrink-0" strokeWidth={1.5} />
            <div className="max-w-[200px]">
              <h3 className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest mb-1 text-slate-900 leading-tight">SAVE TIME</h3>
              <p className="text-slate-500 text-[10px] md:text-[11px] leading-tight">Skip the blank page.<br className="hidden md:block"/>Make impact fast.</p>
            </div>
          </div>
          <div className="py-6 px-3 lg:py-8 lg:px-6 flex flex-col md:flex-row items-center md:items-center justify-center gap-3 hover:bg-slate-50 transition-colors duration-500 text-center md:text-left h-full">
            <Shield className="w-7 h-7 md:w-8 md:h-8 text-[#1877F2] shrink-0" strokeWidth={1.5} />
            <div className="max-w-[200px]">
              <h3 className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest mb-1 text-slate-900 leading-tight">DRIVE CHANGE</h3>
              <p className="text-slate-500 text-[10px] md:text-[11px] leading-tight">Demand accountability<br className="hidden md:block"/>and reform.</p>
            </div>
          </div>
          <div className="py-6 px-3 lg:py-8 lg:px-6 flex flex-col justify-center items-center hover:bg-slate-50 transition-colors duration-500 border-l border-slate-100 md:border-l-0">
            <div className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-[#1877F2] leading-none mb-1 ${hybrid.editorialHeading}`}>
              <AnimatedCounter from={0} to={4281} duration={2} />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mt-1">LETTERS SENT</div>
            <div className="text-[9px] text-slate-500">and counting.</div>
          </div>
        </div>
      </EditorialSection>

      {/* 3. LAUNCHPAD */}
      <EditorialSection className="py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1200px]">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4">Choose Your Action</h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">Select a tool below to start making a difference. Whether you want to demand answers from police forces or write to your local MP, we have the tools you need.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Write to MP */}
            <div 
              onClick={() => router.push('/take-action/personalize')}
              className="bg-white rounded-3xl border border-slate-200 hover:border-[#1877F2]/40 hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#1877F2] transition-all duration-300">
                <Mail className="w-10 h-10 text-[#1877F2] group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-3">Write to your MP</h3>
              <p className="text-slate-500 text-sm mb-8 flex-grow">Find your local Member of Parliament and send a personalised letter demanding legislative change and better support.</p>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#1877F2] flex items-center gap-2">
                Start Writing <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: Templates */}
            <div 
              onClick={() => router.push('/take-action/templates')}
              className="bg-white rounded-3xl border border-slate-200 hover:border-[#1877F2]/40 hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#1877F2] transition-all duration-300">
                <FileText className="w-10 h-10 text-slate-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-3">Browse Templates</h3>
              <p className="text-slate-500 text-sm mb-8 flex-grow">Access our library of professionally written templates targeting specific campaigns and issues.</p>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#1877F2] flex items-center gap-2">
                View Templates <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3: FOI Tool */}
            <div 
              onClick={() => setIsFoiWizardOpen(true)}
              className="bg-white rounded-3xl border border-[#1877F2]/20 shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 blur-3xl rounded-full" />
              <div className="inline-flex items-center gap-2 bg-[#1877F2]/10 text-[#1877F2] font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 relative z-10">
                New Tool
              </div>
              <div className="w-20 h-20 rounded-2xl bg-[#050A14] flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 relative z-10 shadow-xl">
                <Search className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-3 relative z-10">Submit FOI Request</h3>
              <p className="text-slate-500 text-sm mb-8 flex-grow relative z-10">Legally demand answers. Send Freedom of Information requests to multiple UK police forces simultaneously.</p>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#1877F2] flex items-center gap-2 relative z-10">
                Launch FOI Tool <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </EditorialSection>

      <FOIToolWizard 
        isOpen={isFoiWizardOpen} 
        onClose={() => setIsFoiWizardOpen(false)} 
      />
    </div>
  );
}
