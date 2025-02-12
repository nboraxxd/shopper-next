'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { useQueryRelatedProductsFromBackend } from '@/features/product/hooks'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { ProductCard } from '@/features/product/components'

export default function RelatedProducts({ categoryId, productId }: { categoryId: number; productId: number }) {
  const queryRelatedProducts = useRef<unknown>(null)

  const { ref, inView } = useInView({ rootMargin: '500px', triggerOnce: true })

  const queryRelatedProductsFromBackend = useQueryRelatedProductsFromBackend(categoryId, false)

  useEffect(() => {
    if (!inView || queryRelatedProducts.current) return

    queryRelatedProducts.current = queryRelatedProductsFromBackend.refetch
    queryRelatedProductsFromBackend.refetch()

    const timeout = setTimeout(() => {
      queryRelatedProducts.current = null
    }, 0)

    return () => clearTimeout(timeout)
  }, [inView, queryRelatedProductsFromBackend])

  return (
    <div className="mt-8" ref={ref}>
      <h2 className="text-lg font-bold uppercase">Có thể bạn cũng thích</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 pb-10 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {queryRelatedProductsFromBackend.isLoading
          ? Array.from({ length: 18 }).map((_, index) => (
              <ProductCard key={index}>
                <ProductCard.ImageSkeleton />
                <ProductCard.ContentSkeleton>
                  <div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="mt-2 h-4" />
                  </div>
                  <Skeleton className="h-6 w-1/2" />
                </ProductCard.ContentSkeleton>
              </ProductCard>
            ))
          : null}
        {queryRelatedProductsFromBackend.isSuccess
          ? queryRelatedProductsFromBackend.data.payload.data.map((product) => {
              if (product.id === productId) return null
              return (
                <ProductCard key={product.id} asChild>
                  <Link href={`/${product.slug}`}>
                    <ProductCard.Images
                      width={256}
                      height={256}
                      configurableProducts={product.configurable_products}
                      discountRate={product.discount_rate}
                      images={product.images}
                      name={product.name}
                    />
                    <ProductCard.Content>
                      <ProductCard.Title name={product.name} />
                      <ProductCard.Info>
                        <ProductCard.Price realPrice={product.real_price} />
                        <ProductCard.Rating
                          ratingAverage={product.rating_average}
                          reviewCount={product.review_count}
                          className="xs:hidden md:flex"
                        />
                      </ProductCard.Info>
                    </ProductCard.Content>
                  </Link>
                </ProductCard>
              )
            })
          : null}
      </div>
    </div>
  )
}
