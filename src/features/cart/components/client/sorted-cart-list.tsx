'use client'

import Image from 'next/image'
import { useEffect } from 'react'

import { GetCartListResponse } from '@/features/cart/types'
import { useBuyNowProductId } from '@/features/product/hooks'

import { useCartList } from '@/features/cart/hooks'
import { CartListSketeton } from '@/features/cart/components/server'

import { Separator } from '@/shared/components/ui/separator'
import { CartItem, CartSelectAll } from '@/features/cart/components/client'

interface Props {
  cartListFromServer: GetCartListResponse['data']['listItems']
}

export default function SortedCartList({ cartListFromServer }: Props) {
  const cartList = useCartList((state) => state.cartList)
  const setCartList = useCartList((state) => state.setCartList)

  const buyNowProductId = useBuyNowProductId((state) => state.productId)

  useEffect(() => {
    setCartList(cartListFromServer)
  }, [cartListFromServer, setCartList])

  if (!cartList) return <CartListSketeton />

  if (cartList.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <Image width={160} height={160} src="/images/cart/empty.png" alt="Giỏ hàng trống" />
        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold">Giỏ hàng trống</p>
          <p className="text-balance">Bạn tham khảo thêm các sản phẩm được Shopper gợi ý bên dưới nha!</p>
        </div>
      </div>
    )
  }

  const cartListReverse = [...cartList].reverse()

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
