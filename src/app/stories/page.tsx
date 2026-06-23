"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageSquare, ChevronRight, Eye, PenTool, Share2, Calendar, User, Tag, ArrowRight, ArrowLeft, Clock, X, Upload, Check } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
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
  const paginatedStories = sortedStories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when search, filter, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter, sortBy]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      <PageHero
        animate
        eyebrow={
          <>
            <MessageSquare className="w-5 h-5 shrink-0" /> LIVED EXPERIENCES
          </>
        }
        title={
          <>
            <span className="text-white">REAL PEOPLE.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">
              REAL STORIES.
            </span>
          </>
        }
        description="Behind every statistic is a human being. Read the raw, unfiltered experiences of police officers and their families navigating a broken system."
        imageSrc="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1920"
        imageAlt="People stories"
      />

      {/* Featured Story Section removed to match specifications */}

      {/* 3. FILTERS & SEARCH */}
      <EditorialStickyBar>
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
              {filters.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors",
                    activeFilter === f ? hybrid.editorialChipActive : hybrid.editorialChip
                  )}
                >
                  {f === "All" ? "All Stories" : f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-grow lg:w-80">
                <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="SEARCH STORIES..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn("w-full pl-14 pr-6 py-4 text-[10px] uppercase tracking-widest font-bold rounded-full focus:outline-none transition-colors", hybrid.editorialInput)} 
                />
              </div>
              <label className="sr-only" htmlFor="stories-sort">Sort stories</label>
              <select
                id="stories-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as StorySort)}
                className={cn("h-[48px] px-4 pr-10 rounded-full font-bold text-[10px] uppercase tracking-widest transition-colors appearance-none cursor-pointer", hybrid.editorialChip)}
                aria-label="Sort stories"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-az">Title A–Z</option>
              </select>
            </div>
          </div>
        </div>
      </EditorialStickyBar>

      {/* 4. STORY GRID & COUNTER */}
      <EditorialSection>
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b pb-8 mb-10 sm:mb-16", hybrid.editorialBorder)}>
            <h2 className={cn("font-sans text-3xl font-bold uppercase tracking-tight", hybrid.editorialHeading)}>LATEST STORIES</h2>
            <div className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em]">Showing {sortedStories.length} stories</div>
          </div>

          {sortedStories.length === 0 ? (
            <div className={cn("text-center py-10 lg:py-20 rounded-3xl", hybrid.editorialCard)}>
              <Search className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p className={cn("font-bold uppercase tracking-widest text-sm", hybrid.editorialMuted)}>No stories found matching your search.</p>
              <button onClick={() => { setSearchTerm(""); setActiveFilter("All"); }} className="mt-4 text-[#1877F2] hover:text-[#010B19] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedStories.map((story) => (
                <div key={story.id} className={cn(hybrid.editorialCard, hybrid.editorialCardHover, "overflow-hidden group hover:-translate-y-2 relative flex flex-col h-full")}>
                  <div className={cn("h-64 w-full relative overflow-hidden bg-slate-100 border-b", hybrid.editorialBorder)}>
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  <div className="p-5 sm:p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                      <span className="text-[9px] font-bold text-[#1877F2] uppercase tracking-[0.2em] bg-[#1877F2]/10 px-3 py-1.5 rounded-full border border-[#1877F2]/20">
                        {story.type}
                      </span>
                      <div className={cn("flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest", hybrid.editorialMuted)}>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {story.date}
                        </span>
                        <span className="flex items-center gap-1 text-[#1877F2]">
                          <Clock className="w-3 h-3" /> {story.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className={cn("font-sans font-bold text-xl mb-4 leading-snug group-hover:text-[#1877F2] transition-colors uppercase tracking-tight line-clamp-2", hybrid.editorialHeading)}>
                      {story.title}
                    </h3>
                    
                    <p className={cn("text-xs leading-relaxed mb-8 flex-grow line-clamp-3", hybrid.editorialBody)}>
                      {story.excerpt}
                    </p>
                    
                    <Link href={`/stories/${story.id}`} className={cn("mt-auto pt-6 border-t flex items-center font-bold text-[10px] uppercase tracking-widest group-hover:text-[#1877F2] transition-colors", hybrid.editorialBorder, hybrid.editorialHeading)}>
                      Read Story <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, totalPages)}
            onPageChange={setCurrentPage}
            className={cn("mt-8 lg:mt-16 pt-10 border-t", hybrid.editorialBorder)}
          />
        </div>
      </EditorialSection>

      {/* 6. CALL TO ACTION BANNER */}
      <CampaignSection className="relative overflow-hidden" noPadding>
        <div className="relative w-full py-12 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1920" 
            alt="Supportive community background" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020611] via-[#020611]/70 to-[#020611]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-transparent to-[#020611]" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="lg:w-1/2 flex flex-col items-start gap-6 text-left">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2]">YOU ARE NOT ALONE</h2>
            <h3 className="font-sans text-3xl max-sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">YOUR VOICE COULD SAVE A LIFE</h3>
            <p className="text-slate-300 text-base leading-relaxed max-w-xl">
              By sharing your story, you help break the stigma, hold the system accountable, and show others they are not alone.
            </p>
            <div className="mt-4">
              <Button onClick={() => setIsSubmitModalOpen(true)} className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] px-10 py-6 rounded-full shadow-[0_0_30px_rgba(24,119,242,0.3)] transition-all hover:-translate-y-1">
                Share Your Story Today
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            {/* Supportive Quote Block */}
            <div className={cn(hybrid.campaignCard, "p-6 md:p-10 relative overflow-hidden shadow-2xl group")}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1877F2]/10 rounded-bl-full pointer-events-none" />
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#1877F2] opacity-30 mb-6 fill-current" aria-hidden="true">
                <path d="M11.19 10.43c0 2.2-1.29 3.44-2.53 4.41C7.4 15.82 6.5 17 6.5 19H5c0-2.42 1.34-3.88 2.5-4.79 1.05-.82 1.69-1.67 1.69-2.78H5V5h6.19v5.43zm9.81 0c0 2.2-1.29 3.44-2.53 4.41-1.26.98-2.16 2.16-2.16 4.16h-1.5c0-2.42 1.34-3.88 2.5-4.79 1.05-.82 1.69-1.67 1.69-2.78H16V5h6.19v5.43z"/>
              </svg>
              <p className="font-serif italic text-slate-300 leading-relaxed text-lg mb-6">
                "Every number is a life left behind. Your story has the power to change policing forever."
              </p>
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">IT STOPS NOW</span>
                <span className="text-[#1877F2] text-[9px] font-bold uppercase tracking-[0.2em] bg-[#1877F2]/10 px-3 py-1 rounded-full border border-[#1877F2]/20">SUPPORT STRAPLINE</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </CampaignSection>

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
