import type { ResearchItem } from "./types";

export function parseResearchDate(date: string): number {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function matchesResearchSearch(item: ResearchItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    item.title,
    item.author,
    item.institution,
    item.summary,
    item.category,
    ...item.tags,
    ...item.keyFindings,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export function sortResearchItems(items: ResearchItem[], sortBy: "date" | "title"): ResearchItem[] {
  const list = [...items];

  if (sortBy === "title") {
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }

  return list.sort((a, b) => {
    const dateDiff = parseResearchDate(b.publishedAt) - parseResearchDate(a.publishedAt);
    if (dateDiff !== 0) return dateDiff;
    return a.order - b.order;
  });
}

export function downloadResearchPdf(report: ResearchItem) {
  if (report.pdfUrl) {
    const anchor = document.createElement("a");
    anchor.href = report.pdfUrl;
    anchor.download = `${report.slug}.pdf`;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return;
  }

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
      report.keyFindings.map((finding, index) => `${index + 1}. ${finding}`).join("\n"),
      report.articleContent ? `\n\nARTICLE:\n${report.articleContent}` : "",
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
  URL.revokeObjectURL(element.href);
}
