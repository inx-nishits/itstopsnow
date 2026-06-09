"use client";

import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, ChevronRight, Eye, PenTool, Share2, Calendar, User, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORIES = [
  { id: 1, type: "SERVING OFFICER", title: "My investigation took 3 years. The allegation was disproven in 10 minutes on CCTV.", excerpt: "I was suspended and stripped of my warrant card. It destroyed my marriage and my mental health...", tag: "#IOPC", comments: 24, views: "1.2k" },
  { id: 2, type: "FAMILY MEMBER", title: "We watched him fade away while waiting for answers that never came.", excerpt: "The system is broken. My husband dedicated 15 years to the force, but when a malicious complaint was made, he was abandoned...", tag: "#MentalHealth", comments: 56, views: "3.4k" },
  { id: 3, type: "FORMER OFFICER", title: "I resigned after they dragged out a gross misconduct hearing over a minor error.", excerpt: "Guilty until proven innocent. That is the reality of the modern police disciplinary system...", tag: "#Resignation", comments: 12, views: "856" },
  { id: 4, type: "SERVING OFFICER", title: "Post-incident procedure felt like a criminal interrogation.", excerpt: "I had just been involved in a traumatic incident saving a life. Instead of welfare support, I was treated like a suspect...", tag: "#PIP", comments: 89, views: "5.1k" },
  { id: 5, type: "RECOVERY STORY", title: "How I rebuilt my life after being cleared of all charges.", excerpt: "The dark days are behind me, but the anger remains. Here is how I survived the process and found my footing again...", tag: "#Recovery", comments: 41, views: "2.2k" },
  { id: 6, type: "FAMILY MEMBER", title: "The financial ruin of being suspended on restricted duties.", excerpt: "Losing overtime and facing legal bills while waiting for an investigation to conclude almost left us homeless...", tag: "#Financial", comments: 18, views: "1.1k" },
];

export default function StoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[50vh] pt-40 pb-20 bg-[#050B14] flex flex-col justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1877F2]/10 rounded-full blur-[120px] pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1920" 
            alt="Person in shadow" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-10 mask-image-to-b"
          />
        </div>

        <div className="container relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-[#1877F2]" />
              <span className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-xs">Lived Experiences</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-8 uppercase tracking-tight font-sans"
            >
              REAL PEOPLE.<br/>
              <span className="text-[#1877F2]">REAL STORIES.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-12"
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
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px] py-24">
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
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
              <button className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-sm hover:bg-slate-200 transition-colors">All Stories</button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-colors">Serving Officer</button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-colors">Former Officer</button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-colors">Family Member</button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-colors">Recovery</button>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-grow lg:w-80">
                <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="SEARCH STORIES..." className="w-full pl-14 pr-6 py-4 text-[10px] uppercase tracking-widest font-bold bg-[#020611] border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-[#1877F2]/50 transition-colors" />
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
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <div className="flex justify-between items-end border-b border-white/10 pb-8 mb-16">
            <h2 className="font-sans text-3xl font-bold uppercase tracking-tight text-white">LATEST STORIES</h2>
            <div className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em]">Showing 6 of 142</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STORIES.map((story) => (
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

          {/* 5. PAGINATION */}
          <div className="flex justify-center items-center gap-3 mt-24 pt-10 border-t border-white/10">
            <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-slate-500 opacity-50 cursor-not-allowed"><ArrowLeft className="w-4 h-4" /></Button>
            <Button className="w-12 h-12 p-0 rounded-full bg-[#1877F2] text-white font-bold text-sm shadow-[0_0_20px_rgba(24,119,242,0.3)]">1</Button>
            <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 font-bold text-sm transition-colors">2</Button>
            <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 font-bold text-sm transition-colors">3</Button>
            <span className="text-slate-500 font-bold mx-2 tracking-[0.3em]">...</span>
            <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 font-bold text-sm transition-colors">12</Button>
            <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-colors"><ArrowRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="bg-[#050B14] py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] bg-[#1877F2]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-[1200px] relative z-10">
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
