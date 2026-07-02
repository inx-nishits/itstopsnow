"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Heart, Search, Smartphone, Book, Headphones, Star, ChevronLeft, ChevronRight, LayoutGrid, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { MOCK_APPS, MOCK_BOOKS, MOCK_PODCASTS, MOCK_WEBSITES } from "@/lib/support/mockData";
import {
  parseSupportTabParam,
  supportFilterToSlug,
  type SupportFilterOption,
} from "@/lib/support/tabs";
import { cn } from "@/lib/utils";

// Types
type FilterOption = SupportFilterOption;

const CATEGORIES: { label: FilterOption; icon: React.ElementType }[] = [
  { label: "All", icon: LayoutGrid },
  { label: "Apps", icon: Smartphone },
  { label: "Podcasts", icon: Headphones },
  { label: "Books", icon: Book },
  { label: "Websites", icon: Globe },
];

// Super Clean App Card (Matching Screenshot)
const AppItem = ({ item, isGrid }: { item: any, isGrid?: boolean }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className={cn("flex flex-col sm:flex-row h-full shrink-0 cursor-pointer group bg-transparent sm:bg-white border-transparent sm:border sm:border-slate-200 sm:rounded-2xl hover:shadow-lg transition-all sm:hover:border-[#1877F2]/40 sm:p-4", isGrid ? "w-full" : "w-[90px] sm:w-[320px] lg:w-[340px] snap-start sm:snap-center")}>
    <div className="relative shrink-0 flex flex-col items-center">
      <img src={item.logo} alt={item.name} className="w-[90px] h-[90px] sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-[20px] sm:rounded-xl object-cover shadow-sm bg-white border border-slate-100" />
    </div>
    <div className="flex flex-col mt-2 sm:mt-0 sm:ml-4 min-w-0 flex-1 items-center sm:items-start text-center sm:text-left">
      <div className="flex justify-between items-start mb-1 w-full">
        <h4 className="text-[12px] sm:text-sm font-bold text-gray-900 line-clamp-1 sm:line-clamp-2 group-hover:text-[#1877F2] transition-colors leading-snug w-full">{item.name}</h4>
      </div>
      
      {/* Mobile Rating */}
      <div className="flex sm:hidden items-center justify-center gap-1 mt-0.5">
        <span className="text-[10px] font-medium text-slate-500">{item.rating}</span>
        <Star className="w-2.5 h-2.5 fill-slate-400 text-slate-400" />
      </div>

      <div className="hidden sm:flex flex-wrap items-center gap-1.5 mb-2">
        <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
        {item.badge && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#1877F2] px-2 py-0.5 rounded">
            {item.badge}
          </span>
        )}
      </div>
      <div className="hidden sm:flex items-center gap-1 mb-2">
        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
        <span className="text-[10px] font-medium text-slate-600">{item.rating} <span className="text-slate-400">({item.reviews})</span></span>
      </div>
      <p className="hidden sm:block text-[10px] text-slate-500 line-clamp-2 sm:line-clamp-3 leading-relaxed">{item.description}</p>
    </div>
  </Link>
);

// Super Clean Podcast Card (Matching Screenshot)
const PodcastItem = ({ item, isGrid }: { item: any, isGrid?: boolean }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className={cn("flex flex-col sm:flex-row h-full shrink-0 cursor-pointer group bg-transparent sm:bg-white border-transparent sm:border sm:border-slate-200 sm:rounded-2xl hover:shadow-lg transition-all sm:hover:border-[#1877F2]/40 sm:p-4", isGrid ? "w-full" : "w-[90px] sm:w-[320px] lg:w-[340px] snap-start sm:snap-center")}>
    <div className="relative shrink-0 flex flex-col items-center">
      <div className="w-[90px] h-[90px] sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-[20px] sm:rounded-xl overflow-hidden border border-slate-100 shadow-sm relative">
        <img src={item.logo} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
    </div>
    <div className="flex flex-col mt-2 sm:mt-0 sm:ml-4 min-w-0 flex-1 items-center sm:items-start text-center sm:text-left">
      <div className="flex justify-between items-start mb-1 w-full">
        <h4 className="text-[12px] sm:text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#1877F2] transition-colors leading-tight sm:leading-snug w-full">{item.title}</h4>
      </div>
      <div className="hidden sm:inline-flex mb-2">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {item.topic}
        </span>
      </div>
      <p className="hidden sm:block text-[10px] text-slate-500 line-clamp-2 sm:line-clamp-3 leading-relaxed">{item.description}</p>
    </div>
  </Link>
);

