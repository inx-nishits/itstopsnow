import type { ResearchCategory, ResearchHeroContent, ResearchItem } from "./types";

/** Mock CMS hero — will be replaced when Sanity is wired */
export const RESEARCH_HERO: ResearchHeroContent = {
  eyebrow: "Evidence & policy",
  title: "Research & Evidence",
  description:
    "Peer-reviewed analysis and systemic reviews underpinning the case for reform. Browse reports as articles or download the original PDF.",
  imageSrc:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1920",
  imageAlt: "Data analysis and research charts",
};

/** Mock CMS categories — `enabled` simulates admin enable/disable */
export const RESEARCH_CATEGORIES: ResearchCategory[] = [
  { id: "all", label: "All", enabled: true },
  { id: "mental-health", label: "Mental Health", enabled: true },
  { id: "systemic-issues", label: "Systemic Issues", enabled: true },
  { id: "policy", label: "Policy", enabled: true },
  { id: "data-analysis", label: "Data Analysis", enabled: true },
  { id: "archived", label: "Archived", enabled: false },
];

const SAMPLE_PDF =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "r1",
    slug: "mental-health-impact-report-2025",
    title: "The Silent Crisis: Mental Health Impact of Long-Term Investigations",
    author: "Dr. Sarah Jenkins",
    institution: "University of Policing Studies",
    date: "March 2025",
    publishedAt: "2025-03-15",
    category: "Mental Health",
    tags: ["Wellbeing", "IOPC", "Data Analysis"],
    summary:
      "A comprehensive analysis of 5,000 officers undergoing multi-year misconduct investigations, highlighting severe psychological deterioration and the urgent need for a 12-month limit.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    keyFindings: [
      "5x increase in PTSD diagnoses for investigations exceeding 24 months.",
      "Average duration of current misconduct investigations is 4.2 years.",
      "Less than 10% of suspended officers receive weekly welfare contact.",
    ],
    featured: true,
    order: 1,
    methodology:
      "Data was collected via anonymized surveys across 43 territorial police forces in England and Wales between Jan 2023 and Dec 2024.",
    hasPdf: true,
    pdfUrl: SAMPLE_PDF,
    articleContent: `This landmark study examines the psychological toll of prolonged misconduct investigations on serving and suspended officers across England and Wales.

Drawing on survey responses from more than 5,000 participants, the research documents a sharp rise in clinical anxiety, depression, and PTSD where cases extend beyond two years. Welfare provision remains inconsistent: fewer than one in ten suspended officers report structured weekly contact from their force.

The findings reinforce the campaign's central demand for a hard 12-month cap on investigations, paired with mandatory welfare oversight from the point of suspension.`,
  },
  {
    id: "r2",
    slug: "financial-cost-of-suspensions",
    title: "Economic Realities: The Financial Burden of Officer Suspensions",
    author: "Prof. David Miller",
    institution: "Public Sector Economics Institute",
    date: "January 2025",
    publishedAt: "2025-01-20",
    category: "Systemic Issues",
    tags: ["Economics", "Taxpayer", "Policy"],
    summary:
      "Detailing the £120m annual cost to the taxpayer resulting from suspended officers awaiting lengthy IOPC case conclusions.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    keyFindings: [
      "Average cost per suspended officer exceeds £150,000 in salary and legal fees.",
      "Total taxpayer waste has increased by 38% since the introduction of current IOPC guidelines.",
      "45% of total campaign/legal spend is consumed by procedural delays.",
    ],
    featured: false,
    order: 2,
    hasPdf: true,
    pdfUrl: SAMPLE_PDF,
    articleContent: `Suspended officers continue to draw full salary while cases drag on — often for years. This report quantifies the direct and indirect costs borne by the public.

Legal fees, backfill staffing, and opportunity costs compound the headline salary figure. Forces with the longest average case durations show the steepest year-on-year increases in total suspension spend.`,
  },
  {
    id: "r3",
    slug: "post-incident-procedures-review",
    title: "Post-Incident Procedures: A Decade in Review",
    author: "Insp. James Harding (Ret.)",
    institution: "It Stops Now Foundation",
    date: "November 2024",
    publishedAt: "2024-11-08",
    category: "Policy",
    tags: ["PIP", "Firearms", "Best Practice"],
    summary:
      "An operational review of Post-Incident Procedures following lethal force, identifying critical failures in immediate officer welfare and legal protection.",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop",
    keyFindings: [
      "40% average delay in compiling initial statements under standard PIP protocols.",
      "Welfare coordinator role is absent or unstaffed in 65% of surveyed divisions.",
      "Independent legal advice is delayed by an average of 18 hours post-incident.",
    ],
    featured: false,
    order: 3,
    hasPdf: true,
    pdfUrl: SAMPLE_PDF,
    articleContent: `Post-Incident Procedures are designed to protect officers and the public after critical incidents. This decade-long review finds systemic slippage between policy intent and operational reality.

Delays in welfare contact and legal representation leave officers exposed during the most vulnerable hours after an incident. The report sets out a practical minimum standard every force should adopt immediately.`,
  },
  {
    id: "r4",
    slug: "iopc-transparency-data-2024",
    title: "IOPC Transparency Data: What the Numbers Really Show",
    author: "Dr. Amara Osei",
    institution: "Centre for Police Accountability",
    date: "October 2024",
    publishedAt: "2024-10-12",
    category: "Data Analysis",
    tags: ["IOPC", "Transparency", "Statistics"],
    summary:
      "A data-led breakdown of published IOPC statistics, exposing gaps in reporting consistency and the under-counting of prolonged cases.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    keyFindings: [
      "Median case duration is under-reported when interim suspensions are excluded.",
      "Regional variation in case length exceeds 300% between force areas.",
      "Public dashboards omit welfare outcome data entirely.",
    ],
    featured: false,
    order: 4,
    hasPdf: false,
    articleContent: `Official transparency releases provide only a partial picture. By reconciling IOPC publications with FOI responses from 12 forces, this analysis reconstructs a more accurate timeline distribution.

The conclusion is stark: without harmonised definitions and mandatory welfare metrics, public accountability remains cosmetic rather than substantive.`,
  },
  {
    id: "r5",
    slug: "officer-wellbeing-interventions",
    title: "Officer Wellbeing Interventions During Live Investigations",
    author: "Dr. Helen Marsh",
    institution: "Occupational Health Research Unit",
    date: "September 2024",
    publishedAt: "2024-09-05",
    category: "Mental Health",
    tags: ["Wellbeing", "Interventions", "Clinical"],
    summary:
      "Evaluates peer-support and clinical interventions available to officers under investigation and ranks them by evidenced outcomes.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    keyFindings: [
      "Structured peer support reduces self-reported isolation scores by 34%.",
      "Forces with in-house occupational health see faster return-to-work rates.",
      "Ad-hoc welfare check-ins show no statistically significant benefit.",
    ],
    featured: false,
    order: 5,
    hasPdf: true,
    pdfUrl: SAMPLE_PDF,
    articleContent: `Not all welfare provision is equal. This review compares intervention models across 28 forces and links each to clinical outcome data where available.

The evidence supports ring-fenced occupational health pathways for any officer suspended or placed on restricted duties for more than 30 days.`,
  },
  {
    id: "r6",
    slug: "legal-reform-options-briefing",
    title: "Legal Reform Options: A Policy Briefing for Parliament",
    author: "It Stops Now Policy Team",
    institution: "It Stops Now Foundation",
    date: "August 2024",
    publishedAt: "2024-08-18",
    category: "Policy",
    tags: ["Parliament", "Reform", "Legislation"],
    summary:
      "Sets out three legislative pathways to introduce a 12-month investigation cap, with implementation notes for MPs and PCCs.",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop",
    keyFindings: [
      "Primary legislation offers the strongest safeguard but longest timeline.",
      "Statutory guidance reform could be enacted within one parliamentary session.",
      "Hybrid models pairing IOPC rules with judicial review triggers are viable.",
    ],
    featured: false,
    order: 6,
    hasPdf: true,
    pdfUrl: SAMPLE_PDF,
    articleContent: `This briefing is designed for parliamentarians evaluating practical routes to reform. Each pathway is scored against legal durability, speed of implementation, and enforceability.

The campaign's preferred route combines statutory guidance with an independent review trigger at month nine for any case still open.`,
  },
];

export function getEnabledResearchCategories() {
  return RESEARCH_CATEGORIES.filter((category) => category.enabled);
}

export function getResearchBySlug(slug: string): ResearchItem | undefined {
  return RESEARCH_ITEMS.find((item) => item.slug === slug);
}
