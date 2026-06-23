import type { RichBlock } from "@/components/editorial/RichArticleBody";

export function buildStoryRichBlocks(
  paragraphs: string[],
  storyId: number
): RichBlock[] {
  if (paragraphs.length === 0) return [];

  const blocks: RichBlock[] = [{ type: "paragraph", text: paragraphs[0] }];

  if (storyId === 1 && paragraphs.length > 1) {
    blocks.push({
      type: "youtube",
      videoId: "ScMzIvxBSi4",
      title: "Officer welfare — lived experience (illustrative embed)",
    });
    blocks.push({ type: "paragraph", text: paragraphs[1] });
    if (paragraphs[2]) {
      blocks.push({
        type: "linkedImage",
        src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
        href: "https://www.itstopsnow.org/the-issue",
        alt: "Investigation documents and correspondence",
        caption: "Illustrative: cross-reference documents linked from the story body.",
      });
      blocks.push({ type: "paragraph", text: paragraphs[2] });
    }
    paragraphs.slice(3).forEach((text) => blocks.push({ type: "paragraph", text }));
    blocks.push({
      type: "externalLink",
      href: "/take-action",
      label: "Use our letter templates to contact your MP",
      description: "Turn lived experience into parliamentary pressure.",
    });
    return blocks;
  }

  paragraphs.slice(1).forEach((text) => blocks.push({ type: "paragraph", text }));
  return blocks;
}

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
    alt: "Parliament building",
    caption: "Parliamentary debate scheduled — illustration for prototype layout.",
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
