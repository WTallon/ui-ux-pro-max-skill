import Link from 'next/link'
import { Card } from '@/components/ui/Card'

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center">
        <div className="text-5xl mb-4">📧</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Email Verified!</h1>
        <p className="text-gray-500 mb-6">
          Your email has been verified. You can now log in to your ProvenHire account.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </Card>
    </div>
  )
}
