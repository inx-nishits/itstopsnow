"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import type { ResearchItem } from "@/lib/research/types";
import { downloadResearchReport } from "@/lib/research/data";

interface ResearchEvidenceListProps {
  items: ResearchItem[];
  onViewReport: (item: ResearchItem) => void;
}

export default function ResearchEvidenceList({ items, onViewReport }: ResearchEvidenceListProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
        All publications
      </h2>

      <ol className="divide-y divide-slate-200 border-t border-slate-200">
        {items.map((item, index) => (
          <li key={item.id} className="py-8 sm:py-10 first:pt-8">
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
              <div className="lg:col-span-1 flex lg:flex-col lg:items-start gap-2">
                <span className="text-2xl sm:text-3xl font-light text-slate-300 tabular-nums leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1877F2] lg:mt-2">
                  {item.category}
                </span>
              </div>

              <div className="lg:col-span-8 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-2">
                  <time>{item.date}</time>
                  <span className="hidden sm:inline text-slate-300">·</span>
                  <span>{item.author}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#010B19] tracking-tight leading-snug mb-3">
                  <Link
                    href={`/research/${item.slug}`}
                    className="hover:text-[#1877F2] transition-colors"
                  >
                    {item.title}
                  </Link>
                </h3>

                {item.keyFindings[0] && (
                  <blockquote className="border-l-2 border-[#1877F2] pl-4 mb-3">
                    <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                      {item.keyFindings[0]}
                    </p>
                  </blockquote>
                )}

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-1">
                  {item.summary}
                </p>
                <p className="text-xs text-slate-400">{item.institution}</p>
              </div>

              <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 lg:items-stretch lg:justify-start">
                <Link
                  href={`/research/${item.slug}`}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-lg bg-[#010B19] text-white text-xs font-semibold hover:bg-[#1877F2] transition-colors"
                >
                  Read
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => onViewReport(item)}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:border-[#1877F2]/40 transition-colors"
                >
                  Quick view
                </button>
                <button
                  type="button"
                  onClick={() => downloadResearchReport(item)}
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors lg:w-full"
                  aria-label={`Download ${item.title}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
