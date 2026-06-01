'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DEMO_ACCOUNTS = [
  {
    role: 'client',
    label: 'Client',
    email: 'client@demo.com',
    description: 'Browse freelancers, view subscription dashboard, send inquiries',
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    badgeColor: 'bg-blue-100 text-blue-700',
    redirect: '/client/browse',
  },
  {
    role: 'freelancer',
    label: 'Freelancer',
    email: 'freelancer@demo.com',
    description: 'View application status, profile, freelancer dashboard',
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
    badgeColor: 'bg-green-100 text-green-700',
    redirect: '/freelancer/dashboard',
  },
  {
    role: 'admin',
    label: 'Admin',
    email: 'admin@demo.com',
    description: 'Review applications, approve/reject, view all users and stats',
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    badgeColor: 'bg-purple-100 text-purple-700',
    redirect: '/admin/applications',
  },
]

export default function DemoLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleLogin = async (role: string, redirect: string) => {
    setLoading(role)
    const emailMap: Record<string, string> = {
      client: 'client@demo.com',
      freelancer: 'freelancer@demo.com',
      admin: 'admin@demo.com',
    }
    const res = await fetch('/api/demo/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, email: emailMap[role] }),
    })
    if (res.ok) {
      router.push(redirect)
    }
    setLoading(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ProvenHire</h1>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Demo Mode — No real data
          </div>
          <p className="text-gray-600">Choose a role to explore the full platform</p>
        </div>

        <div className="space-y-4">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.role}
              onClick={() => void handleLogin(account.role, account.redirect)}
              disabled={loading !== null}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all ${account.color} disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${account.badgeColor}`}>
                    {account.label}
                  </span>
                  <span className="text-sm text-gray-500 font-mono">{account.email}</span>
                </div>
                {loading === account.role ? (
                  <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">{account.description}</p>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          All data is simulated. No accounts, payments, or emails are real.
        </p>
      </div>
    </div>
  )
}
