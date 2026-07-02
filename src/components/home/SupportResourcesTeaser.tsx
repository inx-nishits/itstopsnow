"use client";

import Link from "next/link";
import { LayoutGrid, Smartphone, Headphones, Book, Globe, ArrowRight, ArrowUpRight } from "lucide-react";
import SectionReveal from "@/components/home/SectionReveal";
import { supportTabHref, type SupportTabSlug } from "@/lib/support/tabs";

export default function SupportResourcesTeaser() {
  const categories: { id: SupportTabSlug; label: string; description: string; icon: typeof Smartphone }[] = [
    {
      id: "apps",
      label: "Apps",
      description: "Support tools in your pocket.",
      icon: Smartphone,
    },
    {
      id: "podcasts",
      label: "Podcasts",
      description: "Real conversations and advice.",
      icon: Headphones,
    },
    {
      id: "books",
      label: "Books",
      description: "Guides and reading to move forward.",
      icon: Book,
    },
    {
      id: "websites",
      label: "Websites",
      description: "Trusted organisations and services.",
      icon: Globe,
    },
  ];

  return (
    <section className="relative w-full bg-white text-[#010B19] py-12 sm:py-20 lg:py-24 overflow-hidden border-t border-slate-100">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center">
          
          {/* Left Column: Title, Subtext & CTA */}
          <SectionReveal className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-12 h-[2px] bg-[#1877F2]"></div>
              <span className="text-[#1877F2] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">
                Support & Resources
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#010B19] mb-4 sm:mb-6 leading-none">
              You're not alone. <br />
              <span className="text-[#1877F2]">Help is here.</span>
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-8 max-w-xl">
              Curated tools, guides and trusted resources to support your mental wellbeing and help you take the next step forward.
            </p>
            
            <div>
              <Link href={supportTabHref("all")}>
                <button className="flex items-center gap-2.5 bg-[#1877F2] hover:bg-[#010B19] text-white font-black px-8 py-4 sm:py-5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer">
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                  <span>BROWSE ALL RESOURCES</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </Link>
            </div>
          </SectionReveal>

          {/* Right Column: 2x2 Category Grid */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <SectionReveal delay={0.1}>
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h4 className="text-[#010B19] font-black text-xs tracking-widest uppercase">
                  EXPLORE BY CATEGORY
                </h4>
                <Link href={supportTabHref("all")} className="hidden lg:flex items-center gap-1.5 text-xs font-black text-[#1877F2] hover:underline uppercase tracking-widest cursor-pointer">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full">
              {categories.map((cat, i) => {
                const IconComponent = cat.icon;
                return (
                  <SectionReveal key={cat.id} delay={0.1 + i * 0.05}>
                    <Link href={supportTabHref(cat.id)}>
                      <div className="group flex flex-row items-center p-4 sm:p-5 bg-[#f4f5f7]/60 border border-slate-200 rounded-2xl hover:border-[#1877F2]/40 hover:bg-white transition-all duration-300 hover:shadow-md min-h-[88px] sm:min-h-[100px] cursor-pointer">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          {/* Icon Circle */}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-300 bg-white flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-300 shrink-0 shadow-sm">
                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          
                          {/* Title & Description Stacked */}
                          <div className="flex flex-col min-w-0">
                            <h5 className="font-black text-sm sm:text-base text-[#010B19] uppercase tracking-tight leading-none flex items-center gap-1">
                              <span>{cat.label}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#1877F2] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </h5>
                            <p className="text-slate-500 text-[10px] sm:text-xs mt-1 sm:mt-1.5 leading-snug text-balance">
                              {cat.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SectionReveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
