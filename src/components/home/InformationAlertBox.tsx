"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { HomepageInformationAlert } from "@/lib/homepage/types";

interface InformationAlertBoxProps {
  alert: HomepageInformationAlert;
}

/** Homepage Information Alert Box — CMS-driven notice strip (Solid Top Banner). */
export default function InformationAlertBox({ alert }: InformationAlertBoxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!alert.enabled) return;
    
    const updateHeight = () => {
      if (ref.current) {
        const isDesktop = window.innerWidth >= 768;
        const height = isDesktop ? ref.current.getBoundingClientRect().height : 0;
        document.documentElement.style.setProperty(
          '--alert-height', 
          `${height}px`
        );
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      document.documentElement.style.removeProperty('--alert-height');
    };
  }, [alert.enabled]);

  if (!alert.enabled) return null;

  return (
    <div 
      ref={ref}
      className="w-full bg-[#1877F2] text-white relative z-20 border-b border-blue-400/30 shadow-lg"
      role="status"
      aria-label={alert.badgeLabel}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 py-2 sm:py-2.5 mx-auto text-center sm:text-left leading-relaxed">
        <span className="inline-block align-middle px-2 py-[2px] mr-2 rounded bg-white text-[#1877F2] text-[9px] lg:text-[10px] font-black uppercase tracking-[0.15em] shadow-sm relative -top-[1px]">
          {alert.badgeLabel}
        </span>
        <span className="inline text-[11px] lg:text-[13px] font-medium align-middle">
          {alert.messageBefore}
          {alert.highlightPhrase ? (
            <strong className="font-black mx-1 tracking-wide">{alert.highlightPhrase}</strong>
          ) : null}
          {alert.messageAfter}
        </span>
        
        {alert.ctaLabel && alert.ctaHref ? (
          <Link
            href={alert.ctaHref}
            className="group inline-flex items-center gap-0.5 text-white hover:text-blue-100 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-200 ml-2 whitespace-nowrap align-middle"
          >
            <span className="underline underline-offset-4 decoration-white/40 group-hover:decoration-white">{alert.ctaLabel}</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200 text-base leading-none">→</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

