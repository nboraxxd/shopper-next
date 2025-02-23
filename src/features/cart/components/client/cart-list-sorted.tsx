'use client'

import { useEffect, useRef } from 'react'

import { GetCartListResponse } from '@/features/cart/types'
import { useBuyNowProductId } from '@/features/product/hooks'
import { usePreCheckoutMutation } from '@/features/checkout/hooks'

import { Separator } from '@/shared/components/ui/separator'
import { CartItem, CartSelectAll } from '@/features/cart/components/client'

export default function CartListReoder({ cartList }: { cartList: GetCartListResponse['data']['listItems'] }) {
  const preCheckoutRef = useRef<unknown>(null)

  const buyNowProductId = useBuyNowProductId((state) => state.productId)
  const cartListReverse = [...cartList].reverse()

  const { mutateAsync: preCheckoutMutateAsync } = usePreCheckoutMutation()

  useEffect(() => {
    if (!buyNowProductId || preCheckoutRef.current) return
    ;(async () => {
      preCheckoutRef.current = preCheckoutMutateAsync

      await preCheckoutMutateAsync({ listItems: [buyNowProductId] })

      preCheckoutRef.current = null
    })()
  }, [buyNowProductId, preCheckoutMutateAsync])

  return (
    <>
      <CartSelectAll cartList={cartList} titleClassName="md:text-lg" />
      <Separator className="my-3 md:my-5" />
      {buyNowProductId
        ? cartListReverse
            .sort((a) => (a.productId === buyNowProductId ? -1 : 0))
            .map((item) => (
              <CartItem
                key={item.productId}
                product={item.product}
                productId={item.productId}
                quantity={item.quantity}
              />
            ))
        : cartListReverse.map((item) => (
            <CartItem key={item.productId} product={item.product} productId={item.productId} quantity={item.quantity} />
          ))}
    </>
  )
}
