'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface NavbarProps {
  userRole?: 'freelancer' | 'client' | 'admin' | null
  isDemo?: boolean
}

export function Navbar({ userRole, isDemo }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    if (isDemo) {
      await fetch('/api/demo/logout', { method: 'POST' })
      window.location.href = '/demo-login'
    } else {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/'
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-bold text-blue-600">
              ProvenHire
            </Link>
            {isDemo && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
                Demo
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/freelancers" className="text-gray-600 hover:text-gray-900 text-sm">
              Browse Freelancers
            </Link>
            {!userRole && (
              <>
                {isDemo ? (
                  <Link href="/demo-login">
                    <Button size="sm">Explore Demo</Button>
                  </Link>
                ) : (
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
              <Button variant="ghost" size="sm" onClick={() => void handleLogout()}>
                {isDemo ? 'Switch Role' : 'Log Out'}
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
                d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/freelancers" className="block text-gray-600 py-2">
              Browse Freelancers
            </Link>
            {!userRole && isDemo && (
              <Link href="/demo-login" className="block">
                <Button size="sm" className="w-full">
                  Explore Demo
                </Button>
              </Link>
            )}
            {!userRole && !isDemo && (
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
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => void handleLogout()}
              >
                {isDemo ? 'Switch Role' : 'Log Out'}
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
