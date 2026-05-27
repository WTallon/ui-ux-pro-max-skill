import { cn } from '@/lib/utils'

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}
