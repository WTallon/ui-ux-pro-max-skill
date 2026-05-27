'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { Card } from '@/components/ui/Card'
import { PageLoading } from '@/components/ui/LoadingSpinner'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

interface Stats {
  totalFreelancers: number
  approvedFreelancers: number
  pendingApplications: number
  totalClients: number
  activeSubscriptions: number
  totalInquiries: number
}

export default function AdminStatsPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: currentUser } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
      if (currentUser?.role !== 'admin') { router.push('/'); return }

      const [
        { count: totalFreelancers },
        { count: approvedFreelancers },
        { count: pendingApplications },
        { count: totalClients },
        { count: totalInquiries },
      ] = await Promise.all([
        supabase.from('freelancer_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('freelancer_profiles').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
        supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('client_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
      ])

      const { count: activeSubscriptions } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      setStats({
        totalFreelancers: totalFreelancers ?? 0,
        approvedFreelancers: approvedFreelancers ?? 0,
        pendingApplications: pendingApplications ?? 0,
        totalClients: totalClients ?? 0,
        activeSubscriptions: activeSubscriptions ?? 0,
        totalInquiries: totalInquiries ?? 0,
      })
      setLoading(false)
    }
    void load()
  }, [router])

  if (loading) return <PageLoading />

  const statItems = stats ? [
    { label: 'Total Freelancers', value: stats.totalFreelancers },
    { label: 'Approved Freelancers', value: stats.approvedFreelancers },
    { label: 'Pending Applications', value: stats.pendingApplications },
    { label: 'Total Clients', value: stats.totalClients },
    { label: 'Active Subscriptions', value: stats.activeSubscriptions },
    { label: 'Total Inquiries', value: stats.totalInquiries },
  ] : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Platform Stats</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statItems.map((item) => (
            <Card key={item.label} className="text-center">
              <p className="text-3xl font-bold text-blue-600 mb-1">{item.value}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
