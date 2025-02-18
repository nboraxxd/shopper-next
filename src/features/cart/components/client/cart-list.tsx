'use client'

import { useLatestCartItemId, useQueryCartList } from '@/features/cart/hooks'

import { Checkbox } from '@/shared/components/ui/checkbox'
import { Separator } from '@/shared/components/ui/separator'
import { CartItem } from '@/features/cart/components/client'

export default function CartList() {
  const queryCartList = useQueryCartList()

  const latestCartItemId = useLatestCartItemId((state) => state.productId)

  if (queryCartList.isLoading) return <p>Loading...</p>

  return queryCartList.isSuccess ? (
    queryCartList.data.payload.data.totalQuantity > 0 ? (
      <>
        <div className="flex items-center gap-2 xs:gap-3">
          <Checkbox className="size-5" />
          <h2 className="text-lg font-medium">Chọn tất cả ({queryCartList.data.payload.data.listItems.length})</h2>
        </div>
        <Separator className="my-3 md:my-5" />
        {[...queryCartList.data.payload.data.listItems]
          .reverse()
          .sort((a) => (a.productId === latestCartItemId ? -1 : 1))
          .map((item) => (
            <CartItem key={item.productId} product={item.product} productId={item.productId} quantity={item.quantity} />
          ))}
      </>
    ) : (
      <p>Giỏ hàng trống</p>
    )
  ) : null
}
