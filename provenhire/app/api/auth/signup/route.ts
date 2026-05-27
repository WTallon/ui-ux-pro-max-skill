import { NextRequest, NextResponse } from 'next/server'
import { withApiMiddleware, parseBody, apiError } from '@/lib/api-helpers'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'
import { signupSchema } from '@/lib/validations'
import { sanitizeObject } from '@/lib/utils'
import { sendClientWelcomeEmail } from '@/lib/resend'

export async function POST(req: NextRequest) {
  return withApiMiddleware(
    req,
    async () => {
      const body = await parseBody<unknown>(req)
      if (body instanceof NextResponse) return body

      const parsed = signupSchema.safeParse(sanitizeObject(body as Record<string, unknown>))
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
          { status: 400 }
        )
      }

      const { email, password, role, name, company_name } = parsed.data
      const supabase = await createSupabaseServerClient()
      const admin = createSupabaseAdminClient()

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
        },
      })

      if (authError || !authData.user) {
        return apiError(authError?.message ?? 'Signup failed', 400)
      }

      const { error: userError } = await admin.from('users').insert({
        id: authData.user.id,
        email,
        role,
      })

      if (userError) {
        console.error('[Signup] Failed to create user record:', userError)
        return apiError('Failed to create account', 500)
      }

      if (role === 'freelancer' && name) {
        await admin.from('freelancer_profiles').insert({
          user_id: authData.user.id,
          name,
          skill_category: 'web-development',
          bio: '',
          hourly_rate: 50,
          years_experience: 0,
        })
      }

      if (role === 'client' && company_name) {
        await admin.from('client_profiles').insert({
          user_id: authData.user.id,
          company_name,
        })
        await sendClientWelcomeEmail(email, company_name)
      }

      return NextResponse.json(
        { message: 'Check your email to verify your account' },
        { status: 201 }
      )
    },
    { rateLimit: 'auth' }
  )
}
