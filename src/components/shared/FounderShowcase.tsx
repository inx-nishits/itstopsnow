"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/home/SectionReveal";

const FOUNDERS = [
  {
    name: "Paul Cooper",
    role: "Founder & Ex-Officer",
    quote: "No officer should ever have to stand alone in the dark.",
    bio: "Paul served for 15 years as a frontline officer before being subjected to a grueling 3-year IOPC investigation. Although completely cleared, the systemic lack of support inspired him to found It Stops Now.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Sarah Jenkins",
    role: "Legal Director",
    quote: "Justice is not just for the public; it must protect the protectors too.",
    bio: "Sarah is a leading human rights and defense attorney who specializes in representing public servants. She leads the legal advocacy arm, fighting for fair representation and pushing for legislative changes.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Michael Davis",
    role: "Head of Welfare",
    quote: "Welfare is not an afterthought; it is a frontline necessity.",
    bio: "As a former police psychologist, Michael has treated hundreds of officers suffering from severe PTSD. He directs our support networks, providing confidential counseling and urgent crisis intervention.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
  },
] as const;

export function FounderCard({ member }: { member: (typeof FOUNDERS)[number] }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[340px] mx-auto lg:max-w-none aspect-[4/5] sm:aspect-[3/4] min-h-0 sm:min-h-[400px] lg:min-h-[500px] [perspective:1000px] group lg:w-full">
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] flex flex-col bg-[#050A14] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
          style={{ transform: "translateZ(1px)" }}
        >
          <div className="relative w-full h-[50%] sm:h-[55%] shrink-0">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover object-top grayscale-[40%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/10 to-transparent pointer-events-none" />
          </div>
          <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow relative z-10 bg-[#050A14] text-center sm:text-left">
            <div className="flex flex-col flex-grow justify-center overflow-hidden">
              <div className="mb-2">
                <span className="text-[#1877F2] font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                  {member.role}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-3">
                {member.name}
              </h4>
              <div className="bg-white/5 border-l-2 border-[#1877F2] p-3 md:p-4 rounded-r-xl relative text-left">
                <Quote className="w-4 h-4 text-[#1877F2] absolute top-2 right-2 opacity-20" />
                <p className="text-slate-300 text-xs md:text-sm italic font-medium relative z-10 line-clamp-3 sm:line-clamp-4 pr-4">
                  &ldquo;{member.quote}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-4 shrink-0">
              <Button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="w-full border border-white/20 text-white bg-transparent hover:bg-white hover:text-black font-bold py-4 sm:py-5 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 cursor-pointer min-h-[44px]"
              >
                View Bio
              </Button>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          onClick={() => setIsFlipped(false)}
          className="absolute inset-0 [backface-visibility:hidden] flex flex-col bg-[#1877F2] rounded-2xl sm:rounded-3xl p-5 md:p-8 shadow-[0_0_40px_rgba(24,119,242,0.4)] overflow-hidden cursor-pointer text-center sm:text-left"
          style={{ transform: "rotateY(180deg) translateZ(1px)" }}
        >
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="flex flex-col h-full relative z-10">
            <div className="mb-4 pb-4 border-b border-white/20 shrink-0">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-1">
                {member.name}
              </h4>
              <span className="text-white/80 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                {member.role}
              </span>
            </div>

            <div className="flex-grow overflow-y-auto pr-0 sm:pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent text-left">
              <p className="text-white text-sm md:text-base leading-relaxed font-medium">{member.bio}</p>
            </div>

            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="mt-4 shrink-0 w-full bg-white text-[#1877F2] hover:bg-slate-100 font-bold py-4 sm:py-5 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer min-h-[44px]"
            >
              Back
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function FounderShowcase() {
  return (
    <section className="bg-[#030712] text-white py-14 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <SectionReveal className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 mb-8 sm:mb-12 lg:mb-16 text-center">
        <h2 className="text-[#1877F2] text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-4">
          <span className="w-8 h-px bg-[#1877F2]" />
          The Architects
          <span className="w-8 h-px bg-[#1877F2]" />
        </h2>
        <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white text-balance px-2">
          Founding Members
        </h3>
      </SectionReveal>

      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center gap-6 sm:gap-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-stretch">
          {FOUNDERS.map((member) => (
            <FounderCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
