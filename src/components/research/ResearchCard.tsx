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
        "group flex flex-col h-full overflow-hidden hover:-translate-y-1"
      )}
    >
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-slate-100 border-b", hybrid.editorialBorder)}>
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010B19]/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {item.featured ? (
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-[#1877F2] px-3 py-1.5 rounded-full border border-[#1877F2]/20">
              Featured
            </span>
          ) : null}
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
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

        <p className={cn("text-sm leading-relaxed line-clamp-3 mb-4 flex-1", hybrid.editorialBody)}>{item.summary}</p>

        {item.keyFindings[0] ? (
          <div className="border-l-2 border-[#1877F2] pl-3 mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Key finding
            </p>
            <p className="text-sm text-slate-800 leading-snug line-clamp-2">{item.keyFindings[0]}</p>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 mt-auto pt-1">
          <Link
            href={`/research/${item.slug}`}
            className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 rounded-full bg-[#1877F2] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#010B19] transition-colors shrink-0"
          >
            Read story
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => onViewReport(item)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors shrink-0",
              hybrid.editorialChip
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            {item.hasPdf ? "View PDF" : "Quick view"}
          </button>
          {item.hasPdf ? (
            <button
              type="button"
              onClick={() => downloadResearchPdf(item)}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors shrink-0",
                hybrid.editorialChip
              )}
              aria-label={`Download PDF for ${item.title}`}
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
