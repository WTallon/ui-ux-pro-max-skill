'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageLoading } from '@/components/ui/LoadingSpinner'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import type { FreelancerProfile, Application } from '@/types'

interface DashboardData {
  profile: FreelancerProfile | null
  application: Application | null
}

function FreelancerDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<DashboardData>({ profile: null, application: null })
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const paymentStatus = searchParams.get('payment')

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      const { data: profile } = await supabase
        .from('freelancer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      let application = null
      if (profile) {
        const { data: app } = await supabase
          .from('applications')
          .select('*')
          .eq('freelancer_id', profile.id)
          .single()
        application = app
      }
      setData({
        profile: profile as FreelancerProfile | null,
        application: application as Application | null,
      })
      setLoading(false)
    }
    void load()
  }, [router])

  const handlePayTestFee = async () => {
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'test_fee' }),
      })
      const json = (await res.json()) as { url?: string; error?: string }
      if (json.url) window.location.href = json.url
    } catch {
      // silent
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (loading) return <PageLoading />

  const { profile, application } = data

  if (!profile || !application) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="freelancer" />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Complete your application</h1>
          <p className="text-gray-500 mb-6">You haven&apos;t submitted an application yet.</p>
          <Button onClick={() => router.push('/freelancer/apply')}>Apply Now</Button>
        </div>
      </div>
    )
  }

  const statusVariant =
    profile.status === 'approved'
      ? 'success'
      : profile.status === 'rejected'
      ? 'error'
      : 'warning'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="freelancer" />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Freelancer Dashboard</h1>

        {paymentStatus === 'success' && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm">
            Payment successful! Your test fee has been received.
          </div>
        )}
        {paymentStatus === 'cancelled' && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md text-sm">
            Payment was cancelled. You can try again below.
          </div>
        )}

        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-lg">Application Status</h2>
            <Badge variant={statusVariant}>
              {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </Badge>
          </div>

          {profile.status === 'pending' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div
                  className={`w-5 h-5 rounded-full flex-shrink-0 ${
                    application.test_fee_paid ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
                <div>
                  <p className="font-medium text-gray-900">Test Fee Payment ($15)</p>
                  <p className="text-sm text-gray-500">
                    {application.test_fee_paid ? 'Paid' : 'Not paid yet'}
                  </p>
                </div>
                {!application.test_fee_paid && (
                  <Button
                    size="sm"
                    onClick={handlePayTestFee}
                    loading={checkoutLoading}
                    className="ml-auto"
                  >
                    Pay Now
                  </Button>
                )}
              </div>

              {application.test_fee_paid && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 bg-yellow-400" />
                  <div>
                    <p className="font-medium text-gray-900">Skill Review</p>
                    <p className="text-sm text-gray-500">Under review by our team</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {profile.status === 'approved' && (
            <div className="space-y-3">
              <p className="text-green-700 font-medium">
                Congratulations! Your profile is live and visible to clients.
              </p>
              {profile.test_score !== null && (
                <p className="text-gray-600">
                  Your test score:{' '}
                  <span className="font-bold text-gray-900">{profile.test_score}/100</span>
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/freelancers/${profile.id}`)}
              >
                View Public Profile
              </Button>
            </div>
          )}

          {profile.status === 'rejected' && (
            <div className="space-y-3">
              <p className="text-red-700">
                Your application was not approved at this time. You may reapply after 30 days.
              </p>
              {application.reviewer_notes && (
                <div className="bg-red-50 border border-red-100 rounded-md p-3">
                  <p className="text-sm text-red-800">
                    <span className="font-medium">Reviewer notes:</span>{' '}
                    {application.reviewer_notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="font-semibold text-gray-900 text-lg mb-4">Your Profile</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Name</dt>
              <dd className="font-medium text-gray-900">{profile.name}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Skill Category</dt>
              <dd className="font-medium text-gray-900 capitalize">
                {profile.skill_category.replace(/-/g, ' ')}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Hourly Rate</dt>
              <dd className="font-medium text-gray-900">${profile.hourly_rate}/hr</dd>
            </div>
            <div>
              <dt className="text-gray-500">Experience</dt>
              <dd className="font-medium text-gray-900">{profile.years_experience} years</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
}

export default function FreelancerDashboardPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <FreelancerDashboardContent />
    </Suspense>
  )
}
