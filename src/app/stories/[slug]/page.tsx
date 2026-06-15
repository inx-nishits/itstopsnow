"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Share2, User, Calendar, Clock, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { STORIES } from "../page";

export default function StoryDetail({ params }: { params: { slug: string } }) {
  const story = STORIES.find(s => s.id.toString() === params.slug) || STORIES[0];
  
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const paragraphs = story.fullContent.split("\n\n");

  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-[#1877F2]" 
          initial={{ width: "0%" }}
          animate={{ width: "65%" }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* 2. HERO BANNER */}
      <section className="relative w-full pt-40 pb-20 bg-[#050B14] flex flex-col justify-end overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#1877F2]/10 rounded-full blur-[150px] pointer-events-none" />
          <img 
            src={story.image} 
            alt="Story background" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-20 mask-image-to-b"
          />
        </div>

        <div className="container relative z-10 max-w-[1000px] mx-auto px-4 md:px-8">
          <Link href="/stories" className="inline-flex items-center text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-12 transition-colors">
            <ArrowRight className="w-3 h-3 mr-3 rotate-180" /> Back to Stories
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="bg-[#1877F2]/20 border border-[#1877F2]/50 text-[#1877F2] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(24,119,242,0.15)]">
              <span className="w-1.5 h-1.5 bg-[#1877F2] rounded-full animate-pulse"></span> LIVED EXPERIENCE
            </span>
            <span className="text-[#1877F2] bg-[#1877F2]/10 border border-[#1877F2]/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3" /> {story.date}</span>
            <span className="text-slate-400 border border-white/10 bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Clock className="w-3 h-3" /> {story.readTime.toUpperCase()}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-12 uppercase tracking-tight font-sans">
            {story.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/10 pt-8 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#020611] border border-white/10 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[#1877F2] font-black text-sm">IS</span>
              </div>
              <div>
                <div className="text-white font-bold text-xs uppercase tracking-[0.1em] mb-1">{story.author}</div>
                <div className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest">{story.type}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTENT & SIDEBAR */}
      <section className="py-24 bg-[#020611] relative">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px] flex flex-col lg:flex-row gap-16 relative z-10">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#050A14] group">
              <img 
                src={story.image} 
                alt={story.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
            </div>

            <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-400 prose-headings:text-white prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[#1877F2] hover:prose-a:text-blue-400 prose-strong:text-white">
              <p className="lead text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-10 border-l-2 border-[#1877F2] pl-6 bg-white/5 py-4 pr-6 rounded-r-xl">
                {story.excerpt}
              </p>

              {paragraphs.map((para, idx) => {
                // Don't render the duplicate excerpt paragraph which is the first one
                if (idx === 0) return null;
                
                // Add a pull-quote/styling block midway to break up content beautifully
                if (idx === 2) {
                  return (
                    <div key={idx} className="my-12 p-8 bg-white/5 border-l-4 border-[#1877F2] rounded-r-xl">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#1877F2] mb-4 opacity-50 fill-current" aria-hidden="true">
                        <path d="M11.19 10.43c0 2.2-1.29 3.44-2.53 4.41C7.4 15.82 6.5 17 6.5 19H5c0-2.42 1.34-3.88 2.5-4.79 1.05-.82 1.69-1.67 1.69-2.78H5V5h6.19v5.43zm9.81 0c0 2.2-1.29 3.44-2.53 4.41-1.26.98-2.16 2.16-2.16 4.16h-1.5c0-2.42 1.34-3.88 2.5-4.79 1.05-.82 1.69-1.67 1.69-2.78H16V5h6.19v5.43z"/>
                      </svg>
                      <h3 className="text-xl font-bold text-white leading-snug">
                        "I was treated like a criminal by the very system I dedicated my life to protect."
                      </h3>
                    </div>
                  );
                }
                return <p key={idx} className="mb-6 leading-relaxed text-slate-300">{para}</p>;
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-16 pt-10 border-t border-white/10">
              <span className="bg-white/5 border border-white/10 text-slate-400 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-white/10 hover:text-white transition-colors">{story.tag}</span>
              <span className="bg-white/5 border border-white/10 text-slate-400 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-white/10 hover:text-white transition-colors">#PoliceWellbeing</span>
              <span className="bg-white/5 border border-white/10 text-slate-400 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-white/10 hover:text-white transition-colors">#ItStopsNow</span>
            </div>

            {/* Related Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 border-t border-white/10 pt-10">
              <Link href="/stories" className="flex flex-col group p-6 border border-white/5 bg-[#050B14] hover:border-[#1877F2]/30 rounded-2xl transition-all">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center"><ChevronRight className="w-4 h-4 mr-1 rotate-180 text-[#1877F2]" /> PREVIOUS STORY</span>
                <span className="font-bold text-sm text-white group-hover:text-[#1877F2] leading-snug uppercase tracking-wide">The Psychological Impact of IOPC Delays</span>
              </Link>
              <Link href="/stories" className="flex flex-col sm:items-end sm:text-right group p-6 border border-white/5 bg-[#050B14] hover:border-[#1877F2]/30 rounded-2xl transition-all">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center">NEXT STORY <ChevronRight className="w-4 h-4 ml-1 text-[#1877F2]" /></span>
                <span className="font-bold text-sm text-white group-hover:text-[#1877F2] leading-snug uppercase tracking-wide">How Prolonged Misconduct Inquiries Decimate Welfare</span>
              </Link>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              
              {/* Call to Action */}
              <div className="bg-gradient-to-br from-[#1877F2]/20 to-[#050B14] border border-[#1877F2]/30 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1541872511475-cb56767676f6?auto=format&fit=crop&q=80&w=600')] bg-cover opacity-10 mask-image-to-r pointer-events-none" />
                <div className="relative z-10">
                  <h4 className="font-sans text-2xl font-bold uppercase tracking-tight mb-4 text-white">YOUR STORY COULD SAVE A LIFE</h4>
                  <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                    Every shared experience breaks the stigma, holds the system accountable, and forces police leadership to acknowledge the human cost of failures.
                  </p>
                  <Link href="/stories/submit" className="block w-full">
                    <Button className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] py-6 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all">
                      Share Your Story
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Share */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#1877F2] mb-4 flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5" /> Share This Story
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white font-bold uppercase text-[9px] tracking-widest py-4 rounded-xl transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg> Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(story.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 hover:bg-white hover:text-black hover:border-white font-bold uppercase text-[9px] tracking-widest py-4 rounded-xl transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.97H5.078z"></path></svg> Twitter / X
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(story.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white font-bold uppercase text-[9px] tracking-widest py-4 rounded-xl transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg> LinkedIn
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(story.title)}&body=Check out this story: ${encodeURIComponent(shareUrl)}`}
                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 hover:bg-white/15 hover:text-white font-bold uppercase text-[9px] tracking-widest py-4 rounded-xl transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
