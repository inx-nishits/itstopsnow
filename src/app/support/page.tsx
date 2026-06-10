"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, Smartphone, Book, Headphones, ShieldAlert, Star, ExternalLink, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_RESOURCES = [
  {
    id: "s1",
    type: "app",
    slug: "headspace-for-responders",
    title: "Headspace for Responders",
    author: "Headspace Health",
    rating: 4.8,
    reviews: 1240,
    category: "Mental Health",
    summary: "Guided meditation and mindfulness specifically tailored for the high-stress environment of first responders.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "s2",
    type: "book",
    slug: "emotional-survival-for-law-enforcement",
    title: "Emotional Survival for Law Enforcement",
    author: "Dr. Kevin M. Gilmartin",
    rating: 4.9,
    reviews: 3200,
    category: "Psychology",
    summary: "The definitive guide on the psychological toll of police work and how to protect your personal life and mental health.",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "s3",
    type: "podcast",
    slug: "the-briefing-room",
    title: "The Briefing Room Wellbeing Cast",
    author: "Police Care UK",
    rating: 4.7,
    reviews: 850,
    category: "Wellbeing",
    summary: "Real conversations with serving and retired officers about trauma, investigations, and finding a path forward.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "s4",
    type: "org",
    slug: "police-firearms-officers-association",
    title: "Police Firearms Officers Association (PFOA)",
    author: "National Support Network",
    rating: 5.0,
    reviews: 95,
    category: "Legal & Support",
    summary: "Providing crucial welfare support, legal guidance, and counseling for firearms officers and their families during post-incident procedures.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"
  }
];

const TABS = [
  { id: "all", label: "All Resources", icon: Heart },
  { id: "app", label: "Apps", icon: Smartphone },
  { id: "book", label: "Books", icon: Book },
  { id: "podcast", label: "Podcasts", icon: Headphones },
  { id: "org", label: "Organisations", icon: ShieldAlert },
];

export default function SupportListing() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = MOCK_RESOURCES.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#020611] text-white pb-32 font-sans">
      

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
              You are not alone. Explore our curated directory of mental health resources, legal support organizations, and wellbeing tools.
            </motion.p>
          </div>
        </div>
      </section>

      {/* TABS & SEARCH */}
      <section className="sticky top-[72px] z-40 bg-[#050B14]/90 backdrop-blur-xl border-b border-white/5 py-5 shadow-xl">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap px-6 py-4 rounded-none text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#1877F2] text-white' : 'bg-transparent border border-white/10 text-white hover:bg-white/5'}`}
                  >
                    <Icon className="w-4 h-4" /> {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="relative w-full lg:max-w-md shrink-0">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="SEARCH RESOURCES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#050A14] border border-white/10 rounded-none pl-14 pr-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#1877F2] transition-colors placeholder-slate-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="w-full px-6 lg:px-16 mx-auto mt-24 max-w-[1600px]">
        {filteredResources.length === 0 ? (
             <div className="text-center py-32 bg-[#050A14] rounded-none border border-white/10">
            <Heart className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-sans font-bold text-white mb-2 uppercase tracking-tight">No resources found</h3>
            <p className="text-slate-400">Try adjusting your search or category filters.</p>
            <Button onClick={() => { setSearchQuery(""); setActiveTab("all"); }} variant="outline" className="mt-8 border-white/20 text-white hover:bg-white/10 rounded-none px-8 py-6 text-[10px] font-bold uppercase tracking-widest bg-transparent">Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredResources.map((item, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={item.id}
                  className="h-full"
                >
                  <Link href={`/support/${item.type}/${item.slug}`} className="group flex flex-col h-full bg-transparent border border-white/10 hover:border-white/30 transition-colors duration-300 rounded-none">
                    <div className="aspect-[4/3] overflow-hidden relative border-b border-white/10">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-700" />
                      <div className="absolute top-0 left-0 bg-white text-black px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] flex items-center shadow-none rounded-none">
                        {item.type === 'app' && <Smartphone className="w-3 h-3 mr-2 text-black" />}
                        {item.type === 'book' && <Book className="w-3 h-3 mr-2 text-black" />}
                        {item.type === 'podcast' && <Headphones className="w-3 h-3 mr-2 text-black" />}
                        {item.type === 'org' && <ShieldAlert className="w-3 h-3 mr-2 text-black" />}
                        {item.type}
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow relative z-10">
                      <h3 className="font-sans text-xl font-bold uppercase text-white mb-4 group-hover:text-white transition-colors leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-white mb-6">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold text-white">{item.rating}</span>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest ml-1">({item.reviews} Reviews)</span>
                      </div>

                      <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                        {item.summary}
                      </p>
                      
                      <div className="border-t border-white/10 pt-6 mt-auto flex items-center justify-between">
                        <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{item.author}</p>
                        {item.type === 'podcast' && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">LISTEN NOW <ExternalLink className="w-3 h-3" /></span>}
                        {item.type === 'book' && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">VIEW BOOK <ExternalLink className="w-3 h-3" /></span>}
                        {item.type === 'app' && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">GET APP <ExternalLink className="w-3 h-3" /></span>}
                        {item.type === 'org' && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">VISIT SITE <ExternalLink className="w-3 h-3" /></span>}
                      </div>
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
