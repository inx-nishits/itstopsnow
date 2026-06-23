export interface ResearchCategory {
  id: string;
  label: string;
  enabled: boolean;
}

export interface ResearchHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export interface ResearchRecommendation {
  text: string;
}

export interface ResearchItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  institution: string;
  date: string;
  publishedAt: string;
  category: string;
  tags: string[];
  summary: string;
  image: string;
  keyFindings: string[];
  featured: boolean;
  order: number;
  methodology?: string;
  articleContent?: string;
  pdfUrl?: string;
  hasPdf: boolean;
  recommendations?: ResearchRecommendation[];
  highlightStats?: { value: string; label: string }[];
}
