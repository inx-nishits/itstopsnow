import { defineType, defineField } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Support Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Name',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: { list: ['App', 'Book', 'Podcast', 'Helpline'] },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
