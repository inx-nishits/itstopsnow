import { PageHero } from "@/components/layout/PageHero";
import { RESEARCH_HERO } from "@/lib/research/data";

export default function ResearchHero() {
  return (
    <PageHero
      variant="utility"
      eyebrow={RESEARCH_HERO.eyebrow}
      title={RESEARCH_HERO.title}
      description={RESEARCH_HERO.description}
      imageSrc={RESEARCH_HERO.imageSrc}
      imageAlt={RESEARCH_HERO.imageAlt}
    />
  );
}
