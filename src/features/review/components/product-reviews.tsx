'use client'

import { format } from 'date-fns'

import { useQueryReviewsFromBackend } from '@/features/review/hooks'
import { UserAvatar } from '@/shared/components'
import { ReviewsEmptyIcon, StarIcon } from '@/shared/components/icons'
import { Separator } from '@/shared/components/ui/separator'
import { Fragment, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Skeleton } from '@/shared/components/ui/skeleton'

export default function ProductReviews({ productId }: { productId: string }) {
  const ref = useRef<HTMLDivElement | null>(null)

  const isInView = useInView(ref, { margin: '100px' })

  const queryReviewsFromBackend = useQueryReviewsFromBackend(productId, false)

  useEffect(() => {
    if (isInView) {
      queryReviewsFromBackend.refetch()
    }
  }, [isInView, queryReviewsFromBackend])

  return (
    <section className="mx-auto mt-5 w-full lg:w-10/12 xl:w-8/12">
      {queryReviewsFromBackend.isLoading ? (
        <div>
          <h2 className="text-lg font-bold">Đánh giá sản phẩm</h2>

          {Array.from({ length: 5 }).map((_, index) => (
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
              <Separator />
            </Fragment>
          ))}
        </div>
      ) : null}
      <div ref={ref}>
        {queryReviewsFromBackend.isSuccess ? (
          <>
            <h2 className="text-lg font-bold">Đánh giá sản phẩm</h2>
            {queryReviewsFromBackend.data.payload.data.length > 0 ? (
              queryReviewsFromBackend.data.payload.data.map((review) => (
                <Fragment key={review._id}>
                  <div className="flex items-start gap-3 py-5">
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
                              <StarIcon key={index} className="size-4 text-primary-yellow" />
                            ))}
                            {Array.from({ length: 5 - review.star }).map((_, index) => (
                              <StarIcon key={index} className="size-4 fill-none text-primary-yellow" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs italic">{format(new Date(review.createdAt), 'HH:mm | dd/MM/yyyy')}</p>
                      </div>
                      <p className="mt-2">{review.content}</p>
                    </div>
                  </div>
                  <Separator />
                </Fragment>
              ))
            ) : (
              <div className="flex flex-col items-center gap-2 py-5">
                <ReviewsEmptyIcon />
                <p>Chưa có đánh giá nào cho sản phẩm này</p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </section>
  )
}
