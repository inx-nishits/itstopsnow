"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageSquare, ChevronRight, Eye, PenTool, Share2, Calendar, User, Tag, ArrowRight, ArrowLeft, Clock, X, Upload, Check, ChevronDown, Sparkles, Shield, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditorialSection, CampaignSection, EditorialStickyBar } from "@/components/layout/PageSection";
import { PageHero } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { simulateSubmit, validateEmail } from "@/lib/mock/utils";
import { Pagination } from "@/components/ui/Pagination";

export const STORIES = [
  { 
    id: 1, 
    type: "SERVING OFFICER", 
    title: "My investigation took 3 years. The allegation was disproven in 10 minutes on CCTV.", 
    excerpt: "I was suspended and stripped of my warrant card. It destroyed my marriage and my mental health...", 
    tag: "#IOPC", 
    date: "OCT 12, 2024",
    readTime: "8 min read",
    author: "Anonymous Serving Officer",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    fullContent: `I joined the police because I wanted to help people. It sounds cliché, but it’s the truth. For 12 years, I put on the uniform, kissed my kids goodbye, and went out into the unknown. I dealt with things most people never see.

Two years ago, I responded to a violent domestic incident. The suspect was armed and aggressive. I used force to detain him. It was textbook, by the book, exactly how we are trained. The suspect made a complaint claiming excessive force.

Within 24 hours, my warrant card was taken. I was placed on restricted duties, forbidden from contacting my team, and told the IOPC would be investigating. They told me it would take a few months.

Those months turned into two years. Two years of silence. Two years of waking up in a cold sweat. I couldn't sleep. My marriage fell apart because I couldn't talk about the case, and I was entirely consumed by the stress of potentially losing my liberty and my pension.

When the letter finally arrived, it was a single paragraph stating there was 'no case to answer'. No apology. No support offered for my return to work. Just a bureaucratic sign-off.

I resigned the next day. The job didn't break me; the way I was treated when I needed protection broke me. It has to stop.`
  },
  { 
    id: 2, 
    type: "FAMILY MEMBER", 
    title: "We watched him fade away while waiting for answers that never came.", 
    excerpt: "The system is broken. My husband dedicated 15 years to the force, but when a malicious complaint was made, he was abandoned...", 
    tag: "#MentalHealth", 
    date: "OCT 05, 2024",
    readTime: "6 min read",
    author: "Wife of a Serving Sergeant",
    image: "https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?auto=format&fit=crop&q=80&w=800",
    fullContent: `For fifteen years, my husband gave everything to the police force. He worked nights, missed birthdays, and carried the weight of the community on his shoulders. He was a good cop. Everyone knew it.

Then, a routine arrest went wrong. A complaint was filed, not out of truth, but out of retaliation. Within days, his badge was gone. He wasn't allowed to speak to his shiftmates—his support network, his second family.

The investigation dragged on month after month. The initial timeline of '90 days' came and went. We heard nothing. No updates, no progress, just silence. He started pulling away from us, sitting in the dark, unable to eat or sleep. The pressure of not knowing whether his pension, his reputation, or his freedom would be taken away crushed him.

We watched a proud, strong man fade into a ghost of himself. When the investigation finally concluded, two full years later, he was cleared of any wrongdoing. But the damage was done. The force didn't support him. He was broken. We need limits, we need transparency, and we need reform before another family goes through this.`
  },
  { 
    id: 3, 
    type: "FORMER OFFICER", 
    title: "I resigned after they dragged out a gross misconduct hearing over a minor error.", 
    excerpt: "Guilty until proven innocent. That is the reality of the modern police disciplinary system...", 
    tag: "#Resignation", 
    date: "SEP 22, 2024",
    readTime: "5 min read",
    author: "Former PC Richard Vance",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    fullContent: `I was a dedicated constable for eight years. I loved the job, the camaraderie, and the chance to make a difference. But one afternoon, in the heat of a fast-moving pursuit, I made a minor administrative omission in my log.

It wasn't malicious, it was a mistake made under high stress. Instead of being pulled in for guidance or minor retraining, it was escalated to gross misconduct. My life was put on hold for eighteen months.

I wasn't suspended, but I was placed on restricted duties, stuck behind a desk doing paperwork, feeling the suspicious glances of colleagues who didn't know the full story. The hearing was rescheduled three times due to IOPC administrative delays.

Eighteen months for a minor logging error. By the time the hearing actually took place, the panel ruled it was simple misconduct and gave me a written warning. The stress of that year and a half, the feeling of betrayal, was too much. I handed in my resignation the next morning. If the system treats its own like disposable commodities, it's not a system worth serving.`
  },
  { 
    id: 4, 
    type: "SERVING OFFICER", 
    title: "Post-incident procedure felt like a criminal interrogation.", 
    excerpt: "I had just been involved in a traumatic incident saving a life. Instead of welfare support, I was treated like a suspect...", 
    tag: "#PIP", 
    date: "SEP 10, 2024",
    readTime: "7 min read",
    author: "Serving Response Constable",
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=800",
    fullContent: `We are trained to deal with crisis, but nothing prepares you for the Post-Incident Procedure (PIP) when things go wrong. Last winter, I was involved in a high-speed response collision while racing to a call of an active stabbing.

The suspect's vehicle was stopped, and I had to make a split-second decision to box them in. We saved the victim, but the impact damaged a nearby parked car and the suspect claimed injury.

When we returned to the station, we were immediately sequestered. No talking to colleagues, no call to my family, just sitting in a locked room. The investigators who arrived didn't ask how I was doing after the crash. They treated me like a suspect under arrest.

For the next ten months, I lived under the shadow of a criminal investigation. My mental health plummeted, and I was diagnosed with occupational PTSD. We need immediate psychological first aid following traumatic incidents, not a system that treats officers as criminals before any facts are gathered.`
  },
  { 
    id: 5, 
    type: "RECOVERY STORY", 
    title: "How I rebuilt my life after being cleared of all charges.", 
    excerpt: "The dark days are behind me, but the anger remains. Here is how I survived the process and found my footing again...", 
    tag: "#Recovery", 
    date: "AUG 30, 2024",
    readTime: "10 min read",
    author: "Former Sgt. Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=800",
    fullContent: `When the IOPC investigation finally ended, and I was completely exonerated of all allegations, everyone expected me to celebrate. They thought I would happily put the uniform back on and return to the streets.

They didn't understand that you can't just switch the trauma off. I spent three years suspended, sitting at home, unable to sleep, watching my life's work be pulled apart in the tabloids.

Rebuilding my life meant walking away from policing entirely. I started counseling, began practicing mindfulness, and eventually set up my own support group for other officers undergoing investigation.

Healing is a slow process, and the anger still flares up when I hear about other constables entering the same meat-grinder. But I have found my footing again. There is life after the police, and by sharing my story, I want others to know they can survive this too.`
  },
  { 
    id: 6, 
    type: "FAMILY MEMBER", 
    title: "The financial ruin of being suspended on restricted duties.", 
    excerpt: "Losing overtime and facing legal bills while waiting for an investigation to conclude almost left us homeless...", 
    tag: "#Financial", 
    date: "AUG 15, 2024",
    readTime: "5 min read",
    author: "Husband of a Suspended Officer",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    fullContent: `My wife has been a response officer for nine years. She loved her shift and worked massive amounts of overtime to help support our three kids and pay our mortgage.

When she was suspended following a malicious complaint during a public order arrest, the police force continued to pay her basic salary. But basic salary doesn't include the overtime we relied on. We lost nearly £1,000 a month in household income overnight.

Worse, the legal cover from the federation didn't cover all the specialized advisory fees we needed to protect her reputation. We had to dip into our savings, then borrow from family, and eventually we were forced to sell our car just to keep up with the mortgage payments.

We spent two years in financial terror, wondering if we would lose our home. She was cleared, but the financial scars will take us a decade to heal. Suspending an officer for years without a swift resolution is a form of financial punishment without a trial.`
  }
];

