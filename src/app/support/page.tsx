"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Search, Smartphone, Book, Headphones, Star, ChevronLeft, ChevronRight, LayoutGrid, Globe } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { MOCK_APPS, MOCK_BOOKS, MOCK_PODCASTS } from "@/lib/support/mockData";
import { cn } from "@/lib/utils";

// Types
type FilterOption = "All" | "Apps" | "Podcasts" | "Books" | "Websites";

const CATEGORIES: { label: FilterOption; icon: React.ElementType }[] = [
  { label: "All", icon: LayoutGrid },
  { label: "Apps", icon: Smartphone },
  { label: "Podcasts", icon: Headphones },
  { label: "Books", icon: Book },
  { label: "Websites", icon: Globe },
];

// Super Clean App Card (Matching Screenshot)
const AppItem = ({ item }: { item: any }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col w-[100px] shrink-0 snap-center md:snap-align-none cursor-pointer group">
    <img src={item.logo} alt={item.name} className="w-[84px] h-[84px] sm:w-[100px] sm:h-[100px] rounded-2xl sm:rounded-3xl object-cover mb-3 shadow-sm group-hover:shadow-md transition-all bg-white" />
    <h4 className="text-sm font-bold text-gray-900 mb-0.5 line-clamp-1">{item.name}</h4>
    <div className="flex items-center gap-1">
      <span className="text-xs font-medium text-gray-500">{item.rating}</span>
      <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
    </div>
  </Link>
);

// Super Clean Podcast Card (Matching Screenshot)
const PodcastItem = ({ item }: { item: any }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col w-[130px] sm:w-[150px] shrink-0 snap-center md:snap-align-none cursor-pointer group">
    <img src={item.logo} alt={item.title} className="w-full aspect-square rounded-2xl object-cover mb-3 shadow-sm group-hover:shadow-md transition-all bg-gray-50" />
    <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">{item.title}</h4>
    <p className="text-xs text-gray-500 line-clamp-1">{item.topic}</p>
  </Link>
);

// Super Clean Book Card (Matching Screenshot)
const BookItem = ({ item }: { item: any }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col w-[110px] sm:w-[130px] shrink-0 snap-center md:snap-align-none cursor-pointer group">
    <img src={item.cover} alt={item.title} className="w-full aspect-[2/3] rounded-lg object-cover mb-3 shadow-md group-hover:shadow-lg transition-all bg-white" />
    <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-3 leading-tight">{item.title}</h4>
  </Link>
);

// Carousel Section Component
const ResourceCarousel = ({ title, items, renderItem, onViewAll }: { title: string, items: any[], renderItem: (item: any) => React.ReactNode, onViewAll: () => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="mb-10 sm:mb-14">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-center gap-4">
          <button onClick={onViewAll} className="text-[#1877F2] text-sm font-semibold hover:underline transition-all">
            View all
          </button>
          <div className="hidden md:flex items-center gap-1.5">
            <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      <div className="relative group">
        <div ref={scrollRef} className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {items.map((item, i) => (
            <div key={`${item.id || item.name || item.title}-${i}`}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SupportListing() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredApps = MOCK_APPS.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPodcasts = MOCK_PODCASTS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredBooks = MOCK_BOOKS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Duplicate items heavily to fill the screen as requested
  const allApps = [...filteredApps, ...filteredApps, ...filteredApps, ...filteredApps];
  const allPodcasts = [...filteredPodcasts, ...filteredPodcasts, ...filteredPodcasts, ...filteredPodcasts];
  const allBooks = [...filteredBooks, ...filteredBooks, ...filteredBooks, ...filteredBooks];

  return (
    <div className="min-h-screen font-sans bg-white transition-colors duration-300">
      
      {/* The Banner remains explicitly Dark as requested by the user previously */}
      <PageHero
        animate
        eyebrow={
          <>
            <Heart className="w-5 h-5 shrink-0" /> ASSISTANCE & CARE
          </>
        }
        title={
          <>
            <span className="text-white">Support & </span>
            <br />
            <span className="text-[#1877F2]">
              Resources.
            </span>
          </>
        }
        description="Curated tools, guides and recommendations to help you feel better and take the next step forward."
        imageSrc="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1920"
        imageAlt="Supportive community hands"
      />

      <section className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 py-8 md:py-12 bg-white">
        
        {/* Filters */}
        <div className="flex overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 sm:gap-4 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.label}
              onClick={() => setActiveFilter(cat.label)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border shrink-0",
                activeFilter === cat.label 
                  ? "bg-[#1877F2] text-white border-[#1877F2] shadow-md" 
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              )}
            >
              <cat.icon className="w-4 h-4 shrink-0" /> {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search resources by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 pl-12 pr-6 h-[52px] text-sm text-gray-900 focus:outline-none focus:border-[#1877F2] transition-colors rounded-xl"
          />
        </div>

        {/* Header (Only show if not All) */}
        {activeFilter === "All" && <h2 className="text-xl font-bold text-gray-900 mb-6">All Resources</h2>}

        {/* Dynamic Views */}
        <div>
          {/* "ALL" VIEW - CAROUSELS */}
          {activeFilter === "All" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ResourceCarousel 
                title="Apps" 
                items={allApps} 
                renderItem={(item) => <AppItem item={item} />} 
                onViewAll={() => setActiveFilter("Apps")} 
              />
              <ResourceCarousel 
                title="Podcasts" 
                items={allPodcasts} 
                renderItem={(item) => <PodcastItem item={item} />} 
                onViewAll={() => setActiveFilter("Podcasts")} 
              />
              <ResourceCarousel 
                title="Books" 
                items={allBooks} 
                renderItem={(item) => <BookItem item={item} />} 
                onViewAll={() => setActiveFilter("Books")} 
              />
            </motion.div>
          )}

          {/* "APPS" VIEW - GRID */}
          {activeFilter === "Apps" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">All Apps</h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-y-8 gap-x-4">
                {allApps.map((item, i) => <AppItem key={`grid-app-${item.id || item.name}-${i}`} item={item} />)}
              </div>
              {allApps.length === 0 && <p className="text-gray-500 text-sm">No apps found matching your search.</p>}
            </motion.div>
          )}

          {/* "PODCASTS" VIEW - GRID */}
          {activeFilter === "Podcasts" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">All Podcasts</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-y-8 gap-x-6">
                {allPodcasts.map((item, i) => <PodcastItem key={`grid-pod-${item.id || item.title}-${i}`} item={item} />)}
              </div>
              {allPodcasts.length === 0 && <p className="text-gray-500 text-sm">No podcasts found matching your search.</p>}
            </motion.div>
          )}

          {/* "BOOKS" VIEW - GRID */}
          {activeFilter === "Books" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">All Books</h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-y-8 gap-x-4">
                {allBooks.map((item, i) => <BookItem key={`grid-book-${item.id || item.title}-${i}`} item={item} />)}
              </div>
              {allBooks.length === 0 && <p className="text-gray-500 text-sm">No books found matching your search.</p>}
            </motion.div>
          )}

          {/* "WEBSITES" VIEW - GRID (Empty placeholder as no data provided) */}
          {activeFilter === "Websites" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">All Websites</h3>
              </div>
              <p className="text-gray-500 text-sm">No websites found.</p>
            </motion.div>
          )}

        </div>
      </section>

    </div>
  );
}
