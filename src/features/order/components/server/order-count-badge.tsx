import { cn } from '@/shared/utils'

export default function OrderCountBadge({ count, className }: { count: number; className?: string }) {
  return (
    <span
      className={cn(
        'absolute right-0 top-0 flex size-6 items-center justify-center rounded-full bg-primary-blue/95 text-xs text-light-1',
        { 'text-[0.6875rem]': count > 99 },
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}
