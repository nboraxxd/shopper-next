import { cn } from '@/shared/utils'

interface Props {
  children: React.ReactNode
  innerClassName?: string
}

export default function LoadingScreen({ children, innerClassName }: Props) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className={cn('flex items-center gap-3', innerClassName)}>{children}</div>
    </div>
  )
}
