import { CompactPageHero } from "@/components/layout/PageHero";

/** Compact research listing hero — uses shared page hero tokens */
export default function ResearchHero() {
  return (
    <CompactPageHero
      eyebrow="Evidence & policy"
      title="Research & Evidence"
      description="Peer-reviewed analysis and systemic reviews underpinning the case for reform."
      imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920"
    />
  );
}
