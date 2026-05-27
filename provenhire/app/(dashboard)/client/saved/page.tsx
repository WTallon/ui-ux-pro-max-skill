'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

export default function SavedFreelancersPage() {
  const router = useRouter()
  const [savedIds, setSavedIds] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('savedFreelancers')
      if (raw) setSavedIds(JSON.parse(raw) as string[])
    } catch {
      setSavedIds([])
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="client" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Freelancers</h1>

        {savedIds.length === 0 ? (
          <EmptyState
            title="No saved freelancers"
            description="Browse freelancers and save the ones you're interested in for easy access later."
            action={
              <Button onClick={() => router.push('/freelancers')}>Browse Freelancers</Button>
            }
          />
        ) : (
          <div className="text-sm text-gray-500">
            <p>{savedIds.length} saved freelancer(s). Visit their profiles to contact them.</p>
          </div>
        )}
      </div>
    </div>
  )
}
