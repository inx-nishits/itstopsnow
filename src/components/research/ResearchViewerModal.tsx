"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, X } from "lucide-react";
import type { ResearchItem } from "@/lib/research/types";
import { downloadResearchReport } from "@/lib/research/data";

interface ResearchViewerModalProps {
  report: ResearchItem | null;
  onClose: () => void;
}

export default function ResearchViewerModal({ report, onClose }: ResearchViewerModalProps) {
  return (
    <AnimatePresence>
      {report && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Report quick view"
        >
          <motion.div
            initial={{ y: "100%", opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full sm:max-w-4xl h-[92dvh] sm:h-[85vh] bg-[#f8f9fb] sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-[#1877F2] shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#010B19] line-clamp-1">{report.title}</h3>
                  <p className="text-xs text-slate-500 truncate">
                    {report.author} · {report.institution}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => downloadResearchReport(report)}
                  className="hidden sm:inline-flex items-center gap-2 border border-slate-200 hover:border-[#1877F2]/40 text-slate-700 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 sm:p-8 md:p-12 space-y-8 sm:space-y-12 bg-slate-100/80">
              <ReportPage report={report} page={1} />
              <ReportPage report={report} page={2} />
              <ReportPage report={report} page={3} />
              <ReportPage report={report} page={4} />
            </div>

            <div className="bg-white border-t border-slate-200 px-4 py-3 sm:hidden shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => downloadResearchReport(report)}
                className="flex items-center justify-center gap-2 bg-[#010B19] text-white w-full min-h-[48px] rounded-lg text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Download report
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ReportPage({ report, page }: { report: ResearchItem; page: number }) {
  if (page === 1) {
    return (
      <div className="max-w-2xl mx-auto bg-white text-slate-900 p-8 md:p-14 shadow-lg border border-slate-200/80 flex flex-col justify-between min-h-[520px] border-t-[6px] border-t-[#1877F2]">
        <div>
          <p className="text-[#1877F2] font-semibold text-xs mb-4">Research & Policy Paper</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-[#010B19] mb-6">
            {report.title}
          </h1>
          <div className="w-12 h-0.5 bg-[#1877F2] mb-6" />
          <p className="text-slate-600 text-sm leading-relaxed max-w-md">
            This paper presents data and recommendations gathered by {report.institution} regarding
            policing misconduct investigations in the UK.
          </p>
        </div>
        <div className="border-t border-slate-200 pt-6 flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold text-slate-900">{report.author}</p>
            <p className="text-xs text-slate-500">{report.institution}</p>
          </div>
          <p className="text-xs text-slate-500">{report.date}</p>
        </div>
      </div>
    );
  }

  if (page === 2) {
    return (
      <div className="max-w-2xl mx-auto bg-white text-slate-900 p-8 md:p-14 shadow-lg border border-slate-200/80 min-h-[520px] flex flex-col">
        <h2 className="text-lg font-bold text-[#010B19] mb-4 pb-2 border-b border-slate-200">
          Executive summary
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-6">{report.summary}</p>
        <div className="grid grid-cols-3 gap-3 mt-auto">
          <div className="bg-slate-50 p-3 border border-slate-100 text-center rounded">
            <div className="text-base font-bold text-[#1877F2]">4.2 yrs</div>
            <div className="text-[10px] text-slate-500 mt-1">Avg. investigation</div>
          </div>
          <div className="bg-slate-50 p-3 border border-slate-100 text-center rounded">
            <div className="text-base font-bold text-red-600">+500%</div>
            <div className="text-[10px] text-slate-500 mt-1">PTSD diagnosis</div>
          </div>
          <div className="bg-slate-50 p-3 border border-slate-100 text-center rounded">
            <div className="text-base font-bold text-slate-800">£120M</div>
            <div className="text-[10px] text-slate-500 mt-1">Taxpayer cost</div>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-6">Page 2 of 4</p>
      </div>
    );
  }

  if (page === 3) {
    return (
      <div className="max-w-2xl mx-auto bg-white text-slate-900 p-8 md:p-14 shadow-lg border border-slate-200/80 min-h-[520px]">
        <h2 className="text-lg font-bold text-[#010B19] mb-6 pb-2 border-b border-slate-200">
          Primary findings
        </h2>
        <div className="space-y-4">
          {report.keyFindings.map((finding, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="text-xs font-bold text-[#1877F2] tabular-nums shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{finding}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 mt-8">Page 3 of 4</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white text-slate-900 p-8 md:p-14 shadow-lg border border-slate-200/80 min-h-[520px]">
      <h2 className="text-lg font-bold text-[#010B19] mb-6 pb-2 border-b border-slate-200">
        Statutory recommendations
      </h2>
      <ul className="space-y-4 text-sm text-slate-700 leading-relaxed list-decimal list-inside">
        <li>Implement a statutory 12-month investigation limit for all IOPC proceedings.</li>
        <li>Establish welfare coordination roles with weekly contact for suspended officers.</li>
        <li>Publish annual transparency summaries on suspended officer salary costs.</li>
      </ul>
      <p className="text-[10px] text-slate-400 mt-8">Page 4 of 4</p>
    </div>
  );
}
