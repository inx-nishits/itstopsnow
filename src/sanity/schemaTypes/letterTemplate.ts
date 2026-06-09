import { defineType, defineField } from 'sanity'

export const letterTemplate = defineType({
  name: 'letterTemplate',
  title: 'Letter Template',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Template Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'campaign',
      title: 'Related Campaign',
      type: 'reference',
      to: [{ type: 'campaign' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'templateCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Template Body',
      type: 'text',
      description: 'Available variables: {{MP_NAME}}, {{USER_NAME}}, {{USER_POSTCODE}}, {{USER_ADDRESS}}, {{CONSTITUENCY}}, {{CAMPAIGN_NAME}}',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'usageCount',
      title: 'Usage Count',
      type: 'number',
      description: 'Number of times this template was sent or downloaded.',
      initialValue: 0,
      readOnly: true,
    }),
  ],
})
