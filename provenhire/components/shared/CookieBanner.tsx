'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const COOKIE_CONSENT_KEY = 'cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (!consent) setVisible(true)
    } catch {
      setVisible(false)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    } catch {
      // storage not available
    }
    setVisible(false)
  }

  const decline = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
    } catch {
      // storage not available
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex-1">
          <p className="text-sm">
            We use cookies to improve your experience. By continuing to use ProvenHire, you agree
            to our{' '}
            <Link href="/privacy" className="underline hover:text-blue-300">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Button size="sm" variant="outline" onClick={decline} className="border-gray-500 text-white hover:bg-gray-800">
            Decline
          </Button>
          <Button size="sm" onClick={accept} className="bg-blue-600 hover:bg-blue-700">
            Accept All
          </Button>
        </div>
      </div>
    </div>
  )
}
