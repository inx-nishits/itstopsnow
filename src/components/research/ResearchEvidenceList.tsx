"use client";

import type { ResearchItem } from "@/lib/research/types";
import ResearchCard from "@/components/research/ResearchCard";

interface ResearchEvidenceListProps {
  items: ResearchItem[];
}

export default function ResearchEvidenceList({ items }: ResearchEvidenceListProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[#1877F2] mb-6">
        All publications
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {items.map((item) => (
          <ResearchCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
