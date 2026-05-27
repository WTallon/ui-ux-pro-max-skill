import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'

export const metadata = {
  title: 'Privacy Policy — ProvenHire',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: May 27, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, such as your name, email address,
              company name, professional bio, and payment information when you create an account
              or make a purchase.
            </p>
            <p className="mt-2">
              We also collect usage data, including IP addresses, browser type, pages visited, and
              actions taken on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide, operate, and maintain the ProvenHire platform</li>
              <li>To process payments and manage subscriptions</li>
              <li>To verify freelancer skills and manage applications</li>
              <li>To send transactional emails (application status, payment confirmations)</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Sharing</h2>
            <p>
              We do not sell your personal information. We share data only with trusted service
              providers (Supabase for database, Stripe for payments, Resend for email) who process
              it on our behalf under strict data processing agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. We also use
              analytics cookies (with your consent) to understand how the platform is used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as needed to provide
              services. You may request deletion of your account and associated data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights (GDPR)</h2>
            <p>If you are located in the European Economic Area, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Security</h2>
            <p>
              We use industry-standard security measures including encryption, row-level security,
              and rate limiting. However, no system is 100% secure and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact</h2>
            <p>
              For privacy questions or to exercise your rights, contact us at{' '}
              <a href="mailto:privacy@provenhire.com" className="text-blue-600 hover:underline">
                privacy@provenhire.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to ProvenHire
          </Link>
        </div>
      </div>
    </div>
  )
}
