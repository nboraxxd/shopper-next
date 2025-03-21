'use client'

import { CheckoutSectionTitle } from '@/features/checkout/component/server'
import { useLatestPreCheckoutData } from '@/features/checkout/hooks'
import { cn, formatCurrency } from '@/shared/utils'

export default function PaymentSummary() {
  const latestPreCheckoutData = useLatestPreCheckoutData()

  return (
    <div className="grid grid-cols-[1fr_max-content_max-content] gap-x-3 px-3 py-4 xs:gap-x-8 md:p-7">
      <CheckoutSectionTitle title="Tổng thanh toán" className="sr-only" />

      <PaymentSummaryItem title="Tổng tiền hàng" value={latestPreCheckoutData?.payload.data.subTotal ?? 0} />
      <PaymentSummaryItem
        title="Giảm giá"
        value={-(latestPreCheckoutData?.payload.data.promotion?.discount ?? 0)}
        valueClassName="text-highlight"
      />
      <PaymentSummaryItem title="Thuế" value={latestPreCheckoutData?.payload.data.tax ?? 0} />
      <PaymentSummaryItem
        title="Phí vận chuyển"
        value={latestPreCheckoutData?.payload.data.shipping?.shippingPrice ?? 0}
      />
      <PaymentSummaryItem
        title="Tổng thanh toán"
        value={latestPreCheckoutData?.payload.data.total ?? 0}
        valueClassName="h-12 text-xl text-primary-red"
      />
    </div>
  )
}

function PaymentSummaryItem(props: { title: string; value: number; valueClassName?: string }) {
  const { title, value, valueClassName } = props

  return (
    <>
      <span className="col-span-2 flex items-center text-sm font-medium md:col-span-1 md:col-start-2">{title}</span>
      <span className={cn('col-start-3 flex h-10 items-center justify-end text-sm font-medium', valueClassName)}>
        {formatCurrency(value)}
        <sup>₫</sup>
      </span>
    </>
  )
}
