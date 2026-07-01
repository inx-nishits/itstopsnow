"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import type { ResearchItem } from "@/lib/research/types";
import { downloadResearchPdf } from "@/lib/research/utils";
import { hybrid } from "@/lib/theme/hybrid";
import { cn } from "@/lib/utils";
import ResearchPdfModal from "./ResearchPdfModal";

interface ResearchCardProps {
  item: ResearchItem;
}

export default function ResearchCard({ item }: ResearchCardProps) {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  return (
    <article
      className={cn(
        hybrid.editorialCard,
        hybrid.editorialCardHover,
        "group flex flex-col h-full overflow-hidden"
      )}
    >
      <div className={cn("relative w-full shrink-0 h-48 sm:h-auto sm:aspect-[2/1] overflow-hidden bg-slate-100 border-b", hybrid.editorialBorder)}>
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010B19]/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {item.featured ? (
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-[#1877F2] px-3 py-1.5 rounded-full border border-[#1877F2]/20 whitespace-nowrap">
              Featured
            </span>
          ) : null}
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full whitespace-nowrap">
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6 min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-500 mb-2">
          <time>{item.date}</time>
          <span className="text-slate-300">·</span>
          <span className="line-clamp-1">{item.author}</span>
        </div>

        <h3 className={cn("text-base sm:text-lg font-bold tracking-tight leading-snug mb-2", hybrid.editorialHeading)}>
          <Link href={`/research/${item.slug}`} className="hover:text-[#1877F2] transition-colors line-clamp-3">
            {item.title}
          </Link>
        </h3>

        <p className="text-[11px] sm:text-xs font-medium text-slate-500 mb-3 line-clamp-1">{item.institution}</p>

        <p className={cn("text-sm leading-relaxed line-clamp-3 mb-4 flex-1", hybrid.editorialBody)}>{item.summary}</p>

        {item.keyFindings.length > 0 ? (
          <div className="mb-4 space-y-2 hidden sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Key findings
            </p>
            <ul className="space-y-1.5">
              {item.keyFindings.slice(0, 2).map((finding) => (
                <li
                  key={finding}
                  className="border-l-2 border-[#1877F2] pl-3 text-xs sm:text-sm text-slate-800 leading-snug line-clamp-2"
                >
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
          {item.hasPdf && item.pdfUrl ? (
            <button
              type="button"
              onClick={() => setIsPdfModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full bg-[#1877F2] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#010B19] transition-colors shrink-0 flex-1 sm:flex-none"
            >
              Read story
              <FileText className="w-4 h-4" />
            </button>
          ) : (
            <a
              href={`/research/${item.slug}`}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full bg-[#1877F2] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#010B19] transition-colors shrink-0 flex-1 sm:flex-none"
            >
              Read story
              <FileText className="w-4 h-4" />
            </a>
          )}
          {item.hasPdf ? (
            <button
              type="button"
              onClick={() => downloadResearchPdf(item)}
              className={cn(
                "inline-flex items-center justify-center min-h-[44px] w-[44px] rounded-full transition-colors shrink-0",
                hybrid.editorialChip
              )}
              aria-label={`Download PDF for ${item.title}`}
            >
              <Download className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
      <ResearchPdfModal
        open={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={item.pdfUrl ?? null}
        title={item.title}
      />
    </article>
  );
}
