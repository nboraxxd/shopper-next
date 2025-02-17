'use client'

import { CHECKOUT_KEY } from '@/features/checkout/constants'
import { PreCheckoutResponse } from '@/features/checkout/types'
import { Separator } from '@/shared/components/ui/separator'
import { formatCurrency } from '@/shared/utils'
import { useMutationState } from '@tanstack/react-query'

export default function CartSummary() {
  const data = useMutationState({
    filters: { mutationKey: [CHECKOUT_KEY.PRE_CHECKOUT], exact: true, status: 'success' },
    select: (mutation) => mutation.state.data as { payload: PreCheckoutResponse } | undefined,
  })

  const latest = data[data.length - 1]

  return (
    <aside className="sticky top-[calc(var(--header-height)+2rem)] self-start rounded-4xl bg-cart-section px-4 py-7 shadow-section lg:px-7">
      <ul>
        <li className="flex justify-between">
          <span>Tiền hàng</span>
          <span>
            {formatCurrency(latest?.payload.data.subTotal || 0)}
            <sup>₫</sup>
          </span>
        </li>
        <li className="flex justify-between">
          <span>Giảm giá</span>
          <span>
            -{formatCurrency(latest?.payload.data.promotion?.discount || 0)}
            <sup>₫</sup>
          </span>
        </li>
        <li className="flex justify-between">
          <span>Thuế</span>
          <span>
            {formatCurrency(latest?.payload.data.tax || 0)}
            <sup>₫</sup>
          </span>
        </li>
        <Separator className="my-3" />
        <li className="flex justify-between">
          <span>Tổng cộng</span>
          <span>
            {formatCurrency(latest?.payload.data.viewCartTotal || 0)}
            <sup>₫</sup>
          </span>
        </li>
      </ul>
    </aside>
  )
}
