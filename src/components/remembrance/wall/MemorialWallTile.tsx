"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Flame } from "lucide-react";
import { cumulativeGrayscale } from "@/lib/candleGrayscale";

export interface MemorialWallTileProps {
  id: string;
  name: string;
  imageUrl: string;
  candleCount: number;
  force?: string;
  years?: string;
  rank?: string;
  className?: string;
}

/** Shared portrait tile — homepage roll + full wall (visual continuity). */
export default function MemorialWallTile({
  id,
  name,
  imageUrl,
  candleCount,
  force,
  years,
  className = "",
}: MemorialWallTileProps) {
  const [hovered, setHovered] = useState(false);
  const baseGray = cumulativeGrayscale(candleCount);
  const displayGray = hovered ? 0 : baseGray;

  return (
    <Link
      href={`/remembrance/${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group relative block w-full aspect-[3/4] overflow-hidden bg-[#050A14] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1877F2] ${className}`}
      aria-label={`Remember ${name}`}
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 12vw"
        className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.04] group-active:scale-[1.04]"
        style={{ filter: `grayscale(${displayGray}%)` }}
      />

      {/* Candle warmth on hover — ritual hint */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_100%,rgba(251,191,36,0.18),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#050A14]/95 via-[#050A14]/45 to-transparent pointer-events-none" />

      <div className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2 py-0.5 border border-white/10">
        <Flame className="w-3 h-3 text-amber-400" aria-hidden />
        <span className="text-[10px] font-semibold text-amber-200/95 tabular-nums">
          {candleCount.toLocaleString()}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-2.5 pb-2.5 sm:px-3 sm:pb-3">
        <p className="text-[11px] sm:text-xs font-bold text-white leading-tight line-clamp-2">{name}</p>
        {force && (
          <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wide truncate mt-0.5 hidden sm:block">
            {force}
          </p>
        )}
        {years && <p className="text-[9px] text-slate-500 mt-0.5 tabular-nums">{years}</p>}
      </div>
    </Link>
  );
}
