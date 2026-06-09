import { defineType, defineField } from 'sanity'

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievement',
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
      title: 'Achievement Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date / Year',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      options: { list: ['Medal', 'Commendation', 'Star', 'Shield'] },
    }),
  ],
})
