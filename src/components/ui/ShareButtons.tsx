"use client";

import { useState } from "react";
import { Share2, Check, Link as LinkIcon, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { hybrid } from "@/lib/theme/hybrid";

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

  const chip =
    variant === "editorial"
      ? cn("w-full px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer", hybrid.editorialChip)
      : "w-full px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10";

  const fbClass =
    variant === "editorial"
      ? "w-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/20 px-4 py-3.5 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
      : chip;

  return (
    <div className={className}>
      {variant === "editorial" && (
        <h3 className={cn("text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2", hybrid.editorialMuted)}>
          <Share2 className="w-3 h-3" /> Share
        </h3>
      )}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
              "_blank"
            )
          }
          className={fbClass}
        >
          Share on Facebook
        </button>
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
              "_blank"
            )
          }
          className={chip}
        >
          Share on X / Twitter
        </button>
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
              "_blank"
            )
          }
          className={chip}
        >
          Share on LinkedIn
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might find this interesting:\n\n${shareUrl}`)}`;
          }}
          className={chip}
        >
          <Mail className="w-4 h-4" /> Share via Email
        </button>
        <button type="button" onClick={handleCopy} className={chip}>
          {isCopied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-green-600">Link Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4" /> Copy Share Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
