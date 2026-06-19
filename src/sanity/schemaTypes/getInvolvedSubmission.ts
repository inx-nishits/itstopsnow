import { defineType, defineField } from "sanity";

export const getInvolvedSubmission = defineType({
  name: "getInvolvedSubmission",
  title: "Get Involved Submissions",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "role",
      title: "Role / Force",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telephone",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "resendEmailId",
      title: "Resend Email ID",
      type: "string",
      description: "Reference ID from Resend for team notification delivery.",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "homepage-modal",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title ?? "Submission",
        subtitle: [subtitle, status].filter(Boolean).join(" · "),
      };
    },
  },
});
