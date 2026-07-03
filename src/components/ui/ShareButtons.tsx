"use client";

import { useState } from "react";
import { Share2, Check, Link as LinkIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { hybrid } from "@/lib/theme/hybrid";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-1.1 0-2 .9-2 2v1h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-1.85 0-2.59 1.02-3.04 1.68v-1.44h-2.7v8.32h2.7v-4.63c0-.24.05-.47.12-.65a1.44 1.44 0 0 1 1.34-.96c.94 0 1.32.72 1.32 1.77v4.47h2.72M7.46 18.5h-2.7v-8.32h2.7v8.32M6.11 8.82A1.56 1.56 0 1 1 6.1 5.7a1.56 1.56 0 1 1 0 3.12"/>
  </svg>
);

interface ShareButtonsProps {
  title: string;
  url?: string;
  /** editorial = light sidebar; campaign = dark modal */
  variant?: "editorial" | "campaign";
  className?: string;
}

export function ShareButtons({ title, url, variant = "editorial", className }: ShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isEditorial = variant === "editorial";

  const containerClass = isEditorial 
    ? "flex flex-row flex-wrap gap-3" 
    : "flex flex-col gap-3";

  const btnClass = isEditorial
    ? "w-11 h-11 rounded-full bg-slate-100 hover:bg-[#1877F2] hover:text-white flex items-center justify-center text-slate-600 transition-all duration-300"
    : "w-full px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10";

  return (
    <div className={className}>
      {isEditorial && (
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-500">
          <Share2 className="w-3.5 h-3.5" /> Share this story
        </h3>
      )}
      <div className={containerClass}>
        <button
          type="button"
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")}
          className={cn(btnClass, isEditorial ? "hover:bg-[#1877F2]" : "")}
          aria-label="Share on Facebook"
        >
          {isEditorial ? <FacebookIcon className="w-4 h-4" /> : "Share on Facebook"}
        </button>
        <button
          type="button"
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, "_blank")}
          className={cn(btnClass, isEditorial ? "hover:bg-slate-900" : "")}
          aria-label="Share on X"
        >
          {isEditorial ? <TwitterIcon className="w-4 h-4" /> : "Share on X / Twitter"}
        </button>
        <button
          type="button"
          onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")}
          className={cn(btnClass, isEditorial ? "hover:bg-[#0077B5]" : "")}
          aria-label="Share on LinkedIn"
        >
          {isEditorial ? <LinkedinIcon className="w-4 h-4" /> : "Share on LinkedIn"}
        </button>
        <button
          type="button"
          onClick={() => { window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might find this interesting:\n\n${shareUrl}`)}`; }}
          className={cn(btnClass, isEditorial ? "hover:bg-slate-700" : "")}
          aria-label="Share via Email"
        >
          {isEditorial ? <Mail className="w-4 h-4" /> : <><Mail className="w-4 h-4" /> Share via Email</>}
        </button>
        <button type="button" onClick={handleCopy} className={btnClass} aria-label="Copy Link">
          {isCopied ? (
            isEditorial ? <Check className="w-4 h-4 text-green-500" /> : <><Check className="w-4 h-4 text-green-500" /><span className="text-green-600">Link Copied!</span></>
          ) : (
            isEditorial ? <LinkIcon className="w-4 h-4" /> : <><LinkIcon className="w-4 h-4" /> Copy Share Link</>
          )}
        </button>
      </div>
    </div>
  );
}
