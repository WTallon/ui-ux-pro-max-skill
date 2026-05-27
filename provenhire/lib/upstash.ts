import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

function createRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    throw new Error('Upstash Redis credentials not set')
  }
  return new Redis({ url, token })
}

function createRateLimiter(window: string, count: number, prefix: string) {
  return new Ratelimit({
    redis: createRedis(),
    limiter: Ratelimit.slidingWindow(count, window as Parameters<typeof Ratelimit.slidingWindow>[1]),
    analytics: true,
    prefix,
  })
}

export function getAuthRatelimit() {
  return createRateLimiter('15 m', 5, 'ratelimit:auth')
}

export function getApiRatelimit() {
  return createRateLimiter('1 m', 10, 'ratelimit:api')
}

export function getApplicationRatelimit() {
  return createRateLimiter('1 d', 3, 'ratelimit:application')
}

export const authRatelimit = {
  limit: async (id: string) => getAuthRatelimit().limit(id),
}

export const apiRatelimit = {
  limit: async (id: string) => getApiRatelimit().limit(id),
}

export const applicationRatelimit = {
  limit: async (id: string) => getApplicationRatelimit().limit(id),
}

export async function checkRateLimit(
  limiter: { limit: (id: string) => Promise<{ success: boolean; reset: number; remaining: number }> },
  identifier: string
): Promise<{ success: boolean; reset: number; remaining: number }> {
  const result = await limiter.limit(identifier)
  return {
    success: result.success,
    reset: result.reset,
    remaining: result.remaining,
  }
}
