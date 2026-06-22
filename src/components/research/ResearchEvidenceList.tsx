"use client";

import Link from "next/link";
import { ArrowRight, Download, Calendar, User, FileText } from "lucide-react";
import type { ResearchItem } from "@/lib/research/types";
import { downloadResearchReport } from "@/lib/research/data";
import { cn } from "@/lib/utils";
import { hybrid } from "@/lib/theme/hybrid";

interface ResearchEvidenceListProps {
  items: ResearchItem[];
}

export default function ResearchEvidenceList({ items }: ResearchEvidenceListProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <div className="flex justify-between items-end border-b border-slate-200 pb-6 mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#010B19]">LATEST RESEARCH</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div key={item.id} className={cn("bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl h-full")}>
            
            {/* Image/banner */}
            <div className="h-48 sm:h-56 relative overflow-hidden bg-slate-100 border-b border-slate-200">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200">
                  <FileText className="w-12 h-12 text-slate-400" />
                </div>
              )}
              
              {/* Featured tag/badge & Category */}
              <div className="absolute top-4 left-4 flex gap-2">
                {item.featured && (
                  <span className="bg-[#1877F2] text-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">
                    Featured
                  </span>
                )}
                <span className="bg-[#010B19]/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/10">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.date}
                  </span>
                </div>
              </div>
              
              {/* Research title */}
              <h3 className="font-sans font-bold text-xl mb-3 leading-snug group-hover:text-[#1877F2] transition-colors uppercase tracking-tight line-clamp-2 text-[#010B19]">
                <Link href={`/research/${item.slug}`} className="before:absolute before:inset-0">
                  {item.title}
                </Link>
              </h3>
              
              {/* Author/institution name */}
              <div className="flex items-start gap-2 mb-4 text-xs font-medium text-slate-600">
                <User className="w-4 h-4 shrink-0 mt-0.5 text-[#1877F2]" />
                <span>
                  {item.author} <br/>
                  <span className="text-slate-400 text-[10px] uppercase tracking-widest">{item.institution}</span>
                </span>
              </div>

              {/* Short summary/excerpt */}
              <p className="text-sm leading-relaxed mb-4 text-slate-600 line-clamp-2">
                {item.summary}
              </p>

              {/* Key findings section */}
              {item.keyFindings && item.keyFindings.length > 0 && (
                <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 flex-grow">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1877F2] mb-2">Key Findings</h4>
                  <ul className="space-y-2">
                    {item.keyFindings.slice(0, 2).map((finding, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="text-[#1877F2] mt-0.5">•</span>
                        <span className="line-clamp-2">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-auto pt-6 border-t border-slate-200 flex items-center justify-between relative z-10">
                {/* Read Reseach Story CTA link */}
                <Link href={`/research/${item.slug}`} className="flex items-center font-bold text-[10px] uppercase tracking-widest text-[#010B19] group-hover:text-[#1877F2] transition-colors">
                  Read Research Story <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); downloadResearchReport(item); }}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-[#1877F2] text-slate-500 hover:text-white transition-colors"
                  aria-label={`Download ${item.title}`}
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
