import { cn } from '@/shared/utils'

export default function AuthInputWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex h-12 items-center gap-3 rounded-xl border border-secondary-3 pr-3 shadow-sm focus-within:border-secondary-3/0 focus-within:shadow-focus-within',
        className
      )}
    >
      {children}
    </div>
  )
}
