import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { getInvolvedSchema } from "@/lib/getInvolved/schema";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
  });
}

function isResendConfigured() {
  const key = process.env.RESEND_API_KEY;
  return Boolean(key && !key.startsWith("re_123"));
}

function formatSubmissionEmail(payload: z.infer<typeof getInvolvedSchema>) {
  return [
    "New Get Involved submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.role ? `Role / Force: ${payload.role}` : null,
    payload.phone ? `Telephone: ${payload.phone}` : null,
    payload.message ? `\nMessage:\n${payload.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(request: Request) {
  try {
    if (ratelimit) {
      const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
      const { success } = await ratelimit.limit(`get_involved_${ip}`);
      if (!success) {
        return NextResponse.json(
          { error: "Too many submissions. Please try again later." },
          { status: 429 }
        );
      }
    }

    const body = await request.json();
    const validatedData = getInvolvedSchema.parse(body);

    let resendEmailId: string | undefined;

    const notifyEmail =
      process.env.GET_INVOLVED_NOTIFY_EMAIL || "campaigns@itstopsnow.org";
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "It Stops Now <campaigns@itstopsnow.org>";

    if (isResendConfigured()) {
      const { data: teamEmail, error: teamError } = await resend.emails.send({
        from: fromAddress,
        to: [notifyEmail],
        replyTo: validatedData.email,
        subject: `Get Involved: ${validatedData.name}`,
        text: formatSubmissionEmail(validatedData),
      });

      if (teamError) {
        console.error("[get-involved] Resend team notification failed:", teamError);
      } else {
        resendEmailId = teamEmail?.id;
      }

      const { error: confirmError } = await resend.emails.send({
        from: fromAddress,
        to: [validatedData.email],
        subject: "Thank you for standing with It Stops Now",
        text: `Dear ${validatedData.name},\n\nThank you for registering your interest in It Stops Now. We have received your details and will be in touch.\n\nTogether, we can make a difference.\n\nIt Stops Now`,
      });

      if (confirmError) {
        console.error("[get-involved] Resend confirmation failed:", confirmError);
      }
    } else {
      console.log("[get-involved] Resend not configured. Submission:", validatedData);
    }

    const persisted = Boolean(resendEmailId);

    if (!persisted && isResendConfigured()) {
      return NextResponse.json(
        { error: "We could not save your submission. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: resendEmailId ?? "dev_submission",
    });
  } catch (error) {
    console.error("[get-involved] Route error:", error);
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      return NextResponse.json(
        { error: "Please check the form and try again.", fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
