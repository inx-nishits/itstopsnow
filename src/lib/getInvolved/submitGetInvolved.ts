import type { GetInvolvedPayload } from "./schema";

export type GetInvolvedSubmitResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function submitGetInvolved(
  payload: GetInvolvedPayload
): Promise<GetInvolvedSubmitResult> {
  const response = await fetch("/api/get-involved", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    id?: string;
    error?: string;
    fieldErrors?: Record<string, string>;
  };

  if (!response.ok) {
    return {
      ok: false,
      error: data.error ?? "Something went wrong. Please try again.",
      fieldErrors: data.fieldErrors,
    };
  }

  return { ok: true, id: data.id };
}
