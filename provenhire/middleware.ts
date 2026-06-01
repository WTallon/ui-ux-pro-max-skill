import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PUBLIC_PATHS = ['/', '/login', '/signup', '/verify', '/privacy', '/terms', '/demo-login']
const FREELANCER_PATHS = ['/freelancer']
const CLIENT_PATHS = ['/client']
const ADMIN_PATHS = ['/admin']

function isPublicPath(pathname: string): boolean {
  return (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/')) ||
    pathname.startsWith('/freelancers')
  )
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const res = NextResponse.next()

  // Skip middleware for API and static files
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return res
  }

  const isDemo = process.env.DEMO_MODE === 'true'

  if (isDemo) {
    const demoRole = req.cookies.get('demo_role')?.value

    if (!demoRole && !isPublicPath(pathname)) {
      return NextResponse.redirect(new URL('/demo-login', req.url))
    }

    if (demoRole) {
      if (ADMIN_PATHS.some((p) => pathname.startsWith(p)) && demoRole !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
      }
      if (
        CLIENT_PATHS.some((p) => pathname.startsWith(p)) &&
        demoRole !== 'client' &&
        demoRole !== 'admin'
      ) {
        return NextResponse.redirect(new URL('/', req.url))
      }
      if (
        FREELANCER_PATHS.some((p) => pathname.startsWith(p)) &&
        demoRole !== 'freelancer' &&
        demoRole !== 'admin'
      ) {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    return res
  }

  // Real mode: use Supabase auth
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

  if (!user && !isPublicPath(pathname)) {
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
