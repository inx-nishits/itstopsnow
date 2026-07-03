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
  rank,
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
      className={`group relative flex flex-row w-full overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] hover:-translate-y-1 ${className}`}
      aria-label={`Remember ${name}`}
    >
      <div className="relative w-32 sm:w-36 shrink-0 bg-slate-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 128px, 144px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ filter: `grayscale(${displayGray}%)` }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_100%,rgba(251,191,36,0.18),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          aria-hidden
        />
        <div className="absolute bottom-2 left-2 w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center shadow-sm">
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-2.5 sm:p-3 text-left">
        <h3 className="text-[14px] sm:text-[15px] font-bold text-[#010B19] leading-tight line-clamp-1 mb-0.5 group-hover:text-[#1877F2] transition-colors">
          {name}
        </h3>
        
        {rank && (
          <p className="text-xs sm:text-xs font-semibold text-[#1877F2] truncate mb-0.5">
            {rank}
          </p>
        )}

        {force && (
          <p className="text-xs sm:text-xs font-medium text-slate-500 truncate mb-0.5">
            {force}
          </p>
        )}
        
        {years && (
          <p className="text-xs sm:text-xs text-slate-400 font-medium mb-2">
            {years}
          </p>
        )}
        
        <div className="mt-auto pt-2 flex flex-col xl:flex-row xl:items-end justify-between gap-2 xl:gap-1">
          <div className="flex items-center gap-1.5 shrink-0">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" aria-hidden />
            <div>
              <span className="text-[12px] sm:text-[14px] font-bold text-slate-800 tabular-nums leading-none block">
                {candleCount.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none block mt-0.5">
                Candles lit
              </span>
            </div>
          </div>

          <div className="w-full xl:w-auto text-center px-2 py-1.5 sm:px-2.5 rounded bg-[#1877F2] text-white shadow-sm group-hover:bg-blue-600 transition-all text-xs font-bold uppercase tracking-wider shrink-0">
            View Tribute
          </div>
        </div>
      </div>
    </Link>
  );
}
