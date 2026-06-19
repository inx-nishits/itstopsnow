"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import type { ResearchItem } from "@/lib/research/types";
import { downloadResearchReport } from "@/lib/research/data";

interface ResearchFeaturedPublicationProps {
  publication: ResearchItem;
  onViewReport: (item: ResearchItem) => void;
}

export default function ResearchFeaturedPublication({
  publication,
  onViewReport,
}: ResearchFeaturedPublicationProps) {
  return (
    <article className="mb-10 sm:mb-14 pb-10 sm:pb-14 border-b border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1877F2] bg-[#1877F2]/8 px-2.5 py-1 rounded">
          Featured report
        </span>
        <span className="text-xs text-slate-500">{publication.category}</span>
        <span className="text-slate-300 hidden sm:inline">·</span>
        <span className="text-xs text-slate-500 hidden sm:inline">{publication.date}</span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#010B19] tracking-tight leading-[1.15] mb-4 max-w-3xl">
        {publication.title}
      </h2>

      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-2 max-w-2xl">
        {publication.summary}
      </p>

      <p className="text-xs text-slate-500 mb-6 sm:mb-8">
        {publication.author} · {publication.institution}
      </p>

      {/* Evidence-first: findings before actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {publication.keyFindings.map((finding, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 border-l-[3px] border-l-[#1877F2] px-4 py-3.5 rounded-r-lg shadow-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Finding {index + 1}
            </p>
            <p className="text-sm text-slate-800 leading-snug">{finding}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col xs:flex-row flex-wrap gap-3">
        <Link
          href={`/research/${publication.slug}`}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-lg bg-[#010B19] text-white text-sm font-semibold hover:bg-[#1877F2] transition-colors"
        >
          Read full report
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          type="button"
          onClick={() => onViewReport(publication)}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:border-[#1877F2]/40 hover:text-[#1877F2] transition-colors"
        >
          Quick view
        </button>
        <button
          type="button"
          onClick={() => downloadResearchReport(publication)}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:border-slate-400 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </article>
  );
}
