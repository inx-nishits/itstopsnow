"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Newspaper, Video, Mic, Calendar, User, Search, Filter, Mail, ArrowLeft, Clock, Scale, Headphones, Database } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditorialSection, CampaignSection, EditorialStickyBar } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/ui/Pagination";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";

export const LATEST_NEWS = [
  { 
    id: 1, 
    type: "ARTICLE", 
    category: "PARLIAMENT", 
    date: "OCT 20, 2024", 
    readTime: "4 min read", 
    title: "Meeting with the Home Secretary to discuss 12-month investigation limit.", 
    excerpt: "Our founding team presented the latest research data on the devastating impact of prolonged IOPC investigations to the Home Office today.",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=600"
  },
  { 
    id: 2, 
    type: "PRESS RELEASE", 
    category: "CAMPAIGN", 
    date: "OCT 15, 2024", 
    readTime: "3 min read", 
    title: "New independent report exposes systemic delays in misconduct cases.", 
    excerpt: "A devastating new independent report has confirmed what the police family has known for years: the system is fundamentally broken.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600"
  },
  { 
    id: 3, 
    type: "INTERVIEW", 
    category: "MEDIA", 
    date: "OCT 12, 2024", 
    readTime: "8 min read", 
    title: "Paul Cooper on Good Morning Britain discussing officer welfare.", 
    excerpt: "Watch the full segment where Paul explains why 'It Stops Now' is demanding immediate reform to protect those who protect us.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=600"
  },
  { 
    id: 4, 
    type: "UPDATE", 
    category: "COMMUNITY", 
    date: "OCT 05, 2024", 
    readTime: "2 min read", 
    title: "Over 5,000 letters sent to MPs using our new Take Action tool.", 
    excerpt: "The response has been overwhelming. In just one week, thousands of you have downloaded the template and contacted your local representatives.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600"
  },
  { 
    id: 5, 
    type: "ARTICLE", 
    category: "RESEARCH", 
    date: "SEP 28, 2024", 
    readTime: "5 min read", 
    title: "The hidden toll: Undiagnosed PTSD rates soar among response officers.", 
    excerpt: "A new study highlights the severe lack of immediate psychological first aid following traumatic operational incidents.",
    image: "https://images.unsplash.com/photo-1527137341206-1aa25844a04d?auto=format&fit=crop&q=80&w=600"
  },
  { 
    id: 6, 
    type: "PRESS RELEASE", 
    category: "CAMPAIGN", 
    date: "SEP 15, 2024", 
    readTime: "3 min read", 
    title: "Pocket Sergeant pledges additional £50,000 to fund mental health support.", 
    excerpt: "The developers behind the popular policing app have doubled their commitment to providing tangible support for officers in crisis.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600"
  }
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const newsletter = useNewsletterSubscribe();
  const itemsPerPage = 6;

  const filteredNews = LATEST_NEWS.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesCategory = activeCategory === "All" || news.category.toUpperCase() === activeCategory.toUpperCase();
    
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / itemsPerPage));
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      <PageHero
        animate
        eyebrow={
          <>
            <Newspaper className="w-5 h-5 shrink-0" /> NEWS & UPDATES
          </>
        }
        title={
          <>
            <span className="text-white">STAY </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              INFORMED.
            </span>
          </>
        }
        description="The latest campaign updates, press releases, media appearances, and parliamentary progress."
        imageSrc="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920"
        imageAlt="Parliament background"
      />

      {/* 2. FILTERS & SEARCH */}
      <EditorialStickyBar>
        <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
              {["All", "Parliament", "Campaign", "Media", "Research"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "min-h-[48px] px-6 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors cursor-pointer",
                    activeCategory === cat ? hybrid.editorialChipActive : hybrid.editorialChip
                  )}
                >
                  {cat === "All" ? "All News" : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-grow lg:w-80">
                <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="SEARCH ARTICLES..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn("w-full pl-14 pr-6 py-4 text-[10px] uppercase tracking-widest font-bold rounded-full focus:outline-none transition-colors", hybrid.editorialInput)} 
                />
              </div>
            </div>
          </div>
        </div>
      </EditorialStickyBar>

      {/* 3. LATEST NEWS GRID */}
      <EditorialSection>
        <div className="container mx-auto px-4 md:px-8 max-w-[1440px] relative z-10">
          
          <div className={cn("flex justify-between items-end border-b pb-6 mb-12", hybrid.editorialBorder)}>
            <h2 className={cn("font-sans text-3xl font-bold uppercase tracking-tight", hybrid.editorialHeading)}>LATEST ARTICLES</h2>
            <div className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em]">Showing {filteredNews.length} of {LATEST_NEWS.length}</div>
          </div>

          {filteredNews.length === 0 ? (
            <div className={cn("text-center py-10 lg:py-20 rounded-3xl", hybrid.editorialCard)}>
              <Search className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p className={cn("font-bold uppercase tracking-widest text-sm", hybrid.editorialMuted)}>No articles found matching your search.</p>
              <button onClick={() => { setSearchTerm(""); setActiveCategory("All"); }} className="mt-4 text-[#1877F2] hover:text-[#010B19] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((news) => (
                <div key={news.id} className={cn(hybrid.editorialCard, hybrid.editorialCardHover, "overflow-hidden flex flex-col group hover:-translate-y-2 h-full")}>
                  
                  <div className={cn("h-48 relative overflow-hidden bg-slate-100 border-b", hybrid.editorialBorder)}>
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                      <span className="text-[9px] font-bold text-[#1877F2] uppercase tracking-[0.2em] bg-[#1877F2]/10 px-3 py-1.5 rounded-full border border-[#1877F2]/20">
                        {news.category}
                      </span>
                      <div className={cn("flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest", hybrid.editorialMuted)}>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {news.date}
                        </span>
                        <span className="flex items-center gap-1 text-[#1877F2]">
                          <Clock className="w-3 h-3" /> {news.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className={cn("font-sans font-bold text-xl mb-4 leading-snug group-hover:text-[#1877F2] transition-colors uppercase tracking-tight line-clamp-2", hybrid.editorialHeading)}>
                      {news.title}
                    </h3>
                    
                    <p className={cn("text-xs leading-relaxed mb-8 flex-grow line-clamp-3", hybrid.editorialBody)}>
                      {news.excerpt}
                    </p>
                    
                    <Link href={`/news/${news.id}`} className={cn("mt-auto pt-6 border-t flex items-center font-bold text-[10px] uppercase tracking-widest group-hover:text-[#1877F2] transition-colors", hybrid.editorialBorder, hybrid.editorialHeading)}>
                      Read Story <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className={cn("mt-10 lg:mt-20 pt-8 border-t", hybrid.editorialBorder)}
          />
        </div>
      </EditorialSection>

      {/* 4. WHAT WE'RE WORKING ON - INITIATIVES SECTION */}
      <CampaignSection variant="deep" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1877F2]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-[1440px] relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[#1877F2] text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-[#1877F2]"></span>
              Our Roadmap
              <span className="w-8 h-px bg-[#1877F2]"></span>
            </h2>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              What We're Working On
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Scale className="w-6 h-6 text-[#1877F2]" />, title: "Misconduct Timelimit Bill", status: "DRAFTING STAGE", desc: "Coordinating with MPs and legal advisors to draft the 12-month misconduct investigation limit bill for Parliament." },
              { icon: <Headphones className="w-6 h-6 text-[#1877F2]" />, title: "Officer Crisis Helpline", status: "LAUNCHING Q4", desc: "Partnering with leading police charities to launch a dedicated 24/7 welfare helpline for suspended officers." },
              { icon: <Database className="w-6 h-6 text-[#1877F2]" />, title: "National Investigation Database", status: "DATA INGESTION", desc: "Aggregating data from police federations to document system-wide investigation delays and showcase patterns of failure." }
            ].map((init, i) => (
              <div key={i} className={cn(hybrid.campaignCard, "p-6 md:p-8 hover:border-[#1877F2]/50 transition-colors group relative overflow-hidden")}>
                <div className="w-12 h-12 bg-[#1877F2]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {init.icon}
                </div>
                <span className="text-[9px] font-bold text-[#1877F2] bg-[#1877F2]/10 border border-[#1877F2]/20 px-3 py-1 rounded-full">{init.status}</span>
                <h4 className="font-bold text-lg text-white mt-4 mb-2 group-hover:text-[#1877F2] transition-colors">{init.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{init.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </CampaignSection>

      {/* 5. NEWSLETTER SECTION */}
      <CampaignSection className="relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#1877F2]/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="container mx-auto px-4 md:px-8 max-w-[800px] relative z-10 text-center">
          <div className={cn(hybrid.campaignCard, "rounded-[3rem] p-6 md:p-16 shadow-2xl relative overflow-hidden group")}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-bl-full pointer-events-none" />
            
            <h3 className="font-sans text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <p className="text-slate-400 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Stay updated with the latest campaign news, media releases, and parliamentary bill progress.
            </p>
            
            {newsletter.isSubscribed ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-2">Subscribed!</h4>
                <p className="text-slate-400 text-sm max-w-sm">
                  Thank you for subscribing. You&apos;ll receive campaign updates in your inbox.
                </p>
              </div>
            ) : (
            <>
            <form onSubmit={newsletter.subscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                required
                value={newsletter.email}
                onChange={(e) => newsletter.setEmail(e.target.value)}
                disabled={newsletter.isSubscribing}
                placeholder="YOUR EMAIL ADDRESS" 
                className="flex-grow bg-[#020611] border border-white/10 rounded-xl px-5 min-h-[48px] text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#1877F2]/50 transition-colors" 
              />
              <Button type="submit" disabled={newsletter.isSubscribing} className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] px-8 py-6 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all">
                {newsletter.isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {newsletter.error && (
              <p className="text-red-400 text-xs mt-3" role="alert">{newsletter.error}</p>
            )}
            <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-6">
              We respect your privacy. No spam.
            </div>
            </>
            )}
          </div>
        </div>
      </CampaignSection>

    </div>
  );
}
