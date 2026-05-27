import { NextRequest, NextResponse } from 'next/server'
import { authRatelimit, apiRatelimit, applicationRatelimit } from '@/lib/upstash'

export type RateLimitType = 'auth' | 'api' | 'application'

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'anonymous'
  )
}

export async function withRateLimit(
  req: NextRequest,
  type: RateLimitType,
  identifier?: string
): Promise<NextResponse | null> {
  const id = identifier ?? getIp(req)
  const limiter =
    type === 'auth'
      ? authRatelimit
      : type === 'application'
      ? applicationRatelimit
      : apiRatelimit

  const result = await limiter.limit(id)

  if (!result.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((result.reset - Date.now()) / 1000)),
          'X-RateLimit-Remaining': String(result.remaining),
        },
      }
    )
  }

  return null
}