// Super Clean Book Card (Matching Screenshot)
const BookItem = ({ item, isGrid }: { item: any, isGrid?: boolean }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className={cn("flex flex-col sm:flex-row h-full shrink-0 cursor-pointer group bg-transparent sm:bg-white border-transparent sm:border sm:border-slate-200 sm:rounded-2xl hover:shadow-lg transition-all sm:hover:border-[#1877F2]/40 sm:p-4", isGrid ? "w-full" : "w-[90px] sm:w-[320px] lg:w-[340px] snap-start sm:snap-center")}>
    <div className="relative shrink-0 flex flex-col items-center">
      <img src={item.cover} alt={item.title} className="w-[90px] sm:w-24 shrink-0 rounded-[12px] sm:rounded-lg object-cover shadow-sm bg-white aspect-[2/3]" />
    </div>
    <div className="flex flex-col mt-2 sm:mt-0 sm:ml-4 min-w-0 flex-1 items-center sm:items-start text-center sm:text-left">
      <div className="flex justify-between items-start mb-1 w-full">
        <h4 className="text-[12px] sm:text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#1877F2] transition-colors leading-tight sm:leading-snug w-full">{item.title}</h4>
      </div>
      
      <p className="hidden sm:block text-[10px] text-slate-500 mb-2 font-medium">By {item.author}</p>
      
      {item.recommendedBy && (
        <div className="hidden sm:inline-flex items-center gap-1.5 mb-2 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100/50">
          <Star className="w-3 h-3 fill-emerald-500 text-emerald-500 shrink-0" />
          <span className="text-[9px] font-bold uppercase tracking-wider line-clamp-1 leading-none">{item.recommendedBy}</span>
        </div>
      )}
      
      <p className="hidden sm:block text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
      
      <div className="hidden sm:inline-flex mt-2">
        <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
      </div>
    </div>
  </Link>
);

