import { NextRequest, NextResponse } from 'next/server'
import { withApiMiddleware, requireAuth, parseBody } from '@/lib/api-helpers'
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase'
import { inquirySchema } from '@/lib/validations'
import { sanitizeObject } from '@/lib/utils'

export async function POST(req: NextRequest) {
  return withApiMiddleware(
    req,
    async () => {
      const auth = await requireAuth(req, ['client'])
      if (auth instanceof NextResponse) return auth

      const supabase = await createSupabaseServerClient()
      const { data: clientProfile } = await supabase
        .from('client_profiles')
        .select('id, subscription_status')
        .eq('user_id', auth.userId)
        .single()

      if (!clientProfile)
        return NextResponse.json({ error: 'Client profile not found' }, { status: 404 })
      if (clientProfile.subscription_status !== 'active') {
        return NextResponse.json(
          { error: 'Active subscription required to contact freelancers' },
          { status: 403 }
        )
      }

      const body = await parseBody<unknown>(req)
      if (body instanceof NextResponse) return body

      const parsed = inquirySchema.safeParse(sanitizeObject(body as Record<string, unknown>))
      if (!parsed.success)
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
          { status: 400 }
        )

      const admin = createSupabaseAdminClient()
      const { error } = await admin.from('inquiries').insert({
        client_id: clientProfile.id,
        freelancer_id: parsed.data.freelancer_id,
        message: parsed.data.message,
      })

      if (error) {
        console.error('[Inquiry] Insert error:', error)
        return NextResponse.json({ error: 'Failed to send inquiry' }, { status: 500 })
      }

      return NextResponse.json({ message: 'Inquiry sent' }, { status: 201 })
    },
    { rateLimit: 'api' }
  )
}
