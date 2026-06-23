"use client";

import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import type { ResearchItem } from "@/lib/research/types";
import { downloadResearchPdf } from "@/lib/research/utils";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

interface ResearchFeaturedPublicationProps {
  publication: ResearchItem;
  onViewReport: (item: ResearchItem) => void;
}

const actionBtn =
  "inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors shrink-0";

export default function ResearchFeaturedPublication({
  publication,
  onViewReport,
}: ResearchFeaturedPublicationProps) {
  return (
    <article className={cn("mb-8 sm:mb-10 pb-8 sm:pb-10 border-b", hybrid.editorialBorder)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
        <div className="lg:col-span-5">
          <div className="relative aspect-[16/10] lg:max-h-[240px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={publication.image}
              alt=""
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#010B19]/50 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#1877F2] px-2 py-0.5 rounded-full">
                Featured
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/95 bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {publication.category}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500 mb-2">
            <time>{publication.date}</time>
            <span className="text-slate-300">·</span>
            <span className="line-clamp-1">
              {publication.author} · {publication.institution}
            </span>
          </div>

          <h2 className={cn("text-lg sm:text-xl lg:text-2xl font-bold tracking-tight leading-snug mb-2.5", hybrid.editorialHeading)}>
            {publication.title}
          </h2>

          <p className={cn("text-sm leading-relaxed mb-4 line-clamp-3 max-w-2xl", hybrid.editorialBody)}>
            {publication.summary}
          </p>

          <ul className="space-y-2 mb-4">
            {publication.keyFindings.map((finding, index) => (
              <li
                key={finding}
                className="flex gap-2.5 text-sm text-slate-700 leading-snug border-l-2 border-[#1877F2] pl-3"
              >
                <span className="text-[10px] font-bold text-[#1877F2] tabular-nums shrink-0 pt-0.5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="line-clamp-2">{finding}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2 mt-auto">
            <Link
              href={`/research/${publication.slug}`}
              className={cn(actionBtn, "bg-[#1877F2] text-white hover:bg-[#010B19]")}
            >
              Read story
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => onViewReport(publication)}
              className={cn(actionBtn, hybrid.editorialChip)}
            >
              <FileText className="w-3.5 h-3.5" />
              {publication.hasPdf ? "View PDF" : "Quick view"}
            </button>
            {publication.hasPdf ? (
              <button
                type="button"
                onClick={() => downloadResearchPdf(publication)}
                className={cn(actionBtn, hybrid.editorialChip)}
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
