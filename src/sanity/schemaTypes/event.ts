import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
    }),
    defineField({
      name: 'dateLabel',
      title: 'Date Label (display override)',
      type: 'string',
      description: 'Optional formatted date shown on the site e.g. July 15, 2026',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'string',
      description: 'Defaults to /events if empty',
    }),
    defineField({
      name: 'featuredOnHomepage',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
