"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock, Shield, HeartPulse, Database, AlertTriangle, Mail, Search, Newspaper } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PAGE_CONTENT_CONTAINER, PageHero } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { Pagination } from "@/components/ui/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const newsletter = useNewsletterSubscribe();

  const categories = ["All", "Campaign News", "Parliament", "Expert Voices", "Research", "Media"];

  const filteredNews = LATEST_NEWS.filter(news => {
    const matchesCategory = activeCategory === "All" || news.category.toUpperCase() === activeCategory.toUpperCase();
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / itemsPerPage));
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

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
      <section id="latest-news" className="py-12 md:py-20">
        <div className={PAGE_CONTENT_CONTAINER}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
            
            {/* LEFT COLUMN (News Grid & Filters) */}
            <div className="lg:col-span-8 xl:col-span-9">
              
              <div className="mb-4 sm:mb-6 pb-4 border-b border-slate-200">
                <h2 className="font-black text-lg sm:text-2xl uppercase tracking-tight text-slate-900">LATEST NEWS</h2>
              </div>

              {/* Strict: Search Bar & Category Filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide flex-grow pr-4">
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-[10px] sm:text-[11px] font-bold tracking-wide whitespace-nowrap transition-colors border",
                        activeCategory === cat 
                          ? "bg-[#1877F2] text-white border-[#1877F2]" 
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      {cat === "All" ? "All News" : cat}
                    </button>
                  ))}
                </div>
                
                {/* Search Functionality */}
                <div className="relative w-full md:w-64 shrink-0">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search news..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-md text-sm font-medium focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] placeholder:text-slate-400 text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* News Cards Grid */}
              {paginatedNews.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">No news articles found.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
                  {paginatedNews.map((news) => (
                    <Link key={news.id} href={`/news/${news.id}`} className="flex flex-row sm:flex-col group border border-slate-200 hover:border-slate-300 rounded-xl transition-all hover:shadow-lg bg-white overflow-hidden">
                      <div className="w-[110px] shrink-0 sm:w-full sm:h-48 relative overflow-hidden bg-slate-100">
                        <img 
                          src={news.image} 
                          alt={news.title} 
                          onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/475569?text=Image+Unavailable"; }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3 sm:p-5 flex flex-col flex-grow">
                        <span className="text-[8px] sm:text-[9px] font-black text-[#1877F2] bg-[#1877F2]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded self-start mb-2 sm:mb-3 uppercase tracking-widest">
                          {news.category}
                        </span>
                        <h3 className="font-bold text-xs sm:text-sm md:text-base mb-2 sm:mb-3 leading-snug text-slate-900 group-hover:text-[#1877F2] transition-colors line-clamp-3 sm:line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="hidden sm:block text-xs text-slate-600 leading-relaxed mb-4 flex-grow line-clamp-3">
                          {news.excerpt}
                        </p>
                        <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-medium text-slate-500 mt-auto">
                          <span className="flex items-center gap-1 sm:gap-1.5"><Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {news.date}</span>
                          <span className="flex items-center gap-1 sm:gap-1.5"><Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {news.readTime}</span>
                        </div>
                        
                        {/* Strict: Read Story CTA Link */}
                        <div className="hidden sm:block pt-4 border-t border-slate-100 mt-4">
                          <span className="text-[10px] font-bold text-[#1877F2] uppercase tracking-widest group-hover:underline flex items-center">
                            Read Story <ArrowRight className="w-3 h-3 ml-1" />
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
                
                <h3 className="font-black text-[13px] uppercase tracking-widest mb-4">NEWSLETTER</h3>
                
                <div className="flex gap-4 mb-6 relative z-10">
                  <Mail className="w-8 h-8 text-slate-400 shrink-0 stroke-[1.5]" />
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
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
                    className="w-full h-11 px-4 bg-white text-slate-900 text-[11px] font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] transition-shadow" 
                  />
                  <Button type="submit" disabled={newsletter.isSubscribing} className="w-full h-11 bg-[#1877F2] hover:bg-blue-600 font-bold text-[11px] uppercase tracking-widest rounded-md transition-colors">
                    {newsletter.isSubscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
                  </Button>
                </form>
                {newsletter.error && (
                  <p className="text-red-400 text-[10px] mt-2">{newsletter.error}</p>
                )}
                {newsletter.isSubscribed && (
                  <p className="text-green-400 text-[10px] mt-2 font-bold">Thank you for subscribing!</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT WE'RE WORKING ON SECTION */}
      <section className="py-12 sm:py-24 bg-[#050A14] border-t border-white/5">
        <div className={PAGE_CONTENT_CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3 sm:mb-4">
              WHAT WE&apos;RE WORKING ON
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
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
