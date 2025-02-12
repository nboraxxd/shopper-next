'use client'

import Image from 'next/image'
import { createContext, use } from 'react'

import { cn, formatCurrency } from '@/shared/utils'
import { PRODUCT_ERROR_IMAGES } from '@/features/product/constants'
import { ConfigurableProduct, ProductImagedata } from '@/features/product/types'

import { StarIcon, Svgr } from '@/shared/components/icons'
import { AspectRatio } from '@/shared/components/ui/aspect-ratio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'

interface ProductCardProps {
  children: React.ReactNode
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
  asChild?: boolean
}

type ProductCardData = Omit<
  ProductCardProps,
  'children' | 'asChild' | 'className' | 'images' | 'configurableProducts'
> & { primaryImage: string; secondaryImage: string }

// Step 1. Create a context
const ProductCardContext = createContext<ProductCardData>({
  discountRate: 0,
  name: '',
  ratingAverage: 0,
  realPrice: 0,
  reviewCount: 0,
  slug: '',
  category: '',
  primaryImage: '',
  secondaryImage: '',
})

// Step 2. Create parent component
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
  const { children, className, asChild = false, images, configurableProducts, ...rest } = props

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
    <ProductCardContext.Provider value={{ ...rest, primaryImage, secondaryImage }}>
      <Card asChild={asChild} className={cn('flex flex-col border-none shadow-section', className)}>
        {children}
      </Card>
    </ProductCardContext.Provider>
  )
}

// Step 3. Create child component to help implementing the common tasks
function Images(props: Pick<React.ComponentProps<typeof Image>, 'width' | 'height'> & { imageClassName?: string }) {
  const { imageClassName, width, height } = props

  const { primaryImage, secondaryImage, name, discountRate } = use(ProductCardContext)

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

function Content({ children }: { children: React.ReactNode }) {
  return <CardContent className="flex grow flex-col gap-2 p-3 md:gap-2.5 md:p-4">{children}</CardContent>
}

function Title({ className }: { className?: string }) {
  const { name } = use(ProductCardContext)

  return <CardTitle className={cn('line-clamp-2 text-sm font-medium', className)}>{name}</CardTitle>
}

function Category({ className }: { className?: string }) {
  const { category } = use(ProductCardContext)

  return category ? (
    <CardDescription className={cn('line-clamp-1 text-xs', className)}>{category}</CardDescription>
  ) : null
}

function Info({ children }: { children: React.ReactNode }) {
  return <div className="mt-auto flex items-center justify-between gap-1">{children}</div>
}

function Price({ className }: { className?: string }) {
  const { realPrice } = use(ProductCardContext)

  return (
    <div className={cn('text-sm font-medium md:text-base', className)}>
      <span>{formatCurrency(realPrice)}</span>
      <sup>₫</sup>
    </div>
  )
}

function Rating({ className }: { className?: string }) {
  const { ratingAverage, reviewCount } = use(ProductCardContext)

  return ratingAverage > 0 && reviewCount > 0 ? (
    <div className={cn('hidden items-center gap-0.5 xs:flex', className)}>
      <Svgr icon={StarIcon} className="size-4 text-primary-yellow" />
      <span className="mt-0.5 text-sm">{ratingAverage.toFixed(1)}</span>
    </div>
  ) : null
}

// Step 4. Add child components as properties to parent component
ProductCard.Images = Images
ProductCard.Content = Content
ProductCard.Title = Title
ProductCard.Category = Category
ProductCard.Info = Info
ProductCard.Price = Price
ProductCard.Rating = Rating
