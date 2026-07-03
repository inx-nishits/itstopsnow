import { Megaphone, Heart, Scale, Flame, ArrowRight } from "lucide-react";
import { EditorialSection } from "@/components/layout/PageSection";

const PILLARS = [
  {
    icon: Megaphone,
    title: "Raise Awareness",
    description: "Challenge stigma and put officer wellbeing on the national agenda.",
  },
  {
    icon: Heart,
    title: "Support Families",
    description: "Practical resources and community for officers and those left behind.",
  },
  {
    icon: Scale,
    title: "Campaign for Reform",
    description: "Push for fairness, accountability, and timely justice in policing.",
  },
  {
    icon: Flame,
    title: "Remember Lives",
    description: "Honour every officer lost — share stories that must not be forgotten.",
  },
] as const;

export default function AboutMovementSection() {
  return (
    <EditorialSection variant="white" className="py-10 sm:py-16 lg:py-20 relative overflow-hidden bg-slate-50">
      {/* Premium Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-0 right-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1877F2]/10 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent opacity-60 pointer-events-none" />
      
      <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1400px]">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#1877F2]" />
            <span className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">
              About the Movement
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#1877F2]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#010B19] leading-[0.95] mb-5 text-balance">
            Standing with those
            <span className="block text-slate-400 mt-2">who stand for us.</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-0">
            It Stops Now is a growing campaign for officer wellbeing, family support, and
            meaningful reform — built on real stories, lived experience, and a refusal to look
            away.
          </p>
        </div>

        {/* 4 Column Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            const number = String(index + 1).padStart(2, "0");
            
            return (
              <div
                key={pillar.title}
                className="group relative rounded-3xl bg-white border border-slate-100 p-5 lg:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(24,119,242,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full"
              >
                {/* Huge Background Number */}
                <div className="absolute -right-2 -top-6 text-[120px] font-black text-slate-50 leading-none select-none group-hover:text-[#1877F2]/[0.03] transition-colors duration-500 z-0">
                  {number}
                </div>

                {/* Top: Icon */}
                <div className="relative z-10 mb-auto pb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 shadow-sm transition-all duration-500">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                </div>

                {/* Bottom: Text */}
                <div className="relative z-10 mt-auto">
                  <h3 className="font-black text-base sm:text-lg text-[#010B19] uppercase tracking-wider mb-2 group-hover:text-[#1877F2] transition-colors duration-500">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-500 text-xs lg:text-sm leading-relaxed font-medium group-hover:text-slate-700 transition-colors duration-500">
                    {pillar.description}
                  </p>
                </div>
                
                {/* Subtle bottom gradient accent on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#1877F2] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </EditorialSection>
  );
}
