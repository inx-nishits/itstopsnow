import Link from "next/link";
import Image from "next/image";
import { Flame } from "lucide-react";
import type { MemorialSummary } from "@/lib/memorial/types";

interface MemorialTributeCardProps {
  officer: MemorialSummary;
  /** Compact tile for mobile 2-col grid; card for desktop */
  layout?: "tile" | "card";
}

/**
 * Portrait-first memorial entry — edge-to-edge tiles on mobile, framed cards on desktop.
 */
export default function MemorialTributeCard({ officer, layout = "tile" }: MemorialTributeCardProps) {
  if (layout === "card") {
    return <MemorialCard officer={officer} />;
  }
  return <MemorialTile officer={officer} />;
}

function MemorialTile({ officer }: { officer: MemorialSummary }) {
  return (
    <Link
      href={`/wall-of-remembrance/${officer.id}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-[#14100c] border border-amber-900/25 active:scale-[0.98] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500/70"
      aria-label={`Remember ${officer.name}, ${officer.rank}`}
    >
      <Image
        src={officer.portraitImageUrl}
        alt=""
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover object-top grayscale-[50%] sepia-[0.12] group-hover:grayscale-[20%] group-active:grayscale-0 transition-all duration-500"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/25 to-transparent opacity-90 pointer-events-none"
        aria-hidden
      />
      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/45 backdrop-blur-sm px-2 py-1 border border-amber-900/30">
        <Flame className="w-3 h-3 text-amber-400" aria-hidden />
        <span className="text-[10px] font-semibold text-amber-200/90 tabular-nums">
          {officer.candleCount.toLocaleString()}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 pt-8">
        <h2 className="text-[13px] font-bold text-stone-50 leading-tight line-clamp-2 mb-0.5">
          {officer.name}
        </h2>
        <p className="text-[10px] text-stone-400 line-clamp-1">{officer.rank}</p>
      </div>
    </Link>
  );
}

function MemorialCard({ officer }: { officer: MemorialSummary }) {
  return (
    <Link
      href={`/wall-of-remembrance/${officer.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[#14100c] border border-amber-900/30 shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-amber-700/45 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_32px_rgba(217,119,6,0.06)] transition-all duration-500 h-[min(520px,88vh)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500/70"
      aria-label={`Remember ${officer.name}`}
    >
      <div className="relative flex-[17] min-h-0 overflow-hidden">
        <Image
          src={officer.portraitImageUrl}
          alt=""
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top grayscale-[45%] sepia-[0.15] group-hover:grayscale-[15%] group-hover:sepia-0 transition-all duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100c] via-[#14100c]/15 to-amber-950/10 opacity-55 pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />
      </div>

      <div className="flex flex-col justify-between flex-[3] min-h-0 px-5 py-4 border-t border-amber-900/20 bg-[#120e0a] shrink-0">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-stone-50 leading-tight tracking-tight line-clamp-2 mb-1">
            {officer.name}
          </h2>
          <p className="text-sm text-stone-400 leading-snug line-clamp-1">{officer.rank}</p>
          <p className="text-xs text-stone-500 leading-snug line-clamp-1 mt-0.5">{officer.force}</p>
          {officer.quote && (
            <p className="text-xs text-stone-500/95 italic leading-snug line-clamp-2 mt-2">
              &ldquo;{officer.quote}&rdquo;
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-amber-900/15">
          <span className="text-xs font-medium text-amber-500/85 group-hover:text-amber-400 transition-colors">
            View Tribute →
          </span>
          <div className="flex items-center gap-1.5 text-amber-500/90 shrink-0">
            <Flame className="w-3.5 h-3.5" aria-hidden />
            <span className="text-[11px] font-semibold tabular-nums">
              {officer.candleCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
