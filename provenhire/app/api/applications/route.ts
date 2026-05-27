import { NextRequest, NextResponse } from 'next/server'
import { withApiMiddleware, requireAuth, parseBody } from '@/lib/api-helpers'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { freelancerApplicationSchema } from '@/lib/validations'
import { sanitizeObject } from '@/lib/utils'
import { sendApplicationReceivedEmail, sendAdminNewApplicationEmail } from '@/lib/resend'

export async function POST(req: NextRequest) {
  return withApiMiddleware(
    req,
    async () => {
      const auth = await requireAuth(req, ['freelancer'])
      if (auth instanceof NextResponse) return auth

      const body = await parseBody<unknown>(req)
      if (body instanceof NextResponse) return body

      const parsed = freelancerApplicationSchema.safeParse(
        sanitizeObject(body as Record<string, unknown>)
      )
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
          { status: 400 }
        )
      }

      const admin = createSupabaseAdminClient()

      const { data: existing } = await admin
        .from('freelancer_profiles')
        .select('id, status')
        .eq('user_id', auth.userId)
        .single()

      if (existing?.status === 'approved') {
        return NextResponse.json({ error: 'You are already approved' }, { status: 400 })
      }

      const { data: profile, error: profileError } = await admin
        .from('freelancer_profiles')
        .upsert(
          {
            user_id: auth.userId,
            ...parsed.data,
            status: 'pending',
          },
          { onConflict: 'user_id' }
        )
        .select()
        .single()

      if (profileError || !profile) {
        console.error('[Application] Profile upsert error:', profileError)
        return NextResponse.json({ error: 'Failed to save application' }, { status: 500 })
      }

      const { error: appError } = await admin
        .from('applications')
        .upsert({ freelancer_id: profile.id, status: 'pending' }, { onConflict: 'freelancer_id' })

      if (appError) {
        console.error('[Application] Application insert error:', appError)
      }

      const { data: user } = await admin
        .from('users')
        .select('email')
        .eq('id', auth.userId)
        .single()
      if (user?.email) {
        await sendApplicationReceivedEmail(user.email, parsed.data.name)
      }
      await sendAdminNewApplicationEmail(1)

      return NextResponse.json(
        { message: 'Application submitted', profile_id: profile.id },
        { status: 201 }
      )
    },
    {
      rateLimit: 'application',
      rateLimitId: `app:${req.headers.get('x-forwarded-for') ?? 'anon'}`,
    }
  )
}
