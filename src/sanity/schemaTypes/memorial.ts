import { defineType, defineField } from 'sanity'

export const memorial = defineType({
  name: 'memorial',
  title: 'Memorial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Officer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'force',
      title: 'Police Force',
      type: 'string',
    }),
    defineField({
      name: 'rank',
      title: 'Rank',
      type: 'string',
    }),
    defineField({
      name: 'collarNumber',
      title: 'Collar Number',
      type: 'string',
    }),
    defineField({
      name: 'yearsServed',
      title: 'Years Served (e.g. 1998 - 2023)',
      type: 'string',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: ['London', 'Midlands', 'North', 'Scotland'],
      },
    }),
    defineField({
      name: 'age',
      title: 'Age at Passing',
      type: 'number',
    }),
    defineField({
      name: 'dateOfLoss',
      title: 'Date of Loss (display label)',
      type: 'string',
      description: 'e.g. 15 AUG 2019',
    }),
    defineField({
      name: 'familyQuote',
      title: 'Family Tribute Quote',
      type: 'text',
    }),
    defineField({
      name: 'biography',
      title: 'Biography / Life Story',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'quote',
      title: 'Defining Quote',
      type: 'text',
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'candleCount',
      title: 'Candle Count',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'tributeCount',
      title: 'Published Tribute Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'rememberedCount',
      title: 'Times Remembered / Visits',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
