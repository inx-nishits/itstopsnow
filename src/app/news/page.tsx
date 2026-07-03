"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Calendar, Clock, Shield, HeartPulse, Database, AlertTriangle, Mail, Search, Newspaper } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PAGE_CONTENT_CONTAINER, PageHero } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { Pagination } from "@/components/ui/Pagination";

type NewsSort = "newest" | "oldest" | "title-az";

function parseNewsDate(dateStr: string): number {
  const parsed = Date.parse(dateStr);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export const LATEST_NEWS = [
  { 
    id: 1, 
    category: "PARLIAMENT", 
    date: "May 9, 2024", 
    readTime: "5 min read", 
    title: "MPs call for urgent reform after meeting campaign representatives", 
    excerpt: "Cross-party MPs raise concerns over officer welfare and prolonged investigations.",
    image: "/images/mission-support.png",
    author: "Jane Smith"
  },
  { 
    id: 2, 
    category: "CAMPAIGN NEWS", 
    date: "May 7, 2024", 
    readTime: "4 min read", 
    title: "Productive meeting with Home Office to discuss welfare reform", 
    excerpt: "We outlined key proposals for improving mental health support and accountability.",
    image: "/images/uk_police_memorial_bg.png",
    author: "News Desk"
  },
  { 
    id: 3, 
    category: "EXPERT VOICES", 
    date: "May 5, 2024", 
    readTime: "6 min read", 
    title: "Why prolonged investigations cause deeper psychological harm", 
    excerpt: "Psychologist Dr. Emma Williams explains the impact of uncertainty and lack of support.",
    image: "/images/wall_memorial_bg.png",
    author: "Dr. Jenkins"
  },
  { 
    id: 4, 
    category: "MEDIA", 
    date: "May 3, 2024", 
    readTime: "7 min read", 
    title: "Listen: Our founder on BBC Tonight discussing policing culture", 
    excerpt: "A powerful conversation about silence, stigma and the need for meaningful change.",
    image: "/images/take-action-hero.png",
    author: "Media Team"
  },
  { 
    id: 5, 
    category: "RESEARCH", 
    date: "April 28, 2024", 
    readTime: "8 min read", 
    title: "New report highlights hidden financial cost of investigation delays", 
    excerpt: "Our latest research shows millions wasted due to inefficiency in current misconduct procedures.",
    image: "/images/memorial_hero.png",
    author: "Research Dept"
  },
  { 
    id: 6, 
    category: "CAMPAIGN NEWS", 
    date: "April 20, 2024", 
    readTime: "3 min read", 
    title: "Over 10,000 officers sign our petition for the 12-month limit", 
    excerpt: "A huge milestone reached as momentum continues to build across all force areas.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1200",
    author: "Campaign Team"
  },
  { 
    id: 7, 
    category: "EXPERT VOICES", 
    date: "April 15, 2024", 
    readTime: "5 min read", 
    title: "Legal briefing: Why the current IOPC guidelines fall short", 
    excerpt: "A detailed analysis of where the procedural loopholes are failing frontline officers.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200",
    author: "Legal Team"
  },
  { 
    id: 8, 
    category: "MEDIA", 
    date: "April 10, 2024", 
    readTime: "4 min read", 
    title: "Campaign featured in national weekend broadsheet", 
    excerpt: "Extensive coverage on the mental health toll of policing and our push for reform.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
    author: "Media Team"
  }
];

const WORKING_ON = [
  {
    icon: <Shield className="w-6 h-6 text-[#1877F2]" />,
    title: "INVESTIGATIONS REFORM",
    description: "Pushing for fair, proportionate and time-limited investigations."
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-[#1877F2]" />,
    title: "MENTAL HEALTH SUPPORT",
    description: "Campaigning for trauma-informed care and 24/7 support access."
  },
  {
    icon: <Database className="w-6 h-6 text-[#1877F2]" />,
    title: "DATA TRANSPARENCY",
    description: "Securing accurate data on officer suicides and misconduct."
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-[#1877F2]" />,
    title: "CULTURE CHANGE",
    description: "Challenging silence, stigma and failure to protect our own."
  }
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<NewsSort>("newest");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const newsletter = useNewsletterSubscribe();
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Campaign News", "Parliament", "Expert Voices", "Research", "Media"];

  // Auto-scroll the tabs horizontally
  useEffect(() => {
    if (!tabsContainerRef.current) return;
    const activeTabEl = tabsContainerRef.current.querySelector(`[data-tab-id="${activeCategory}"]`) as HTMLElement;
    if (activeTabEl) {
      const container = tabsContainerRef.current;
      const scrollLeft = activeTabEl.offsetLeft - container.offsetWidth / 2 + activeTabEl.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  const filteredNews = LATEST_NEWS.filter(news => {
    const matchesCategory = activeCategory === "All" || news.category.toUpperCase() === activeCategory.toUpperCase();
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === "title-az") {
      return a.title.localeCompare(b.title);
    }
    const dateA = parseNewsDate(a.date);
    const dateB = parseNewsDate(b.date);
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.max(1, Math.ceil(sortedNews.length / itemsPerPage));
  const paginatedNews = sortedNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, sortBy]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      
      <PageHero
        animate
        eyebrow={
          <>
            <Newspaper className="w-5 h-5 shrink-0" /> NEWS & MEDIA
          </>
        }
        title={
          <>
            <span className="text-white">LATEST </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              UPDATES.
            </span>
          </>
        }
        description="Stay informed on our campaign progress, expert voices, and the latest developments in our fight for systemic reform."
        imageSrc="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=1920"
        imageAlt="Newspaper headlines"
      />

      {/* 2. MAIN CONTENT (News Grid + Newsletter) */}
      <section id="latest-news" className="w-full relative z-10 bg-white pt-0 pb-10 sm:pb-20 lg:pb-24">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          
          {/* Sticky Filters & Search (Extracted out of the grid to be full-bleed) */}
          <div className="sticky top-16 md:top-24 z-30 bg-white mb-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-4 py-2 sm:py-3">
              <div ref={tabsContainerRef} className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide flex-grow pr-4 pb-1 md:pb-0">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    data-tab-id={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "flex items-center justify-center gap-2 px-5 sm:px-6 h-10 sm:h-11 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all border shrink-0",

                      activeCategory === cat 
                        ? "bg-[#1877F2] text-white border-[#1877F2]" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    {cat === "All" ? "All News" : cat}
                  </button>
                ))}
              </div>
              
              {/* Sort & Search Container */}
              <div className="flex flex-row gap-2 sm:gap-4 w-full md:w-auto shrink-0 relative z-20">
                {/* Search Functionality */}
                <div className="relative flex-1 md:w-64 xl:w-72 shrink-0">
                  <Search className="w-4 h-4 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search news..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 sm:pl-11 sm:pr-5 h-10 sm:h-11 border border-slate-200 rounded-full text-xs sm:text-sm font-medium focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] placeholder:text-slate-400 text-slate-900 bg-white transition-all"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="relative shrink-0 sm:w-auto">
                  <button 
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="w-full h-10 sm:h-11 px-3 sm:px-5 border border-slate-200 bg-white rounded-full flex items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-slate-700 hover:border-[#1877F2] transition-colors"
                  >
                    <span className="flex items-center gap-1 truncate">
                      {sortBy === "newest" ? "Newest First" : sortBy === "oldest" ? "Oldest First" : "Title (A-Z)"}
                    </span>
                    <svg className={cn("w-4 h-4 shrink-0 transition-transform", sortDropdownOpen && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {sortDropdownOpen && (
                    <div className="absolute top-full right-0 sm:left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                      <button onClick={() => {setSortBy("newest"); setSortDropdownOpen(false);}} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium text-slate-700">Newest First</button>
                      <button onClick={() => {setSortBy("oldest"); setSortDropdownOpen(false);}} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium text-slate-700">Oldest First</button>
                      <button onClick={() => {setSortBy("title-az"); setSortDropdownOpen(false);}} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium text-slate-700">Title (A-Z)</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
            
            {/* LEFT COLUMN (News Grid & Filters) */}
            <div className="lg:col-span-8 xl:col-span-9">
              
              <div className="mb-4 sm:mb-6 pb-4 border-b border-slate-200">
                <h2 className="font-black text-lg sm:text-2xl uppercase tracking-tight text-slate-900">LATEST NEWS</h2>
              </div>

              {/* News Cards Grid */}
              {paginatedNews.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">No news articles found.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedNews.map((news) => (
                    <Link key={news.id} href={`/news/${news.id}`} className="flex flex-col group border border-slate-200 hover:border-slate-300 rounded-xl transition-all hover:shadow-lg bg-white overflow-hidden">
                      <div className="w-full h-56 sm:h-64 relative overflow-hidden bg-slate-100">
                        <img 
                          src={news.image} 
                          alt={news.title} 
                          onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/475569?text=Image+Unavailable"; }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 sm:p-5 flex flex-col flex-grow">
                        <span className="text-xs sm:text-xs font-black text-[#1877F2] bg-[#1877F2]/10 px-2 py-1 rounded self-start mb-3 uppercase tracking-widest">
                          {news.category}
                        </span>
                        <h3 className="font-bold text-lg sm:text-xl mb-3 leading-snug text-slate-900 group-hover:text-[#1877F2] transition-colors line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 flex-grow line-clamp-4">
                          {news.excerpt}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-slate-500 mt-auto">
                          <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> {news.date}</span>
                          <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> {news.readTime}</span>
                        </div>
                        
                        {/* Strict: Read News CTA Link */}
                        <div className="pt-4 border-t border-slate-100 mt-4">
                          <span className="text-xs font-bold text-[#1877F2] uppercase tracking-widest group-hover:underline flex items-center">
                            Read News <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Strict: Pagination / Infinite Scroll */}
              {totalPages > 1 && (
                <div className="mt-10 flex justify-center border-t border-slate-200 pt-8">
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}

            </div>

            {/* RIGHT SIDEBAR (Newsletter Only) */}
            <div className="lg:col-span-4 xl:col-span-3">
              
              {/* Newsletter Section */}
              <div className="bg-[#020611] rounded-xl p-6 text-white border border-slate-800 shadow-xl relative overflow-hidden sticky top-24">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#1877F2]/10 rounded-bl-full pointer-events-none" />
                
                <h3 className="font-black text-[14px] uppercase tracking-widest mb-4">NEWSLETTER</h3>
                
                <div className="flex gap-4 mb-6 relative z-10">
                  <Mail className="w-8 h-8 text-slate-400 shrink-0 stroke-[1.5]" />
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Subscribe to receive the latest news, updates, and organizational initiatives directly to your inbox.
                  </p>
                </div>
                
                <form onSubmit={newsletter.subscribe} className="space-y-3 relative z-10">
                  <input 
                    type="email" 
                    required
                    value={newsletter.email}
                    onChange={(e) => newsletter.setEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="w-full h-11 px-4 bg-white text-slate-900 text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] transition-shadow" 
                  />
                  <Button type="submit" disabled={newsletter.isSubscribing} className="w-full h-11 bg-[#1877F2] hover:bg-blue-600 font-bold text-xs uppercase tracking-widest rounded-md transition-colors">
                    {newsletter.isSubscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
                  </Button>
                </form>
                {newsletter.error && (
                  <p className="text-red-400 text-xs mt-2">{newsletter.error}</p>
                )}
                {newsletter.isSubscribed && (
                  <p className="text-green-400 text-xs mt-2 font-bold">Thank you for subscribing!</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT WE'RE WORKING ON SECTION */}
      <section className="py-10 sm:py-20 lg:py-24 bg-[#050A14] border-t border-white/5">
        <div className={PAGE_CONTENT_CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white text-balance mb-4 sm:mb-6">
              WHAT WE&apos;RE WORKING ON
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
              Our core initiatives designed to bring accountability, support, and cultural change to policing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {WORKING_ON.map((item, idx) => (
              <div key={idx} className="group relative bg-[#010B19] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-[#1877F2]/30 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(24,119,242,0.15)] flex flex-col h-full">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center shrink-0 mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-[#1877F2]/20 transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-sm md:text-base text-white leading-snug mb-2 sm:mb-4 group-hover:text-[#1877F2] transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium flex-grow mb-2 group-hover:text-slate-300 transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
