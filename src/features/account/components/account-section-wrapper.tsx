import { cn } from '@/shared/utils'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function AccountSectionWrapper({ children, className }: Props) {
  return (
    <section className={cn('rounded-4xl bg-account-section px-4 py-7 shadow-section lg:px-7', className)}>
      {children}
    </section>
  )
}
