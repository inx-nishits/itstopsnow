"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, Share2, ArrowRight, Clock, Tag, ChevronRight,
  Mail 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LATEST_NEWS } from "../page";

export default function NewsDetail({ params }: { params: { slug: string } }) {
  const article = LATEST_NEWS.find(a => a.id.toString() === params.slug) || LATEST_NEWS[1];

  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. HERO BANNER */}
      <section className="relative w-full pt-40 pb-20 bg-[#050B14] flex flex-col justify-end overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#1877F2]/10 rounded-full blur-[150px] pointer-events-none" />
          <img 
            src={article.image || "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920"} 
            alt="Parliament background" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-10 mask-image-to-b"
          />
        </div>

        <div className="container relative z-10 max-w-[1000px] mx-auto px-4 md:px-8">
          <Link href="/news" className="inline-flex items-center text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-12 transition-colors">
            <ArrowRight className="w-3 h-3 mr-3 rotate-180" /> Back to News
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="bg-[#1877F2]/20 border border-[#1877F2]/50 text-[#1877F2] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(24,119,242,0.15)]">
              <span className="w-1.5 h-1.5 bg-[#1877F2] rounded-full animate-pulse"></span> FEATURED
            </span>
            <span className="text-[#1877F2] bg-[#1877F2]/10 border border-[#1877F2]/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3" /> {article.date}</span>
            <span className="text-slate-400 border border-white/10 bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Clock className="w-3 h-3" /> {article.readTime.toUpperCase()}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-12 uppercase tracking-tight font-sans">
            {article.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/10 pt-8 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#020611] border border-white/10 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[#1877F2] font-black text-sm">IS</span>
              </div>
              <div>
                <div className="text-white font-bold text-xs uppercase tracking-[0.1em] mb-1">It Stops Now Campaign Team</div>
                <div className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest">{article.type}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10 h-10 w-10 p-0 rounded-full transition-colors">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT & SIDEBAR */}
      <section className="py-24 bg-[#020611] relative">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px] flex flex-col lg:flex-row gap-16 relative z-10">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#050A14] group">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
            </div>

            <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-400 prose-headings:text-white prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[#1877F2] hover:prose-a:text-blue-400 prose-strong:text-white">
              <p className="lead text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-10 border-l-2 border-[#1877F2] pl-6 bg-white/5 py-4 pr-6 rounded-r-xl">
                {article.excerpt}
              </p>

              <p>
                The report, commissioned by independent policing bodies, analyzed data from over 500 cases over the last five years. It found that the average length of an IOPC investigation into gross misconduct is now exceeding 4 years.
              </p>

              <h2 className="mt-16 mb-8 text-3xl">The Human Cost is Too High</h2>

              <p>
                Perhaps the most shocking revelation in the report is the correlation between investigation length and officer mental health crises. The data shows a direct link between investigations lasting longer than 12 months and clinical diagnoses of PTSD, severe depression, and suicidal ideation.
              </p>

              <p>
                "We are seeing highly trained, dedicated officers broken not by the horrors of the job, but by the bureaucratic cruelty of a system that treats them as guilty until proven innocent," said Paul Cooper, founder of It Stops Now.
              </p>

              {/* Embedded Newsletter Form */}
              <div className="my-16 p-10 bg-gradient-to-br from-[#050B14] to-[#020611] border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1877F2]/10 rounded-bl-full pointer-events-none group-hover:bg-[#1877F2]/20 transition-colors" />
                <h3 className="font-sans text-2xl font-bold uppercase tracking-tight text-white mb-4 relative z-10">Stay Updated on This Campaign</h3>
                <p className="text-sm text-slate-400 mb-8 relative z-10">Subscribe to our weekly roundup to get the latest updates on our fight for a 12-month time limit on investigations.</p>
                <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                  <input type="email" placeholder="YOUR EMAIL ADDRESS" className="flex-grow bg-[#020611] border border-white/10 rounded-xl px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#1877F2]/50 transition-colors" />
                  <Button className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] px-8 py-7 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all sm:py-4">Subscribe</Button>
                </div>
              </div>

              <h2 className="mt-16 mb-8 text-3xl">What Needs to Change?</h2>

              <p>
                The campaign is calling for three immediate reforms based on the report's findings:
              </p>
              <ul className="space-y-4 my-8">
                <li className="bg-white/5 p-4 rounded-xl border border-white/5"><strong className="text-[#1877F2]">A strict 12-month time limit</strong> on all misconduct investigations, after which the case must be closed or brought to tribunal.</li>
                <li className="bg-white/5 p-4 rounded-xl border border-white/5"><strong className="text-[#1877F2]">Mandatory trauma support</strong> provided by external, independent professionals for any officer placed under investigation.</li>
                <li className="bg-white/5 p-4 rounded-xl border border-white/5"><strong className="text-[#1877F2]">Anonymity until conviction</strong> to prevent trial by media and protect families from malicious allegations.</li>
              </ul>
              
              <p>
                You can read the full executive summary of the report by downloading it below.
              </p>

            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-16 pt-10 border-t border-white/10">
              <span className="bg-white/5 border border-white/10 text-slate-400 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"><Tag className="w-3 h-3 text-[#1877F2]" /> Report</span>
              <span className="bg-white/5 border border-white/10 text-slate-400 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"><Tag className="w-3 h-3 text-[#1877F2]" /> IOPC</span>
              <span className="bg-white/5 border border-white/10 text-slate-400 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"><Tag className="w-3 h-3 text-[#1877F2]" /> Campaign</span>
            </div>

            {/* Related News Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 border-t border-white/10 pt-10">
              <Link href="/news" className="flex flex-col group p-6 border border-white/5 bg-[#050B14] hover:border-[#1877F2]/30 rounded-2xl transition-all">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center"><ChevronRight className="w-4 h-4 mr-1 rotate-180 text-[#1877F2]" /> PREVIOUS ARTICLE</span>
                <span className="font-bold text-sm text-white group-hover:text-[#1877F2] leading-snug uppercase tracking-wide">The Psychological Toll of Ongoing Investigations</span>
              </Link>
              <Link href="/news" className="flex flex-col sm:items-end sm:text-right group p-6 border border-white/5 bg-[#050B14] hover:border-[#1877F2]/30 rounded-2xl transition-all">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center">NEXT ARTICLE <ChevronRight className="w-4 h-4 ml-1 text-[#1877F2]" /></span>
                <span className="font-bold text-sm text-white group-hover:text-[#1877F2] leading-snug uppercase tracking-wide">New Bill Proposed to parliament for 12-Month Limit</span>
              </Link>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              
              {/* Call to Action: Take Action */}
              <div className="bg-gradient-to-br from-[#1877F2]/20 to-[#050B14] border border-[#1877F2]/30 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1541872511475-cb56767676f6?auto=format&fit=crop&q=80&w=600')] bg-cover opacity-10 mask-image-to-r pointer-events-none" />
                <div className="relative z-10">
                  <h4 className="font-sans text-2xl font-bold uppercase tracking-tight mb-4 text-white">GET INVOLVED TODAY</h4>
                  <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                    Help us enforce a 12-month time limit on investigations. Contact your local MP in less than 2 minutes using our template letter.
                  </p>
                  <Link href="/take-action" className="block w-full">
                    <Button className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] py-6 rounded-xl shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all">
                      Contact Your MP
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
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 hover:bg-white hover:text-black hover:border-white font-bold uppercase text-[9px] tracking-widest py-4 rounded-xl transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.97H5.078z"></path></svg> Twitter / X
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white font-bold uppercase text-[9px] tracking-widest py-4 rounded-xl transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg> LinkedIn
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(article.title)}&body=Check out this story: ${encodeURIComponent(shareUrl)}`}
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
