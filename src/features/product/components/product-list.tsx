import Link from 'next/link'
import keyBy from 'lodash/keyBy'

import type { Category } from '@/features/category/types'
import { productServerApi } from '@/features/product/api/server'
import { PRODUCTS_FIELDS } from '@/features/product/constants'
import type { Product, ProductsField, ProductsSearchParams } from '@/features/product/types'

import { ShopperIcon } from '@/shared/components/icons'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { ProductCard } from '@/features/product/components'

interface Props {
  productsSearchParams: ProductsSearchParams
  categories: Category[]
}

export async function ProductList({ productsSearchParams, categories }: Props) {
  const categoryById = keyBy(categories, 'id')

  const productsResponse = await productServerApi.getProductsFromBackend<Pick<Product, ProductsField>>({
    fields: PRODUCTS_FIELDS,
    limit: '30',
    ...productsSearchParams,
  })

  return productsResponse.payload.data.map((product) => {
    const {
      categories,
      configurable_products,
      discount_rate,
      id,
      images,
      name,
      rating_average,
      real_price,
      review_count,
      slug,
    } = product

    const category = categoryById[categories] as Category | undefined

    return (
      <ProductCard key={id} asChild>
        <Link href={`/${slug}`}>
          <ProductCard.Images
            width={256}
            height={256}
            configurableProducts={configurable_products}
            discountRate={discount_rate}
            images={images}
            name={name}
          />
          <ProductCard.Content>
            <ProductCard.Title name={name} />
            <ProductCard.Category category={category?.title} />
            <ProductCard.Info>
              <ProductCard.Price realPrice={real_price} />
              <ProductCard.Rating ratingAverage={rating_average} reviewCount={review_count} />
            </ProductCard.Info>
          </ProductCard.Content>
        </Link>
      </ProductCard>
    )
  })
}

export function ProductListSkeleton() {
  return (
    <>
      {Array.from({ length: 30 }).map((_, index) => (
        <ProductCard key={index}>
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
        </ProductCard>
      ))}
    </>
  )
}
