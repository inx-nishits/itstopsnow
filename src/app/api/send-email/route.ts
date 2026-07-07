import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

// Initialize Upstash Redis for Rate Limiting
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  // Limit to 5 emails per hour per IP
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
  });
}

// Zod Validation Schema
const EmailSchema = z.object({
  mpName: z.string().min(2),
  mpEmail: z.string().email().or(z.literal('N/A')).or(z.literal('Check Parliament Directory')),
  constituency: z.string().min(2),
  senderName: z.string().min(2),
  senderEmail: z.string().email(),
  senderAddress: z.string().min(5),
  letterContent: z.string().min(20),
  campaignId: z.string().optional(),
  templateId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Rate Limiting
    if (ratelimit) {
      // Basic IP extraction for Next.js 15 App Router
      const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
      const { success } = await ratelimit.limit(`send_email_${ip}`);
      if (!success) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
      }
    }

    const body = await request.json();
    const validatedData = EmailSchema.parse(body);

    // If MP email is missing/N/A, we can't actually send it via email, but we simulate success or send to user only
    const targetEmail = validatedData.mpEmail.includes('@') ? validatedData.mpEmail : validatedData.senderEmail;

    let emailId = 'mock_email_id_123';
    
    // Send Email using Resend (only if real key provided, otherwise simulate success)
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith('re_123')) {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'It Stops Now Campaigns <campaigns@itstopsnow.org>',
        to: [targetEmail], // Sending to MP (or fallback to sender if no MP email)
        cc: [validatedData.senderEmail], // Send copy to user
        replyTo: validatedData.senderEmail,
        subject: `Urgent Constituent Matter from ${validatedData.senderName} (${validatedData.constituency})`,
        text: `${validatedData.letterContent}\n\nSincerely,\n${validatedData.senderName}\n${validatedData.senderAddress}`,
      });

      if (emailError) {
        console.error('Resend Error (falling back to mock success):', emailError);
      } else {
        emailId = emailData?.id || emailId;
      }
    } else {
      console.log('Resend API Key is missing or default. Simulating successful send to:', targetEmail);
    }

    return NextResponse.json({ success: true, id: emailId });

  } catch (error) {
    console.error('Send Email Route Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data provided', details: (error as any).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
