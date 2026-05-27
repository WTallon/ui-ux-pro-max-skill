'use client'

import { useState, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { PageLoading } from '@/components/ui/LoadingSpinner'
import { freelancerApplicationSchema, type FreelancerApplicationInput } from '@/lib/validations'

const SKILL_OPTIONS = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'design', label: 'Design' },
  { value: 'writing', label: 'Writing' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'devops', label: 'DevOps' },
  { value: 'video-editing', label: 'Video Editing' },
]

const TOTAL_STEPS = 4

function ApplyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [serverError, setServerError] = useState<string | null>(null)
  const paymentCancelled = searchParams.get('payment') === 'cancelled'

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FreelancerApplicationInput>({
    resolver: zodResolver(freelancerApplicationSchema),
    defaultValues: {
      skill_category: 'web-development',
      hourly_rate: 50,
      years_experience: 1,
    },
  })

  const formData = watch()

  const validateAndNext = async () => {
    let fieldsToValidate: (keyof FreelancerApplicationInput)[] = []
    if (step === 1) fieldsToValidate = ['name', 'skill_category', 'years_experience']
    if (step === 2) fieldsToValidate = ['bio', 'portfolio_url']
    if (step === 3) fieldsToValidate = ['hourly_rate']
    const valid = await trigger(fieldsToValidate)
    if (valid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: FreelancerApplicationInput) => {
    setServerError(null)
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json()) as { error?: string; message?: string }
      if (!res.ok) {
        setServerError(json.error ?? 'Failed to submit application')
        return
      }
      router.push('/freelancer/dashboard')
    } catch {
      setServerError('An unexpected error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="freelancer" />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply as a Freelancer</h1>
        <p className="text-gray-500 mb-8">
          Tell us about yourself. Step {step} of {TOTAL_STEPS}.
        </p>

        {paymentCancelled && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md text-sm">
            Payment was cancelled. Complete your application first.
          </div>
        )}

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i + 1 <= step ? 'bg-blue-600' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md">
                {serverError}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-900 text-lg">Basic Information</h2>
                <Input
                  id="name"
                  label="Full Name"
                  placeholder="Jane Doe"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Select
                  id="skill_category"
                  label="Primary Skill Category"
                  options={SKILL_OPTIONS}
                  error={errors.skill_category?.message}
                  {...register('skill_category')}
                />
                <Input
                  id="years_experience"
                  type="number"
                  label="Years of Experience"
                  min={0}
                  max={50}
                  error={errors.years_experience?.message}
                  {...register('years_experience', { valueAsNumber: true })}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-900 text-lg">Bio & Portfolio</h2>
                <Textarea
                  id="bio"
                  label="Professional Bio"
                  hint="Minimum 100 characters. Describe your skills, experience, and what makes you great."
                  rows={6}
                  error={errors.bio?.message}
                  {...register('bio')}
                />
                <Input
                  id="portfolio_url"
                  label="Portfolio URL (optional)"
                  placeholder="https://yourportfolio.com"
                  error={errors.portfolio_url?.message}
                  {...register('portfolio_url')}
                />
                <Input
                  id="loom_url"
                  label="Loom Video URL (optional)"
                  placeholder="https://loom.com/share/..."
                  hint="Record a walkthrough of your work or introduce yourself"
                  error={errors.loom_url?.message}
                  {...register('loom_url')}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-900 text-lg">Hourly Rate</h2>
                <Input
                  id="hourly_rate"
                  type="number"
                  label="Hourly Rate (USD)"
                  placeholder="50"
                  min={5}
                  max={500}
                  hint="Set a competitive rate between $5 and $500 per hour"
                  error={errors.hourly_rate?.message}
                  {...register('hourly_rate', { valueAsNumber: true })}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-900 text-lg">Review & Submit</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Skill</span>
                    <span className="font-medium capitalize">
                      {formData.skill_category?.replace(/-/g, ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Experience</span>
                    <span className="font-medium">{formData.years_experience} years</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Rate</span>
                    <span className="font-medium">${formData.hourly_rate}/hr</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-md border border-blue-100">
                  After submitting, you&apos;ll need to pay a $15 test fee to proceed with skill
                  verification.
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < TOTAL_STEPS ? (
                <Button type="button" onClick={validateAndNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" loading={isSubmitting}>
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ApplyContent />
    </Suspense>
  )
}
