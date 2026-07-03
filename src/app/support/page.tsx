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

// Shared resource card text styles
const CATEGORY_BADGE_CLASS =
  "inline-flex max-w-full items-center whitespace-nowrap rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500";

const FEATURE_BADGE_CLASS =
  "inline-flex max-w-full items-center whitespace-nowrap rounded bg-[#1877F2] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white";

const RESOURCE_DESC_CLASS =
  "hidden sm:block h-10 overflow-hidden text-xs leading-5 text-slate-500";

const RESOURCE_TITLE_CLASS =
  "mb-1 w-full text-sm font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#1877F2] transition-colors";

const RESOURCE_CARD_CLASS =
  "flex h-full shrink-0 cursor-pointer flex-col bg-transparent group sm:flex-row sm:overflow-hidden sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-4 border-transparent transition-all sm:hover:border-[#1877F2]/40 hover:shadow-lg";

const RESOURCE_CARD_SIZE =
  "w-[90px] sm:w-[360px] lg:w-[380px] snap-start sm:snap-center";

// Super Clean App Card (Matching Screenshot)
const AppItem = ({ item, isGrid }: { item: any, isGrid?: boolean }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className={cn(RESOURCE_CARD_CLASS, isGrid ? "w-full" : RESOURCE_CARD_SIZE)}>
    <div className="relative flex shrink-0 flex-col items-center">
      <img src={item.logo} alt={item.name} className="h-[90px] w-[90px] rounded-[20px] border border-slate-100 bg-white object-cover shadow-sm sm:h-20 sm:w-20 sm:rounded-xl lg:h-24 lg:w-24" />
    </div>
    <div className="mt-2 flex min-w-0 flex-1 flex-col items-center text-center sm:mt-0 sm:ml-4 sm:items-start sm:text-left">
      <h4 className={RESOURCE_TITLE_CLASS}>{item.name}</h4>

      <div className="mt-0.5 flex items-center justify-center gap-1 sm:hidden">
        <span className="text-xs font-medium text-slate-500">{item.rating}</span>
        <Star className="h-2.5 w-2.5 fill-slate-400 text-slate-400" />
      </div>

      <div className="mb-1.5 hidden w-full flex-wrap items-center gap-1.5 sm:flex">
        <span className={CATEGORY_BADGE_CLASS}>{item.category}</span>
        {item.badge ? <span className={FEATURE_BADGE_CLASS}>{item.badge}</span> : null}
      </div>

      <div className="mb-1.5 hidden items-center gap-1 sm:flex">
        <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
        <span className="text-xs font-medium text-slate-600">
          {item.rating} <span className="text-slate-400">({item.reviews})</span>
        </span>
      </div>

      <p className={RESOURCE_DESC_CLASS}>{item.description}</p>
    </div>
  </Link>
);

// Super Clean Podcast Card (Matching Screenshot)
const PodcastItem = ({ item, isGrid }: { item: any, isGrid?: boolean }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className={cn(RESOURCE_CARD_CLASS, isGrid ? "w-full" : RESOURCE_CARD_SIZE)}>
    <div className="relative flex shrink-0 flex-col items-center">
      <div className="relative h-[90px] w-[90px] overflow-hidden rounded-[20px] border border-slate-100 shadow-sm sm:h-20 sm:w-20 sm:rounded-xl lg:h-24 lg:w-24">
        <img src={item.logo} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
    </div>
    <div className="mt-2 flex min-w-0 flex-1 flex-col items-center text-center sm:mt-0 sm:ml-4 sm:items-start sm:text-left">
      <h4 className={RESOURCE_TITLE_CLASS}>{item.title}</h4>
      <div className="mb-1.5 hidden w-full flex-wrap items-center gap-1.5 sm:flex">
        <span className={CATEGORY_BADGE_CLASS}>{item.topic}</span>
      </div>
      <p className={RESOURCE_DESC_CLASS}>{item.description}</p>
    </div>
  </Link>
);

// Super Clean Book Card (Matching Screenshot)
const BookItem = ({ item, isGrid }: { item: any, isGrid?: boolean }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className={cn(RESOURCE_CARD_CLASS, isGrid ? "w-full" : RESOURCE_CARD_SIZE)}>
    <div className="relative flex shrink-0 flex-col items-center">
      <img src={item.cover} alt={item.title} className="aspect-[2/3] w-[90px] shrink-0 rounded-[12px] bg-white object-cover shadow-sm sm:w-24 sm:rounded-lg" />
    </div>
    <div className="mt-2 flex min-w-0 flex-1 flex-col items-center text-center sm:mt-0 sm:ml-4 sm:items-start sm:text-left">
      <h4 className={RESOURCE_TITLE_CLASS}>{item.title}</h4>

      <p className="mb-1.5 hidden text-xs font-medium text-slate-500 sm:block">By {item.author}</p>

      {item.recommendedBy ? (
        <div className="mb-1.5 hidden w-full flex-wrap items-center gap-1.5 sm:flex">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-emerald-100/50 bg-emerald-50 px-2 py-1 text-emerald-700">
            <Star className="h-3 w-3 shrink-0 fill-emerald-500 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-wide leading-none">{item.recommendedBy}</span>
          </span>
        </div>
      ) : null}

      <p className={RESOURCE_DESC_CLASS}>{item.description}</p>

      <div className="mt-1.5 hidden w-full flex-wrap items-center gap-1.5 sm:flex">
        <span className={CATEGORY_BADGE_CLASS}>{item.category}</span>
      </div>
    </div>
  </Link>
);

// Super Clean Website Card
const WebsiteItem = ({ item, isGrid }: { item: any, isGrid?: boolean }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className={cn(RESOURCE_CARD_CLASS, isGrid ? "w-full" : RESOURCE_CARD_SIZE)}>
    <div className="relative flex shrink-0 flex-col items-center">
      <img src={item.logo} alt={item.name} className="h-[90px] w-[90px] rounded-[20px] border border-slate-100 bg-white object-cover shadow-sm sm:h-20 sm:w-20 sm:rounded-xl lg:h-24 lg:w-24" />
    </div>
    <div className="mt-2 flex min-w-0 flex-1 flex-col items-center text-center sm:mt-0 sm:ml-4 sm:items-start sm:text-left">
      <h4 className={RESOURCE_TITLE_CLASS}>{item.name}</h4>
      <div className="mb-1.5 hidden w-full flex-wrap items-center gap-1.5 sm:flex">
        <span className={CATEGORY_BADGE_CLASS}>{item.category}</span>
      </div>
      <p className={RESOURCE_DESC_CLASS}>{item.description}</p>
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
              className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-slate-500 hover:text-[#1877F2] transition-colors duration-300"
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
