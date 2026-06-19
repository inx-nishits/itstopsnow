import { defineType, defineField } from "sanity";

export const homepageVoice = defineType({
  name: "homepageVoice",
  title: "Homepage Voice",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "relationship",
      title: "Relationship / Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "portraitImage",
      title: "Portrait / Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "relationship", media: "portraitImage" },
  },
});
