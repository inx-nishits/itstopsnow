"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WallFilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  selectedForce: string;
  onForceChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (value: string) => void;
  selectedRegion: string;
  onRegionChange: (value: string) => void;
  selectedYear: string;
  onYearChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  forceOptions: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onApply: () => void;
}

/** Mobile-only filter bottom sheet — keeps filters off the memorial gallery. */
export default function WallFilterBottomSheet({
  open,
  onClose,
  selectedForce,
  onForceChange,
  selectedRole,
  onRoleChange,
  selectedRegion,
  onRegionChange,
  selectedYear,
  onYearChange,
  sortBy,
  onSortChange,
  forceOptions,
  hasActiveFilters,
  onClearFilters,
  onApply,
}: WallFilterBottomSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Filter memorial wall">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close filters"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-[#050A14] border-t border-white/10 shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#050A14] border-b border-white/10">
              <h2 className="text-sm font-semibold text-white tracking-wide">Refine the wall</h2>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 py-5 space-y-4">
              <label className="flex flex-col gap-2">
                <span className="text-xs text-slate-500">Force</span>
                <select
                  value={selectedForce}
                  onChange={(e) => onForceChange(e.target.value)}
                  className="bg-[#020611] border border-white/10 text-slate-200 text-base px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-[#1877F2]/50"
                >
                  <option value="All">All forces</option>
                  {forceOptions.map((force) => (
                    <option key={force} value={force}>{force}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs text-slate-500">Role</span>
                <select
                  value={selectedRole}
                  onChange={(e) => onRoleChange(e.target.value)}
                  className="bg-[#020611] border border-white/10 text-slate-200 text-base px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-[#1877F2]/50"
                >
                  <option value="All">All roles</option>
                  <option value="PC">Police Constable</option>
                  <option value="PCSO">PCSO</option>
                  <option value="DC">Detective Constable</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs text-slate-500">Region</span>
                <select
                  value={selectedRegion}
                  onChange={(e) => onRegionChange(e.target.value)}
                  className="bg-[#020611] border border-white/10 text-slate-200 text-base px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-[#1877F2]/50"
                >
                  <option value="All">All regions</option>
                  <option value="London">London & South</option>
                  <option value="Midlands">Midlands</option>
                  <option value="North">North England</option>
                  <option value="Scotland">Scotland</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs text-slate-500">Year of passing</span>
                <select
                  value={selectedYear}
                  onChange={(e) => onYearChange(e.target.value)}
                  className="bg-[#020611] border border-white/10 text-slate-200 text-base px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-[#1877F2]/50"
                >
                  <option value="All">All years</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs text-slate-500">Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-[#020611] border border-white/10 text-slate-200 text-base px-4 min-h-[52px] rounded-xl focus:outline-none focus:border-[#1877F2]/50"
                >
                  <option value="All">Default order</option>
                  <option value="Recently">Recently added</option>
                  <option value="MostTributed">Most tributed</option>
                </select>
              </label>
            </div>

            <div className="sticky bottom-0 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-[#050A14] border-t border-white/5 flex flex-col gap-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="min-h-[48px] text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Clear all filters
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onApply();
                  onClose();
                }}
                className="min-h-[52px] w-full rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-sm font-semibold tracking-wide transition-colors"
              >
                Show results
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
