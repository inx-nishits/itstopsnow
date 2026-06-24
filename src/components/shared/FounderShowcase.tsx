"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/home/SectionReveal";
import { cn } from "@/lib/utils";

const PAUL_COOPER = {
  name: "Paul Cooper",
  role: "Founder | Former Police Officer | Creator of Pocket Sergeant",
  bio1: "After more than a decade of frontline policing, I saw the impact that vicarious trauma and mental health challenges were having on officers and their families. I created It Stops Now to break the stigma, start conversations, and provide practical support for those who serve.",
  bio2: "This movement is personal. It's built on lived experience, fueled by purpose, and driven by a belief that no one in blue should ever suffer in silence.",
  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200",
};

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80&w=800"
];

const FOUNDERS = [
  {
    name: "Sarah Jenkins",
    role: "Co-Founder & Operations Director",
    quote: "My mission is to create real change by ensuring no officer or family feels alone.",
    bio: "Sarah is a leading human rights and defense attorney who specializes in representing public servants. She leads the legal advocacy arm, fighting for fair representation and pushing for legislative changes.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Michael Davis",
    role: "Co-Founder & Wellbeing Lead",
    quote: "Every conversation matters. I'm here to ensure our wellbeing comes first.",
    bio: "As a former police psychologist, Michael has treated hundreds of officers suffering from severe PTSD. He directs our support networks, providing confidential counseling and urgent crisis intervention.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Emma Lee",
    role: "Co-Founder & Community Lead",
    quote: "Stronger together. Building a community where support, understanding and hope thrive.",
    bio: "Emma brings over a decade of community organizing experience. She builds the peer-support networks and regional hubs that ensure every officer has a safe space to turn to.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "James Thorne",
    role: "Co-Founder & Policy Advisor",
    quote: "Systemic reform requires challenging the status quo from the inside out.",
    bio: "A former policy advisor with extensive experience in governmental reform, James works to push legislative changes that protect officers from unfair systemic pressures.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200",
  },
  ...Array.from({ length: 16 }).map((_, i) => ({
    name: `Founding Member ${i + 5}`,
    role: "Founding Member",
    quote: "Dedicated to transforming the culture of policing for future generations.",
    bio: "An experienced professional bringing crucial expertise to the It Stops Now movement. Their dedication ensures we have the resources and structure needed to create systemic change. They work tirelessly to ensure the mission reaches every corner of the community.",
    img: MOCK_IMAGES[i % MOCK_IMAGES.length]
  }))
] as const;

