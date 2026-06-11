"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, Download, FileText, ChevronDown, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ResearchItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  institution: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  image: string;
  keyFindings: string[];
  featured: boolean;
}

const MOCK_RESEARCH: ResearchItem[] = [
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
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    keyFindings: [
      "5x increase in PTSD diagnoses for investigations exceeding 24 months.",
      "Average duration of current misconduct investigations is 4.2 years.",
      "Less than 10% of suspended officers receive weekly welfare contact."
    ],
    featured: true
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
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    keyFindings: [
      "Average cost per suspended officer exceeds £150,000 in salary and legal fees.",
      "Total taxpayer waste has increased by 38% since the introduction of current IOPC guidelines.",
      "45% of total campaign/legal spend is consumed by procedural delays."
    ],
    featured: false
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
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    keyFindings: [
      "40% average delay in compiling initial statements under standard PIP protocols.",
      "Welfare coordinator role is absent or unstaffed in 65% of surveyed divisions.",
      "Independent legal advice is delayed by an average of 18 hours post-incident."
    ],
    featured: false
  }
];

const CATEGORIES = ["All", "Mental Health", "Systemic Issues", "Policy", "Data Analysis"];

export default function ResearchListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Date"); // Date, Title
  const [currentPage, setCurrentPage] = useState(1);
  const [activeReport, setActiveReport] = useState<ResearchItem | null>(null);

  const itemsPerPage = 2;

  const handleDownload = (report: ResearchItem) => {
    const element = document.createElement("a");
    const file = new Blob([
      `IT STOPS NOW - RESEARCH REPORT\n`,
      `==============================\n`,
      `Title: ${report.title}\n`,
      `Author: ${report.author}\n`,
      `Institution: ${report.institution}\n`,
      `Date: ${report.date}\n`,
      `Category: ${report.category}\n\n`,
      `SUMMARY:\n`,
      `${report.summary}\n\n`,
      `KEY FINDINGS:\n`,
      report.keyFindings.map((f, i) => `${i + 1}. ${f}`).join("\n"),
      `\n\n---\n`,
      `Supported by Pocket Sergeant Ltd. & It Stops Now Campaign\n`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${report.slug}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredResearch = MOCK_RESEARCH.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedResearch = [...filteredResearch].sort((a, b) => {
    if (sortBy === "Title") {
      return a.title.localeCompare(b.title);
    }
    return b.id.localeCompare(a.id); // Default / Date (using ID)
  });

  const totalPages = Math.ceil(sortedResearch.length / itemsPerPage);
  const paginatedResearch = sortedResearch.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-[#020611] border border-white/10 rounded-full pl-14 pr-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-[#1877F2]/50 transition-colors"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
              <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Sort:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                  className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none cursor-pointer border-none"
                >
                  <option value="Date" className="bg-[#050A14] text-white">Latest</option>
                  <option value="Title" className="bg-[#050A14] text-white">Title A-Z</option>
                </select>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                    className={`whitespace-nowrap px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${activeCategory === cat ? 'bg-[#1877F2] text-white shadow-[0_0_15px_rgba(24,119,242,0.3)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] mt-24">
        {paginatedResearch.length === 0 ? (
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/10">
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-sans font-bold text-white mb-2 uppercase tracking-tight">No research found</h3>
            <p className="text-slate-400">Try adjusting your search or category filters.</p>
            <Button onClick={() => { setSearchQuery(""); setActiveCategory("All"); setCurrentPage(1); }} variant="outline" className="mt-8 border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-[10px] font-bold uppercase tracking-widest">Clear Filters</Button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {paginatedResearch.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={item.id}
                  >
                    <div className="group flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 overflow-hidden hover:shadow-2xl hover:border-[#1877F2]/50 transition-all duration-300 hover:-translate-y-2">
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                        
                        {item.featured && (
                          <div className="absolute top-4 left-4 bg-amber-500 text-black px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-lg">
                            ★ Featured Report
                          </div>
                        )}

                        <div className="absolute top-4 right-4 bg-[#050B14] border border-white/10 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-[#1877F2] shadow-lg">
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
                        
                        <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                          {item.summary}
                        </p>

                        {/* Key Findings List */}
                        {item.keyFindings && item.keyFindings.length > 0 && (
                          <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                            <h4 className="text-[10px] font-bold text-[#1877F2] uppercase tracking-wider mb-2">Key Findings:</h4>
                            <ul className="space-y-1">
                              {item.keyFindings.map((finding, idx) => (
                                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                                  <span className="text-[#1877F2] select-none">•</span>
                                  <span>{finding}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="border-t border-white/10 pt-6 mt-auto">
                          <p className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em] mb-1">{item.author}</p>
                          <p className="text-[9px] text-slate-500 uppercase tracking-widest">{item.institution}</p>
                        </div>
                      </div>
                      
                      <div className="bg-[#050B14] border-t border-white/10 px-8 py-6 flex items-center justify-between gap-4">
                        <button 
                          onClick={() => handleDownload(item)}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                        >
                          <Download className="w-4 h-4" /> Download PDF
                        </button>
                        <button 
                          onClick={() => setActiveReport(item)}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1877F2] hover:text-blue-400 transition-colors"
                        >
                          <span>View Report</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-16">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/10 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 disabled:pointer-events-none"
                >
                  Previous
                </Button>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/10 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 disabled:pointer-events-none"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* INLINE REPORT VIEWER MODAL */}
      <AnimatePresence>
        {activeReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl h-[85vh] bg-[#050A14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Reader Header */}
              <div className="bg-[#050B14] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#1877F2]" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white line-clamp-1">{activeReport.title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeReport.author} — {activeReport.institution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleDownload(activeReport)}
                    className="hidden sm:flex items-center gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 text-[#1877F2] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                  <button 
                    onClick={() => setActiveReport(null)}
                    className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Reader Controls Toolbar */}
              <div className="bg-white/5 border-b border-white/5 px-6 py-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <div className="flex items-center gap-4">
                  <span>Document PDF Viewer v1.2</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Page 1 of 4</span>
                  <span className="hidden sm:inline text-slate-600">|</span>
                  <span className="hidden sm:inline">Zoom: 100%</span>
                </div>
              </div>

              {/* Reader Body (Visual Mockup of PDF pages) */}
              <div className="flex-grow overflow-y-auto p-6 md:p-12 space-y-12 bg-slate-900/40 scrollbar-thin">
                
                {/* Page 1 (Cover Page) */}
                <div className="max-w-2xl mx-auto bg-white text-black p-8 md:p-16 aspect-[1/1.414] shadow-2xl flex flex-col justify-between border-t-8 border-[#1877F2] relative">
                  <div className="absolute top-4 right-4 text-[9px] font-black tracking-widest text-slate-400 uppercase">
                    Official Campaign Briefing
                  </div>
                  <div className="mt-12">
                    <p className="text-[#1877F2] font-extrabold uppercase tracking-widest text-xs mb-4">Research & Policy Paper</p>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6 uppercase">
                      {activeReport.title}
                    </h1>
                    <div className="w-16 h-1 bg-[#1877F2] mb-8" />
                    <p className="text-slate-600 text-sm max-w-md leading-relaxed">
                      This paper presents data and recommendations gathered by {activeReport.institution} regarding policing misconduct investigations in the UK, evaluating the structural welfare challenges faced by officers subject to prolonged proceedings.
                    </p>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-8 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800">{activeReport.author}</p>
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest">{activeReport.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-800 uppercase tracking-wider">{activeReport.date}</p>
                      <p className="text-[8px] text-slate-400 uppercase tracking-widest">IT STOPS NOW</p>
                    </div>
                  </div>
                </div>

                {/* Page 2 (Summary & Methodology) */}
                <div className="max-w-2xl mx-auto bg-white text-black p-8 md:p-16 aspect-[1/1.414] shadow-2xl flex flex-col justify-between relative">
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900 mb-6 pb-2 border-b border-slate-200">
                      1. Executive Summary & Context
                    </h2>
                    <p className="text-slate-700 text-xs leading-relaxed mb-6">
                      The current legislative framework governing police misconduct investigations has led to a dramatic increase in the average duration of proceedings. This document outlines the clinical and systemic impact of these delays, providing evidence-based proposals for a statutory 12-month limit.
                    </p>
                    
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Core Research Methodology</h3>
                    <p className="text-slate-600 text-[11px] leading-relaxed mb-8">
                      Data was compiled using official freedom of information (FOI) disclosures across 43 territorial police forces, paired with clinical welfare surveys from over 1,500 active and former police officers. Results were reviewed by leading occupational health psychologists.
                    </p>

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Key Statistics Dashboard</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-slate-50 p-4 border border-slate-100 text-center">
                        <div className="text-lg font-black text-[#1877F2]">4.2 Yrs</div>
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Avg. Investigation</div>
                      </div>
                      <div className="bg-slate-50 p-4 border border-slate-100 text-center">
                        <div className="text-lg font-black text-red-500">+500%</div>
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">PTSD Diagnosis</div>
                      </div>
                      <div className="bg-slate-50 p-4 border border-slate-100 text-center">
                        <div className="text-lg font-black text-slate-700">£120M</div>
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Taxpayer Cost</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4 flex justify-between text-[8px] text-slate-400">
                    <span>Page 2 of 4</span>
                    <span>It Stops Now Campaign</span>
                  </div>
                </div>

                {/* Page 3 (Findings Details) */}
                <div className="max-w-2xl mx-auto bg-white text-black p-8 md:p-16 aspect-[1/1.414] shadow-2xl flex flex-col justify-between relative">
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900 mb-6 pb-2 border-b border-slate-200">
                      2. Primary Findings & Data Points
                    </h2>
                    
                    <div className="space-y-4 mb-8">
                      {activeReport.keyFindings.map((finding, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="bg-[#1877F2]/10 text-[#1877F2] font-bold text-xs px-2.5 py-1 rounded">
                            0{idx + 1}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wide">Key Finding</h4>
                            <p className="text-slate-600 text-xs leading-normal mt-1">{finding}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Qualitative Findings</h3>
                    <blockquote className="border-l-4 border-[#1877F2] pl-4 py-1 my-4 text-xs italic text-slate-600 leading-relaxed bg-slate-50">
                      "The psychological uncertainty of not knowing if or when you can return to duty is often more destructive than the original incident under review. We are seeing record levels of occupational burnout."
                      <cite className="block text-[10px] font-bold not-italic text-slate-800 mt-2 uppercase tracking-wide">— Dr. Jenkins, Clinical Report Lead</cite>
                    </blockquote>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4 flex justify-between text-[8px] text-slate-400">
                    <span>Page 3 of 4</span>
                    <span>It Stops Now Campaign</span>
                  </div>
                </div>

                {/* Page 4 (Recommendations) */}
                <div className="max-w-2xl mx-auto bg-white text-black p-8 md:p-16 aspect-[1/1.414] shadow-2xl flex flex-col justify-between relative">
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900 mb-6 pb-2 border-b border-slate-200">
                      3. Statutory Recommendations
                    </h2>
                    
                    <ul className="space-y-4 text-xs text-slate-700 leading-relaxed">
                      <li>
                        <strong className="text-slate-900 block mb-1">1. IMPLEMENT A STATUTORY 12-MONTH INVESTIGATION LIMIT</strong>
                        All police misconduct and IOPC investigations must conclude within 12 months, or be subject to independent judicial review.
                      </li>
                      <li>
                        <strong className="text-slate-900 block mb-1">2. ESTABLISH WELFARE COORDINATION ROLES</strong>
                        Ensure a designated welfare support coordinator in every division, maintaining weekly contact with suspended officers.
                      </li>
                      <li>
                        <strong className="text-slate-900 block mb-1">3. TAXPAYER DISCLOSURE TRANSPARENCY</strong>
                        Forces must publish an annual financial summary indicating the cumulative cost of suspended officer salaries during active investigations.
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4 flex justify-between text-[8px] text-slate-400">
                    <span>Page 4 of 4</span>
                    <span>It Stops Now Campaign</span>
                  </div>
                </div>

              </div>

              {/* Reader Footer Mobile Action */}
              <div className="bg-[#050B14] border-t border-white/10 px-6 py-4 flex sm:hidden justify-center">
                <button 
                  onClick={() => handleDownload(activeReport)}
                  className="flex items-center gap-2 bg-[#1877F2] hover:bg-blue-600 text-white w-full justify-center py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
