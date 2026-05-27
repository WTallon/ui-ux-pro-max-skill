import { Navbar } from '@/components/shared/Navbar'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { formatCurrency, formatDate, getInitials } from '@/lib/utils'
import Link from 'next/link'
import type { FreelancerProfile } from '@/types'

export const revalidate = 60

type ProfileData = Pick<
  FreelancerProfile,
  'id' | 'name' | 'skill_category' | 'bio' | 'hourly_rate' | 'test_score' | 'years_experience' | 'avatar_url' | 'portfolio_url' | 'created_at'
>

async function getFreelancer(id: string): Promise<ProfileData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/freelancers/${id}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json = (await res.json()) as { data: ProfileData }
    return json.data
  } catch {
    return null
  }
}

export default async function FreelancerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const freelancer = await getFreelancer(id)

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Freelancer not found</h1>
          <p className="text-gray-500 mb-6">This profile may not exist or may not be approved yet.</p>
          <Link href="/freelancers" className="text-blue-600 hover:underline">
            Browse all freelancers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-4">
          <Link href="/freelancers" className="text-sm text-blue-600 hover:underline">
            ← Back to all freelancers
          </Link>
        </div>

        <Card padding="lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl flex-shrink-0">
              {freelancer.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={freelancer.avatar_url}
                  alt={freelancer.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                getInitials(freelancer.name)
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{freelancer.name}</h1>
                {freelancer.test_score !== null && (
                  <Badge variant="success" className="text-sm px-3 py-1">
                    Test Score: {freelancer.test_score}/100
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 capitalize text-lg mb-3">
                {freelancer.skill_category.replace(/-/g, ' ')}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="font-semibold text-gray-900 text-lg">
                  {formatCurrency(freelancer.hourly_rate)}/hr
                </span>
                <span>{freelancer.years_experience} years experience</span>
                <span>Member since {formatDate(freelancer.created_at)}</span>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Bio */}
          <div className="mb-6">
            <h2 className="font-semibold text-gray-900 mb-3 text-lg">About</h2>
            <p className="text-gray-600 leading-relaxed">{freelancer.bio}</p>
          </div>

          {/* Links */}
          {freelancer.portfolio_url && (
            <div className="mb-6">
              <h2 className="font-semibold text-gray-900 mb-3">Portfolio</h2>
              <a
                href={freelancer.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                {freelancer.portfolio_url}
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2">Interested in working with {freelancer.name}?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to ProvenHire to send direct contact requests to verified freelancers.
            </p>
            <div className="flex gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Get Started
              </Link>
              <Link
                href="/client/dashboard"
                className="inline-flex items-center justify-center px-5 py-2 border border-blue-300 text-blue-700 rounded-md font-medium hover:bg-blue-100 transition-colors text-sm"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
