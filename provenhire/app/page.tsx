import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'

const SKILL_CATEGORIES = [
  { label: 'Web Development', icon: '💻', slug: 'web-development' },
  { label: 'Mobile Development', icon: '📱', slug: 'mobile-development' },
  { label: 'Design', icon: '🎨', slug: 'design' },
  { label: 'Writing', icon: '✍️', slug: 'writing' },
  { label: 'Marketing', icon: '📣', slug: 'marketing' },
  { label: 'Data Science', icon: '📊', slug: 'data-science' },
  { label: 'DevOps', icon: '⚙️', slug: 'devops' },
  { label: 'Video Editing', icon: '🎬', slug: 'video-editing' },
]

const STEPS_CLIENT = [
  {
    step: '1',
    title: 'Browse verified profiles',
    desc: 'Filter by skill, score, and rate. Every freelancer has passed a skill test.',
  },
  {
    step: '2',
    title: 'Subscribe to unlock contact',
    desc: 'A simple monthly subscription gives you unlimited contact requests.',
  },
  {
    step: '3',
    title: 'Hire with confidence',
    desc: "You know exactly what you're getting — verified skills, proven work.",
  },
]

const STEPS_FREELANCER = [
  {
    step: '1',
    title: 'Apply and pay the test fee',
    desc: 'A $15 one-time fee covers your skill verification test.',
  },
  {
    step: '2',
    title: 'Pass the skill challenge',
    desc: 'Record a Loom walkthrough demonstrating your expertise.',
  },
  {
    step: '3',
    title: 'Get hired',
    desc: 'Approved freelancers get a public profile with their test score displayed.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full mb-6 font-medium">
            Every freelancer is skill-tested and scored
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Hire Freelancers You Can
            <span className="text-blue-600"> Actually Trust</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            ProvenHire vets every freelancer with a rigorous skill test. Browse profiles with real
            test scores — not just self-reported experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/freelancers"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Browse Freelancers
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
            >
              Apply as Freelancer
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-blue-600 py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-white">500+</p>
            <p className="text-blue-200 text-sm mt-1">Verified Freelancers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">87</p>
            <p className="text-blue-200 text-sm mt-1">Avg Test Score</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">1,200+</p>
            <p className="text-blue-200 text-sm mt-1">Active Clients</p>
          </div>
        </div>
      </section>

      {/* How it works - Clients */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">For Clients</h2>
            <p className="text-gray-500 text-lg">Find the right freelancer in minutes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS_CLIENT.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Freelancers */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">For Freelancers</h2>
            <p className="text-gray-500 text-lg">Stand out with a verified skill score</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS_FREELANCER.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-indigo-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Skill</h2>
            <p className="text-gray-500">Find experts in every domain</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SKILL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/freelancers?skill_category=${cat.slug}`}
                className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <span className="text-3xl mb-3">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 text-center">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to hire with confidence?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Join over 1,200 companies that trust ProvenHire to find vetted talent.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-white font-bold text-lg">ProvenHire</span>
            <p className="text-sm mt-1">Hire freelancers you can trust.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/freelancers" className="hover:text-white transition-colors">
              Browse Freelancers
            </Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} ProvenHire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
