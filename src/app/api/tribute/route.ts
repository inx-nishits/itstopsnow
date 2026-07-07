import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

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

    const lowerMessage = validatedData.message.toLowerCase();
    if (SPAM_WORDS.some(word => lowerMessage.includes(word))) {
      return NextResponse.json({ error: 'Your message was flagged by our automated spam filter.' }, { status: 400 });
    }

    // Without Sanity, we just return a success response
    return NextResponse.json({ success: true, message: 'Tribute submitted for moderation' });
  } catch (error) {
    console.error('Tribute API Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data provided' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to submit tribute' }, { status: 500 });
  }
}
