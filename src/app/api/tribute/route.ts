import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'), // Max 3 tributes per hour per IP
  });
}

const TributeSchema = z.object({
  memorialId: z.string().min(5),
  authorName: z.string().min(2),
  authorEmail: z.string().email(),
  relationship: z.string(),
  message: z.string().min(10).max(2000),
  // Image handled separately or via URL for now
});

const SPAM_WORDS = ['buy now', 'crypto', 'click here', 'viagra', 'casino', 'bitcoin'];

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
    
    if (ratelimit) {
      const { success } = await ratelimit.limit(`tribute_${ip}`);
      if (!success) {
        return NextResponse.json({ error: 'You are submitting too fast. Please wait.' }, { status: 429 });
      }
    }

    const body = await request.json();
    const validatedData = TributeSchema.parse(body);

    // Basic Spam Check
    const lowerMessage = validatedData.message.toLowerCase();
    if (SPAM_WORDS.some(word => lowerMessage.includes(word))) {
      return NextResponse.json({ error: 'Your message was flagged by our automated spam filter.' }, { status: 400 });
    }

    // Create Tribute in Sanity as 'pending'
    await sanityClient.create({
      _type: 'tribute',
      memorialRef: { _type: 'reference', _ref: validatedData.memorialId },
      authorName: validatedData.authorName,
      authorEmail: validatedData.authorEmail,
      relationship: validatedData.relationship,
      message: validatedData.message,
      status: 'pending', // Requires admin approval before showing on frontend
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: 'Tribute submitted for moderation' });
  } catch (error) {
    console.error('Tribute API Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data provided' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to submit tribute' }, { status: 500 });
  }
}
