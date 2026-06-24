"use client";

import { useState, useMemo, useEffect } from "react";
import { Flame } from "lucide-react";
import type { MemorialSummary } from "@/lib/memorial/types";
import { EditorialSection, CampaignSection } from "@/components/layout/PageSection";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";
import { hybrid } from "@/lib/theme/hybrid";
import WallMemorialHero from "@/components/remembrance/wall/WallMemorialHero";
import WallStatsRibbon from "@/components/remembrance/wall/WallStatsRibbon";
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
      />

      <WallStatsRibbon
        officersRemembered={wallStats.officersRemembered}
        totalCandles={wallStats.totalCandles}
        forcesRepresented={wallStats.forcesRepresented}
        monthlyRemembranceAvg={wallStats.monthlyRemembranceAvg}
        notForgottenPercent={wallStats.notForgottenPercent}
      />

      <CampaignSection variant="deep" noPadding className="pb-10 sm:pb-14 lg:pb-20">
        <div className={`${PAGE_CONTENT_CONTAINER} pt-8 sm:pt-10 lg:pt-14`}>
          <header className="mb-5 sm:mb-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-[2px] bg-[#1877F2]" aria-hidden />
              <h2 className="text-xs font-bold text-[#1877F2] tracking-[0.25em] uppercase">
                The Roll of Honour
              </h2>
            </div>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Select a portrait to read their story, leave a tribute, or light a candle. Each light
              slowly restores colour to their photograph.
            </p>
          </header>

          <div className="sticky top-20 md:top-24 z-40 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-16 lg:px-16 py-3 mb-5 sm:mb-6 bg-[#050A14]/95 backdrop-blur-xl">
            <WallSearchControls
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={sortedOfficers.length}
              hasActiveSort={hasActiveSort}
              onClearSort={clearSort}
              variant="campaign"
            />
          </div>

          {sortedOfficers.length > 0 ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
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
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <p className="text-slate-400 mb-6">No names match your search.</p>
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
      </CampaignSection>

      <EditorialSection variant="white" className="py-10 sm:py-14">
        <div className="w-full px-4 sm:px-4 sm:px-6 lg:px-16 mx-auto max-w-[720px] text-center">
          <Flame className="w-8 h-8 text-amber-500 mx-auto mb-4" aria-hidden />
          <h3 className={`text-lg font-bold ${hybrid.editorialHeading} mb-3`}>Light a candle</h3>
          <p className={`${hybrid.editorialBody} text-sm sm:text-base leading-relaxed`}>
            When you light a candle, the portrait briefly returns to full colour — a personal moment
            of remembrance. As more candles are lit across the community, colour is restored for
            everyone who visits.
          </p>
        </div>
      </EditorialSection>
    </div>
  );
}

