'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageLoading } from '@/components/ui/LoadingSpinner'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { formatDate } from '@/lib/utils'
import type { User } from '@/types'

export default function AdminUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
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

      const { data: allUsers } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      setUsers((allUsers ?? []) as User[])
      setLoading(false)
    }
    void load()
  }, [router])

  if (loading) return <PageLoading />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Users ({users.length})</h1>
        <Card padding="none">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Email</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Role</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{u.email}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        u.role === 'admin' ? 'error' : u.role === 'client' ? 'info' : 'success'
                      }
                    >
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(u.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
