"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, Smartphone, Book, Headphones, Star, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_APPS = [
  {
    id: "app1",
    name: "Headspace for Responders",
    description: "Guided meditation and mindfulness specifically tailored for the high-stress environment of first responders.",
    category: "Mental Health",
    badge: "Most Popular",
    rating: 4.8,
    reviews: 1240,
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop",
    link: "https://www.headspace.com"
  },
  {
    id: "app2",
    name: "Pocket Sergeant",
    description: "The essential app created by police, for police. Includes wellbeing resources alongside operational guidance.",
    category: "Wellbeing & Operational",
    badge: "Official Supporter",
    rating: 4.9,
    reviews: 50000,
    logo: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=400&auto=format&fit=crop",
    link: "https://pocketsergeant.co.uk"
  },
  {
    id: "app3",
    name: "Calm",
    description: "Helps you manage stress, sleep better, and live a happier, healthier life with guided meditations and sleep stories.",
    category: "Sleep & Anxiety",
    badge: "Staff Pick",
    rating: 4.7,
    reviews: 3200,
    logo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop",
    link: "https://www.calm.com"
  }
];

const MOCK_BOOKS = [
  {
    id: "book1",
    title: "Emotional Survival for Law Enforcement",
    author: "Dr. Kevin M. Gilmartin",
    description: "The definitive guide on the psychological toll of police work and how to protect your personal life and mental health.",
    category: "Psychology",
    recommendedBy: "Police Federation Wellbeing Lead",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com/dp/0971725403"
  },
  {
    id: "book2",
    title: "Trauma Stewardship",
    author: "Laura van Dernoot Lipsky",
    description: "An everyday guide to caring for self while caring for others, perfect for front-line public service workers.",
    category: "Self-Care",
    recommendedBy: "Mental Health Specialists",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com"
  },
  {
    id: "book3",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    description: "Brain, mind, and body in the healing of trauma. A fundamental read for understanding PTSD.",
    category: "Medical & Trauma",
    recommendedBy: "IOPC Reform Coalition",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com"
  }
];

const MOCK_PODCASTS = [
  {
    id: "pod1",
    title: "The Pocket Sergeant Podcast",
    description: "Real conversations with serving and retired officers about trauma, investigations, and finding a path forward.",
    topic: "Wellbeing & Law",
    logo: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com"
  },
  {
    id: "pod2",
    title: "Police Care UK Wellbeing Cast",
    description: "Advice, resources, and shared experiences from the national charity dedicated to police welfare.",
    topic: "Welfare Support",
    logo: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com"
  },
  {
    id: "pod3",
    title: "First Responder Wellness",
    description: "Experts discuss mental health strategies tailored for the extreme stress of frontline emergency work.",
    topic: "Mental Health",
    logo: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com"
  }
];


// Section components with local state
const AppsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Rating");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filtered = MOCK_APPS.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Title") return a.name.localeCompare(b.name);
    return b.rating - a.rating;
  });
  
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="py-24 border-b border-white/5 relative">
      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-3">
              <Smartphone className="w-5 h-5" /> Digital Tools
            </h2>
            <h3 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">Recommended Apps</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md shrink-0">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="SEARCH APPS..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#1877F2] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {paginated.map((item, idx) => (
              <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={item.id} className="bg-[#050A14] border border-white/10 rounded-2xl overflow-hidden hover:border-[#1877F2]/50 transition-colors flex flex-col group">
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <img src={item.logo} alt={item.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10 group-hover:scale-110 transition-transform duration-500" />
                    {item.badge && <span className="bg-[#1877F2]/20 text-[#1877F2] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{item.badge}</span>}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-sm font-bold text-white">{item.rating}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest ml-1">({item.reviews})</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4 inline-block">{item.category}</span>
                  <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow">{item.description}</p>
                  
                  <Link href={item.link} target="_blank">
                    <Button className="w-full bg-white/5 hover:bg-[#1877F2] hover:text-white text-slate-300 font-bold uppercase tracking-widest text-[10px] py-6 transition-all border border-white/10 group-hover:border-[#1877F2]">
                      Visit App <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} variant="outline" className="border-white/10 text-white bg-transparent rounded-none px-6 py-4 text-[10px] uppercase font-bold tracking-widest">Prev</Button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pg {currentPage} / {totalPages}</span>
            <Button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} variant="outline" className="border-white/10 text-white bg-transparent rounded-none px-6 py-4 text-[10px] uppercase font-bold tracking-widest">Next</Button>
          </div>
        )}
      </div>
    </section>
  );
};


const BooksSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filtered = MOCK_BOOKS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="py-24 border-b border-white/5 relative">
      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-3">
              <Book className="w-5 h-5" /> Reading Material
            </h2>
            <h3 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">Recommended Books</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md shrink-0">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="SEARCH BOOKS..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#1877F2] transition-colors"
              />
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
                <div className="p-8 flex-grow flex flex-col bg-[#050A14]">
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h4>
                  <p className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em] mb-6">BY {item.author}</p>
                  
                  <div className="bg-white/5 border border-white/10 p-4 mb-6 relative">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Recommended By</p>
                    <p className="text-xs font-bold text-slate-300">{item.recommendedBy}</p>
                  </div>
                  
                  <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow">{item.description}</p>
                  
                  <Link href={item.link} target="_blank">
                    <Button className="w-full bg-transparent text-[#1877F2] hover:bg-[#1877F2] hover:text-white border border-[#1877F2]/30 font-bold uppercase tracking-widest text-[10px] py-6 transition-all rounded-none">
                      Buy / View Book <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} variant="outline" className="border-white/10 text-white bg-transparent rounded-none px-6 py-4 text-[10px] uppercase font-bold tracking-widest">Prev</Button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pg {currentPage} / {totalPages}</span>
            <Button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} variant="outline" className="border-white/10 text-white bg-transparent rounded-none px-6 py-4 text-[10px] uppercase font-bold tracking-widest">Next</Button>
          </div>
        )}
      </div>
    </section>
  );
};


const PodcastsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filtered = MOCK_PODCASTS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="py-24 border-b border-white/5 relative bg-[#020611]">
      <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-4 flex items-center gap-3">
              <Headphones className="w-5 h-5" /> Audio Resources
            </h2>
            <h3 className="font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">Recommended Podcasts</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md shrink-0">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="SEARCH PODCASTS..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#1877F2] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {paginated.map((item, idx) => (
              <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#1877F2]/50 transition-colors flex items-center gap-6 group">
                <div className="shrink-0 relative">
                  <div className="absolute inset-0 bg-[#1877F2] blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <img src={item.logo} alt={item.title} className="w-24 h-24 rounded-xl object-cover border border-white/20 grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10" />
                </div>
                <div className="flex-grow">
                  <div className="text-[9px] font-bold text-[#1877F2] uppercase tracking-widest mb-2">{item.topic}</div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-tight leading-tight">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                  <Link href={item.link} target="_blank" className="inline-flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest hover:text-[#1877F2] transition-colors">
                    Listen Now <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} variant="outline" className="border-white/10 text-white bg-transparent rounded-none px-6 py-4 text-[10px] uppercase font-bold tracking-widest">Prev</Button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pg {currentPage} / {totalPages}</span>
            <Button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} variant="outline" className="border-white/10 text-white bg-transparent rounded-none px-6 py-4 text-[10px] uppercase font-bold tracking-widest">Next</Button>
          </div>
        )}
      </div>
    </section>
  );
};


export default function SupportListing() {
  return (
    <div className="min-h-screen bg-[#020611] text-white font-sans">
      
      {/* HERO */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1920" 
            alt="Supportive community hands" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <Heart className="w-5 h-5" /> ASSISTANCE & CARE
            </h3>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2"
            >
              <span className="text-white">RECOVERY & </span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">SUPPORT.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-2xl drop-shadow"
            >
              You are not alone. Explore our curated directory of mental health resources, books, and podcasts tailored for police wellbeing.
            </motion.p>
          </div>
        </div>
      </section>

      {/* THREE DISTINCT SECTIONS WITH THEIR OWN LOCAL STATE */}
      <AppsSection />
      <BooksSection />
      <PodcastsSection />

    </div>
  );
}
