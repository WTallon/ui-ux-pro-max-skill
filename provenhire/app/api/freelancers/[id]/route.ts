import { NextRequest, NextResponse } from 'next/server'
import { withApiMiddleware } from '@/lib/api-helpers'
import { createSupabaseServerClient } from '@/lib/supabase'

export const revalidate = 60

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withApiMiddleware(
    req,
    async () => {
      const { id } = await params
      const supabase = await createSupabaseServerClient()
      const { data, error } = await supabase
        .from('freelancer_profiles')
        .select(
          'id, name, skill_category, bio, hourly_rate, test_score, years_experience, avatar_url, portfolio_url, status, created_at'
        )
        .eq('id', id)
        .eq('status', 'approved')
        .single()

      if (error || !data) {
        return NextResponse.json({ error: 'Freelancer not found' }, { status: 404 })
      }

      return NextResponse.json({ data })
    },
    { rateLimit: 'api' }
  )
}
