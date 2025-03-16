'use client'

import Image from 'next/image'
import { useEffect } from 'react'

import { formatCurrency } from '@/shared/utils'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useCheckoutStore, usePreCheckoutMutation } from '@/features/checkout/hooks'

import { Skeleton } from '@/shared/components/ui/skeleton'

export default function CheckOutList() {
  const checkout = useCheckoutStore((state) => state.checkout)

  const preCheckoutMutation = usePreCheckoutMutation()

  const { mutateAsync: preCheckoutMutateAsync } = preCheckoutMutation

  useEffect(() => {
    if (!checkout) return
    ;(async () => {
      try {
        await preCheckoutMutateAsync(checkout)
      } catch (error) {
        handleClientErrorApi({ error })
      }
    })()
  }, [checkout, preCheckoutMutateAsync])

  return (
    <div className="flex flex-col gap-4">
      {preCheckoutMutation.isPending
        ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-3">
              <Skeleton className="size-16 md:size-20" />
              <div className="h-full">
                <Skeleton className="h-5 w-36 md:w-60" />
                <Skeleton className="mt-1 h-5 w-24 md:w-36" />
                <Skeleton className="mt-2 h-5 w-16 md:mt-3 md:w-24" />
              </div>
            </div>
          ))
        : null}
      {preCheckoutMutation.isSuccess
        ? preCheckoutMutation.data.payload.data.listItems.map((item) => (
            <div key={item.productId} className="flex items-start gap-3">
              <div className="shrink-0 select-none self-center rounded-md border xs:self-auto">
                <Image
                  src={item.product.thumbnail_url}
                  alt={item.product.name}
                  width={96}
                  height={96}
                  className="size-16 rounded-md object-contain xs:size-20"
                />
              </div>
              <div className="flex grow gap-4">
                <div className="w-full font-medium md:w-[70%]">
                  <h3 className="line-clamp-2 text-sm md:text-base">{item.product.name}</h3>
                  <div className="mt-2 flex items-baseline justify-between gap-2 md:mt-3 md:justify-start">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-highlight md:text-base">
                        {formatCurrency(item.product.real_price)}
                        <sup>₫</sup>
                      </span>
                      {item.product.price > item.product.real_price ? (
                        <span className="hidden text-xs text-cart-price line-through xs:block">
                          {formatCurrency(item.product.price)}
                          <sup>₫</sup>
                        </span>
                      ) : null}
                    </div>
                    <span className="text-sm lg:hidden">x {item.quantity}</span>
                  </div>
                </div>

                <span className="hidden w-[10%] text-end font-medium lg:block">{item.quantity}</span>

                <span className="hidden w-[30%] text-end font-bold md:block lg:w-1/5">
                  {formatCurrency(item.price)}
                  <sup>₫</sup>
                </span>
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
