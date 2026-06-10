"use client";

import { motion } from "framer-motion";
import { ArrowRight, Newspaper, Video, Mic, Calendar, User, Search, Filter, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LATEST_NEWS = [
  { id: 1, type: "ARTICLE", category: "PARLIAMENT", date: "OCT 20, 2024", title: "Meeting with the Home Secretary to discuss 12-month investigation limit.", excerpt: "Our founding team presented the latest research data on the devastating impact of prolonged IOPC investigations to the Home Office today." },
  { id: 2, type: "PRESS RELEASE", category: "CAMPAIGN", date: "OCT 15, 2024", title: "New independent report exposes systemic delays in misconduct cases.", excerpt: "A devastating new independent report has confirmed what the police family has known for years: the system is fundamentally broken." },
  { id: 3, type: "INTERVIEW", category: "MEDIA", date: "OCT 12, 2024", title: "Paul Cooper on Good Morning Britain discussing officer welfare.", excerpt: "Watch the full segment where Paul explains why 'It Stops Now' is demanding immediate reform to protect those who protect us." },
  { id: 4, type: "UPDATE", category: "COMMUNITY", date: "OCT 05, 2024", title: "Over 5,000 letters sent to MPs using our new Take Action tool.", excerpt: "The response has been overwhelming. In just one week, thousands of you have downloaded the template and contacted your local representatives." },
  { id: 5, type: "ARTICLE", category: "RESEARCH", date: "SEP 28, 2024", title: "The hidden toll: Undiagnosed PTSD rates soar among response officers.", excerpt: "A new study highlights the severe lack of immediate psychological first aid following traumatic operational incidents." },
  { id: 6, type: "PRESS RELEASE", category: "CAMPAIGN", date: "SEP 15, 2024", title: "Pocket Sergeant pledges additional £50,000 to fund mental health support.", excerpt: "The developers behind the popular policing app have doubled their commitment to providing tangible support for officers in crisis." }
];

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920" 
            alt="Parliament background" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <Newspaper className="w-5 h-5" /> NEWS & UPDATES
            </h3>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2"
            >
              <span className="text-white">STAY </span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">INFORMED.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-2xl drop-shadow"
            >
              The latest campaign updates, press releases, media appearances, and parliamentary progress.
            </motion.p>
          </div>
        </div>
      </section>

      {/* FEATURED NEWS */}
      <section className="bg-[#050B14] py-16 border-b border-white/5 relative z-20">
        <div className="container max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="bg-[#020611] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative group hover:border-[#1877F2]/50 transition-colors cursor-pointer">
            <div className="h-64 md:h-96 relative overflow-hidden">
              <div className="absolute top-6 left-6 z-10 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white animate-pulse"></div> BREAKING</div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-transparent to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1584859737119-9eb15b9c0378?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" alt="Featured News" />
            </div>
            <div className="p-10 relative z-20 -mt-20">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                <span className="text-[#1877F2] bg-[#1877F2]/10 px-3 py-1 rounded-full border border-[#1877F2]/20">PARLIAMENT</span> <Calendar className="w-3 h-3 ml-2" /> TODAY
              </div>
              <h2 className="font-sans text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight group-hover:text-[#1877F2] transition-colors leading-tight max-w-4xl">
                12 of 13 officer suicides linked directly to prolonged misconduct investigations.
              </h2>
              <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed line-clamp-2 max-w-4xl">
                A devastating new independent report has confirmed what the police family has known for years: the system designed to investigate police misconduct is fundamentally broken.
              </p>
              <Link href="/news/featured-report">
                <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 uppercase tracking-widest text-[10px] py-6 px-8 rounded-full transition-colors">
                  Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTERS & SEARCH */}
      <section className="bg-[#050B14]/90 backdrop-blur-xl border-b border-white/5 sticky top-[72px] z-40 shadow-xl py-5">
        <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
              <button className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-sm hover:bg-slate-200 transition-colors">All News</button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-colors">Parliament</button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-colors">Campaign</button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-colors">Media</button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-colors">Research</button>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-grow lg:w-80">
                <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="SEARCH ARTICLES..." className="w-full pl-14 pr-6 py-4 text-[10px] uppercase tracking-widest font-bold bg-[#020611] border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-[#1877F2]/50 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST NEWS GRID */}
      <section className="py-24 bg-[#020611] relative">
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[#1877F2]/5 blur-[150px] pointer-events-none rounded-full" />
        <div className="container mx-auto px-4 md:px-8 max-w-[1440px] relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="lg:w-2/3">
              <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-12">
                <h2 className="font-sans text-3xl font-bold uppercase tracking-tight text-white">LATEST ARTICLES</h2>
                <div className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em]">Showing 6 of 42</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {LATEST_NEWS.map((news) => (
                  <div key={news.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col hover:border-[#1877F2]/50 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[9px] font-bold text-[#1877F2] uppercase tracking-[0.2em] bg-[#1877F2]/10 px-3 py-1.5 rounded-full border border-[#1877F2]/20">
                        {news.category}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {news.date}
                      </span>
                    </div>
                    
                    <h3 className="font-sans font-bold text-2xl text-white mb-4 leading-snug group-hover:text-[#1877F2] transition-colors uppercase tracking-tight">
                      {news.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                      {news.excerpt}
                    </p>
                    
                    <Link href={`/news/${news.id}`} className="mt-auto pt-6 border-t border-white/10 flex items-center text-white font-bold text-[10px] uppercase tracking-widest group-hover:text-[#1877F2] transition-colors">
                      Read More <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-20 pt-8 border-t border-white/10">
                <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-slate-500 opacity-50 cursor-not-allowed"><ArrowLeft className="w-4 h-4" /></Button>
                <Button className="w-12 h-12 p-0 rounded-full bg-[#1877F2] text-white font-bold text-sm shadow-[0_0_20px_rgba(24,119,242,0.3)]">1</Button>
                <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 font-bold text-sm transition-colors">2</Button>
                <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 font-bold text-sm transition-colors">3</Button>
                <span className="text-slate-500 font-bold mx-2 tracking-[0.3em]">...</span>
                <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 font-bold text-sm transition-colors">8</Button>
                <Button variant="outline" className="w-12 h-12 p-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-colors"><ArrowRight className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-10">
                
                {/* Newsletter Box */}
                <div className="bg-gradient-to-br from-[#050B14] to-[#020611] border border-white/10 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-bl-full pointer-events-none group-hover:bg-[#1877F2]/20 transition-colors" />
                  <Mail className="absolute top-8 right-8 w-16 h-16 text-[#1877F2] opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative z-10">
                    <h3 className="font-sans text-2xl font-bold uppercase tracking-tight mb-4">WEEKLY ROUNDUP</h3>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">Join 15,000+ supporters receiving our Friday updates on the campaign for police reform.</p>
                    <div className="space-y-4">
                      <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-[#020611] border border-white/10 rounded-xl px-4 py-4 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-[#1877F2]/50 text-white placeholder-slate-600 transition-colors" />
                      <Button className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] py-6 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.2)] transition-all">
                        Subscribe Now
                      </Button>
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-6 text-center">We respect your privacy. No spam.</div>
                  </div>
                </div>

                {/* Popular News */}
                <div className="bg-[#050B14] border border-white/10 rounded-3xl p-8 shadow-xl">
                  <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#1877F2] mb-8 flex items-center border-b border-white/10 pb-4">POPULAR THIS WEEK</h3>
                  <div className="space-y-6">
                    <Link href="/news" className="group flex flex-col gap-2">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">MEDIA</span>
                      <h5 className="font-bold text-sm text-white group-hover:text-[#1877F2] transition-colors leading-snug uppercase tracking-wide">Channel 4 Documentary exposes the hidden toll of IOPC investigations.</h5>
                    </Link>
                    <div className="w-full h-px bg-white/5"></div>
                    <Link href="/news" className="group flex flex-col gap-2">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">COMMUNITY</span>
                      <h5 className="font-bold text-sm text-white group-hover:text-[#1877F2] transition-colors leading-snug uppercase tracking-wide">The Wall of Remembrance surpasses 5,000 lit candles.</h5>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
