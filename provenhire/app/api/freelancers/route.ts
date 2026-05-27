import { NextRequest, NextResponse } from 'next/server'
import { withApiMiddleware } from '@/lib/api-helpers'
import { createSupabaseServerClient } from '@/lib/supabase'
import { searchSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  return withApiMiddleware(
    req,
    async () => {
      const { searchParams } = new URL(req.url)
      const parsed = searchSchema.safeParse(Object.fromEntries(searchParams))
      if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid search parameters' }, { status: 400 })
      }

      const { q, skill_category, min_score, max_rate, page, page_size } = parsed.data
      const supabase = await createSupabaseServerClient()

      let query = supabase
        .from('freelancer_profiles')
        .select(
          'id, name, skill_category, bio, hourly_rate, test_score, years_experience, avatar_url, status',
          { count: 'exact' }
        )
        .eq('status', 'approved')
        .order('test_score', { ascending: false })
        .range((page - 1) * page_size, page * page_size - 1)

      if (q) query = query.ilike('name', `%${q}%`)
      if (skill_category) query = query.eq('skill_category', skill_category)
      if (min_score !== undefined) query = query.gte('test_score', min_score)
      if (max_rate !== undefined) query = query.lte('hourly_rate', max_rate)

      const { data, error, count } = await query

      if (error) {
        console.error('[Freelancers] Query error:', error)
        return NextResponse.json({ error: 'Failed to fetch freelancers' }, { status: 500 })
      }

      return NextResponse.json({ data: data ?? [], count: count ?? 0, page, page_size })
    },
    { rateLimit: 'api' }
  )
}
