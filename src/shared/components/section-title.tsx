import { cn } from '@/shared/utils'
import { Icon } from '@/shared/types'
import { Svgr } from '@/shared/components/icons'

interface Props {
  title: string
  icon?: Icon
  className?: string
}

export default function SectionTitle({ title, icon, className }: Props) {
  return (
    <h2
      className={cn('flex items-center gap-1 text-sm font-bold xs:gap-1.5 xs:text-base sm:gap-2 sm:text-lg', className)}
    >
      {icon ? <Svgr icon={icon} className="size-4 xs:size-5 sm:size-6" strokeWidth={1.5} /> : null}
      <span className="mt-0.5">{title}</span>
    </h2>
  )
}
