'use client'

import { useMutationState } from '@tanstack/react-query'

import { CHECKOUT_KEY } from '@/features/checkout/constants'
import { PreCheckoutResponse } from '@/features/checkout/types'
import { formatCurrency } from '@/shared/utils'

import { Separator } from '@/shared/components/ui/separator'
import { Button } from '@/shared/components/ui/button'

const CART_SUMMARY_DATA = [
  {
    title: 'Tiền hàng',
    value: 'subTotal',
  },
  {
    title: 'Giảm giá',
    value: 'discount',
  },
  {
    title: 'Thuế',
    value: 'tax',
  },
] as const

export default function CartSummary() {
  const data = useMutationState({
    filters: { mutationKey: [CHECKOUT_KEY.PRE_CHECKOUT], exact: true, status: 'success' },
    select: (mutation) => mutation.state.data as { payload: PreCheckoutResponse } | undefined,
  })

  const latest = data[data.length - 1]

  return (
    <section className="flex flex-col gap-3 rounded-4xl bg-cart-section px-4 py-7 shadow-section">
      {CART_SUMMARY_DATA.map((item) => (
        <CartSummaryItem
          key={item.title}
          title={item.title}
          value={
            item.value === 'discount'
              ? latest?.payload.data.promotion?.discount
                ? -latest.payload.data.promotion.discount
                : -0
              : latest?.payload.data[item.value] || 0
          }
        />
      ))}

      <Separator />
      <CartSummaryItem title="Tổng cộng" value={latest?.payload.data.viewCartTotal || 0} />

      <Button className="mt-2 h-14 rounded-full font-medium">
        Mua hàng ({latest?.payload.data.listItems.length || 0})
      </Button>
    </section>
  )
}

function CartSummaryItem({ title, value }: { title: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium">{title}</span>
      <span className="font-bold">
        {formatCurrency(value)}
        <sup>₫</sup>
      </span>
    </div>
  )
}
