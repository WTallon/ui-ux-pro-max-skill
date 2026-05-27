import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'
import { withRateLimit, type RateLimitType } from '@/lib/ratelimit-middleware'
import type { UserRole } from '@/types'

const MAX_BODY_SIZE = 10 * 1024 // 10kb

export async function getAuthenticatedUser(req: NextRequest) {
  void req
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export async function requireAuth(
  req: NextRequest,
  allowedRoles?: UserRole[]
): Promise<{ userId: string; role: UserRole } | NextResponse> {
  const user = await getAuthenticatedUser(req)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createSupabaseServerClient()
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!userData) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  if (allowedRoles && !allowedRoles.includes(userData.role as UserRole)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return { userId: user.id, role: userData.role as UserRole }
}

export async function parseBody<T>(req: NextRequest): Promise<T | NextResponse> {
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  try {
    const text = await req.text()
    if (text.length > MAX_BODY_SIZE) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
    }
    return JSON.parse(text) as T
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
}

export function apiError(message: string, status = 500): NextResponse {
  console.error(`[API Error] ${message}`)
  return NextResponse.json({ error: message }, { status })
}

export async function withApiMiddleware(
  req: NextRequest,
  handler: () => Promise<NextResponse>,
  options: {
    rateLimit?: RateLimitType
    rateLimitId?: string
  } = {}
): Promise<NextResponse> {
  try {
    if (options.rateLimit) {
      const limited = await withRateLimit(req, options.rateLimit, options.rateLimitId)
      if (limited) return limited
    }
    return await handler()
  } catch (err) {
    console.error('[API] Unhandled error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
