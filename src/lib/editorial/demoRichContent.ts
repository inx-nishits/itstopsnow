import type { RichBlock } from "@/components/editorial/RichArticleBody";

/** In-article enrichments keyed by story id — mirrors CMS rich-content fields from the requirements. */
const STORY_ENRICHMENTS: Record<
  number,
  { afterParagraph: number; blocks: RichBlock[] }[]
> = {
  1: [
    {
      afterParagraph: 0,
      blocks: [
        {
          type: "youtube",
          videoId: "ScMzIvxBSi4",
          title: "Understanding the impact of prolonged misconduct investigations",
        },
      ],
    },
    {
      afterParagraph: 1,
      blocks: [
        {
          type: "linkedImage",
          src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
          href: "/the-issue",
          alt: "Investigation documents and correspondence",
          caption: "Read the facts about prolonged IOPC investigations on our Issue page.",
        },
      ],
    },
    {
      afterParagraph: 3,
      blocks: [
        {
          type: "externalLink",
          href: "/take-action",
          label: "Contact your MP using our letter templates",
          description: "Turn lived experience into parliamentary pressure.",
        },
      ],
    },
  ],
  2: [
    {
      afterParagraph: 1,
      blocks: [
        {
          type: "linkedImage",
          src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
          href: "/support",
          alt: "Supportive hands — recovery and support resources",
          caption: "Find mental health and welfare resources on our Support page.",
        },
      ],
    },
    {
      afterParagraph: 2,
      blocks: [
        {
          type: "externalLink",
          href: "/research",
          label: "Read our research on investigation delays and mental health",
          description: "Evidence-led reports underpinning the case for reform.",
        },
      ],
    },
  ],
  3: [
    {
      afterParagraph: 1,
      blocks: [
        {
          type: "externalLink",
          href: "/the-issue",
          label: "See the data behind gross misconduct delays",
          description: "The facts on how the current system treats officers under investigation.",
        },
      ],
    },
  ],
  4: [
    {
      afterParagraph: 1,
      blocks: [
        {
          type: "linkedImage",
          src: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200",
          href: "/the-issue",
          alt: "Officer welfare following a critical incident",
          caption: "Learn how post-incident procedures fail officers when trauma support is delayed.",
        },
      ],
    },
    {
      afterParagraph: 2,
      blocks: [
        {
          type: "externalLink",
          href: "/support",
          label: "Access recommended wellbeing resources",
          description: "Apps, books, and podcasts curated for police mental health.",
        },
      ],
    },
  ],
  5: [
    {
      afterParagraph: 1,
      blocks: [
        {
          type: "linkedImage",
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
          href: "/stories",
          alt: "Officers sharing lived experiences",
          caption: "More recovery stories from officers and families who rebuilt their lives.",
        },
      ],
    },
    {
      afterParagraph: 2,
      blocks: [
        {
          type: "externalLink",
          href: "/stories?submit=1",
          label: "Share your recovery story",
          description: "Your experience could help another officer feel less alone.",
        },
      ],
    },
  ],
  6: [
    {
      afterParagraph: 1,
      blocks: [
        {
          type: "externalLink",
          href: "/take-action",
          label: "Demand a 12-month investigation time limit",
          description: "Write to your MP and help end years of financial uncertainty for suspended officers.",
        },
      ],
    },
  ],
};

/**
 * Builds story article blocks from plain-text paragraphs plus optional rich media
 * (images, YouTube embeds, linked images, and cross-reference URLs).
 */
export function buildStoryRichBlocks(
  paragraphs: string[],
  storyId: number
): RichBlock[] {
  if (paragraphs.length === 0) return [];

  const enrichments = STORY_ENRICHMENTS[storyId] ?? [];
  const blocks: RichBlock[] = [];

  paragraphs.forEach((text, index) => {
    blocks.push({ type: "paragraph", text });
    enrichments
      .filter((e) => e.afterParagraph === index)
      .forEach((e) => blocks.push(...e.blocks));
  });

  return blocks;
}

/** Default news article body — replace with per-article CMS content when wired. */
export const NEWS_RICH_BLOCKS: RichBlock[] = [
  {
    type: "paragraph",
    text: "In a major breakthrough for the 'It Stops Now' campaign, a cross-party coalition of MPs has secured a parliamentary debate to discuss the implementation of a statutory 12-month limit on police misconduct investigations.",
  },
  {
    type: "paragraph",
    text: "This milestone comes after months of tireless campaigning by former and serving officers, their families, and our legal advocacy teams. Over 10,000 constituents have written to their MPs using our template letter system, ensuring this issue could no longer be ignored by the Home Office.",
  },
  { type: "heading", text: "What the Debate Will Cover" },
  {
    type: "paragraph",
    text: "The debate will focus on the severe mental health impact of multi-year investigations, the financial cost to taxpayers, and the proposed legislative framework for a strict 12-month limit.",
  },
  {
    type: "linkedImage",
    src: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1200",
    href: "https://www.parliament.uk",
    alt: "Palace of Westminster",
    caption: "Parliamentary debate on officer welfare and investigation time limits.",
  },
  { type: "heading", text: "How You Can Help" },
  {
    type: "paragraph",
    text: "If you haven't already, please use our Take Action page to contact your MP and urge them to attend.",
  },
  {
    type: "externalLink",
    href: "/take-action",
    label: "Write to your MP now",
    description: "Personalise a campaign letter in minutes.",
  },
];
