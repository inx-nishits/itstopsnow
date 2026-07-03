"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResearchPdfModalProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  title: string;
}

export default function ResearchPdfModal({
  open,
  onClose,
  pdfUrl,
  title,
}: ResearchPdfModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && pdfUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`PDF Viewer: ${title}`}
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#020611]/90 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close PDF viewer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className={cn(
              "relative z-10 w-full h-full max-w-6xl max-h-[95dvh] bg-white shadow-2xl",
              "flex flex-col rounded-xl overflow-hidden border border-white/10"
            )}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 bg-[#051024] border-b border-white/10 shrink-0">
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest truncate">{title}</h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 min-h-[36px] px-3 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  title="Open in new tab"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in new tab</span>
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="flex items-center gap-1.5 min-h-[36px] px-3 rounded-lg text-xs font-bold uppercase tracking-widest text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 overflow-hidden relative">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className="absolute inset-0 w-full h-full border-0"
                title={`PDF Viewer: ${title}`}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
