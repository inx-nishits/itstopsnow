"use client";

import type { ResearchItem } from "@/lib/research/types";
import ResearchCard from "@/components/research/ResearchCard";

interface ResearchEvidenceListProps {
  items: ResearchItem[];
  onViewReport: (item: ResearchItem) => void;
}

export default function ResearchEvidenceList({ items, onViewReport }: ResearchEvidenceListProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1877F2] mb-6">
        All publications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {items.map((item) => (
          <ResearchCard key={item.id} item={item} onViewReport={onViewReport} />
        ))}
      </div>
    </div>
  );
}
