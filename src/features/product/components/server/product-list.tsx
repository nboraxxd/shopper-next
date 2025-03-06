import Link from 'next/link'
import keyBy from 'lodash/keyBy'

import type { Category } from '@/features/category/types'
import { productServerApi } from '@/features/product/api/server'
import { PRODUCTS_FIELDS } from '@/features/product/constants'
import type { Product, ProductsField, ProductsSearchParams } from '@/features/product/types'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { ProductCard } from '@/features/product/components/server'
import { PaginationWithLinks } from '@/shared/components/ui/pagination-with-links'

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

  return (
    <div className="pb-7 lg:pb-14">
      <div className="mt-4 grid grid-cols-2 gap-3 md:mt-7 md:grid-cols-3 md:gap-4 lg:h-fit xl:grid-cols-4 2xl:grid-cols-5">
        {productsResponse.payload.data.map((product) => {
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
        })}
      </div>
      <PaginationWithLinks
        page={productsResponse.payload.paginate.currentPage}
        pageSize={productsResponse.payload.paginate.perPage}
        totalPage={productsResponse.payload.paginate.totalPage}
      />
    </div>
  )
}

export function ProductListSkeleton() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 pb-14 md:mt-7 md:grid-cols-3 md:gap-4 lg:h-fit xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 30 }).map((_, index) => (
        <ProductCard key={index}>
          <ProductCard.ImageSkeleton />
          <ProductCard.ContentSkeleton>
            <div>
              <Skeleton className="h-[1.125rem] w-full" />
              <Skeleton className="mt-1 h-[1.125rem] w-2/3" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-5 w-1/2 md:h-6" />
          </ProductCard.ContentSkeleton>
        </ProductCard>
      ))}
    </div>
  )
}
