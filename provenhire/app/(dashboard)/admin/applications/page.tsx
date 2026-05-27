'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { PageLoading } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatDate } from '@/lib/utils'

interface FreelancerProfileShort {
  id: string
  name: string
  skill_category: string
  bio: string
  hourly_rate: number
  loom_url: string | null
  test_score: number | null
  years_experience: number
}

interface ApplicationWithProfile {
  id: string
  test_fee_paid: boolean
  submitted_at: string
  reviewed_at: string | null
  reviewer_notes: string | null
  status: string
  freelancer_profiles: FreelancerProfileShort | FreelancerProfileShort[]
}

type TabType = 'pending' | 'all'

export default function AdminApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<ApplicationWithProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<TabType>('pending')
  const [reviewingId, setReviewingId] = useState<string | null>(null)
  const [testScore, setTestScore] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/admin/applications')
      if (res.status === 401 || res.status === 403) {
        router.push('/')
        return
      }
      const json = (await res.json()) as { data?: ApplicationWithProfile[] }
      setApplications(json.data ?? [])
      setLoading(false)
    }
    void load()
  }, [router])

  const handleReview = async (applicationId: string, action: 'approve' | 'reject') => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          application_id: applicationId,
          action,
          test_score: testScore ? Number(testScore) : undefined,
          reviewer_notes: notes || undefined,
        }),
      })
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) =>
            a.id === applicationId ? { ...a, status: action === 'approve' ? 'approved' : 'rejected' } : a
          )
        )
        setReviewingId(null)
        setTestScore('')
        setNotes('')
      }
    } catch {
      // silent
    } finally {
      setSubmitting(false)
    }
  }

  const filtered = applications.filter((a) => tab === 'all' || a.status === 'pending')

  const getProfile = (app: ApplicationWithProfile): FreelancerProfileShort | null => {
    if (Array.isArray(app.freelancer_profiles)) return app.freelancer_profiles[0] ?? null
    return app.freelancer_profiles ?? null
  }

  if (loading) return <PageLoading />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Applications</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['pending', 'all'] as TabType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                tab === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t === 'pending' ? 'Pending' : 'All'}
              {t === 'pending' && (
                <span className="ml-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {applications.filter((a) => a.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No applications"
            description={tab === 'pending' ? 'No pending applications to review.' : 'No applications yet.'}
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((app) => {
              const profile = getProfile(app)
              if (!profile) return null
              return (
                <Card key={app.id}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                        <Badge
                          variant={
                            app.status === 'approved'
                              ? 'success'
                              : app.status === 'rejected'
                              ? 'error'
                              : 'warning'
                          }
                        >
                          {app.status}
                        </Badge>
                        {app.test_fee_paid && (
                          <Badge variant="info">Fee Paid</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 capitalize mb-1">
                        {profile.skill_category.replace(/-/g, ' ')} — ${profile.hourly_rate}/hr —{' '}
                        {profile.years_experience}y exp
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{profile.bio}</p>
                      {profile.loom_url && (
                        <a
                          href={profile.loom_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Watch Loom Recording
                        </a>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Submitted {formatDate(app.submitted_at)}
                      </p>
                    </div>

                    {app.status === 'pending' && app.test_fee_paid && (
                      <div className="flex-shrink-0">
                        {reviewingId === app.id ? (
                          <div className="space-y-3 min-w-[240px]">
                            <Input
                              type="number"
                              placeholder="Test score (0-100)"
                              value={testScore}
                              onChange={(e) => setTestScore(e.target.value)}
                            />
                            <Textarea
                              placeholder="Reviewer notes (optional)"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleReview(app.id, 'approve')}
                                loading={submitting}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReview(app.id, 'reject')}
                                loading={submitting}
                              >
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setReviewingId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button size="sm" onClick={() => setReviewingId(app.id)}>
                            Review
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
