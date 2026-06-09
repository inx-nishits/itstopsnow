import { defineType, defineField } from 'sanity'

export const timelineEvent = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
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
      name: 'date',
      title: 'Date / Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      options: { list: ['Joined', 'Promotion', 'Award', 'Event', 'Legacy'] },
      initialValue: 'Event',
    }),
  ],
})
