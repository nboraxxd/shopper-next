'use client'

import { format } from 'date-fns'
import { useInView } from 'framer-motion'
import { Fragment, useEffect, useRef } from 'react'

import { useQueryReviewsFromBackend } from '@/features/review/hooks'

import { UserAvatar } from '@/shared/components'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Separator } from '@/shared/components/ui/separator'
import { ReviewsEmptyIcon, StarIcon, Svgr } from '@/shared/components/icons'

const REVIEW_SKELETONS = 10

export default function ProductReviews({ productId }: { productId: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const queryReviewsRef = useRef<unknown>(null)

  const isInView = useInView(ref, { margin: '100px' })

  const queryReviewsFromBackend = useQueryReviewsFromBackend(productId, false)

  useEffect(() => {
    if (!isInView || queryReviewsRef.current) return

    queryReviewsRef.current = queryReviewsFromBackend.refetch
    queryReviewsFromBackend.refetch()

    const timeout = setTimeout(() => {
      queryReviewsRef.current = null
    }, 0)

    return () => clearTimeout(timeout)
  }, [isInView, queryReviewsFromBackend])

  return (
    <section className="mt-8 rounded-xl bg-product-info" ref={ref}>
      <div className="mx-auto w-full p-4 md:p-10 lg:w-10/12 xl:w-8/12">
        <h2 className="text-lg font-bold uppercase">Đánh giá sản phẩm</h2>
        {queryReviewsFromBackend.isLoading
          ? Array.from({ length: REVIEW_SKELETONS }).map((_, index) => (
              <Fragment key={index}>
                <div className="flex items-start gap-3 py-5">
                  <Skeleton className="size-16 rounded-full" />
                  <div className="grow">
                    <div className="flex flex-col items-start justify-between gap-1 md:flex-row">
                      <div className="w-full">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="mt-1 h-4 w-1/4" />
                      </div>
                      <Skeleton className="h-4 w-1/5" />
                    </div>
                    <Skeleton className="mt-2 h-4 w-full" />
                    <Skeleton className="mt-1 h-4 w-1/2" />
                  </div>
                </div>
                {index !== REVIEW_SKELETONS - 1 ? <Separator /> : null}
              </Fragment>
            ))
          : null}
        {queryReviewsFromBackend.isSuccess ? (
          queryReviewsFromBackend.data.payload.data.length > 0 ? (
            queryReviewsFromBackend.data.payload.data.map((review, index) => (
              <Fragment key={review._id}>
                <div className="flex items-start gap-3 py-5 last:pb-0">
                  <UserAvatar
                    avatarUrl={review.user.avatar}
                    height={72}
                    width={72}
                    name={review.user.name}
                    className="size-16 text-lg font-medium"
                  />
                  <div className="grow">
                    <div className="flex flex-col items-start justify-between gap-1 md:flex-row">
                      <div>
                        <h3 className="font-medium">{review.user.name}</h3>
                        <div className="flex">
                          {Array.from({ length: review.star }).map((_, index) => (
                            <Svgr icon={StarIcon} key={index} className="size-4 text-primary-yellow" />
                          ))}
                          {Array.from({ length: 5 - review.star }).map((_, index) => (
                            <Svgr icon={StarIcon} key={index} className="size-4 fill-none text-primary-yellow" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs italic">{format(new Date(review.createdAt), 'HH:mm | dd/MM/yyyy')}</p>
                    </div>
                    <p className="mt-2">{review.content}</p>
                  </div>
                </div>
                {index !== queryReviewsFromBackend.data.payload.data.length - 1 ? <Separator /> : null}
              </Fragment>
            ))
          ) : (
            <div className="flex h-96 flex-col items-center justify-center gap-2">
              <ReviewsEmptyIcon />
              <p className="block sm:hidden">Chưa có đánh giá</p>
              <p className="hidden sm:block">Chưa có đánh giá nào cho sản phẩm này</p>
            </div>
          )
        ) : null}
      </div>
    </section>
  )
}
