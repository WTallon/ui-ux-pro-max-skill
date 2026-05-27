'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface NavbarProps {
  userRole?: 'freelancer' | 'client' | 'admin' | null
}

export function Navbar({ userRole }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            ProvenHire
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/freelancers"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Browse Freelancers
            </Link>
            {!userRole && (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
            {userRole === 'client' && (
              <Link href="/client/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            )}
            {userRole === 'freelancer' && (
              <Link href="/freelancer/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            )}
            {userRole === 'admin' && (
              <Link href="/admin/applications">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            )}
            {userRole && (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/freelancers" className="block text-gray-600 py-2">
              Browse Freelancers
            </Link>
            {!userRole && (
              <>
                <Link href="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
            {userRole && (
              <Button variant="ghost" size="sm" className="w-full" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
