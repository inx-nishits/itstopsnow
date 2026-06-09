import { defineType, defineField } from 'sanity'

export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Campaign Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'goal',
      title: 'Campaign Goal',
      type: 'string',
      description: 'A brief summary of what this campaign is trying to achieve.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { 
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Active', value: 'active' },
          { title: 'Completed', value: 'completed' },
          { title: 'Archived', value: 'archived' }
        ] 
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      initialValue: 'Take Action Now',
    }),
    // Statistics (Read-only/auto-updated in a real app, but editable here for flexibility)
    defineField({
      name: 'stats',
      title: 'Campaign Statistics',
      type: 'object',
      fields: [
        { name: 'lettersStarted', title: 'Letters Started', type: 'number', initialValue: 0 },
        { name: 'lettersCompleted', title: 'Letters Completed', type: 'number', initialValue: 0 },
        { name: 'lettersSent', title: 'Letters Sent', type: 'number', initialValue: 0 },
        { name: 'pdfDownloads', title: 'PDF Downloads', type: 'number', initialValue: 0 },
        { name: 'docxDownloads', title: 'DOCX Downloads', type: 'number', initialValue: 0 },
        { name: 'participants', title: 'Total Participants', type: 'number', initialValue: 0 },
      ]
    }),
  ],
})
