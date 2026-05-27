export type UserRole = 'freelancer' | 'client' | 'admin'
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'

export interface User {
  id: string
  email: string
  role: UserRole
  created_at: string
}

export interface FreelancerProfile {
  id: string
  user_id: string
  name: string
  skill_category: string
  bio: string
  hourly_rate: number
  test_score: number | null
  status: ApplicationStatus
  loom_url: string | null
  avatar_url: string | null
  portfolio_url: string | null
  years_experience: number
  created_at: string
  updated_at: string
}

export interface ClientProfile {
  id: string
  user_id: string
  company_name: string
  subscription_status: SubscriptionStatus | null
  stripe_customer_id: string | null
  created_at: string
}

export interface Application {
  id: string
  freelancer_id: string
  test_fee_paid: boolean
  stripe_payment_intent_id: string | null
  submitted_at: string
  reviewed_at: string | null
  reviewer_notes: string | null
  status: ApplicationStatus
}

export interface Inquiry {
  id: string
  client_id: string
  freelancer_id: string
  message: string
  created_at: string
}

export interface Subscription {
  id: string
  client_id: string
  stripe_subscription_id: string
  status: SubscriptionStatus
  current_period_end: string
  created_at: string
}

export interface ApiResponse<T = void> {
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
}
