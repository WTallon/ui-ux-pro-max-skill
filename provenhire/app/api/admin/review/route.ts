import { NextRequest, NextResponse } from 'next/server'
import { withApiMiddleware, requireAuth, parseBody } from '@/lib/api-helpers'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { adminReviewSchema } from '@/lib/validations'
import { sanitizeObject } from '@/lib/utils'
import {
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail,
} from '@/lib/resend'

export async function POST(req: NextRequest) {
  return withApiMiddleware(
    req,
    async () => {
      const auth = await requireAuth(req, ['admin'])
      if (auth instanceof NextResponse) return auth

      const body = await parseBody<unknown>(req)
      if (body instanceof NextResponse) return body

      const parsed = adminReviewSchema.safeParse(sanitizeObject(body as Record<string, unknown>))
      if (!parsed.success)
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
          { status: 400 }
        )

      const { application_id, action, test_score, reviewer_notes } = parsed.data
      const newStatus = action === 'approve' ? 'approved' : 'rejected'
      const admin = createSupabaseAdminClient()

      const { error: appError } = await admin
        .from('applications')
        .update({
          status: newStatus,
          reviewed_at: new Date().toISOString(),
          reviewer_notes: reviewer_notes ?? null,
        })
        .eq('id', application_id)

      if (appError) {
        console.error('[Admin Review] App update error:', appError)
        return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
      }

      const { data: app } = await admin
        .from('applications')
        .select('freelancer_id')
        .eq('id', application_id)
        .single()
      if (!app) return NextResponse.json({ error: 'Application not found' }, { status: 404 })

      const updateData: Record<string, unknown> = { status: newStatus }
      if (action === 'approve' && test_score !== undefined) updateData.test_score = test_score
      await admin.from('freelancer_profiles').update(updateData).eq('id', app.freelancer_id)

      const { data: profile } = await admin
        .from('freelancer_profiles')
        .select('name, user_id')
        .eq('id', app.freelancer_id)
        .single()
      const { data: user } = profile
        ? await admin.from('users').select('email').eq('id', profile.user_id).single()
        : { data: null }

      if (user?.email && profile?.name) {
        const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/freelancers/${app.freelancer_id}`
        if (action === 'approve') {
          await sendApplicationApprovedEmail(user.email, profile.name, profileUrl)
        } else {
          await sendApplicationRejectedEmail(user.email, profile.name, reviewer_notes)
        }
      }

      return NextResponse.json({ message: `Application ${newStatus}` })
    },
    { rateLimit: 'api' }
  )
}
