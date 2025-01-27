import Link from 'next/link'
import Image from 'next/image'

import { cn, formatCurrency } from '@/shared/utils'
import { PRODUCT_ERROR_IMAGES } from '@/features/product/constants'
import type { ConfigurableProduct, ProductImagedata } from '@/features/product/types'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { AspectRatio } from '@/shared/components/ui/aspect-ratio'
import { ShopperIcon, StarIcon, Svgr } from '@/shared/components/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'

interface Props {
  slug: string
  name: string
  realPrice: number
  discountRate: number
  reviewCount: number
  ratingAverage: number
  images: ProductImagedata[]
  configurableProducts?: ConfigurableProduct[]
  category?: string
  className?: string
}

function OldProductCard(props: Props) {
  const {
    discountRate,
    images,
    name,
    ratingAverage,
    realPrice,
    reviewCount,
    slug,
    configurableProducts,
    category,
    className,
  } = props

  let primaryImage = images[0].medium_url

  if (PRODUCT_ERROR_IMAGES.includes(primaryImage) && configurableProducts && configurableProducts.length > 0) {
    // Khi đã vào đây, tức là configurableProducts có ít nhất 1 phần tử nên chỉ cần configurableProducts[0].
    // Dùng configurableProducts[1]?. vì có thể configurableProducts[1] không tồn tại
    // Chỉ cần dùng images[0]. vì medium_url luôn tồn tại trong images
    primaryImage = configurableProducts[1]?.images[0].medium_url || configurableProducts[0].images[0].medium_url
  }

  // Dùng configurableProducts?. vì có thể configurableProducts có thể là undefined
  // Dùng configurableProducts?.[0]?. vì có thể configurableProducts.length === 0
  // Chỉ cần dùng images[0]. vì medium_url luôn tồn tại trong images
  let secondaryImage = configurableProducts?.[0]?.images[0].medium_url

  if (!secondaryImage) {
    // Dùng images[1]?. vì có thể array images có thể không có phần tử thứ 2
    secondaryImage = images[1]?.medium_url || primaryImage
  }

  return (
    <Card asChild className={cn('flex flex-col border-none shadow-section', className)}>
      <Link href={`/${slug}`}>
        <CardHeader className="p-0">
          {/* Image */}
          <AspectRatio ratio={1 / 1} className="group rounded-t-xl bg-light-1">
            <Image
              src={primaryImage}
              alt={name}
              width={256}
              height={256}
              className="inline-block size-full rounded-t-xl object-contain transition-opacity duration-200 group-hover:opacity-0"
            />
            <Image
              src={secondaryImage}
              alt={name}
              width={256}
              height={256}
              className="ml-[-100%] inline-block size-full rounded-t-xl object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            {discountRate > 0 ? (
              <span className="absolute right-1 top-1 rounded bg-primary-blue/85 px-1 py-0.5 text-xs text-light-1">
                -{Math.ceil(discountRate)}%
              </span>
            ) : null}
          </AspectRatio>
        </CardHeader>

        <CardContent className="flex grow flex-col gap-2 p-3 md:gap-2.5 md:p-4">
          {/* Name */}
          <CardTitle className="line-clamp-2 text-sm font-medium">{name}</CardTitle>
          {/* Category */}
          {category ? <CardDescription className="line-clamp-1 text-xs">{category}</CardDescription> : null}

          <div className="mt-auto flex items-center justify-between gap-1">
            {/* Price */}
            <div className="text-sm font-medium md:text-base">
              <span>{formatCurrency(realPrice)}</span>
              <sup>₫</sup>
            </div>
            {/* Rating */}
            {ratingAverage > 0 && reviewCount > 0 ? (
              <div className="hidden items-center gap-0.5 xs:flex">
                <Svgr icon={StarIcon} className="size-4 text-primary-yellow" />
                <span className="mt-0.5 text-sm">{ratingAverage.toFixed(1)}</span>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

function OldProductCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col border-none shadow-section', className)}>
      <div className="relative p-0 pt-[100%]">
        <div className="absolute left-0 top-0 size-full">
          <Skeleton className="size-full rounded-none rounded-t-xl" />
          <ShopperIcon className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-foreground/15" />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3 md:gap-2.5 md:p-4">
        <div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4" />
        </div>
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    </Card>
  )
}

export { OldProductCard, OldProductCardSkeleton }
