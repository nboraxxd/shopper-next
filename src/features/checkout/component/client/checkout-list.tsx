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
      {preCheckoutMutation.isIdle || preCheckoutMutation.isPending
        ? Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex items-start gap-2 md:gap-3">
              <Skeleton className="size-16" />
              <div className="h-full">
                <Skeleton className="h-[1.375rem] w-36 md:w-60" />
                <Skeleton className="mt-1 h-[1.375rem] w-24 md:w-36" />
                <Skeleton className="mt-2 h-6 w-16 md:w-24" />
              </div>
            </div>
          ))
        : null}
      {preCheckoutMutation.isSuccess
        ? preCheckoutMutation.data.payload.data.listItems.map((item) => (
            <div key={item.productId} className="flex items-start gap-3">
              <div className="flex w-full items-start gap-3 font-medium md:w-4/5 lg:w-3/4">
                <div className="shrink-0 select-none rounded-md border">
                  <Image
                    src={item.product.thumbnail_url}
                    alt={item.product.name}
                    width={72}
                    height={72}
                    className="size-16 rounded-md object-contain"
                  />
                </div>
                <div className="grow">
                  <h3 className="line-clamp-2 text-sm md:text-base">{item.product.name}</h3>
                  <div className="mt-2 flex items-baseline justify-between gap-2 md:justify-start">
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
              </div>

              <span className="hidden w-[10%] text-end font-medium lg:block">{item.quantity}</span>

              <span className="hidden text-end font-bold md:block md:w-1/5 lg:w-[15%]">
                {formatCurrency(item.price)}
                <sup>₫</sup>
              </span>
            </div>
          ))
        : null}
    </div>
  )
}
