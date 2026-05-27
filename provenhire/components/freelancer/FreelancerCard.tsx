import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, getInitials } from '@/lib/utils'
import type { FreelancerProfile } from '@/types'

interface FreelancerCardProps {
  freelancer: Pick<
    FreelancerProfile,
    | 'id'
    | 'name'
    | 'skill_category'
    | 'bio'
    | 'hourly_rate'
    | 'test_score'
    | 'years_experience'
    | 'avatar_url'
  >
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <Link href={`/freelancers/${freelancer.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-lg flex-shrink-0 overflow-hidden">
            {freelancer.avatar_url ? (
              <Image
                src={freelancer.avatar_url}
                alt={freelancer.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              getInitials(freelancer.name)
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{freelancer.name}</h3>
            <p className="text-sm text-gray-500 capitalize">
              {freelancer.skill_category.replace(/-/g, ' ')}
            </p>
          </div>
          {freelancer.test_score !== null && (
            <Badge variant="success" className="flex-shrink-0">
              Score: {freelancer.test_score}
            </Badge>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{freelancer.bio}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-900">
            {formatCurrency(freelancer.hourly_rate)}/hr
          </span>
          <span className="text-gray-500">{freelancer.years_experience}y exp</span>
        </div>
      </Card>
    </Link>
  )
}
