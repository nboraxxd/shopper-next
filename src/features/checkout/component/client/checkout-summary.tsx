'use client'

import { useLatestPreCheckoutData } from '@/features/checkout/hooks'

import { OrderSummary } from '@/shared/components'

export default function CheckoutSummary() {
  const latestPreCheckoutData = useLatestPreCheckoutData()

  return (
    <OrderSummary
      subTotal={latestPreCheckoutData?.payload.data.subTotal ?? 0}
      discount={latestPreCheckoutData?.payload.data.promotion?.discount ?? 0}
      tax={latestPreCheckoutData?.payload.data.tax ?? 0}
      shippingPrice={latestPreCheckoutData?.payload.data.shipping?.shippingPrice ?? 0}
      total={latestPreCheckoutData?.payload.data.total ?? 0}
      className="px-3 py-4 md:p-7"
    />
  )
}
