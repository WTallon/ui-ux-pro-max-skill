import type { User, UserRole } from '@/types'
import { DEMO_USER_FREELANCER, DEMO_USER_CLIENT, DEMO_USER_ADMIN } from '@/lib/mock-data'

export const DEMO_COOKIE = 'demo_role'

export const DEMO_CREDENTIALS: Record<string, { password: string; user: User }> = {
  'freelancer@demo.com': { password: 'Demo1234', user: DEMO_USER_FREELANCER },
  'client@demo.com': { password: 'Demo1234', user: DEMO_USER_CLIENT },
  'admin@demo.com': { password: 'Demo1234', user: DEMO_USER_ADMIN },
}

export function getDemoUser(role: UserRole): User {
  if (role === 'client') return DEMO_USER_CLIENT
  if (role === 'admin') return DEMO_USER_ADMIN
  return DEMO_USER_FREELANCER
}

export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === 'true'
}
