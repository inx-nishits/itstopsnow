"use client";

import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, ChevronRight, Eye, PenTool, Share2, Calendar, User, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const STORIES = [
  { id: 1, type: "SERVING OFFICER", title: "My investigation took 3 years. The allegation was disproven in 10 minutes on CCTV.", excerpt: "I was suspended and stripped of my warrant card. It destroyed my marriage and my mental health...", tag: "#IOPC", comments: 24, views: "1.2k" },
  { id: 2, type: "FAMILY MEMBER", title: "We watched him fade away while waiting for answers that never came.", excerpt: "The system is broken. My husband dedicated 15 years to the force, but when a malicious complaint was made, he was abandoned...", tag: "#MentalHealth", comments: 56, views: "3.4k" },
  { id: 3, type: "FORMER OFFICER", title: "I resigned after they dragged out a gross misconduct hearing over a minor error.", excerpt: "Guilty until proven innocent. That is the reality of the modern police disciplinary system...", tag: "#Resignation", comments: 12, views: "856" },
  { id: 4, type: "SERVING OFFICER", title: "Post-incident procedure felt like a criminal interrogation.", excerpt: "I had just been involved in a traumatic incident saving a life. Instead of welfare support, I was treated like a suspect...", tag: "#PIP", comments: 89, views: "5.1k" },
  { id: 5, type: "RECOVERY STORY", title: "How I rebuilt my life after being cleared of all charges.", excerpt: "The dark days are behind me, but the anger remains. Here is how I survived the process and found my footing again...", tag: "#Recovery", comments: 41, views: "2.2k" },
  { id: 6, type: "FAMILY MEMBER", title: "The financial ruin of being suspended on restricted duties.", excerpt: "Losing overtime and facing legal bills while waiting for an investigation to conclude almost left us homeless...", tag: "#Financial", comments: 18, views: "1.1k" },
];

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filters = ["All", "Serving Officer", "Former Officer", "Family Member", "Recovery"];
  
  const filteredStories = STORIES.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.tag.toLowerCase().includes(searchTerm.toLowerCase());
                          
    let matchesType = true;
    if (activeFilter === "Serving Officer") matchesType = story.type === "SERVING OFFICER";
    if (activeFilter === "Former Officer") matchesType = story.type === "FORMER OFFICER";
    if (activeFilter === "Family Member") matchesType = story.type === "FAMILY MEMBER";
    if (activeFilter === "Recovery") matchesType = story.type === "RECOVERY STORY";
    
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const paginatedStories = filteredStories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1920" 
            alt="People stories" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <MessageSquare className="w-5 h-5" /> LIVED EXPERIENCES
            </h3>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2"
            >
              <span className="text-white">REAL PEOPLE.</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">REAL STORIES.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-2xl drop-shadow"
            >
              Behind every statistic is a human being. Read the raw, unfiltered experiences of police officers and their families navigating a broken system.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <Link href="/stories/submit">
                <Button className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] px-10 py-7 rounded-full shadow-[0_0_30px_rgba(24,119,242,0.3)] transition-all hover:-translate-y-1">
                  Share Your Story <PenTool className="w-4 h-4 ml-3" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED STORY BANNER */}
      <section className="bg-[#020611] border-b border-white/5 relative z-10">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] py-24">
          <Link href="/stories/featured-story" className="block">
            <div className="bg-[#050B14] rounded-[2rem] overflow-hidden flex flex-col lg:flex-row border border-white/10 shadow-2xl relative group cursor-pointer hover:border-[#1877F2]/50 transition-colors">
              <div className="absolute top-8 left-8 z-20 bg-[#1877F2] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg border border-[#050B14]">Featured Story</div>
              <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050B14] z-10 hidden lg:block" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" alt="Featured story" />
              </div>
              <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-20">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-3 mb-6">
                  <User className="w-4 h-4 text-[#1877F2]" /> Anonymous Officer • 12 Years Service
                </div>
                <h2 className="font-sans text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight group-hover:text-[#1877F2] transition-colors leading-tight">
                  I survived the job, but the investigation almost broke me.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  Two years of waiting. Suspended, isolated, and treated guilty until proven innocent. The human cost of the current IOPC process is devastating our forces.
                </p>
                <div className="mt-auto inline-block">
                  <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 uppercase tracking-widest text-[10px] py-6 px-10 rounded-full transition-colors">
                    Read Full Story <ArrowRight className="w-4 h-4 ml-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. FILTERS & SEARCH */}
      <section className="bg-[#050B14]/90 backdrop-blur-xl border-b border-white/5 sticky top-[72px] z-40 shadow-xl py-5">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
              {filters.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                    activeFilter === f 
                      ? "bg-[#1877F2] text-white shadow-[0_0_15px_rgba(24,119,242,0.4)] border border-[#1877F2]" 
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {f === "All" ? "All Stories" : f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-grow lg:w-80">
                <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="SEARCH STORIES..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 text-[10px] uppercase tracking-widest font-bold bg-[#020611] border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-[#1877F2]/50 transition-colors" 
                />
              </div>
              <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10 h-[48px] px-8 rounded-full flex items-center font-bold text-[10px] uppercase tracking-widest transition-colors">
                <Filter className="w-4 h-4 mr-2" /> Sort
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STORY GRID & COUNTER */}
      <section className="py-24 bg-[#020611]">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex justify-between items-end border-b border-white/10 pb-8 mb-16">
            <h2 className="font-sans text-3xl font-bold uppercase tracking-tight text-white">LATEST STORIES</h2>
            <div className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em]">Showing {filteredStories.length} stories</div>
          </div>

          {filteredStories.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-bold uppercase tracking-widest text-sm">No stories found matching your search.</p>
              <button onClick={() => { setSearchTerm(""); setActiveFilter("All"); }} className="mt-4 text-[#1877F2] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedStories.map((story) => (
              <div key={story.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:border-[#1877F2]/50 transition-all duration-300 group hover:-translate-y-2 relative flex flex-col h-full shadow-xl">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[9px] font-bold text-[#1877F2] uppercase tracking-[0.2em] bg-[#1877F2]/10 px-4 py-2 rounded-full border border-[#1877F2]/20">
                    {story.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest">{story.tag}</span>
                </div>
                
                <h3 className="font-sans font-bold text-2xl text-white mb-6 leading-tight group-hover:text-[#1877F2] transition-colors uppercase tracking-tight">
                  {story.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
                  {story.excerpt}
                </p>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                  <div className="flex gap-4">
                    <span className="flex items-center text-xs text-slate-400 font-bold">
                      <MessageSquare className="w-4 h-4 mr-2 text-slate-500" /> {story.comments}
                    </span>
                    <span className="flex items-center text-xs text-slate-400 font-bold">
                      <Eye className="w-4 h-4 mr-2 text-slate-500" /> {story.views}
                    </span>
                  </div>
                  <Link href={`/stories/${story.id}`} className="text-white font-bold text-[10px] uppercase tracking-widest flex items-center group-hover:text-[#1877F2] transition-colors">
                    Read <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
            </div>
          )}

          {/* 5. PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-24 pt-10 border-t border-white/10">
              <Button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline" 
                className={`w-12 h-12 p-0 rounded-full border-white/10 ${currentPage === 1 ? 'bg-white/5 text-slate-500 opacity-50 cursor-not-allowed' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-colors'}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <Button 
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-12 h-12 p-0 rounded-full font-bold text-sm transition-colors ${
                    currentPage === idx + 1 
                      ? 'bg-[#1877F2] text-white shadow-[0_0_20px_rgba(24,119,242,0.3)]' 
                      : 'border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {idx + 1}
                </Button>
              ))}

              <Button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                variant="outline" 
                className={`w-12 h-12 p-0 rounded-full border-white/10 ${currentPage === totalPages ? 'bg-white/5 text-slate-500 opacity-50 cursor-not-allowed' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-colors'}`}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="bg-[#050B14] py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] bg-[#1877F2]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="w-full px-6 lg:px-16 mx-auto text-center max-w-[1600px] relative z-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2] mb-4">You Are Not Alone</h2>
          <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-8">YOUR VOICE COULD SAVE A LIFE</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">By sharing your story, you help break the stigma, hold the system accountable, and show others they are not alone.</p>
          <div className="flex justify-center">
            <Link href="/stories/submit">
              <Button className="bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-widest text-[10px] px-12 py-7 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:scale-105">
                Share Your Story Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