type StorySort = "newest" | "oldest" | "title-az";

function parseStoryDate(dateStr: string): number {
  const parsed = Date.parse(dateStr);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function StoriesPageContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<StorySort>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", title: "", story: "" });
  const [hasConsent, setHasConsent] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    if (searchParams.get("submit") === "1") {
      setIsSubmitModalOpen(true);
    }
  }, [searchParams]);

  const filters = ["All", "Serving Officer", "Former Officer", "Family Member", "Recovery"];
  
  const filteredStories = STORIES.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.tag.toLowerCase().includes(searchTerm.toLowerCase());
                          
    let matchesType = true;
    if (activeFilter === "Serving Officer") matchesType = story.type === "SERVING OFFICER";
    if (activeFilter === "Former Officer") matchesType = story.type === "FORMER OFFICER";
    if (activeFilter === "Family Member") matchesType = story.type === "FAMILY MEMBER";
    if (activeFilter === "Recovery") matchesType = story.type === "RECOVERY STORY";
    
    return matchesSearch && matchesType;
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === "title-az") {
      return a.title.localeCompare(b.title);
    }
    const dateA = parseStoryDate(a.date);
    const dateB = parseStoryDate(b.date);
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(sortedStories.length / itemsPerPage);
  const paginatedStories = sortedStories.slice(0, currentPage * itemsPerPage);

  // Reset to page 1 when search, filter, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter, sortBy]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      <PageHero
        animate
        eyebrow="STORIES"
        title={
          <>
            <span className="text-white">REAL PEOPLE.</span>
            <br />
            <span className="text-[#1877F2]">
              REAL STORIES.
            </span>
          </>
        }
        description={
          <div className="flex flex-col gap-6">
            <span>Behind every statistic is a human being. Read the raw, unfiltered experiences of police officers and their families navigating a broken system.</span>
            <span className="text-[#1877F2] font-bold">It Stops Now.</span>
          </div>
        }
        imageSrc="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1920"
        imageAlt="People stories"
      />

      {/* Featured Story Section removed to match specifications */}

      {/* 3. FILTERS & SEARCH */}
      <EditorialStickyBar className="bg-[#f4f5f7] border-b border-slate-200 !py-4 sm:!py-5">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 lg:gap-8">
            
            <div className="flex items-center justify-between w-full lg:w-auto">
              <h2 className="font-sans text-xl md:text-2xl font-bold uppercase tracking-tight text-[#010B19]">BROWSE STORIES</h2>
              {/* Mobile Filter Toggle */}
              <button 
                type="button"
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md bg-white text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#010B19] shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Filter
              </button>
            </div>

            {/* Desktop Filters (Hidden on Mobile unless toggled) */}
            <div className={cn(
              "lg:flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide",
              sortDropdownOpen ? "flex" : "hidden"
            )}>
              {filters.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-4 py-2.5 rounded text-[10px] sm:text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 border",
                    activeFilter === f 
                      ? "bg-[#1877F2] text-white border-[#1877F2]" 
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  )}
                >
                  {f === "All" && <div className={cn("w-3 h-3 rounded-sm", activeFilter === f ? "bg-white/30" : "bg-slate-200")} />}
                  {f === "Serving Officer" && <User className="w-3 h-3" />}
                  {f === "Family Member" && <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                  {f === "Former Officer" && <User className="w-3 h-3" />}
                  {f === "Recovery" && <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75" /></svg>}
                  {f === "All" ? "All Stories" : `${f} Stories`}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-72 shrink-0">
              <input 
                type="text" 
                placeholder="Search stories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 text-sm rounded bg-white border border-slate-200 shadow-sm focus:outline-none focus:border-[#1877F2]/50 transition-colors text-slate-800" 
              />
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </EditorialStickyBar>

      {/* 4. STORY GRID */}
      <section className="w-full bg-[#f4f5f7] pt-8 pb-16 sm:pb-20 lg:pb-32">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          {sortedStories.length === 0 ? (
            <div className="text-center py-10 lg:py-20 rounded-xl bg-white border border-slate-200">
              <Search className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p className="font-bold uppercase tracking-widest text-sm text-slate-400">No stories found matching your search.</p>
              <button onClick={() => { setSearchTerm(""); setActiveFilter("All"); }} className="mt-4 text-[#1877F2] hover:text-[#010B19] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
                {paginatedStories.map((story) => (
                  <div key={story.id} className="flex flex-col h-full">
                    <Link href={`/stories/${story.id}`} className="group relative flex flex-row lg:flex-col gap-0 h-full bg-[#050A14] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer">
                      {/* Image Container */}
                      <div className="relative w-[35%] sm:w-2/5 lg:w-full min-h-[160px] lg:h-48 shrink-0 overflow-hidden bg-slate-800">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="absolute inset-0 w-full h-full object-cover object-top grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050A14] lg:bg-gradient-to-t lg:from-[#050A14] lg:via-[#050A14]/40 lg:to-transparent block" />
                      </div>

                      {/* Content Container */}
                      <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-10 w-[65%] sm:w-3/5 lg:w-full">
                        
                        <span className="text-[8px] sm:text-[9px] font-bold text-white bg-[#1877F2] px-1.5 py-0.5 rounded-sm tracking-wider uppercase shadow-md w-fit mb-2">
                          {story.type}
                        </span>

                        <h3 className="font-sans font-bold text-sm sm:text-base text-white mb-2 leading-tight group-hover:text-[#1877F2] transition-colors line-clamp-2">
                          {story.title}
                        </h3>
                        
                        <p className="text-[11px] sm:text-[13px] text-slate-300 leading-snug mb-3 flex-grow line-clamp-2 sm:line-clamp-3 pr-2 lg:pr-0">
                          {story.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-3 text-[9px] sm:text-[10px] font-medium text-slate-400 mt-auto">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {story.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {story.readTime}
                          </span>
                        </div>

                        <div className="mt-4 text-xs font-bold text-[#1877F2] group-hover:text-blue-400 transition-colors hidden lg:flex items-center gap-1 w-fit">
                          Read Story <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </div>

                        <div className="absolute right-3 bottom-3 lg:hidden">
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* View More Button */}
              {paginatedStories.length < sortedStories.length && (
                <div className="mt-8 lg:mt-12 flex justify-center">
                  <button 
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="w-auto text-[#1877F2] bg-transparent lg:bg-[#1877F2] lg:text-white hover:text-blue-700 lg:hover:bg-blue-600 font-bold uppercase tracking-widest text-xs px-6 py-4 lg:px-12 lg:py-4 rounded-full transition-all flex items-center justify-center gap-2 underline lg:no-underline underline-offset-4"
                  >
                    VIEW MORE STORIES <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="bg-[#f4f5f7] pb-16 sm:pb-20 lg:pb-32 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="relative w-full rounded-[2rem] overflow-hidden bg-[#050A14] shadow-none sm:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 group">
             
             {/* Abstract Background Elements */}
             <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-[#1877F2] rounded-full mix-blend-screen filter blur-[120px] opacity-30 group-hover:opacity-40 transition-opacity duration-1000" />
             <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
             
             {/* Grid overlay for texture */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />

             <div className="relative p-6 sm:p-8 lg:p-16 xl:p-20 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-20">
               {/* Left Content */}
               <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left z-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 shadow-[0_0_15px_rgba(24,119,242,0.15)]">
                   <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                   Join the Community
                 </div>
                 <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 sm:mb-6">
                   Your story has the power to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-300">save a life.</span>
                 </h2>
                 <p className="text-slate-300 text-sm sm:text-base lg:text-xl leading-relaxed max-w-xl mb-6 sm:mb-10">
                   By sharing your experience, you could help someone else feel less alone and give them the courage to seek the support they need.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                   <Button onClick={() => setIsSubmitModalOpen(true)} className="relative overflow-hidden group/btn bg-[#1877F2] hover:bg-blue-600 text-white font-bold text-sm lg:text-base px-6 py-5 sm:px-8 sm:py-7 rounded-full shadow-[0_0_40px_rgba(24,119,242,0.4)] hover:shadow-[0_0_60px_rgba(24,119,242,0.6)] transition-all flex justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto">
                     <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider">Share Your Story <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" /></span>
                     <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                   </Button>
                   <Link href="/about" className="group flex items-center gap-2 sm:gap-3 text-slate-300 hover:text-white transition-colors">
                     <div className="w-10 h-10 rounded-full border border-slate-600 group-hover:border-[#1877F2] flex items-center justify-center transition-colors shrink-0">
                       <Shield className="w-4 h-4 group-hover:text-[#1877F2]" />
                     </div>
                     <span className="text-sm font-medium border-b border-transparent group-hover:border-white transition-colors">
                       Learn how we protect your privacy
                     </span>
                   </Link>
                 </div>
               </div>

               {/* Right Testimonial */}
               <div className="w-full lg:w-1/2 relative z-10 mt-6 sm:mt-8 lg:mt-0 max-w-lg mx-auto lg:mx-0">
                 <div className="relative z-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                   <Quote className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 w-10 h-10 sm:w-12 sm:h-12 text-[#1877F2] opacity-50" />
                   <p className="text-sm sm:text-base sm:text-lg lg:text-xl text-white font-medium leading-relaxed mb-6 sm:mb-8 relative z-10 font-serif italic">
                     "The bravest thing I ever did was speak out. It felt like a massive weight was lifted, and knowing it helped others gave me purpose."
                   </p>
                   <div className="flex items-center gap-3 sm:gap-4">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1877F2] to-blue-400 flex items-center justify-center p-[2px]">
                       <div className="w-full h-full rounded-full bg-[#050A14] flex items-center justify-center">
                         <User className="w-5 h-5 text-blue-300" />
                       </div>
                     </div>
                     <div>
                       <div className="text-white font-bold text-sm">Serving Officer</div>
                       <div className="text-[#1877F2] text-[10px] font-bold uppercase tracking-wider mt-0.5">Shared Anonymously</div>
                     </div>
                   </div>
                 </div>
                 {/* Decorative background card */}
                 <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl transform lg:-rotate-3 -z-10 mt-4 ml-4" />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* STORY SUBMISSION MODAL */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsSubmitModalOpen(false)} 
              className="absolute inset-0 bg-[#020611]/95 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-2xl bg-[#050A14] border border-white/10 rounded-3xl overflow-hidden flex flex-col z-10 shadow-2xl max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#02050A]">
                <div>
                  <h3 className="text-white font-bold tracking-widest uppercase text-lg">
                    {isSuccess ? 'STORY SUBMITTED' : 'Submit Your Story'}
                  </h3>
                  {!isSuccess && <p className="text-slate-400 text-xs">Share your experience to help drive change.</p>}
                </div>
                <button onClick={() => { setIsSubmitModalOpen(false); setTimeout(() => setIsSuccess(false), 300); }} className="min-w-[48px] min-h-[48px] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {isSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                  <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold uppercase tracking-tight text-white mb-4">Thank You</h4>
                  <p className="text-slate-400 max-w-md mx-auto mb-8">
                    Your story has been securely submitted. Our team will review it shortly. Your courage in sharing your experience helps drive real change.
                  </p>
                  <Button onClick={() => { setIsSubmitModalOpen(false); setTimeout(() => setIsSuccess(false), 300); }} className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs px-8 py-5 rounded-full">
                    Close Window
                  </Button>
                </div>
              ) : (
              <>
              <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6">
                
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        disabled={isAnonymous}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full bg-[#02050A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2]/50 transition-colors ${isAnonymous ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#02050A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2]/50 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isAnonymous ? 'bg-[#1877F2] border-[#1877F2]' : 'border-white/20 group-hover:border-[#1877F2]/50'}`}>
                      {isAnonymous && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={isAnonymous} 
                      onChange={() => setIsAnonymous(!isAnonymous)}
                    />
                    <span className="text-xs text-slate-300 font-medium group-hover:text-white transition-colors pl-2 py-3">Submit anonymously (name will be hidden)</span>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Story Title</label>
                  <input 
                    type="text" 
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-[#02050A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2]/50 transition-colors"
                    placeholder="E.g., 3 Years of Unnecessary Investigation"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Story</label>
                  <textarea 
                    rows={8}
                    value={form.story}
                    onChange={(e) => setForm({ ...form, story: e.target.value })}
                    className="w-full bg-[#02050A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1877F2]/50 transition-colors resize-none"
                    placeholder="Tell us what happened. Take your time..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload images/documents</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#1877F2]/20 transition-colors">
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#1877F2] transition-colors" />
                    </div>
                    <p className="text-sm font-bold text-white mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500">SVG, PNG, JPG or PDF (max. 10MB)</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={hasConsent} onChange={(e) => setHasConsent(e.target.checked)} className="w-5 h-5 mt-0.5 rounded border-white/20 bg-transparent text-[#1877F2] focus:ring-[#1877F2]/50 cursor-pointer" />
                    <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors pl-2 py-3">
                      I consent to IT STOPS NOW collecting my story and processing my personal data in accordance with the Privacy Policy. I understand my story may be used for campaigning purposes.
                    </span>
                  </label>
                </div>

              </div>

              {submitError && (
                <p className="px-6 pb-2 text-red-400 text-xs" role="alert">{submitError}</p>
              )}

              <div className="p-6 bg-[#02050A] border-t border-white/10 flex justify-end gap-4 shrink-0">
                <Button onClick={() => setIsSubmitModalOpen(false)} disabled={isSubmitting} variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 text-xs tracking-widest uppercase font-bold px-6">
                  Cancel
                </Button>
                <Button 
                  onClick={async () => {
                    setSubmitError("");
                    if (!validateEmail(form.email)) {
                      setSubmitError("Please enter a valid email address.");
                      return;
                    }
                    if (!form.title.trim() || form.story.trim().length < 20) {
                      setSubmitError("Please add a title and story (at least 20 characters).");
                      return;
                    }
                    if (!hasConsent) {
                      setSubmitError("Please consent to our privacy policy before submitting.");
                      return;
                    }
                    setIsSubmitting(true);
                    await simulateSubmit();
                    setIsSubmitting(false);
                    setIsSuccess(true);
                  }}
                  disabled={isSubmitting} 
                  className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs px-8 py-5 rounded-full shadow-[0_0_20px_rgba(24,119,242,0.3)]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Story"}
                </Button>
              </div>
              </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function StoriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans text-slate-500">Loading stories…</div>}>
      <StoriesPageContent />
    </Suspense>
  );
}

