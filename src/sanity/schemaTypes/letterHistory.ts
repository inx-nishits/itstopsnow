import { defineType, defineField } from 'sanity'

export const letterHistory = defineType({
  name: 'letterHistory',
  title: 'Letter History (Sent Emails)',
  type: 'document',
  fields: [
    defineField({
      name: 'campaignId',
      title: 'Campaign Reference',
      type: 'reference',
      to: [{ type: 'campaign' }],
    }),
    defineField({
      name: 'templateId',
      title: 'Template Reference',
      type: 'reference',
      to: [{ type: 'letterTemplate' }],
    }),
    defineField({
      name: 'mpName',
      title: 'MP Name',
      type: 'string',
    }),
    defineField({
      name: 'constituency',
      title: 'Constituency',
      type: 'string',
    }),
    defineField({
      name: 'senderHash',
      title: 'Sender Hash (Anonymized)',
      type: 'string',
      description: 'A hash of the senders details to prevent storing PII directly while allowing unique participant counting.',
    }),
    defineField({
      name: 'sentAt',
      title: 'Sent At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Delivery Status',
      type: 'string',
      options: { list: ['pending', 'delivered', 'failed'] },
      initialValue: 'pending',
    }),
  ],
})
