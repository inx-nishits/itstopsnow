"use client";

import { motion } from "framer-motion";
import { Search, Filter, Calendar, Share2, ArrowRight, BookOpen, Clock, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function NewsDetail({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-white font-sans">
      
      {/* 1. HERO BANNER */}
      <section className="relative w-full pt-40 pb-20 bg-[#050B14] flex flex-col justify-end overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#1877F2]/10 rounded-full blur-[150px] pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920" 
            alt="Parliament background" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-10 mask-image-to-b"
          />
        </div>

        <div className="container relative z-10 max-w-[1000px] mx-auto px-4 md:px-8">
          <Link href="/news" className="inline-flex items-center text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-12 transition-colors">
            <ArrowRight className="w-3 h-3 mr-3 rotate-180" /> Back to News
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="bg-red-600/20 border border-red-500/50 text-red-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> BREAKING
            </span>
            <span className="text-[#1877F2] bg-[#1877F2]/10 border border-[#1877F2]/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3" /> OCT 15, 2024</span>
            <span className="text-slate-400 border border-white/10 bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Clock className="w-3 h-3" /> 5 MIN READ</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-12 uppercase tracking-tight font-sans">
            New independent report exposes systemic delays in misconduct cases.
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/10 pt-8 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#020611] border border-white/10 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[#1877F2] font-black text-sm">IS</span>
              </div>
              <div>
                <div className="text-white font-bold text-xs uppercase tracking-[0.1em] mb-1">It Stops Now Campaign Team</div>
                <div className="text-[#1877F2] text-[10px] font-bold uppercase tracking-widest">Press Release</div>
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
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-400 prose-headings:text-white prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[#1877F2] hover:prose-a:text-blue-400 prose-strong:text-white">
              <p className="lead text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-10 border-l-2 border-[#1877F2] pl-6 bg-white/5 py-4 pr-6 rounded-r-xl">
                A devastating new independent report has confirmed what the police family has known for years: the system designed to investigate police misconduct is fundamentally broken, causing irreversible harm to officers and their families.
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
              <Link href="#" className="flex flex-col group p-6 border border-white/5 bg-[#050B14] hover:border-[#1877F2]/30 rounded-2xl transition-all">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center"><ArrowRight className="w-3 h-3 mr-2 rotate-180 text-[#1877F2]" /> PREVIOUS ARTICLE</span>
                <span className="font-sans font-bold text-lg text-white group-hover:text-[#1877F2] transition-colors line-clamp-2 uppercase tracking-tight">Meeting with the Home Secretary to discuss reform</span>
              </Link>
              <Link href="#" className="flex flex-col sm:items-end sm:text-right group p-6 border border-white/5 bg-[#050B14] hover:border-[#1877F2]/30 rounded-2xl transition-all">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center sm:justify-end">NEXT ARTICLE <ArrowRight className="w-3 h-3 ml-2 text-[#1877F2]" /></span>
                <span className="font-sans font-bold text-lg text-white group-hover:text-[#1877F2] transition-colors line-clamp-2 uppercase tracking-tight">New Mental Health Support App Launched for Officers</span>
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
                  <h4 className="font-sans text-2xl font-bold uppercase tracking-tight mb-4 text-white">TAKE ACTION TODAY</h4>
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

              {/* Related Research */}
              <div className="bg-[#050B14] border border-white/10 rounded-3xl p-8 shadow-xl">
                <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#1877F2] mb-8 flex items-center border-b border-white/10 pb-4"><BookOpen className="w-4 h-4 mr-3" /> RELEVANT RESEARCH</h4>
                <div className="space-y-6">
                  <Link href="/research" className="group flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1877F2]/10 group-hover:border-[#1877F2]/30 transition-colors">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#1877F2]" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-white group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-2 uppercase tracking-wide">Psychological Impact of Misconduct Procedures</h5>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2 block">PDF • 2.4 MB</span>
                    </div>
                  </Link>
                  <div className="w-full h-px bg-white/5"></div>
                  <Link href="/research" className="group flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1877F2]/10 group-hover:border-[#1877F2]/30 transition-colors">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#1877F2]" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-white group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-2 uppercase tracking-wide">Police Suicide Rates: A Decadal Review</h5>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2 block">PDF • 1.1 MB</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Share */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white font-bold uppercase text-[10px] tracking-widest py-6 rounded-xl transition-all">Share on X</Button>
                <Button variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white font-bold uppercase text-[10px] tracking-widest py-6 rounded-xl transition-all">LinkedIn</Button>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
