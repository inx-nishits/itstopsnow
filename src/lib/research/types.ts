export interface ResearchItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  institution: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  image: string;
  keyFindings: string[];
  featured: boolean;
  methodology?: string;
}