// Super Clean Website Card
const WebsiteItem = ({ item, isGrid }: { item: any, isGrid?: boolean }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className={cn("flex flex-col sm:flex-row h-full shrink-0 cursor-pointer group bg-transparent sm:bg-white border-transparent sm:border sm:border-slate-200 sm:rounded-2xl hover:shadow-lg transition-all sm:hover:border-[#1877F2]/40 sm:p-4", isGrid ? "w-full" : "w-[90px] sm:w-[320px] lg:w-[340px] snap-start sm:snap-center")}>
    <div className="relative shrink-0 flex flex-col items-center">
      <img src={item.logo} alt={item.name} className="w-[90px] h-[90px] sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-[20px] sm:rounded-xl object-cover shadow-sm bg-white border border-slate-100" />
    </div>
    <div className="flex flex-col mt-2 sm:mt-0 sm:ml-4 min-w-0 flex-1 items-center sm:items-start text-center sm:text-left">
      <div className="flex justify-between items-start mb-1 w-full">
        <h4 className="text-[12px] sm:text-sm font-bold text-gray-900 line-clamp-1 sm:line-clamp-2 group-hover:text-[#1877F2] transition-colors leading-snug w-full">{item.name}</h4>
      </div>
      <div className="hidden sm:inline-flex mb-2">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {item.category}
        </span>
      </div>
      <p className="hidden sm:block text-[10px] text-slate-500 line-clamp-2 sm:line-clamp-3 leading-relaxed">{item.description}</p>
    </div>
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
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h3>
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
      <div
        className="relative group"
        style={{ marginRight: "calc((100vw - 100%) / -2)" }}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 gap-4 sm:gap-6 lg:gap-8"
          style={{ paddingRight: "calc((100vw - 100%) / 2)" }}
        >
          {items.map((item, i) => (
            <div key={`${item.id || item.name || item.title}-${i}`} className="shrink-0 snap-start sm:snap-center">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function SupportPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolledSection, setScrolledSection] = useState<string>("All");

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveFilter(parseSupportTabParam(searchParams.get("tab")));
  }, [searchParams]);

  // Sync scroll position to active section
  useEffect(() => {
    if (activeFilter !== "All") return;
    const syncActiveFromScroll = () => {
      const offset = 200; // Offset for sticky header
      let current = "All"; // Default to All if near top
      const sections = ["Apps", "Podcasts", "Books", "Websites"];
      
      for (const id of sections) {
        const el = sectionRefs.current[id];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setScrolledSection(current);
    };

    window.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncActiveFromScroll);
  }, [activeFilter]);

  // Auto-scroll the tabs horizontally
  useEffect(() => {
    if (!tabsContainerRef.current) return;
    
    // Determine the visually active tab
    const visualActiveTab = activeFilter === "All" ? scrolledSection : activeFilter;
    const activeTabEl = tabsContainerRef.current.querySelector(`[data-tab-id="${visualActiveTab}"]`) as HTMLElement;
    
    if (activeTabEl) {
      const container = tabsContainerRef.current;
      const scrollLeft = activeTabEl.offsetLeft - container.offsetWidth / 2 + activeTabEl.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [scrolledSection, activeFilter]);

  // Filtering Logic
  const filteredApps = MOCK_APPS.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPodcasts = MOCK_PODCASTS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredBooks = MOCK_BOOKS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredWebsites = MOCK_WEBSITES.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Duplicate items heavily to fill the screen as requested
  const allApps = [...filteredApps, ...filteredApps, ...filteredApps, ...filteredApps];
  const allPodcasts = [...filteredPodcasts, ...filteredPodcasts, ...filteredPodcasts, ...filteredPodcasts];
  const allBooks = [...filteredBooks, ...filteredBooks, ...filteredBooks, ...filteredBooks];
  const allWebsites = [...filteredWebsites, ...filteredWebsites, ...filteredWebsites, ...filteredWebsites];

  const handleTabClick = (cat: FilterOption) => {
    if (cat === "All" && activeFilter === "All") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setActiveFilter(cat);

    const slug = supportFilterToSlug(cat);
    const nextUrl = slug === "all" ? pathname : `${pathname}?tab=${slug}`;
    router.replace(nextUrl, { scroll: false });
  };

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

      <section className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 pt-0 pb-10 sm:pb-20 lg:pb-24 bg-white">

        {/* Sticky Filters & Search */}
        <div className="sticky top-16 md:top-24 z-30 bg-white mb-8 border-b border-gray-100 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-16 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-4 py-2 sm:py-3">
            {/* Filters */}
            <div ref={tabsContainerRef} className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide flex-grow pr-4 pb-1 md:pb-0">
              {CATEGORIES.map(cat => {
                const isVisuallyActive = activeFilter === "All" ? cat.label === scrolledSection : activeFilter === cat.label;
                return (
                  <button
                    key={cat.label}
                    data-tab-id={cat.label}
                    onClick={() => handleTabClick(cat.label)}
                    className={cn(
                      "flex items-center justify-center gap-2 px-5 sm:px-6 h-10 sm:h-11 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all border shrink-0",
                      isVisuallyActive
                        ? "bg-[#1877F2] text-white border-[#1877F2]" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <cat.icon className="w-4 h-4 shrink-0" /> {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64 xl:w-72 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-5 h-10 sm:h-11 border border-slate-200 rounded-full text-sm font-medium focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] placeholder:text-slate-400 text-slate-900 bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Header & Navigation */}
        {activeFilter === "All" ? (
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Resources</h2>
        ) : (
          <div className="mb-8">
            <button
              onClick={() => handleTabClick("All")}
              className="group inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-500 hover:text-[#1877F2] transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Recovery and Support</span>
            </button>
          </div>
        )}

        {/* Dynamic Views */}
        <div>
          {/* "ALL" VIEW - CAROUSELS */}
          {activeFilter === "All" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div ref={(el) => { sectionRefs.current["Apps"] = el; }} className="scroll-mt-32">
                <ResourceCarousel
                  title="Apps"
                  items={allApps}
                  renderItem={(item) => <AppItem item={item} />}
                  onViewAll={() => handleTabClick("Apps")}
                />
              </div>
              <div ref={(el) => { sectionRefs.current["Podcasts"] = el; }} className="scroll-mt-32">
                <ResourceCarousel
                  title="Podcasts"
                  items={allPodcasts}
                  renderItem={(item) => <PodcastItem item={item} />}
                  onViewAll={() => handleTabClick("Podcasts")}
                />
              </div>
              <div ref={(el) => { sectionRefs.current["Books"] = el; }} className="scroll-mt-32">
                <ResourceCarousel
                  title="Books"
                  items={allBooks}
                  renderItem={(item) => <BookItem item={item} />}
                  onViewAll={() => handleTabClick("Books")}
                />
              </div>
              <div ref={(el) => { sectionRefs.current["Websites"] = el; }} className="scroll-mt-32">
                <ResourceCarousel
                  title="Websites"
                  items={allWebsites}
                  renderItem={(item) => <WebsiteItem item={item} />}
                  onViewAll={() => handleTabClick("Websites")}
                />
              </div>
            </motion.div>
          )}

          {/* "APPS" VIEW - GRID */}
          {activeFilter === "Apps" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">All Apps</h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center sm:justify-items-start">
                {allApps.map((item, i) => <AppItem key={`grid-app-${item.id || item.name}-${i}`} item={item} isGrid />)}
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
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center sm:justify-items-start">
                {allPodcasts.map((item, i) => <PodcastItem key={`grid-pod-${item.id || item.title}-${i}`} item={item} isGrid />)}
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
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center sm:justify-items-start">
                {allBooks.map((item, i) => <BookItem key={`grid-book-${item.id || item.title}-${i}`} item={item} isGrid />)}
              </div>
              {allBooks.length === 0 && <p className="text-gray-500 text-sm">No books found matching your search.</p>}
            </motion.div>
          )}

          {/* "WEBSITES" VIEW - GRID */}
          {activeFilter === "Websites" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">All Websites</h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center sm:justify-items-start">
                {allWebsites.map((item, i) => <WebsiteItem key={`grid-web-${item.id || item.name}-${i}`} item={item} isGrid />)}
              </div>
              {allWebsites.length === 0 && <p className="text-gray-500 text-sm">No websites found matching your search.</p>}
            </motion.div>
          )}

        </div>
      </section>

    </div>
  );
}

export default function SupportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-sans text-slate-500">
          Loading resources…
        </div>
      }
    >
      <SupportPageContent />
    </Suspense>
  );
}
