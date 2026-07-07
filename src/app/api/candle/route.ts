import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';
import { z } from 'zod';

let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, '1 d'),
  });
}

const CandleSchema = z.object({
  memorialId: z.string().min(5),
  userIdentifier: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
    
    if (ratelimit) {
      const { success } = await ratelimit.limit(`candle_${ip}`);
      if (!success) {
        return NextResponse.json({ error: 'You have lit too many candles recently. Please try again tomorrow.' }, { status: 429 });
      }
    }

    const body = await request.json();
    const { userIdentifier } = CandleSchema.parse(body);

    const userHash = crypto.createHash('sha256').update(userIdentifier).digest('hex');

    // Without Sanity, we just return success for the optimistic UI update
    return NextResponse.json({ success: true, userHash });
  } catch (error) {
    console.error('Candle API Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to light candle' }, { status: 500 });
  }
}
