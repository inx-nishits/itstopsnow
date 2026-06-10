"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, Download, FileText, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_RESEARCH = [
  {
    id: "r1",
    slug: "mental-health-impact-report-2025",
    title: "The Silent Crisis: Mental Health Impact of Long-Term Investigations",
    author: "Dr. Sarah Jenkins",
    institution: "University of Policing Studies",
    date: "March 2025",
    category: "Mental Health",
    tags: ["Wellbeing", "IOPC", "Data Analysis"],
    summary: "A comprehensive analysis of 5,000 officers undergoing multi-year misconduct investigations, highlighting severe psychological deterioration and the urgent need for a 12-month limit.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "r2",
    slug: "financial-cost-of-suspensions",
    title: "Economic Realities: The Financial Burden of Officer Suspensions",
    author: "Prof. David Miller",
    institution: "Public Sector Economics Institute",
    date: "January 2025",
    category: "Systemic Issues",
    tags: ["Economics", "Taxpayer", "Policy"],
    summary: "Detailing the £120m annual cost to the taxpayer resulting from suspended officers awaiting lengthy IOPC case conclusions.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "r3",
    slug: "post-incident-procedures-review",
    title: "Post-Incident Procedures: A Decade in Review",
    author: "Insp. James Harding (Ret.)",
    institution: "It Stops Now Foundation",
    date: "November 2024",
    category: "Policy",
    tags: ["PIP", "Firearms", "Best Practice"],
    summary: "An operational review of Post-Incident Procedures following lethal force, identifying critical failures in immediate officer welfare and legal protection.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"
  }
];

const CATEGORIES = ["All", "Mental Health", "Systemic Issues", "Policy", "Data Analysis"];

export default function ResearchListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredResearch = MOCK_RESEARCH.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#020611] text-white font-sans pb-32">
      
      {/* HERO */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920" 
            alt="Research documents" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <BookOpen className="w-5 h-5" /> THE EVIDENCE BASE
            </h3>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2"
            >
              <span className="text-white">RESEARCH & </span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">REPORTS.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-2xl drop-shadow"
            >
              Academic studies, data analysis, and systemic reviews proving the urgent need for reform in police misconduct investigations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="sticky top-[72px] z-40 bg-[#050B14]/90 backdrop-blur-xl border-b border-white/5 py-5 shadow-xl">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="SEARCH RESEARCH TITLES OR AUTHORS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#020611] border border-white/10 rounded-full pl-14 pr-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-[#1877F2]/50 transition-colors"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${activeCategory === cat ? 'bg-[#1877F2] text-white shadow-[0_0_15px_rgba(24,119,242,0.3)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] mt-24">
        {filteredResearch.length === 0 ? (
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/10">
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-sans font-bold text-white mb-2 uppercase tracking-tight">No research found</h3>
            <p className="text-slate-400">Try adjusting your search or category filters.</p>
            <Button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} variant="outline" className="mt-8 border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-[10px] font-bold uppercase tracking-widest">Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredResearch.map((item, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={item.id}
                >
                  <Link href={`/research/${item.slug}`} className="group flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 overflow-hidden hover:shadow-2xl hover:border-[#1877F2]/50 transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute top-4 left-4 bg-[#050B14] border border-white/10 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-[#1877F2] shadow-lg">
                        {item.category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020611] to-transparent opacity-80" />
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow relative z-10 -mt-10">
                      <div className="flex items-center gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-4">
                        <span>{item.date}</span>
                      </div>
                      
                      <h3 className="font-sans text-2xl font-bold uppercase text-white mb-4 group-hover:text-[#1877F2] transition-colors leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                        {item.summary}
                      </p>
                      
                      <div className="border-t border-white/10 pt-6 mt-auto">
                        <p className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em] mb-1">{item.author}</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">{item.institution}</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#050B14] border-t border-white/10 px-8 py-6 flex items-center justify-between group-hover:bg-[#1877F2]/10 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-[#1877F2] transition-colors">Read Report</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-[#1877F2] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

    </div>
  );
}
