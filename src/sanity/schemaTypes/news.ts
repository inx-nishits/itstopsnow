import { defineType, defineField } from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Campaign News', 'Parliament', 'Expert Voices', 'Media', 'Research', 'Events'],
      },
    }),
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
    }),
  ],
})
