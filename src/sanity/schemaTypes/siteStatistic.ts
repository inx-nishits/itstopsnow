import { defineType, defineField } from "sanity";

export const siteStatistic = defineType({
  name: "siteStatistic",
  title: "Site Statistic",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      description: "Unique identifier e.g. officers, lives, victories, funds",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endValue",
      title: "Statistic Value",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({ name: "prefix", title: "Prefix", type: "string" }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({ name: "suffixText", title: "Suffix Text", type: "string" }),
    defineField({ name: "isPulsing", title: "Pulse Animation", type: "boolean" }),
    defineField({ name: "duration", title: "Counter Duration (seconds)", type: "number" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "endValue" },
  },
});
