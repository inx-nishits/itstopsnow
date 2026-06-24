import { defineField, defineType } from "sanity";

export const homepageInformationAlert = defineType({
  name: "homepageInformationAlert",
  title: "Homepage Information Alert",
  type: "document",
  fields: [
    defineField({
      name: "enabled",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "badgeLabel",
      title: "Badge Label",
      type: "string",
      description: "Short label shown in the alert pill (e.g. Important).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "messageBefore",
      title: "Message (before highlight)",
      type: "string",
      description: "Text before the highlighted phrase.",
    }),
    defineField({
      name: "highlightPhrase",
      title: "Highlighted Phrase",
      type: "string",
      description: "Accent-coloured phrase within the message (e.g. 12 of 13).",
    }),
    defineField({
      name: "messageAfter",
      title: "Message (after highlight)",
      type: "text",
      description: "Remaining message text after the highlighted phrase.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      description: "Internal path or full URL.",
    }),
    defineField({
      name: "footnote",
      title: "Statistics Footnote",
      type: "text",
      description: "Optional supporting line below the statistics grid.",
    }),
  ],
  preview: {
    select: { title: "badgeLabel", subtitle: "messageAfter" },
  },
});
