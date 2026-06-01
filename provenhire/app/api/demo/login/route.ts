import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (process.env.DEMO_MODE !== 'true') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 })
  }

  const body = (await req.json()) as { role?: string }
  const { role } = body

  if (!role || !['client', 'freelancer', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const res = NextResponse.json({ ok: true, role })
  res.cookies.set('demo_role', role, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24h
    path: '/',
  })
  return res
}
