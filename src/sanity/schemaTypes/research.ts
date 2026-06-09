import { defineType, defineField } from 'sanity'

export const research = defineType({
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Research Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Institution / Author',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
    }),
  ],
})
