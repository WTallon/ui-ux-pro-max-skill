'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { FreelancerCard } from '@/components/freelancer/FreelancerCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
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

interface FreelancersResponse {
  data: Pick<
    FreelancerProfile,
    'id' | 'name' | 'skill_category' | 'bio' | 'hourly_rate' | 'test_score' | 'years_experience' | 'avatar_url'
  >[]
  count: number
  page: number
  page_size: number
}

function FreelancersBrowse() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [freelancers, setFreelancers] = useState<FreelancersResponse['data']>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [skillCategory, setSkillCategory] = useState(searchParams.get('skill_category') ?? '')
  const [maxRate, setMaxRate] = useState(searchParams.get('max_rate') ?? '')
  const [minScore, setMinScore] = useState(searchParams.get('min_score') ?? '')

  const PAGE_SIZE = 20

  const fetchFreelancers = useCallback(
    async (currentPage: number) => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.set('q', search)
        if (skillCategory) params.set('skill_category', skillCategory)
        if (maxRate) params.set('max_rate', maxRate)
        if (minScore) params.set('min_score', minScore)
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
    },
    [search, skillCategory, maxRate, minScore]
  )

  useEffect(() => {
    void fetchFreelancers(page)
  }, [page, fetchFreelancers])

  const handleSearch = () => {
    setPage(1)
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (skillCategory) params.set('skill_category', skillCategory)
    if (maxRate) params.set('max_rate', maxRate)
    if (minScore) params.set('min_score', minScore)
    router.push(`/freelancers?${params.toString()}`)
    void fetchFreelancers(1)
  }

  const totalPages = Math.ceil(count / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Verified Freelancers</h1>
          <p className="text-gray-500">All freelancers have passed a skill verification test</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Select
              options={SKILL_OPTIONS}
              value={skillCategory}
              onChange={(e) => setSkillCategory(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max hourly rate ($)"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Min test score (0-100)"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSearch} size="md">
              Search
            </Button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <LoadingSpinner />
        ) : freelancers.length === 0 ? (
          <EmptyState
            title="No freelancers found"
            description="Try adjusting your search filters to find more results."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setSearch('')
                  setSkillCategory('')
                  setMaxRate('')
                  setMinScore('')
                  router.push('/freelancers')
                }}
              >
                Clear Filters
              </Button>
            }
          />
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {count} freelancer{count !== 1 ? 's' : ''} found
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {freelancers.map((f) => (
                <FreelancerCard key={f.id} freelancer={f} />
              ))}
            </div>

            {/* Pagination */}
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

export default function FreelancersPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FreelancersBrowse />
    </Suspense>
  )
}
