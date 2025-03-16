import { cn } from '@/shared/utils'
import { Icon } from '@/shared/types'

interface Props {
  title: string
  icon: Icon
  className?: string
}

export default function CheckoutSectionTitle({ title, icon: Icon, className }: Props) {
  return (
    <h2
      className={cn(
        'flex w-full items-center gap-1 text-sm font-bold xs:gap-1.5 xs:text-base sm:gap-2 sm:text-lg lg:w-[calc(70%_+_110px)]',
        className
      )}
    >
      <Icon className="size-4 xs:size-5 sm:size-6" strokeWidth={1.5} />
      <span className="mt-0.5">{title}</span>
    </h2>
  )
}
