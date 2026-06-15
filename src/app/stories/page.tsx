"use client";

import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, ChevronRight, Eye, PenTool, Share2, Calendar, User, Tag, ArrowRight, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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

  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const paginatedStories = filteredStories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#050A14] pt-32 pb-32 lg:pt-40 lg:pb-40 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1920" 
            alt="People stories" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] from-[20%] via-[#050A14]/60 via-[60%] to-[#050A14]/20 to-[90%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto relative z-10 flex flex-col items-start gap-12">
          <div className="w-full lg:w-full max-w-[1200px] pt-10">
            <h3 className="text-[#1877F2] font-bold uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <MessageSquare className="w-5 h-5" /> LIVED EXPERIENCES
            </h3>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter uppercase drop-shadow-2xl py-2"
            >
              <span className="text-white">REAL PEOPLE.</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877F2] to-blue-400">REAL STORIES.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg xl:text-xl text-slate-300 mb-10 font-normal leading-relaxed max-w-2xl drop-shadow"
            >
              Behind every statistic is a human being. Read the raw, unfiltered experiences of police officers and their families navigating a broken system.
            </motion.p>

            {/* CTA button removed to match specifications */}
          </div>
        </div>
      </section>

      {/* Featured Story Section removed to match specifications */}

      {/* 3. FILTERS & SEARCH */}
      <section className="bg-[#050B14]/90 backdrop-blur-xl border-b border-white/5 sticky top-20 md:top-24 z-40 shadow-xl py-5">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
              {filters.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                    activeFilter === f 
                      ? "bg-[#1877F2] text-white shadow-[0_0_15px_rgba(24,119,242,0.4)] border border-[#1877F2]" 
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
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
                  className="w-full pl-14 pr-6 py-4 text-[10px] uppercase tracking-widest font-bold bg-[#020611] border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-[#1877F2]/50 transition-colors" 
                />
              </div>
              <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10 h-[48px] px-8 rounded-full flex items-center font-bold text-[10px] uppercase tracking-widest transition-colors">
                <Filter className="w-4 h-4 mr-2" /> Sort
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STORY GRID & COUNTER */}
      <section className="py-24 bg-[#020611]">
        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px]">
          <div className="flex justify-between items-end border-b border-white/10 pb-8 mb-16">
            <h2 className="font-sans text-3xl font-bold uppercase tracking-tight text-white">LATEST STORIES</h2>
            <div className="text-[10px] font-bold text-[#1877F2] uppercase tracking-[0.2em]">Showing {filteredStories.length} stories</div>
          </div>

          {filteredStories.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-bold uppercase tracking-widest text-sm">No stories found matching your search.</p>
              <button onClick={() => { setSearchTerm(""); setActiveFilter("All"); }} className="mt-4 text-[#1877F2] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedStories.map((story) => (
                <div key={story.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-[#1877F2]/50 transition-all duration-300 group hover:-translate-y-2 relative flex flex-col h-full shadow-xl">
                  {/* Featured Image */}
                  <div className="h-52 w-full relative overflow-hidden bg-[#02050A] border-b border-white/5">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                      <span className="text-[9px] font-bold text-[#1877F2] uppercase tracking-[0.2em] bg-[#1877F2]/10 px-3 py-1.5 rounded-full border border-[#1877F2]/20">
                        {story.type}
                      </span>
                      <div className="flex items-center gap-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {story.date}
                        </span>
                        <span className="flex items-center gap-1 text-[#1877F2]">
                          <Clock className="w-3 h-3" /> {story.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-sans font-bold text-xl text-white mb-4 leading-snug group-hover:text-[#1877F2] transition-colors uppercase tracking-tight line-clamp-2">
                      {story.title}
                    </h3>
                    
                    <p className="text-slate-400 text-xs leading-relaxed mb-8 flex-grow line-clamp-3">
                      {story.excerpt}
                    </p>
                    
                    <Link href={`/stories/${story.id}`} className="mt-auto pt-6 border-t border-white/10 flex items-center text-white font-bold text-[10px] uppercase tracking-widest group-hover:text-[#1877F2] transition-colors">
                      Read Story <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-24 pt-10 border-t border-white/10">
              <Button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline" 
                className={`w-12 h-12 p-0 rounded-full border-white/10 ${currentPage === 1 ? 'bg-white/5 text-slate-500 opacity-50 cursor-not-allowed' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-colors'}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <Button 
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-12 h-12 p-0 rounded-full font-bold text-sm transition-colors ${
                    currentPage === idx + 1 
                      ? 'bg-[#1877F2] text-white shadow-[0_0_20px_rgba(24,119,242,0.3)]' 
                      : 'border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {idx + 1}
                </Button>
              ))}

              <Button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                variant="outline" 
                className={`w-12 h-12 p-0 rounded-full border-white/10 ${currentPage === totalPages ? 'bg-white/5 text-slate-500 opacity-50 cursor-not-allowed' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-colors'}`}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="relative w-full py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541872511475-cb56767676f6?auto=format&fit=crop&q=80&w=1920" 
            alt="Advocacy support background" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/80 to-[#020611]" />
        </div>

        <div className="w-full px-6 lg:px-16 mx-auto max-w-[1600px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-1/2 flex flex-col items-start gap-6 text-left">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#1877F2]">YOU ARE NOT ALONE</h2>
            <h3 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">YOUR VOICE COULD SAVE A LIFE</h3>
            <p className="text-slate-300 text-base leading-relaxed max-w-xl">
              By sharing your story, you help break the stigma, hold the system accountable, and show others they are not alone.
            </p>
            <div className="mt-4">
              <Link href="/stories/submit">
                <Button className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] px-10 py-6 rounded-full shadow-[0_0_30px_rgba(24,119,242,0.3)] transition-all hover:-translate-y-1">
                  Share Your Story Today
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            {/* Supportive Quote Block */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 relative overflow-hidden shadow-2xl group">
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
      </section>

    </div>
  );
}
