import { z } from 'zod'

const MAX_PAYLOAD_SIZE = 10 * 1024 // 10kb for strings

export const signupSchema = z.object({
  email: z.string().email('Invalid email').max(254),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain number'),
  role: z.enum(['freelancer', 'client']),
  name: z.string().min(2).max(100).optional(),
  company_name: z.string().min(2).max(200).optional(),
})

export const loginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(128),
})

export const freelancerApplicationSchema = z.object({
  name: z.string().min(2, 'Name required').max(100),
  skill_category: z.enum([
    'web-development',
    'mobile-development',
    'design',
    'writing',
    'marketing',
    'data-science',
    'devops',
    'video-editing',
  ]),
  bio: z.string().min(100, 'Bio must be at least 100 characters').max(2000),
  hourly_rate: z.number().min(5).max(500),
  loom_url: z.string().url('Must be a valid URL').max(500).optional(),
  portfolio_url: z.string().url().max(500).optional(),
  years_experience: z.number().min(0).max(50),
})

export const inquirySchema = z.object({
  freelancer_id: z.string().uuid(),
  message: z.string().min(20, 'Message must be at least 20 characters').max(MAX_PAYLOAD_SIZE),
})

export const adminReviewSchema = z.object({
  application_id: z.string().uuid(),
  action: z.enum(['approve', 'reject']),
  test_score: z.number().min(0).max(100).optional(),
  reviewer_notes: z.string().max(1000).optional(),
})

export const searchSchema = z.object({
  q: z.string().max(200).optional(),
  skill_category: z.string().max(50).optional(),
  min_score: z.coerce.number().min(0).max(100).optional(),
  max_rate: z.coerce.number().min(0).max(1000).optional(),
  page: z.coerce.number().min(1).default(1),
  page_size: z.coerce.number().min(1).max(50).default(20),
})

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type FreelancerApplicationInput = z.infer<typeof freelancerApplicationSchema>
export type InquiryInput = z.infer<typeof inquirySchema>
export type AdminReviewInput = z.infer<typeof adminReviewSchema>
export type SearchInput = z.infer<typeof searchSchema>