export function FounderCard({ member }: { member: (typeof FOUNDERS)[number] }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full aspect-[3/4] min-h-[400px] lg:min-h-[460px] [perspective:1000px] group">
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] flex flex-col bg-[#050A14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          style={{ transform: "translateZ(1px)" }}
        >
          <div className="relative w-full h-[50%] shrink-0">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover object-top grayscale-[40%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/10 to-transparent pointer-events-none" />
          </div>
          <div className="p-5 flex flex-col flex-grow relative z-10 bg-[#050A14] text-left">
            <div className="flex flex-col flex-grow justify-center overflow-hidden">
              <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter mb-1">
                {member.name}
              </h4>
              <div className="mb-3">
                <span className="text-[#1877F2] font-bold text-[10px] md:text-xs tracking-wide">
                  {member.role}
                </span>
              </div>
              <div className="relative text-left flex-grow">
                <Quote className="w-3 h-3 text-[#1877F2] absolute top-1 -left-1 opacity-60" />
                <p className="text-slate-300 text-xs md:text-sm italic font-medium relative z-10 pl-3 line-clamp-4">
                  &ldquo;{member.quote}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-4 shrink-0">
              <Button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="w-full border border-white/20 text-white bg-transparent hover:bg-white hover:text-black font-bold py-4 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-1"
              >
                VIEW BIO <ChevronRight className="w-4 h-4 shrink-0" />
              </Button>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          onClick={() => setIsFlipped(false)}
          className="absolute inset-0 [backface-visibility:hidden] flex flex-col bg-[#1877F2] rounded-2xl p-6 shadow-[0_0_40px_rgba(24,119,242,0.4)] overflow-hidden cursor-pointer text-left"
          style={{ transform: "rotateY(180deg) translateZ(1px)" }}
        >
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="flex flex-col h-full relative z-10">
            <div className="mb-4 pb-4 border-b border-white/20 shrink-0">
              <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-1">
                {member.name}
              </h4>
              <span className="text-white/80 font-bold text-[10px] uppercase tracking-[0.2em]">
                {member.role}
              </span>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <p className="text-white text-sm leading-relaxed font-medium">{member.bio}</p>
            </div>

            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="mt-4 shrink-0 w-full bg-white text-[#1877F2] hover:bg-slate-100 font-bold py-4 rounded-full text-xs tracking-widest uppercase transition-all shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              Back
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FoundersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mt-8 md:mt-12 group">
      {/* Scroll Buttons */}
      <button 
        onClick={scrollLeft}
        className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-[#050A14]/90 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors shadow-xl"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button 
        onClick={scrollRight}
        className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-[#050A14]/90 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors shadow-xl"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 sm:gap-6 snap-x snap-mandatory scrollbar-hide px-4 sm:px-8 pb-4"
      >
        {FOUNDERS.map(member => (
          <div key={member.name} className="snap-center shrink-0 w-[85vw] max-w-[320px] md:max-w-[340px]">
            <FounderCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FounderShowcase() {
  return (
    <section className="bg-[#030712] text-white py-10 md:py-16 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <SectionReveal className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 mb-8 lg:mb-12">
        {/* PAUL COOPER - THE FOUNDER SECTION */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 lg:gap-10 w-full max-w-[1100px] mx-auto bg-[#050A14] border border-white/5 rounded-2xl lg:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1877F2]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="w-full lg:w-[35%] shrink-0 flex items-center justify-center">
            <div className="relative w-full aspect-[16/9] sm:aspect-square lg:aspect-[4/5] max-w-[320px] lg:max-w-none rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img src={PAUL_COOPER.img} alt={PAUL_COOPER.name} className="w-full h-full object-cover object-center grayscale-[20%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] to-transparent opacity-80" />
            </div>
          </div>
          
          <div className="w-full lg:w-[65%] flex flex-col justify-center text-center lg:text-left relative z-10 py-1 lg:py-2">
            <span className="text-[#1877F2] text-[10px] font-bold uppercase tracking-[0.2em] mb-1 lg:mb-2 block">THE FOUNDER</span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1 lg:mb-2">{PAUL_COOPER.name}</h3>
            <p className="text-[#1877F2] font-medium text-[11px] sm:text-xs lg:text-sm mb-3 lg:mb-6">{PAUL_COOPER.role}</p>
            
            <div className="text-slate-300 text-xs lg:text-sm leading-relaxed space-y-2 lg:space-y-3 mb-4 lg:mb-6 text-left max-w-xl mx-auto lg:mx-0">
              <p>{PAUL_COOPER.bio1}</p>
              <p>{PAUL_COOPER.bio2}</p>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <Button className="border border-[#1877F2] bg-transparent text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-full px-5 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest gap-2 transition-all">
                <BookOpen className="w-4 h-4" /> READ PAUL'S STORY
              </Button>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 pt-6 sm:pt-10 border-t border-white/5">
        <div className="text-center mb-8">
          <h2 className="text-[#1877F2] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
            FOUNDING MEMBERS
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white text-balance mb-4">
            The people behind the mission
          </h3>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            A dedicated team with a shared passion for supporting the mental health and wellbeing of our policing family.
          </p>
        </div>

        <FoundersCarousel />
      </SectionReveal>
    </section>
  );
}

