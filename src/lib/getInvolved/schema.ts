import { z } from "zod";

export const getInvolvedSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254),
  role: z.string().trim().max(120).optional().default(""),
  phone: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

export type GetInvolvedPayload = z.infer<typeof getInvolvedSchema>;

export type GetInvolvedField = keyof GetInvolvedPayload;

export type GetInvolvedFieldErrors = Partial<Record<GetInvolvedField, string>>;

export function validateGetInvolvedFields(
  values: GetInvolvedPayload
): GetInvolvedFieldErrors {
  const result = getInvolvedSchema.safeParse(values);
  if (result.success) return {};

  const errors: GetInvolvedFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as GetInvolvedField;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}
