"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Flame, Users, CalendarDays, Shield, Heart, ArrowRight } from "lucide-react";
import type { MemorialSummary } from "@/lib/memorial/types";
import { EditorialSection, CampaignSection } from "@/components/layout/PageSection";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import WallMemorialHero from "@/components/remembrance/wall/WallMemorialHero";
import WallSearchControls from "@/components/remembrance/wall/WallSearchControls";
import MemorialWallTile from "@/components/remembrance/wall/MemorialWallTile";
import { Pagination } from "@/components/ui/Pagination";

interface WallStats {
  totalCandles: number;
  officersRemembered: number;
  forcesRepresented: number;
  monthlyRemembranceAvg?: number;
  notForgottenPercent?: number;
}

interface RemembranceWallClientProps {
  memorials: MemorialSummary[];
  wallStats: WallStats;
}

export default function RemembranceWallClient({ memorials, wallStats }: RemembranceWallClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const hasActiveSort = sortBy !== "All";

  const clearSort = () => setSortBy("All");

  const filteredOfficers = useMemo(() => {
    return memorials.filter((officer) => {
      const matchesSearch =
        officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        officer.force.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [memorials, searchQuery]);

  const sortedOfficers = useMemo(() => {
    const list = [...filteredOfficers];
    if (sortBy === "MostTributed") return list.sort((a, b) => b.tributeCount - a.tributeCount);
    if (sortBy === "Recently") return list.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
    return list;
  }, [filteredOfficers, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedOfficers.length / itemsPerPage));
  const paginatedOfficers = sortedOfficers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <WallMemorialHero
        totalCandles={wallStats.totalCandles}
        officersRemembered={wallStats.officersRemembered}
        forcesRepresented={wallStats.forcesRepresented}
        monthlyAverage={wallStats.monthlyRemembranceAvg || 124}
        notForgottenPercentage={wallStats.notForgottenPercent || 92}
        onLightCandleClick={() => {
          document.getElementById('wall-grid-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      
      <EditorialSection id="wall-grid-section" variant="muted" noPadding className="pb-10 sm:pb-14 lg:pb-20">
        <div className={`${PAGE_CONTENT_CONTAINER} pt-8 sm:pt-10 lg:pt-14`}>
          {/* Mobile-only Stats Block (Moved from Hero) */}
          <div className="grid grid-cols-2 gap-3 mb-8 sm:hidden">
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
              <Users className="w-6 h-6 text-[#1877F2] mb-2" />
              <span className="text-xl font-black text-[#010B19] tabular-nums leading-none mb-1">
                {wallStats.officersRemembered.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-tight">
                Officers
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
              <CalendarDays className="w-6 h-6 text-[#1877F2] mb-2" />
              <span className="text-xl font-black text-[#010B19] tabular-nums leading-none mb-1">
                {wallStats.monthlyRemembranceAvg?.toLocaleString() || 124}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-tight">
                Monthly Avg
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
              <Shield className="w-6 h-6 text-[#1877F2] mb-2" />
              <span className="text-xl font-black text-[#010B19] tabular-nums leading-none mb-1">
                {wallStats.forcesRepresented?.toLocaleString() || 12}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-tight">
                Forces
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
              <Heart className="w-6 h-6 text-[#1877F2] mb-2" />
              <span className="text-xl font-black text-[#010B19] tabular-nums leading-none mb-1">
                {wallStats.notForgottenPercent || 92}%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-tight">
                Not Forgotten
              </span>
            </div>
          </div>

          <header className="mb-5 sm:hidden flex flex-col items-center text-center">
            <p className="text-slate-500 text-xs sm:text-sm max-w-md leading-relaxed px-2">
              Select a profile to read their story, leave a tribute, or light a candle.
            </p>
          </header>

          <header className="hidden sm:block mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#1877F2]" aria-hidden />
              <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.25em] uppercase">
                The Roll of Honour
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Select a portrait to read their story, leave a tribute, or light a candle. Each light
              slowly restores colour to their photograph.
            </p>
          </header>

          <div className="sticky top-16 md:top-24 z-40 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-16 lg:px-16 py-1 mb-2 sm:mb-6 bg-[#f4f5f7]">
            <WallSearchControls
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultCount={sortedOfficers.length}
              variant="sticky"
            />
          </div>

          {sortedOfficers.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
              role="list"
              aria-label="Memorial portraits"
            >
              {paginatedOfficers.map((officer) => (
                <div key={officer.id} role="listitem">
                  <MemorialWallTile
                    id={officer.id}
                    name={officer.name}
                    imageUrl={officer.portraitImageUrl}
                    candleCount={officer.candleCount}
                    force={officer.force}
                    years={officer.yearsServed}
                    rank={officer.rank}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <p className="text-slate-600 mb-6">No names match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  clearSort();
                }}
                className="inline-flex min-h-[48px] items-center px-8 rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-sm font-semibold transition-colors"
              >
                View the full wall
              </button>
            </div>
          )}

          {sortedOfficers.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              variant="campaign"
              className="mt-8"
            />
          )}
        </div>
      </EditorialSection>

      <EditorialSection variant="white" className="py-8 sm:py-14">
        <div className="w-full px-4 sm:px-6 lg:px-16 mx-auto max-w-[720px]">
          {/* Desktop Version */}
          <div className="hidden sm:block text-center">
            <Flame className="w-8 h-8 text-amber-500 mx-auto mb-4" aria-hidden />
            <h3 className={`text-lg font-bold ${hybrid.editorialHeading} mb-3`}>Light a candle</h3>
            <p className={`${hybrid.editorialBody} text-sm sm:text-base leading-relaxed`}>
              When you light a candle, the portrait briefly returns to full colour — a personal moment
              of remembrance. As more candles are lit across the community, colour is restored for
              everyone who visits.
            </p>
          </div>

          {/* Mobile Version */}
          <div className="sm:hidden bg-[#f4f5f7] rounded-2xl p-5 flex gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
              <Flame className="w-6 h-6 text-amber-500" aria-hidden />
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-bold text-[#010B19] mb-2 leading-snug">
                What does lighting a candle do?
              </h3>
              <p className="text-slate-600 text-[14px] leading-relaxed mb-3">
                When you light a candle on a profile, the portrait briefly returns to full colour
                — a personal moment of remembrance. As more candles are lit across the
                community, colour is restored for everyone who visits.
              </p>
              <Link href="#" className="text-[#1877F2] text-[14px] inline-flex font-bold items-center gap-1 hover:underline transition-all">
                Learn more <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </EditorialSection>
    </div>
  );
}

