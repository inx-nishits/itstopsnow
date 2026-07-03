"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";
import { STORIES } from "@/app/stories/page";
import SectionReveal from "@/components/home/SectionReveal";

// Helper to parse dates for sorting
function parseStoryDate(dateStr: string): number {
  const parsed = Date.parse(dateStr);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default function ReadStoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Sort stories to ensure latest is first
  const sortedStories = [...STORIES].sort((a, b) => {
    return parseStoryDate(b.date) - parseStoryDate(a.date);
  });

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollButtons);
      // Run once on mount to set initial state
      checkScrollButtons();
      window.addEventListener("resize", checkScrollButtons);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScrollButtons);
      }
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Dynamically scroll based on screen size so it works properly on mobile
      const scrollAmount = scrollRef.current.clientWidth * 0.8; 
      const amount = direction === "left" ? -scrollAmount : scrollAmount;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-[#030712] text-white py-10 sm:py-20 lg:py-24 overflow-hidden border-t border-white/5">
      {/* Background Image and Gradients (Top portion only) */}
      <div className="absolute top-0 left-0 right-0 h-[420px] sm:h-[500px] lg:h-[560px] z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/mission-support.png"
          alt="Police officers standing shoulder to shoulder in solidarity representing real police stories"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right opacity-[0.38] md:opacity-[0.45] mix-blend-luminosity grayscale"
        />
        {/* Gradients to keep content legible while keeping image right portion visible */}
        <div className="absolute inset-0 bg-[#030712]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030712] to-transparent" />
        
        {/* Glow highlight for the top corner */}
        <div className="absolute top-0 left-0 w-[min(600px,60vw)] h-[min(600px,60vw)] bg-[#1877F2]/[0.03] rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto relative z-10 max-w-[1600px]">
        {/* Header Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-12 h-[2px] bg-[#1877F2]"></div>
              <h2 className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">Stories</h2>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-6 text-balance leading-none">
              REAL PEOPLE. <br />
              REAL <span className="text-[#1877F2]">STORIES.</span>
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-8 max-w-2xl">
              Behind every statistic is a human being. Read the raw, unfiltered experiences of police officers and their families navigating a broken system.
            </p>
            
            <div>
              <Link href="/stories">
                <button className="flex items-center gap-2.5 bg-[#1877F2] text-white hover:bg-white hover:text-black font-black px-8 py-4 sm:py-5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_8px_30px_rgb(24,119,242,0.25)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 cursor-pointer">
                  READ THE STORIES <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </SectionReveal>
        </div>

        {/* Carousel Block */}
        <SectionReveal delay={0.1}>
          <div className="border-t border-white/5 pt-8 sm:pt-10">
            {/* Subsection header */}
            <div className="flex items-center justify-between mb-6 pr-4 sm:pr-8">
              <h3 className="font-bold text-slate-300 uppercase tracking-widest text-xs sm:text-sm">
                Recent Stories
              </h3>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scroll("left")}
                    disabled={!showLeftArrow}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-[#050a14] hover:bg-[#1877F2] border border-white/10 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    disabled={!showRightArrow}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-[#050a14] hover:bg-[#1877F2] border border-white/10 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                <Link href="/stories" className="hidden sm:flex items-center gap-1.5 text-[#1877F2] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-300">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Carousel Container */}
            <div 
              className="relative group" 
              style={{ marginRight: "calc((100vw - 100%) / -2)" }}
            >

              {/* Scrollable Area */}
              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 sm:gap-6 snap-x snap-mandatory scrollbar-none pb-4"
                style={{ 
                  scrollbarWidth: "none", 
                  msOverflowStyle: "none",
                  paddingRight: "calc((100vw - 100%) / 2)"
                }}
              >
                {sortedStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/stories/${story.id}`}
                    className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[340px] aspect-[3/4] rounded-2xl overflow-hidden relative group/card border border-white/10 bg-[#050A14] flex flex-col justify-end p-5 shadow-lg transition-all duration-500 hover:border-[#1877F2]/40"
                  >
                    {/* Background image with grayscale/hover transition */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover object-top grayscale-[80%] opacity-55 group-hover/card:grayscale-0 group-hover/card:scale-105 group-hover/card:opacity-75 transition-all duration-700 ease-out"
                      />
                      {/* Vignette / Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02050a] via-[#02050a]/60 to-transparent z-10" />
                    </div>

                    {/* Card Content */}
                    <div className="relative z-20 flex flex-col items-start w-full">
                      {/* Badge / Type */}
                      <span className="text-xs lg:text-sm font-black text-white bg-[#1877F2] px-2.5 py-1 rounded-md tracking-widest uppercase mb-3 shadow-md">
                        {story.type}
                      </span>

                      {/* Title */}
                      <h4 className="text-white font-sans font-bold text-sm sm:text-base lg:text-lg leading-snug tracking-tight mb-4 group-hover/card:text-[#1877F2] transition-colors duration-300 line-clamp-3">
                        {story.title}
                      </h4>

                      {/* Footer Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-widest border-t border-white/10 pt-3.5 w-full">
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          {story.readTime}
                        </span>
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          {story.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile View All Link */}
              <div className="flex sm:hidden justify-center mt-6 pr-4">
                <Link href="/stories" className="flex items-center gap-1.5 text-[#1877F2] hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-300">
                  View All Stories <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
