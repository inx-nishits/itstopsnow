import type { ResearchItem } from "./types";

export const RESEARCH_CATEGORIES = [
  "All",
  "Mental Health",
  "Systemic Issues",
  "Policy",
  "Data Analysis",
] as const;

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "r1",
    slug: "mental-health-impact-report-2025",
    title: "The Silent Crisis: Mental Health Impact of Long-Term Investigations",
    author: "Dr. Sarah Jenkins",
    institution: "University of Policing Studies",
    date: "March 2025",
    category: "Mental Health",
    tags: ["Wellbeing", "IOPC", "Data Analysis"],
    summary:
      "A comprehensive analysis of 5,000 officers undergoing multi-year misconduct investigations, highlighting severe psychological deterioration and the urgent need for a 12-month limit.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    keyFindings: [
      "5x increase in PTSD diagnoses for investigations exceeding 24 months.",
      "Average duration of current misconduct investigations is 4.2 years.",
      "Less than 10% of suspended officers receive weekly welfare contact.",
    ],
    featured: true,
    methodology:
      "Data was collected via anonymized surveys across 43 territorial police forces in England and Wales between Jan 2023 and Dec 2024.",
  },
  {
    id: "r2",
    slug: "financial-cost-of-suspensions",
    title: "Economic Realities: The Financial Burden of Officer Suspensions",
    author: "Prof. David Miller",
    institution: "Public Sector Economics Institute",
    date: "January 2025",
    category: "Systemic Issues",
    tags: ["Economics", "Taxpayer", "Policy"],
    summary:
      "Detailing the £120m annual cost to the taxpayer resulting from suspended officers awaiting lengthy IOPC case conclusions.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    keyFindings: [
      "Average cost per suspended officer exceeds £150,000 in salary and legal fees.",
      "Total taxpayer waste has increased by 38% since the introduction of current IOPC guidelines.",
      "45% of total campaign/legal spend is consumed by procedural delays.",
    ],
    featured: false,
  },
  {
    id: "r3",
    slug: "post-incident-procedures-review",
    title: "Post-Incident Procedures: A Decade in Review",
    author: "Insp. James Harding (Ret.)",
    institution: "It Stops Now Foundation",
    date: "November 2024",
    category: "Policy",
    tags: ["PIP", "Firearms", "Best Practice"],
    summary:
      "An operational review of Post-Incident Procedures following lethal force, identifying critical failures in immediate officer welfare and legal protection.",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    keyFindings: [
      "40% average delay in compiling initial statements under standard PIP protocols.",
      "Welfare coordinator role is absent or unstaffed in 65% of surveyed divisions.",
      "Independent legal advice is delayed by an average of 18 hours post-incident.",
    ],
    featured: false,
  },
];

export function getResearchBySlug(slug: string): ResearchItem | undefined {
  return RESEARCH_ITEMS.find((item) => item.slug === slug);
}

export function downloadResearchReport(report: ResearchItem) {
  const element = document.createElement("a");
  const file = new Blob(
    [
      `IT STOPS NOW - RESEARCH REPORT\n`,
      `==============================\n`,
      `Title: ${report.title}\n`,
      `Author: ${report.author}\n`,
      `Institution: ${report.institution}\n`,
      `Date: ${report.date}\n`,
      `Category: ${report.category}\n\n`,
      `SUMMARY:\n`,
      `${report.summary}\n\n`,
      `KEY FINDINGS:\n`,
      report.keyFindings.map((f, i) => `${i + 1}. ${f}`).join("\n"),
      `\n\n---\n`,
      `Supported by Pocket Sergeant Ltd. & It Stops Now Campaign\n`,
    ],
    { type: "text/plain" }
  );
  element.href = URL.createObjectURL(file);
  element.download = `${report.slug}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
