'use client'

import { CheckoutSectionTitle } from '@/features/checkout/component/server'
import { useLatestPreCheckoutData } from '@/features/checkout/hooks'
import { cn, formatCurrency } from '@/shared/utils'

export default function PaymentSummary() {
  const latestPreCheckoutData = useLatestPreCheckoutData()

  return (
    <div className="grid grid-cols-[1fr_max-content_max-content] gap-x-3 px-3 py-4 xs:gap-x-8 md:p-7">
      <CheckoutSectionTitle title="Tổng thanh toán" className="sr-only" />
      {/* {isMutatingPreCheckout !== 0
        ? Array.from({ length: 5 }).map((_, index) => (
            <Fragment key={index}>
              <Skeleton className="col-span-2 mt-2 h-8 w-32 first:mt-0 last:h-10 xs:col-span-1 xs:col-start-2" />
              <Skeleton className="col-start-3 mt-2 h-8 w-32 first:mt-0 last:h-10" />
            </Fragment>
          ))
        : null} */}
      {/* {latestPreCheckoutData ? ( */}
      <>
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
          value={latestPreCheckoutData?.payload.data.viewCartTotal ?? 0}
          valueClassName="h-12 text-xl text-primary-red"
        />
      </>
      {/* ) : null} */}
    </div>
  )
}

function PaymentSummaryItem(props: { title: string; value: number; valueClassName?: string }) {
  const { title, value, valueClassName } = props

  return (
    <>
      <span className="col-span-2 flex items-center text-sm font-medium xs:col-span-1 xs:col-start-2">{title}</span>
      <span className={cn('col-start-3 flex h-10 items-center justify-end text-sm font-medium', valueClassName)}>
        {formatCurrency(value)}
        <sup>₫</sup>
      </span>
    </>
  )
}
