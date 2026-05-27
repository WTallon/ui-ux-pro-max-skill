'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { FreelancerCard } from '@/components/freelancer/FreelancerCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import type { FreelancerProfile } from '@/types'

const SKILL_OPTIONS = [
  { value: '', label: 'All Skills' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'design', label: 'Design' },
  { value: 'writing', label: 'Writing' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'devops', label: 'DevOps' },
  { value: 'video-editing', label: 'Video Editing' },
]

type FreelancerPreview = Pick<
  FreelancerProfile,
  'id' | 'name' | 'skill_category' | 'bio' | 'hourly_rate' | 'test_score' | 'years_experience' | 'avatar_url'
>

interface FreelancersResponse {
  data: FreelancerPreview[]
  count: number
  page: number
  page_size: number
}

export default function ClientBrowsePage() {
  const router = useRouter()
  const [freelancers, setFreelancers] = useState<FreelancerPreview[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [skillCategory, setSkillCategory] = useState('')
  const [maxRate, setMaxRate] = useState('')

  const PAGE_SIZE = 20

  useEffect(() => {
    const checkSubscription = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: cp } = await supabase
        .from('client_profiles')
        .select('subscription_status')
        .eq('user_id', user.id)
        .single()
      setIsSubscribed(cp?.subscription_status === 'active')
    }
    void checkSubscription()
  }, [router])

  const fetchFreelancers = useCallback(async (currentPage: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('q', search)
      if (skillCategory) params.set('skill_category', skillCategory)
      if (maxRate) params.set('max_rate', maxRate)
      params.set('page', String(currentPage))
      params.set('page_size', String(PAGE_SIZE))

      const res = await fetch(`/api/freelancers?${params.toString()}`)
      if (!res.ok) return
      const data = (await res.json()) as FreelancersResponse
      setFreelancers(data.data)
      setCount(data.count)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [search, skillCategory, maxRate])

  useEffect(() => {
    void fetchFreelancers(page)
  }, [page, fetchFreelancers])

  const totalPages = Math.ceil(count / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="client" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Browse Freelancers</h1>
            <p className="text-gray-500 text-sm mt-1">
              {isSubscribed
                ? 'You can contact any freelancer below'
                : 'Subscribe to contact freelancers'}
            </p>
          </div>
          {!isSubscribed && (
            <Button size="sm" onClick={() => router.push('/client/dashboard')}>
              Subscribe to Contact
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { setPage(1); void fetchFreelancers(1) }
              }}
            />
            <Select
              options={SKILL_OPTIONS}
              value={skillCategory}
              onChange={(e) => setSkillCategory(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max rate ($)"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
            />
          </div>
          <div className="mt-3 flex justify-end">
            <Button size="sm" onClick={() => { setPage(1); void fetchFreelancers(1) }}>
              Search
            </Button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : freelancers.length === 0 ? (
          <EmptyState
            title="No freelancers found"
            description="Try adjusting your search filters."
          />
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{count} freelancers found</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {freelancers.map((f) => (
                <FreelancerCard key={f.id} freelancer={f} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-500 self-center">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
