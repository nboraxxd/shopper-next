import Image from 'next/image'
import { ElementType } from 'react'

import { formatCurrency } from '@/shared/utils'
import { Skeleton } from '@/shared/components/ui/skeleton'

interface ProductItemProps {
  name: string
  quantity: number
  thumbnail: string
  realPrice: number
  total: number
  as?: ElementType
  [key: string]: any
}

export function ProductItem(props: ProductItemProps) {
  const { name, quantity, thumbnail, realPrice, total, as: Comp = 'div', ...rest } = props

  return (
    <Comp className="flex justify-between gap-2 md:gap-3" {...rest}>
      <div className="flex gap-2 md:gap-3">
        <div className="relative shrink-0 select-none rounded-md border">
          <Image
            className="size-16 rounded object-contain md:size-20"
            src={thumbnail}
            alt={name}
            width={96}
            height={96}
          />
          <span className="absolute bottom-0 right-0 flex h-6 min-w-6 items-center justify-center rounded-tl-lg bg-secondary-3 text-[11px] text-secondary-1">
            x{quantity}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="line-clamp-2 text-xs md:text-sm">{name}</p>
          <p className="text-xs text-secondary-2 md:text-sm">
            {formatCurrency(realPrice)}
            <sup>₫</sup>
          </p>
        </div>
      </div>
      <span className="hidden shrink-0 text-xs xs:inline md:text-sm">
        {formatCurrency(total)}
        <sup>₫</sup>
      </span>
    </Comp>
  )
}

export function ProductItemSkeleton() {
  return (
    <div className="flex gap-2 md:gap-3">
      <Skeleton className="size-16 rounded md:size-20" />
      <div className="flex grow flex-col gap-2">
        <Skeleton className="h-4 w-full xs:w-3/4 md:h-5 md:w-1/2" />
        <Skeleton className="h-4 w-20 md:h-5" />
      </div>
    </div>
  )
}
