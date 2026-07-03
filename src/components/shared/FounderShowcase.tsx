"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, RotateCw, X, Users, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/home/SectionReveal";

export type Founder = {
  name: string;
  role: string;
  quote: string;
  bio: string;
  img: string;
};

const PAUL_COOPER: Founder = {
  name: "Paul Cooper",
  role: "Founder | Former Police Officer | Creator of Pocket Sergeant",
  quote: "I created It Stops Now because no officer or family should ever face trauma or loss alone.",
  bio: "After more than a decade of frontline policing, I saw the impact that vicarious trauma and mental health challenges were having on officers and their families. I created It Stops Now to break the stigma, start conversations, and provide practical support for those who serve.\n\nThis movement is personal. It's built on lived experience, fueled by purpose, and driven by a belief that no one in blue should ever suffer in silence.",
  img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200",
};

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80&w=800"
];

export const FOUNDERS: Founder[] = [
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
];

export function FounderCard({ member, onOpenBio }: { member: Founder, onOpenBio: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full [perspective:1000px] group select-none">
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front (Drives the height of the card) */}
        <div
          onClick={() => setIsFlipped(true)}
          className="relative h-full [backface-visibility:hidden] rounded-2xl p-[1px] bg-white/10 hover:bg-gradient-to-br hover:from-[#1877F2]/70 hover:to-cyan-500/50 hover:shadow-[0_0_20px_rgba(24,119,242,0.2)] transition-all duration-300 cursor-pointer"
          style={{ transform: "translateZ(1px)" }}
        >
          <div className="w-full h-full flex flex-col bg-[#050A14] rounded-2xl overflow-hidden relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#050A14]/70 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#1877F2] transition-all"
              aria-label="Flip card"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Fixed height for identical image sizes across all breakpoints */}
            <div className="relative w-full h-52 min-h-52 max-h-52 sm:h-80 sm:min-h-80 sm:max-h-80 md:h-96 md:min-h-96 md:max-h-96 shrink-0">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/20 to-transparent pointer-events-none" />
            </div>

            {/* Content expands naturally, no cropping */}
            <div className="p-3 sm:p-5 flex flex-col flex-grow relative z-10 bg-[#050A14] text-left">
              <div className="flex flex-col flex-grow justify-start">
                <h4 className="text-sm md:text-xl font-black text-white uppercase tracking-tighter mb-0.5 leading-tight truncate">
                  {member.name}
                </h4>
                <div className="mb-2">
                  <span className="text-[#1877F2] font-bold text-xs md:text-sm tracking-wide leading-tight line-clamp-1">
                    {member.role}
                  </span>
                </div>
                
                <div className="relative text-left">
                  <p className="text-slate-300 text-xs md:text-sm italic font-medium pl-0 line-clamp-2 md:line-clamp-3 leading-relaxed">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-4 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-center sm:justify-between w-full">
                <span className="hidden sm:inline-block text-slate-500 text-xs sm:text-xs lg:text-sm uppercase tracking-widest font-semibold">Tap to flip</span>
                <span className="text-[#1877F2] hover:text-blue-400 text-xs sm:text-xs lg:text-sm font-bold uppercase tracking-widest flex items-center justify-center sm:justify-end w-full sm:w-auto gap-1 sm:gap-1.5 transition-colors">
                  View Bio <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back (Absolute positioned to match front's height) */}
        <div
          onClick={() => setIsFlipped(false)}
          className="absolute inset-0 [backface-visibility:hidden] rounded-2xl p-[1px] bg-gradient-to-br from-[#1877F2] to-cyan-500 shadow-[0_0_25px_rgba(24,119,242,0.3)] cursor-pointer"
          style={{ transform: "rotateY(180deg) translateZ(1px)" }}
        >
          <div className="w-full h-full flex flex-col bg-[#050A14] rounded-2xl p-5 relative overflow-hidden text-left">
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none" />

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-8 h-8 rounded-lg bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] mb-4">
              <Users className="w-4 h-4" />
            </div>

            <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter mb-0.5">
              {member.name}
            </h4>
            <div className="mb-2">
              <span className="text-[#1877F2] font-bold text-xs md:text-sm tracking-wider">
                {member.role}
              </span>
            </div>
            
            {/* Blue divider line */}
            <div className="w-8 h-[2px] bg-[#1877F2] mb-4" />
            
            <div className="flex-grow overflow-y-auto pr-1 text-slate-300 text-xs md:text-sm leading-relaxed font-medium mb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <p>{member.bio}</p>
            </div>

            <div className="mt-auto shrink-0">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenBio();
                }}
                className="w-full border border-[#1877F2] text-white bg-transparent hover:bg-[#1877F2]/10 font-bold py-4 rounded-xl text-xs lg:text-sm tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-1.5"
              >
                VIEW FULL BIO
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function BioModal({ member, onClose }: { member: Founder | null, onClose: () => void }) {
  if (!member) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal card content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-3xl bg-[#050A14] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row items-stretch max-h-[90vh] md:max-h-none"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/15 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left panel: Image */}
          <div className="w-full md:w-[40%] shrink-0 relative min-h-[250px] md:min-h-[400px]">
            <img 
              src={member.img} 
              alt={member.name} 
              className="absolute inset-0 w-full h-full object-cover object-top grayscale-[20%]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#050A14]/30 to-[#050A14] pointer-events-none" />
          </div>

          {/* Right panel: Details */}
          <div className="w-full md:w-[60%] p-6 sm:p-8 lg:p-10 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[500px] text-left">
            <span className="text-[#1877F2] font-bold text-xs lg:text-sm tracking-[0.25em] uppercase mb-1">
              {member.name === "Paul Cooper" ? "THE FOUNDER" : "FOUNDING MEMBER"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white mb-1">
              {member.name}
            </h3>
            
            <div className="mb-4">
              {member.role.split(" | ").map((r, idx) => (
                <div key={idx} className="text-[#1877F2] font-semibold text-xs sm:text-sm leading-snug">
                  {r}
                </div>
              ))}
            </div>

            <div className="w-12 h-[2px] bg-[#1877F2] mb-4 shrink-0" />

            {member.quote && (
              <div className="relative flex items-start gap-2 mb-4 italic text-slate-300 text-xs sm:text-sm pl-2 border-l border-[#1877F2]/40 shrink-0">
                &ldquo;{member.quote}&rdquo;
              </div>
            )}

            <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3 font-medium flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {member.bio.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function FoundersCarousel({ onOpenBio }: { onOpenBio: (member: Founder) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Jump to the middle of the "infinite" list on load
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Wait a tick for layout to finish calculating widths
      setTimeout(() => {
        // Target the 5th item (index 4) which is the start of the second block
        const targetChild = container.children[4] as HTMLElement;
        if (targetChild) {
          const scrollPos = targetChild.offsetLeft - container.clientWidth / 2 + targetChild.clientWidth / 2;
          // Instantly jump to the position without animation
          container.scrollLeft = scrollPos;
        }
      }, 50);
    }
  }, []);

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
    <div className="relative w-screen left-1/2 -translate-x-1/2 group">
      {/* Scroll Left Button */}
      <button 
        onClick={scrollLeft}
        className="absolute left-4 sm:left-8 lg:left-12 xl:left-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 bg-[#050A14]/90 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors shadow-xl"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button 
        onClick={scrollRight}
        className="absolute right-4 sm:right-8 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 bg-[#050A14]/90 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors shadow-xl"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 sm:gap-6 snap-x snap-mandatory scrollbar-hide px-0 sm:px-4 py-8"
      >
        {Array(5).fill(FOUNDERS).flat().map((member, idx) => (
          <div key={`${member.name}-${idx}`} className="snap-center shrink-0 w-[60vw] sm:w-[75vw] max-w-[280px] sm:max-w-[320px] md:max-w-[340px]">
            <FounderCard member={member} onOpenBio={() => onOpenBio(member)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FounderShowcase() {
  const [selectedMember, setSelectedMember] = useState<Founder | null>(null);

  return (
    <section className="bg-[#030712] text-white py-10 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <SectionReveal className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-5xl relative z-10 mb-8 lg:mb-12">
        {/* PAUL COOPER - THE FOUNDER SECTION */}
        <div className="relative w-full max-w-5xl mx-auto bg-gradient-to-r from-[#1877F2]/40 via-blue-500/10 to-transparent p-[1.5px] rounded-3xl shadow-2xl">
          <div className="relative w-full bg-[#050A14] rounded-3xl min-h-[380px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#1877F2]/5 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Background Image Panel */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 rounded-3xl bg-[#050A14]">
              <img 
                src={PAUL_COOPER.img} 
                alt={PAUL_COOPER.name} 
                className="absolute top-0 right-0 w-[120%] sm:w-full h-full object-cover object-top translate-x-[35%] sm:translate-x-[30%] md:translate-x-[25%] lg:translate-x-[20%]" 
              />
              {/* Strong fade gradient from left to transparent on the right, keeping text legible */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[30%] sm:from-[25%] md:from-[20%] via-[#050A14]/80 via-[55%] sm:via-[45%] to-transparent pointer-events-none" />
              {/* Mobile bottom-to-top gradient to ensure text readability if it stacks */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] from-[5%] via-[#050A14]/40 to-transparent sm:hidden pointer-events-none" />
            </div>

            {/* Foreground Content: Info */}
            <div className="w-[65%] sm:w-[70%] md:w-[68%] lg:w-[60%] flex flex-col justify-center text-left relative z-10 p-5 sm:p-8 lg:p-10 min-h-[380px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px]">
              <span className="text-[#1877F2] font-bold text-xs sm:text-xs lg:text-sm tracking-[0.25em] uppercase mb-1 block">THE FOUNDER</span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-2 lg:mb-4 leading-none flex flex-col">
                {PAUL_COOPER.name.split(" ").map((word, index) => (
                  <span key={index}>{word}</span>
                ))}
              </h3>
              
              <div className="mb-4 lg:mb-8 flex flex-col gap-0.5 sm:gap-1">
                {PAUL_COOPER.role.split(" | ").map((r, i) => (
                  <div key={i} className="text-[#1877F2] font-semibold text-xs sm:text-sm lg:text-base leading-tight">
                    {r}
                  </div>
                ))}
              </div>
              
              <div className="relative flex items-start gap-2 sm:gap-3 md:gap-4 mt-2 md:mt-4 mb-4 md:mb-8 text-left max-w-xl">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#1877F2] shrink-0" strokeWidth={1.5} />
                <p className="text-slate-300 italic text-xs sm:text-sm lg:text-base leading-relaxed font-medium mt-1 lg:mt-2">
                  {PAUL_COOPER.quote}
                </p>
              </div>
              
              <div className="flex justify-start">
                <Button 
                  onClick={() => setSelectedMember(PAUL_COOPER)}
                  className="border border-[#1877F2] bg-[#030712]/80 text-[#1877F2] hover:bg-[#1877F2]/10 rounded-xl px-4 py-3 sm:px-6 sm:py-5 lg:px-8 lg:py-6 text-xs sm:text-xs lg:text-sm font-bold uppercase tracking-widest gap-2 transition-all shadow-xl"
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#1877F2]" /> READ MY STORY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 pt-6 sm:pt-10 border-t border-white/5">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#1877F2]" />
            <h2 className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">OUR FOUNDING MEMBERS</h2>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#1877F2]" />
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white text-balance mb-4 sm:mb-6">
            The people behind the mission
          </h3>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            A dedicated team with lived experience and a shared passion for change.
          </p>
        </div>

        <FoundersCarousel onOpenBio={(member) => setSelectedMember(member)} />
      </SectionReveal>

      <BioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </section>
  );
}

