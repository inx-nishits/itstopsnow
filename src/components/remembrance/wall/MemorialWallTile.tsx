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
      href={`/wall-of-remembrance/${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group relative flex flex-col w-full h-full overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl border border-slate-200/60 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] hover:-translate-y-1 ${className}`}
      aria-label={`Remember ${name}`}
    >
      <div className="relative w-full aspect-square sm:aspect-[4/5] overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ filter: `grayscale(${displayGray}%)` }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_100%,rgba(251,191,36,0.18),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          aria-hidden
        />
        
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-sm border border-black/5">
          <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" aria-hidden />
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 tabular-nums">
            {candleCount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-4 text-left bg-white z-20">
        <h3 className="text-[13px] sm:text-[15px] font-black text-[#010B19] leading-tight line-clamp-1 mb-1 group-hover:text-[#1877F2] transition-colors">
          {name}
        </h3>
        
        {force && (
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate mb-1">
            {force}
          </p>
        )}
        
        {years && (
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-auto mb-3 sm:mb-4">
            {years}
          </p>
        )}
        
        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-slate-100/80 flex items-center justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#1877F2] uppercase tracking-[0.1em] flex items-center gap-1 group-hover:gap-1.5 transition-all">
            View Tribute <span className="text-[14px] leading-none">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
