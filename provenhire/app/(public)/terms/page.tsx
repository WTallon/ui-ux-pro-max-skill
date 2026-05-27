import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'

export const metadata = {
  title: 'Terms of Service — ProvenHire',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: May 27, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using ProvenHire, you agree to be bound by these Terms of Service
              and our Privacy Policy. If you do not agree, do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Eligibility</h2>
            <p>
              You must be at least 18 years old and capable of entering a legally binding
              contract to use ProvenHire. By using the platform, you represent and warrant
              that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Freelancer Applications</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Freelancers must pay a non-refundable $15 test fee to access the skill
                verification process.
              </li>
              <li>
                ProvenHire reserves the right to approve or reject any application at its
                sole discretion.
              </li>
              <li>
                Rejected applicants may reapply after 30 days.
              </li>
              <li>
                Freelancers must provide accurate information. Providing false information
                is grounds for immediate removal.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Client Subscriptions</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Client subscriptions are billed monthly at $99/month and renew automatically.
              </li>
              <li>
                You may cancel your subscription at any time. Cancellation takes effect at
                the end of the current billing period.
              </li>
              <li>
                No refunds are provided for partial subscription periods.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Post false, misleading, or fraudulent information</li>
              <li>Attempt to bypass rate limiting or security measures</li>
              <li>Use automated tools to scrape or abuse the platform</li>
              <li>Harass, threaten, or discriminate against other users</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p>
              ProvenHire is provided &quot;as is&quot; without warranties of any kind. We are not
              liable for any damages arising from your use of the platform, including but not
              limited to lost profits, data loss, or service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms,
              engage in fraudulent activity, or harm other users or the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Delaware, USA, without regard to
              conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
              <a href="mailto:legal@provenhire.com" className="text-blue-600 hover:underline">
                legal@provenhire.com
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
