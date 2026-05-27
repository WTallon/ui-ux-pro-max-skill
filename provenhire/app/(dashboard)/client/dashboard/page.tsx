'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageLoading } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { formatDate } from '@/lib/utils'
import type { ClientProfile, Inquiry } from '@/types'

interface DashboardData {
  clientProfile: ClientProfile | null
  inquiries: Inquiry[]
}

function ClientDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<DashboardData>({ clientProfile: null, inquiries: [] })
  const [loading, setLoading] = useState(true)
  const [subscribeLoading, setSubscribeLoading] = useState(false)
  const subscribed = searchParams.get('subscribed')
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
      const { data: clientProfile } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      let inquiries: Inquiry[] = []
      if (clientProfile) {
        const { data: inqs } = await supabase
          .from('inquiries')
          .select('*')
          .eq('client_id', clientProfile.id)
          .order('created_at', { ascending: false })
          .limit(10)
        inquiries = (inqs ?? []) as Inquiry[]
      }

      setData({
        clientProfile: clientProfile as ClientProfile | null,
        inquiries,
      })
      setLoading(false)
    }
    void load()
  }, [router])

  const handleSubscribe = async () => {
    setSubscribeLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'subscription' }),
      })
      const json = (await res.json()) as { url?: string; error?: string }
      if (json.url) window.location.href = json.url
    } catch {
      // silent
    } finally {
      setSubscribeLoading(false)
    }
  }

  if (loading) return <PageLoading />

  const { clientProfile, inquiries } = data

  const subStatusVariant =
    clientProfile?.subscription_status === 'active'
      ? 'success'
      : clientProfile?.subscription_status === 'canceled'
      ? 'error'
      : clientProfile?.subscription_status === 'past_due'
      ? 'warning'
      : 'default'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="client" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Client Dashboard</h1>

        {subscribed === 'true' && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm">
            Your subscription is now active! You can now contact any verified freelancer.
          </div>
        )}
        {paymentStatus === 'cancelled' && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md text-sm">
            Payment was cancelled. Subscribe to contact freelancers.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Subscription</h2>
              {clientProfile?.subscription_status ? (
                <Badge variant={subStatusVariant}>{clientProfile.subscription_status}</Badge>
              ) : (
                <Badge variant="default">No subscription</Badge>
              )}
            </div>
            {clientProfile?.subscription_status === 'active' ? (
              <p className="text-sm text-gray-600">
                You have full access to contact freelancers. Your subscription is active.
              </p>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Subscribe for $99/month to unlock unlimited contact requests to verified
                  freelancers.
                </p>
                <Button size="sm" onClick={handleSubscribe} loading={subscribeLoading}>
                  Subscribe Now — $99/mo
                </Button>
              </div>
            )}
          </Card>

          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router.push('/freelancers')}
              >
                Browse Freelancers
              </Button>
              {clientProfile?.subscription_status !== 'active' && (
                <Button
                  size="sm"
                  className="w-full"
                  onClick={handleSubscribe}
                  loading={subscribeLoading}
                >
                  Subscribe to Contact Freelancers
                </Button>
              )}
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="font-semibold text-gray-900 text-lg mb-4">Recent Inquiries</h2>
          {inquiries.length === 0 ? (
            <EmptyState
              title="No inquiries yet"
              description="Subscribe and start contacting freelancers to build your team."
              action={
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push('/freelancers')}
                >
                  Browse Freelancers
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg text-sm"
                >
                  <div>
                    <p className="text-gray-700 line-clamp-1">{inq.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{formatDate(inq.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default function ClientDashboardPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ClientDashboardContent />
    </Suspense>
  )
}
