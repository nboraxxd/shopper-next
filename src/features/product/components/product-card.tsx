import Image from 'next/image'

import { cn, formatCurrency } from '@/shared/utils'
import { PRODUCT_ERROR_IMAGES } from '@/features/product/constants'
import { ConfigurableProduct, ProductImagedata } from '@/features/product/types'

import { ShopperIcon, StarIcon } from '@/shared/components/icons'
import { AspectRatio } from '@/shared/components/ui/aspect-ratio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

interface ProductCardProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

/**
 * Anatomy of ProductCard
 * ```
 * <ProductCard>
 *  <ProductCard.Images width={256} height={256} />
 *  <ProductCard.Content>
 *   <ProductCard.Title />
 *   <ProductCard.Category />
 *   <ProductCard.Info>
 *    <ProductCard.Price />
 *    <ProductCard.Rating />
 *   </ProductCard.Info>
 *  </ProductCard.Content>
 * </ProductCard>
 * ```
 */
export default function ProductCard(props: ProductCardProps) {
  const { children, className, asChild = false } = props

  return (
    <Card asChild={asChild} className={cn('flex flex-col border-0', className)}>
      {children}
    </Card>
  )
}

interface ProductImageProps extends Pick<React.ComponentProps<typeof Image>, 'width' | 'height'> {
  name: string
  discountRate: number
  images: ProductImagedata[]
  configurableProducts: ConfigurableProduct[] | null
  imageClassName?: string
}

function ProductImages(props: ProductImageProps) {
  const { configurableProducts, discountRate, images, name, height, imageClassName, width } = props

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
    <CardHeader className="p-0">
      <AspectRatio ratio={1 / 1} className="group rounded-t-xl bg-light-1">
        <Image
          src={primaryImage}
          alt={name}
          width={width}
          height={height}
          className={cn(
            'inline-block size-full rounded-t-xl object-contain transition-opacity duration-200 group-hover:opacity-0',
            imageClassName
          )}
        />
        <Image
          src={secondaryImage}
          alt={name}
          width={width}
          height={height}
          className={cn(
            'ml-[-100%] inline-block size-full rounded-t-xl object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100',
            imageClassName
          )}
        />
        {discountRate > 0 ? (
          <span className="absolute right-1 top-1 rounded bg-primary-blue/85 px-1 py-0.5 text-xs text-light-1">
            -{Math.ceil(discountRate)}%
          </span>
        ) : null}
      </AspectRatio>
    </CardHeader>
  )
}

function ProductImageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative p-0 pt-[100%] [&_svg]:size-14 md:[&_svg]:size-20', className)}>
      <div className="absolute left-0 top-0 size-full">
        <Skeleton className="size-full rounded-none rounded-t-xl" />
        <ShopperIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground/15 " />
      </div>
    </div>
  )
}

function ProductContent({ children }: { children: React.ReactNode }) {
  return <CardContent className="flex grow flex-col gap-2 p-3 md:gap-2.5 md:p-4">{children}</CardContent>
}

function ProductContentSkeleton({ children, className }: { children: React.ReactNode; className?: string }) {
  return <CardContent className={cn('flex flex-col gap-2 p-3 md:gap-2.5 md:p-4', className)}>{children}</CardContent>
}

{
  /* <div className="flex flex-col gap-2 p-3 md:gap-2.5 md:p-4">
        <div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4" />
        </div>
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-6 w-1/2" />
      </div> */
}

function ProductTitle({ name, className }: { name: string; className?: string }) {
  return <CardTitle className={cn('line-clamp-2 text-sm font-medium', className)}>{name}</CardTitle>
}

function ProductCategory({ category, className }: { category?: string; className?: string }) {
  return category ? (
    <CardDescription className={cn('line-clamp-1 text-xs', className)}>{category}</CardDescription>
  ) : null
}

function ProductInfo({ children }: { children: React.ReactNode }) {
  return <div className="mt-auto flex items-center justify-between gap-1">{children}</div>
}

function ProductPrice({ realPrice, className }: { realPrice: number; className?: string }) {
  return (
    <div className={cn('text-sm font-medium md:text-base', className)}>
      <span>{formatCurrency(realPrice)}</span>
      <sup>₫</sup>
    </div>
  )
}

function ProductRating(props: { ratingAverage: number; reviewCount: number; className?: string }) {
  const { ratingAverage, reviewCount, className } = props

  return ratingAverage > 0 && reviewCount > 0 ? (
    <div className={cn('hidden items-center gap-0.5 xs:flex', className)}>
      <StarIcon className="size-4 text-primary-yellow" />
      <span className="mt-0.5 text-sm">{ratingAverage.toFixed(1)}</span>
    </div>
  ) : null
}

// Add child components as properties to parent component
ProductCard.Images = ProductImages
ProductCard.Content = ProductContent
ProductCard.Title = ProductTitle
ProductCard.Category = ProductCategory
ProductCard.Info = ProductInfo
ProductCard.Price = ProductPrice
ProductCard.Rating = ProductRating

ProductCard.ImageSkeleton = ProductImageSkeleton
ProductCard.ContentSkeleton = ProductContentSkeleton
