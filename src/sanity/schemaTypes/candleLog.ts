import { defineType, defineField } from 'sanity'

export const candleLog = defineType({
  name: 'candleLog',
  title: 'Candle Log',
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
      name: 'userHash',
      title: 'User Hash (Anonymized)',
      type: 'string',
      description: 'Used to enforce one-candle-per-user per memorial without storing PII.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Lit At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
