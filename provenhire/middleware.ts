import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PUBLIC_PATHS = ['/', '/login', '/signup', '/verify', '/privacy', '/terms', '/freelancers']
const FREELANCER_PATHS = ['/freelancer']
const CLIENT_PATHS = ['/client']
const ADMIN_PATHS = ['/admin']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          ),
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )

  if (!user && !isPublic && !pathname.startsWith('/api/')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (user) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
    const role = userData?.role

    if (ADMIN_PATHS.some((p) => pathname.startsWith(p)) && role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
    if (
      CLIENT_PATHS.some((p) => pathname.startsWith(p)) &&
      role !== 'client' &&
      role !== 'admin'
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    if (
      FREELANCER_PATHS.some((p) => pathname.startsWith(p)) &&
      role !== 'freelancer' &&
      role !== 'admin'
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)', '/'],
}
