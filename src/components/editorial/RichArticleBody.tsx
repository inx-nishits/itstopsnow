"use client";

import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type RichBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "youtube"; videoId: string; title?: string }
  | { type: "linkedImage"; src: string; href: string; alt: string; caption?: string }
  | { type: "externalLink"; href: string; label: string; description?: string };

interface RichArticleBodyProps {
  blocks: RichBlock[];
  className?: string;
}

export default function RichArticleBody({ blocks, className }: RichArticleBodyProps) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[#010B19] prose-a:text-[#1877F2] prose-p:text-slate-600 prose-p:leading-relaxed",
        className
      )}
    >
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "heading":
            return (
              <h3 key={index} className="text-2xl mt-12 mb-6 text-[#010B19] not-prose">
                {block.text}
              </h3>
            );
          case "youtube":
            return (
              <figure key={index} className="not-prose my-10">
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-[#010B19] shadow-lg">
                  <iframe
                    title={block.title ?? "Embedded video"}
                    src={`https://www.youtube-nocookie.com/embed/${block.videoId}`}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {block.title && (
                  <figcaption className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <Play className="h-3.5 w-3.5 text-[#1877F2]" />
                    {block.title}
                  </figcaption>
                )}
              </figure>
            );
          case "linkedImage":
            return (
              <figure key={index} className="not-prose my-10">
                <a
                  href={block.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-slate-200 shadow-md transition-shadow hover:shadow-xl"
                >
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="flex items-center justify-center gap-2 bg-[#010B19] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white">
                    <ExternalLink className="h-3.5 w-3.5 text-[#1877F2]" />
                    Tap to visit linked source
                  </span>
                </a>
                {block.caption && (
                  <figcaption className="mt-2 text-sm text-slate-500">{block.caption}</figcaption>
                )}
              </figure>
            );
          case "externalLink":
            return (
              <div
                key={index}
                className="not-prose my-8 rounded-xl border border-[#1877F2]/20 bg-[#1877F2]/5 p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1877F2] mb-2">
                  Related resource
                </p>
                <Link
                  href={block.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-[#010B19] hover:text-[#1877F2] transition-colors"
                >
                  {block.label}
                  <ExternalLink className="h-4 w-4" />
                </Link>
                {block.description && (
                  <p className="mt-2 text-sm text-slate-600">{block.description}</p>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
