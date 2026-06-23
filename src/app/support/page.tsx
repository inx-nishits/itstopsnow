"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, Smartphone, Book, Headphones, Star, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditorialSection, CampaignSection } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { MOCK_APPS, MOCK_BOOKS, MOCK_PODCASTS } from "@/lib/support/mockData";
import { Pagination } from "@/components/ui/Pagination";

const MOCK_APPS_REF = MOCK_APPS;
const MOCK_BOOKS_REF = MOCK_BOOKS;
const MOCK_PODCASTS_REF = MOCK_PODCASTS;

// Section components with local state
const AppsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Rating");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filtered = MOCK_APPS_REF.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Title") return a.name.localeCompare(b.name);
    return b.rating - a.rating;
  });
  
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <EditorialSection>
      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-3">
              <Smartphone className="w-5 h-5" /> Digital Tools
            </h2>
            <h3 className={`font-sans text-3xl max-sm:text-3xl md:text-5xl font-bold uppercase tracking-tight ${hybrid.editorialHeading}`}>Recommended Apps</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md shrink-0">
            <div className="relative w-full sm:w-[60%]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="SEARCH APPS..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className={`w-full pl-12 pr-4 min-h-[48px] text-[10px] font-bold uppercase tracking-widest focus:outline-none transition-colors rounded-xl ${hybrid.editorialInput}`}
              />
            </div>
            <div className="relative w-full sm:w-[40%]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className={`w-full pl-12 pr-4 min-h-[48px] text-[10px] font-bold uppercase tracking-widest focus:outline-none transition-colors rounded-xl appearance-none cursor-pointer ${hybrid.editorialInput}`}
              >
                <option value="Rating">Rating</option>
                <option value="Title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {paginated.map((item) => (
              <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={item.id} className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} overflow-hidden flex flex-col group`}>
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <img src={item.logo} alt={item.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200 group-hover:scale-110 transition-transform duration-500" />
                    {item.badge && <span className="bg-[#1877F2]/10 text-[#1877F2] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{item.badge}</span>}
                  </div>
                  <h4 className={`text-xl font-bold mb-2 ${hybrid.editorialHeading}`}>{item.name}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className={`text-sm font-bold ${hybrid.editorialHeading}`}>{item.rating}</span>
                    <span className={`text-[10px] uppercase tracking-widest ml-1 ${hybrid.editorialMuted}`}>({item.reviews})</span>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest mb-4 inline-block ${hybrid.editorialMuted}`}>{item.category}</span>
                  <p className={`text-sm leading-relaxed mb-6 flex-grow ${hybrid.editorialBody}`}>{item.description}</p>

                  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                    <Button className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] py-6 transition-all">
                      Visit App <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-12"
        />
      </div>
    </EditorialSection>
  );
};


const BooksSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Title");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filtered = MOCK_BOOKS_REF.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Author") return a.author.localeCompare(b.author);
    return a.title.localeCompare(b.title);
  });
  
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <CampaignSection>
      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-3">
              <Book className="w-5 h-5" /> Reading Material
            </h2>
            <h3 className="font-sans text-3xl max-sm:text-3xl md:text-5xl font-bold uppercase tracking-tight text-white">Recommended Books</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md shrink-0">
            <div className="relative w-full sm:w-[60%]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="SEARCH BOOKS..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 min-h-[48px] text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#1877F2] transition-colors"
              />
            </div>
            <div className="relative w-full sm:w-[40%]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select 
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 min-h-[48px] text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#1877F2] transition-colors appearance-none cursor-pointer"
              >
                <option value="Title" className="bg-[#050A14] text-white">Title (A-Z)</option>
                <option value="Author" className="bg-[#050A14] text-white">Author (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {paginated.map((item, idx) => (
              <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={item.id} className="bg-transparent border border-white/10 rounded-none overflow-hidden hover:border-[#1877F2]/50 transition-colors flex flex-col group">
                <div className="aspect-[4/3] overflow-hidden relative border-b border-white/10">
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-[#020611] text-white px-4 py-2 text-[9px] font-bold uppercase tracking-widest border border-white/10">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-grow flex flex-col bg-[#050A14]">
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h4>
                  <p className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em] mb-6">BY {item.author}</p>
                  
                  <div className="bg-white/5 border border-white/10 p-4 mb-6 relative">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Recommended By</p>
                    <p className="text-xs font-bold text-slate-300">{item.recommendedBy}</p>
                  </div>
                  
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">{item.description}</p>

                  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto block">
                    <Button className="w-full bg-transparent text-[#1877F2] hover:bg-[#1877F2] hover:text-white border border-[#1877F2]/30 font-bold uppercase tracking-widest text-[10px] py-6 transition-all rounded-none">
                      Buy / View Book <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          variant="campaign"
          className="mt-12"
        />
      </div>
    </CampaignSection>
  );
};


const PodcastsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Title");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filtered = MOCK_PODCASTS_REF.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Topic") return a.topic.localeCompare(b.topic);
    return a.title.localeCompare(b.title);
  });
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <EditorialSection>
      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-3">
              <Headphones className="w-5 h-5" /> Audio Resources
            </h2>
            <h3 className={`font-sans text-3xl max-sm:text-3xl md:text-5xl font-bold uppercase tracking-tight ${hybrid.editorialHeading}`}>Recommended Podcasts</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md shrink-0">
            <div className="relative w-full sm:w-[60%]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="SEARCH PODCASTS..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className={`w-full pl-12 pr-4 min-h-[48px] text-[10px] font-bold uppercase tracking-widest focus:outline-none transition-colors rounded-xl ${hybrid.editorialInput}`}
              />
            </div>
            <div className="relative w-full sm:w-[40%]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className={`w-full pl-12 pr-4 min-h-[48px] text-[10px] font-bold uppercase tracking-widest focus:outline-none transition-colors rounded-xl appearance-none cursor-pointer ${hybrid.editorialInput}`}
              >
                <option value="Title">Title (A-Z)</option>
                <option value="Topic">Topic (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {paginated.map((item) => (
              <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={item.id} className={`${hybrid.editorialCard} ${hybrid.editorialCardHover} p-5 md:p-6 flex items-center gap-6 group`}>
                <div className="shrink-0 relative">
                  <div className="absolute inset-0 bg-[#1877F2] blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <img src={item.logo} alt={item.title} className="w-24 h-24 rounded-xl object-cover border border-slate-200 grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10" />
                </div>
                <div className="flex-grow">
                  <div className="text-[9px] font-bold text-[#1877F2] uppercase tracking-widest mb-2">{item.topic}</div>
                  <h4 className={`text-xl font-bold mb-2 tracking-tight leading-tight ${hybrid.editorialHeading}`}>{item.title}</h4>
                  <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${hybrid.editorialBody}`}>{item.description}</p>
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#1877F2] transition-colors ${hybrid.editorialHeading}`}>
                    Listen Now <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-12"
        />
      </div>
    </EditorialSection>
  );
};


export default function SupportListing() {
  return (
    <div className="min-h-screen font-sans">
      
      <PageHero
        animate
        eyebrow={
          <>
            <Heart className="w-5 h-5 shrink-0" /> ASSISTANCE & CARE
          </>
        }
        title={
          <>
            <span className="text-white">RECOVERY & </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              SUPPORT.
            </span>
          </>
        }
        description="You are not alone. Explore our curated directory of mental health resources, books, and podcasts tailored for police wellbeing."
        imageSrc="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1920"
        imageAlt="Supportive community hands"
      />

      {/* THREE DISTINCT SECTIONS WITH THEIR OWN LOCAL STATE */}
      <AppsSection />
      <BooksSection />
      <PodcastsSection />

    </div>
  );
}
