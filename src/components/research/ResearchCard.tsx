"use client";

import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import type { ResearchItem } from "@/lib/research/types";
import { downloadResearchPdf } from "@/lib/research/utils";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";

interface ResearchCardProps {
  item: ResearchItem;
  onViewReport: (item: ResearchItem) => void;
}

export default function ResearchCard({ item, onViewReport }: ResearchCardProps) {
  return (
    <article
      className={cn(
        hybrid.editorialCard,
        hybrid.editorialCardHover,
        "group flex flex-row sm:flex-col h-full overflow-hidden hover:-translate-y-1"
      )}
    >
      <div className={cn("relative w-[140px] sm:w-auto shrink-0 sm:aspect-[16/10] overflow-hidden bg-slate-100 border-r sm:border-r-0 sm:border-b", hybrid.editorialBorder)}>
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010B19]/70 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 sm:gap-2">
          {item.featured ? (
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-[#1877F2] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#1877F2]/20 whitespace-nowrap">
              Featured
            </span>
          ) : null}
          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-black/50 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-5 min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2">
          <time>{item.date}</time>
          <span className="text-slate-300">·</span>
          <span className="line-clamp-1">{item.author}</span>
        </div>

        <h3 className={cn("text-base sm:text-lg font-bold tracking-tight leading-snug mb-2", hybrid.editorialHeading)}>
          <Link href={`/research/${item.slug}`} className="hover:text-[#1877F2] transition-colors">
            {item.title}
          </Link>
        </h3>

        <p className="text-xs text-slate-500 mb-3 line-clamp-1">{item.institution}</p>

        <p className={cn("text-sm leading-relaxed line-clamp-3 mb-4 flex-1 hidden sm:block", hybrid.editorialBody)}>{item.summary}</p>

        {item.keyFindings.length > 0 ? (
          <div className="mb-4 space-y-2 hidden sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Key findings
            </p>
            <ul className="space-y-2">
              {item.keyFindings.slice(0, 2).map((finding) => (
                <li
                  key={finding}
                  className="border-l-2 border-[#1877F2] pl-3 text-sm text-slate-800 leading-snug line-clamp-2"
                >
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 mt-auto pt-1">
          <button
            type="button"
            onClick={() => onViewReport(item)}
            className="inline-flex items-center justify-center gap-1.5 min-h-[36px] px-4 rounded-full bg-[#1877F2] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#010B19] transition-colors shrink-0 flex-1 sm:flex-none"
          >
            Read story
            <FileText className="w-3.5 h-3.5" />
          </button>
          {item.hasPdf ? (
            <button
              type="button"
              onClick={() => downloadResearchPdf(item)}
              className={cn(
                "inline-flex items-center justify-center min-h-[36px] w-[36px] rounded-full transition-colors shrink-0",
                hybrid.editorialChip
              )}
              aria-label={`Download PDF for ${item.title}`}
            >
              <Download className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
