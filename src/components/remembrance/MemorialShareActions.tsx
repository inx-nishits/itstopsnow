"use client";

import type { ReactNode } from "react";
import { Mail, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { hybrid } from "@/lib/theme/hybrid";

interface MemorialShareActionsProps {
  memorialName: string;
  isCopied: boolean;
  onCopy: () => void;
}

export function MemorialShareActions({
  memorialName,
  isCopied,
  onCopy,
}: MemorialShareActionsProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <ShareOption
        label="Share on Facebook"
        primary
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")}
      />
      <ShareOption
        label="Share on X"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Honouring ${memorialName}`)}`,
            "_blank"
          )
        }
      />
      <ShareOption
        label="Share via email"
        icon={<Mail className="w-4 h-4" />}
        onClick={() =>
          (window.location.href = `mailto:?subject=${encodeURIComponent(`Honouring ${memorialName}`)}&body=${encodeURIComponent(url)}`)
        }
      />
      <ShareOption
        label={isCopied ? "Link copied!" : "Copy link"}
        icon={<LinkIcon className="w-4 h-4" />}
        onClick={onCopy}
        success={isCopied}
      />
    </div>
  );
}

function ShareOption({
  label,
  onClick,
  icon,
  disabled,
  primary,
  success,
  className,
}: {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  primary?: boolean;
  success?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full min-h-[48px] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed",
        primary
          ? "bg-[#1877F2] text-white hover:bg-[#1565d8] shadow-sm"
          : success
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : cn(hybrid.editorialChip, "hover:bg-slate-200 border"),
        className
      )}
    >
      {icon}
      {label}
    </button>
  );
}
