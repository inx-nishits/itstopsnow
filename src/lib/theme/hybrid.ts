/** Shared class tokens for hybrid light/dark pages */
export const hybrid = {
  editorialCard: "bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm",
  editorialCardHover:
    "hover:border-[#1877F2]/30 hover:shadow-md transition-all duration-300 cursor-pointer",
  editorialHeading: "text-[#010B19]",
  editorialBody: "text-slate-600",
  editorialMuted: "text-slate-500",
  editorialBorder: "border-slate-200",
  editorialInput:
    "bg-white border border-slate-200 text-[#010B19] placeholder:text-slate-400 focus:border-[#1877F2]/50",
  editorialChip:
    "bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 cursor-pointer",
  editorialChipActive: "bg-[#1877F2] text-white border-[#1877F2] cursor-pointer",
  campaignCard: "bg-[#050A14] border border-white/10 rounded-2xl sm:rounded-3xl",
} as const;
