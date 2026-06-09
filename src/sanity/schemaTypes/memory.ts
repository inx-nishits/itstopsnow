import { defineType, defineField } from 'sanity'

export const memory = defineType({
  name: 'memory',
  title: 'Memory & Moment',
  type: 'document',
  fields: [
    defineField({
      name: 'memorialRef',
      title: 'Related Memorial',
      type: 'reference',
      to: [{ type: 'memorial' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Memory Title / Caption',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Memory Description',
      type: 'text',
    }),
    defineField({
      name: 'author',
      title: 'Shared By',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Memory Type',
      type: 'string',
      options: { list: ['Family', 'Colleague', 'Official'] },
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mediaUrl',
      title: 'Audio / Video URL (Optional)',
      type: 'url',
    }),
  ],
})
