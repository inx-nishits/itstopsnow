"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGE_HERO_CONTAINER, PAGE_HERO_SECTION_PT } from "@/components/layout/PageHero";
import { getResearchBySlug, downloadResearchReport } from "@/lib/research/data";
import { notFound } from "next/navigation";

export default function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const report = getResearchBySlug(slug);

  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dark header band */}
      <section className={`relative bg-[#050A14] text-white border-b border-white/5 ${PAGE_HERO_SECTION_PT} pb-8 sm:pb-10`}>
        <div className={PAGE_HERO_CONTAINER}>
          <Link
            href="/research"
            className="inline-flex items-center text-slate-400 hover:text-white text-xs font-medium mb-6 transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Back to evidence base
          </Link>

          <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#1877F2] bg-[#1877F2]/15 px-2.5 py-1 rounded mb-4">
            {report.category}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] mb-4">
            {report.title}
          </h1>

          <p className="text-sm text-slate-400">
            {report.author} · {report.institution} · {report.date}
          </p>
        </div>
      </section>

      {/* Light reading column */}
      <article className="flex-1 bg-[#f4f5f7] text-[#010B19]">
        <div className="w-full px-5 sm:px-6 lg:px-16 py-8 sm:py-12 max-w-[720px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-10 pb-8 border-b border-slate-200">
            <Button
              type="button"
              onClick={() => downloadResearchReport(report)}
              className="min-h-[48px] bg-[#010B19] hover:bg-[#1877F2] text-white font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Download report
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-[48px] border-slate-300 text-slate-700 hover:bg-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <section className="mb-10">
            <h2 className="text-lg font-bold text-[#010B19] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1877F2]" />
              Executive summary
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-[1.75]">{report.summary}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold text-[#010B19] mb-5">Key findings</h2>
            <ol className="space-y-4">
              {report.keyFindings.map((finding, i) => (
                <li
                  key={i}
                  className="flex gap-4 bg-white border border-slate-200 border-l-[3px] border-l-[#1877F2] px-4 py-4 rounded-r-lg"
                >
                  <span className="text-sm font-bold text-[#1877F2] tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{finding}</p>
                </li>
              ))}
            </ol>
          </section>

          {report.methodology && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-[#010B19] mb-4">Methodology</h2>
              <p className="text-base text-slate-700 leading-[1.75]">{report.methodology}</p>
            </section>
          )}

          <section className="bg-[#010B19] text-white rounded-xl p-6 sm:p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Use this evidence</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-md mx-auto">
              Share these findings with your Member of Parliament and demand a 12-month investigation limit.
            </p>
            <Link href="/take-action">
              <Button className="min-h-[48px] bg-[#1877F2] hover:bg-blue-500 text-white font-semibold px-8">
                Contact your MP
              </Button>
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}
