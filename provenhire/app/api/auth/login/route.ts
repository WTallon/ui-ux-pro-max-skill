import { NextRequest, NextResponse } from 'next/server'
import { withApiMiddleware, parseBody } from '@/lib/api-helpers'
import { createSupabaseServerClient } from '@/lib/supabase'
import { loginSchema } from '@/lib/validations'
import { sanitizeObject } from '@/lib/utils'

export async function POST(req: NextRequest) {
  return withApiMiddleware(
    req,
    async () => {
      const body = await parseBody<unknown>(req)
      if (body instanceof NextResponse) return body

      const parsed = loginSchema.safeParse(sanitizeObject(body as Record<string, unknown>))
      if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
      }

      const { email, password } = parsed.data
      const supabase = await createSupabaseServerClient()

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error || !data.user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
      }

      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      return NextResponse.json({ role: userData?.role, userId: data.user.id })
    },
    { rateLimit: 'auth' }
  )
}
