import Link from 'next/link'
import Image from 'next/image'
import type { ComponentProps } from 'react'

import { cn } from '@/utils'

interface CategoryProps extends ComponentProps<typeof Link> {
  img: string
  title: string
  isActive?: boolean
  linkClassName?: string
  imageClassName?: string
  titleClassName?: string
}

export default function CategoryItem(props: CategoryProps) {
  const { img, title, isActive = false, linkClassName, imageClassName, titleClassName, ...rest } = props

  return (
    <Link
      className={cn(
        'flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80 max-lg:w-[104px] max-lg:flex-col lg:h-14',
        linkClassName
      )}
      title={title}
      {...rest}
    >
      <div className="overflow-hidden rounded-[35%] border border-secondary-3/30 lg:overflow-visible lg:rounded-none lg:border-none">
        <Image
          width={64}
          height={64}
          src={img}
          alt={title}
          className={cn('size-12 object-contain lg:size-9', imageClassName)}
        />
      </div>
      <h3
        className={cn(
          'text-balance text-center text-xs font-medium capitalize lg:text-wrap lg:text-left lg:text-sm',
          {
            'text-active-category': isActive,
          },
          titleClassName
        )}
      >
        {title}
      </h3>
    </Link>
  )
}
