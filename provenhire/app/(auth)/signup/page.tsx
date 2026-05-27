'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { signupSchema, type SignupInput } from '@/lib/validations'

export default function SignupPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [role, setRole] = useState<'freelancer' | 'client'>('client')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'client' },
  })

  const onSubmit = async (data: SignupInput) => {
    setServerError(null)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, role }),
      })
      const json = (await res.json()) as { error?: string; message?: string }
      if (!res.ok) {
        setServerError(json.error ?? 'Signup failed')
        return
      }
      setSuccess(true)
    } catch {
      setServerError('An unexpected error occurred')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-500">
            We sent a verification link to your email. Click it to activate your account.
          </p>
          <Link href="/login" className="mt-6 inline-block text-blue-600 hover:underline text-sm">
            Back to login
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ProvenHire
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-2">Join thousands of verified professionals</p>
        </div>

        <Card>
          {/* Role selector */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-6">
            <button
              type="button"
              onClick={() => setRole('client')}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                role === 'client'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Hire Talent
            </button>
            <button
              type="button"
              onClick={() => setRole('freelancer')}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                role === 'freelancer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Find Work
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md">
                {serverError}
              </div>
            )}

            {role === 'freelancer' && (
              <Input
                id="name"
                label="Full Name"
                placeholder="Jane Doe"
                error={errors.name?.message}
                {...register('name')}
              />
            )}

            {role === 'client' && (
              <Input
                id="company_name"
                label="Company Name"
                placeholder="Acme Inc."
                error={errors.company_name?.message}
                {...register('company_name')}
              />
            )}

            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Min 8 chars, 1 uppercase, 1 number"
              hint="At least 8 characters, one uppercase, one number"
              error={errors.password?.message}
              {...register('password')}
            />

            <input type="hidden" value={role} {...register('role')} />

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
