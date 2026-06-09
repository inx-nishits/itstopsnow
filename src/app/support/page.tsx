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
    image: "https://images.unsplash.com/photo-1623838275510-18dc0c3cbdfa?q=80&w=800&auto=format&fit=crop"
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
      
      {/* EMERGENCY BANNER */}
      <div className="bg-red-600/90 backdrop-blur-md text-white py-4 px-4 text-center text-sm font-bold tracking-widest uppercase border-b border-red-500">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-3">
          <span className="flex items-center bg-black/20 px-3 py-1 rounded-full text-[10px]"><Phone className="w-3 h-3 mr-2" /> URGENT</span>
          <span>In immediate crisis? Call the Samaritans free on <strong className="text-black bg-white px-2 py-0.5 rounded">116 123</strong> or text SHOUT to <strong className="text-black bg-white px-2 py-0.5 rounded">85258</strong>.</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative w-full min-h-[50vh] pt-32 pb-20 bg-[#050B14] flex flex-col justify-center overflow-hidden text-white border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#1877F2]/10 blur-[150px] pointer-events-none rounded-full" />
          <img 
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2000&auto=format&fit=crop" 
            alt="Support resources" 
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
              <span className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-xs">Assistance & Care</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8 uppercase tracking-tight font-sans"
            >
              RECOVERY & <br/><span className="text-[#1877F2]">SUPPORT.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10"
            >
              You are not alone. Explore our curated directory of mental health resources, legal support organizations, and wellbeing tools.
            </motion.p>
          </div>
        </div>
      </section>

      {/* TABS & SEARCH */}
      <section className="sticky top-[72px] z-40 bg-[#050B14]/90 backdrop-blur-xl border-b border-white/5 py-5 shadow-xl">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap px-6 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#1877F2] text-white shadow-[0_0_15px_rgba(24,119,242,0.3)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
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
                className="w-full bg-[#020611] border border-white/10 rounded-full pl-14 pr-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#1877F2]/50 transition-colors placeholder-slate-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="container mx-auto px-4 md:px-8 mt-24 max-w-[1200px]">
        {filteredResources.length === 0 ? (
           <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/10">
            <Heart className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-sans font-bold text-white mb-2 uppercase tracking-tight">No resources found</h3>
            <p className="text-slate-400">Try adjusting your search or category filters.</p>
            <Button onClick={() => { setSearchQuery(""); setActiveTab("all"); }} variant="outline" className="mt-8 border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-[10px] font-bold uppercase tracking-widest">Clear Filters</Button>
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
                  <Link href={`/support/${item.type}/${item.slug}`} className="group flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 overflow-hidden hover:shadow-2xl hover:border-[#1877F2]/50 transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-[4/3] overflow-hidden relative bg-[#050B14]">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-[#050B14] border border-white/10 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-[#1877F2] flex items-center shadow-lg">
                        {item.type === 'app' && <Smartphone className="w-3 h-3 mr-2 text-white" />}
                        {item.type === 'book' && <Book className="w-3 h-3 mr-2 text-white" />}
                        {item.type === 'podcast' && <Headphones className="w-3 h-3 mr-2 text-white" />}
                        {item.type === 'org' && <ShieldAlert className="w-3 h-3 mr-2 text-white" />}
                        {item.type}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020611] to-transparent opacity-80" />
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow relative z-10 -mt-8">
                      <h3 className="font-sans text-xl font-bold uppercase text-white mb-4 group-hover:text-[#1877F2] transition-colors leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-[#1877F2] mb-6">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold text-white">{item.rating}</span>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest ml-1">({item.reviews} Reviews)</span>
                      </div>

                      <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                        {item.summary}
                      </p>
                      
                      <div className="border-t border-white/10 pt-6 mt-auto flex items-center justify-between">
                        <p className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em]">{item.author}</p>
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
