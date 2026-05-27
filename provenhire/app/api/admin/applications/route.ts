import { NextRequest, NextResponse } from 'next/server'
import { withApiMiddleware, requireAuth } from '@/lib/api-helpers'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  return withApiMiddleware(
    req,
    async () => {
      const auth = await requireAuth(req, ['admin'])
      if (auth instanceof NextResponse) return auth

      const admin = createSupabaseAdminClient()
      const { data, error } = await admin
        .from('applications')
        .select(
          `
        id, test_fee_paid, submitted_at, reviewed_at, reviewer_notes, status,
        freelancer_profiles (id, name, skill_category, bio, hourly_rate, loom_url, test_score, years_experience)
      `
        )
        .order('submitted_at', { ascending: false })

      if (error) {
        console.error('[Admin] Applications fetch error:', error)
        return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
      }

      return NextResponse.json({ data })
    },
    { rateLimit: 'api' }
  )
}
