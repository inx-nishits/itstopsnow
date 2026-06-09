import { defineType, defineField } from 'sanity'

export const tribute = defineType({
  name: 'tribute',
  title: 'Tribute',
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
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorEmail',
      title: 'Author Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relationship',
      title: 'Relationship',
      type: 'string',
      options: { list: ['Family', 'Colleague', 'Friend', 'Citizen', 'Other'] },
    }),
    defineField({
      name: 'message',
      title: 'Tribute Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Optional Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'status',
      title: 'Moderation Status',
      type: 'string',
      options: { list: ['pending', 'approved', 'rejected'] },
      initialValue: 'pending',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
