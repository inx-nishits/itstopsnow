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
    <EditorialSection variant="white" className="py-10 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[min(640px,80vw)] h-[min(640px,80vw)] bg-[#1877F2]/[0.06] rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[min(400px,60vw)] h-[min(400px,60vw)] bg-[#1877F2]/[0.04] rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#1877F2]" />
              <span className="text-[#1877F2] font-bold text-xs tracking-[0.25em] uppercase">
                About the Movement
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tighter text-[#010B19] leading-[0.95] mb-5 text-balance">
              Standing with those
              <span className="block text-slate-400">who stand for us.</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-lg mb-6">
              It Stops Now is a growing campaign for officer wellbeing, family support, and
              meaningful reform — built on real stories, lived experience, and a refusal to look
              away.
            </p>

            <div className="inline-flex items-start gap-3 rounded-2xl border border-slate-200/90 bg-[#f4f5f7]/80 px-4 py-3.5 max-w-lg">
              <div className="w-9 h-9 rounded-xl bg-[#1877F2]/10 flex items-center justify-center shrink-0 mt-0.5">
                <ArrowRight className="w-4 h-4 text-[#1877F2]" aria-hidden />
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                Independently funded by Pocket Sergeant Ltd. Learn more about our supporter via the
                link in the site footer.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {PILLARS.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="group relative rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm hover:border-[#1877F2]/30 hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute top-4 right-4 text-4xl font-black text-slate-100 select-none leading-none group-hover:text-[#1877F2]/10 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-transparent group-hover:bg-[#1877F2] transition-all duration-300" />

                    <div className="w-11 h-11 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/15 flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-300 mb-4">
                      <Icon className="w-5 h-5" aria-hidden />
                    </div>

                    <h3 className="font-black text-sm sm:text-base text-[#010B19] uppercase tracking-wider mb-2 group-hover:text-[#1877F2] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium group-hover:text-slate-600 transition-colors">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </EditorialSection>
  );
}
