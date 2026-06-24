"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemorialModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** sm = 384px, md = 448px, lg = 512px */
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
}

const sizeClass = {
  sm: "md:max-w-sm",
  md: "md:max-w-md",
  lg: "md:max-w-lg",
} as const;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/** Shared memorial modal — bottom sheet on mobile, centered dialog on desktop. */
export default function MemorialModal({
  open,
  onClose,
  title,
  children,
  size = "md",
  className,
  ariaLabel,
}: MemorialModalProps) {
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel ?? title}
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close dialog"
          />

          <motion.div
            initial={isDesktop ? { opacity: 0, scale: 0.96, y: 8 } : { opacity: 0, y: "100%" }}
            animate={isDesktop ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, y: 0 }}
            exit={isDesktop ? { opacity: 0, scale: 0.96, y: 8 } : { opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className={cn(
              "relative z-10 w-full bg-white shadow-2xl",
              "max-h-[min(90dvh,720px)] overflow-hidden flex flex-col",
              "rounded-t-2xl md:rounded-2xl border border-slate-200",
              "pb-[max(0px,env(safe-area-inset-bottom))]",
              sizeClass[size],
              className
            )}
          >
            <div className="md:hidden flex justify-center pt-3 shrink-0" aria-hidden>
              <span className="block w-10 h-1 rounded-full bg-slate-200" />
            </div>

            <div className="flex items-center justify-between gap-4 px-4 sm:px-4 sm:px-5 md:px-6 py-4 md:py-5 border-b border-slate-100 shrink-0">
              <h2 className="text-base md:text-lg font-bold text-[#010B19] tracking-tight">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-slate-400 hover:text-[#010B19] hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 sm:px-4 sm:px-5 md:px-6 py-5 md:py-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

