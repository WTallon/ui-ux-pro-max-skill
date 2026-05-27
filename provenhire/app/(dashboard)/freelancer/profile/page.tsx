'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageLoading } from '@/components/ui/LoadingSpinner'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { formatCurrency } from '@/lib/utils'
import type { FreelancerProfile } from '@/types'

export default function FreelancerProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<FreelancerProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: p } = await supabase
        .from('freelancer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setProfile(p as FreelancerProfile | null)
      setLoading(false)
    }
    void load()
  }, [router])

  if (loading) return <PageLoading />

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="freelancer" />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">No Profile Found</h1>
          <Button onClick={() => router.push('/freelancer/apply')}>Apply Now</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="freelancer" />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          {profile.status === 'approved' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/freelancers/${profile.id}`)}
            >
              View Public Profile
            </Button>
          )}
        </div>

        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-lg">{profile.name}</h2>
            <Badge
              variant={
                profile.status === 'approved'
                  ? 'success'
                  : profile.status === 'rejected'
                  ? 'error'
                  : 'warning'
              }
            >
              {profile.status}
            </Badge>
          </div>

          <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <dt className="text-gray-500">Skill Category</dt>
              <dd className="font-medium text-gray-900 capitalize">
                {profile.skill_category.replace(/-/g, ' ')}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Hourly Rate</dt>
              <dd className="font-medium text-gray-900">{formatCurrency(profile.hourly_rate)}/hr</dd>
            </div>
            <div>
              <dt className="text-gray-500">Experience</dt>
              <dd className="font-medium text-gray-900">{profile.years_experience} years</dd>
            </div>
            {profile.test_score !== null && (
              <div>
                <dt className="text-gray-500">Test Score</dt>
                <dd className="font-medium text-gray-900">{profile.test_score}/100</dd>
              </div>
            )}
          </dl>

          {profile.bio && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Bio</p>
              <p className="text-sm text-gray-700">{profile.bio}</p>
            </div>
          )}
        </Card>

        <Button
          variant="outline"
          onClick={() => router.push('/freelancer/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
