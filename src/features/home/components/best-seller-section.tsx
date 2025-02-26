import Link from 'next/link'

import PATH from '@/shared/constants/path'
import { productServerApi } from '@/features/product/api/server'
import { BEST_SELLER_PRODUCTS_FIELDS } from '@/features/product/constants'
import type { Product, BestSellerProductsField } from '@/features/product/types'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { ShopperIcon, Svgr } from '@/shared/components/icons'
import { ProductCard } from '@/features/product/components/server'

function BestSellerWapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="pt-16 lg:pt-24">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Sản phẩm bán chạy</h2>
        <Link
          href={PATH.PRODUCTS}
          className="hidden text-sm font-semibold text-highlight hover:text-highlight/90 sm:block"
        >
          Xem tất cả
          <span> &rarr;</span>
        </Link>
      </div>
      <div className="mt-5 overflow-x-auto">{children}</div>
      <div className="mt-6 px-4 sm:hidden">
        <Link href={PATH.PRODUCTS} className="block text-sm font-semibold text-highlight hover:text-highlight/90">
          Xem tất cả
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </section>
  )
}

export async function BestSellerSection() {
  const productsResponse = await productServerApi.getProductsFromBackend<Pick<Product, BestSellerProductsField>>({
    fields: BEST_SELLER_PRODUCTS_FIELDS,
    limit: '12',
    sort: 'top_sell',
  })

  return (
    <BestSellerWapper>
      <div className="flex gap-2 pb-3 md:gap-4">
        {productsResponse.payload.data.slice(0, 6).map((product) => {
          const { configurable_products, discount_rate, id, images, name, real_price, slug } = product

          return (
            <ProductCard key={id} className="w-28 shrink-0 grow md:w-36" asChild>
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
                  <ProductCard.Title name={name} className="text-xs md:text-sm" />
                  <ProductCard.Info>
                    <ProductCard.Price realPrice={real_price} className="text-xs md:text-xs lg:text-sm" />
                  </ProductCard.Info>
                </ProductCard.Content>
              </Link>
            </ProductCard>
          )
        })}
      </div>
      <div className="flex gap-2 pb-3 md:gap-4">
        {productsResponse.payload.data.slice(6).map((product) => {
          const { configurable_products, discount_rate, id, images, name, real_price, slug } = product

          return (
            <ProductCard key={id} className="w-28 shrink-0 grow md:w-36" asChild>
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
                  <ProductCard.Title name={name} className="text-xs md:text-sm" />
                  <ProductCard.Info>
                    <ProductCard.Price realPrice={real_price} className="text-xs md:text-xs lg:text-sm" />
                  </ProductCard.Info>
                </ProductCard.Content>
              </Link>
            </ProductCard>
          )
        })}
      </div>
    </BestSellerWapper>
  )
}

export function BestSellerSectionSkeleton() {
  return (
    <BestSellerWapper>
      <div className="flex gap-2 pb-3 md:gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeletion key={index} />
        ))}
      </div>
      <div className="flex gap-2 pb-3 md:gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeletion key={index} />
        ))}
      </div>
    </BestSellerWapper>
  )
}

function ProductCardSkeletion() {
  return (
    <ProductCard className="w-28 shrink-0 grow md:w-36">
      <div className="relative p-0 pt-[100%]">
        <div className="absolute left-0 top-0 size-full">
          <Skeleton className="size-full rounded-none rounded-t-xl" />
          <Svgr
            icon={ShopperIcon}
            width={80}
            height={80}
            className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-foreground/15 xl:size-20"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3 md:gap-2.5 md:p-4">
        <div>
          <Skeleton className="h-3.5 md:h-4" />
          <Skeleton className="mt-1 h-3.5 md:mt-2 md:h-4" />
        </div>
        <Skeleton className="h-4 w-2/3 lg:h-5" />
      </div>
    </ProductCard>
  )
}
