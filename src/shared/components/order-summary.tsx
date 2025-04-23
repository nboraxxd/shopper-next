import { cn, formatCurrency } from '@/shared/utils'

import { SectionTitle } from '@/shared/components'

interface Props {
  subTotal: number
  discount: number
  tax: number
  shippingPrice: number
  total: number
  className?: string
}

export default function OrderSummary(props: Props) {
  const { subTotal, discount, tax, shippingPrice, total, className } = props

  return (
    <div className={cn('grid grid-cols-[1fr_max-content_max-content] gap-x-3 xs:gap-x-8', className)}>
      <SectionTitle title="Tổng thanh toán" className="sr-only" />

      <OrderSummaryItem title="Tổng tiền hàng" value={subTotal} />
      <OrderSummaryItem title="Giảm giá" value={-discount} valueClassName="text-highlight" />
      <OrderSummaryItem title="Thuế" value={tax} />
      <OrderSummaryItem title="Phí vận chuyển" value={shippingPrice} />
      <OrderSummaryItem
        title="Tổng thanh toán"
        value={total}
        valueClassName="h-12 text-base text-primary-red md:text-xl"
      />
    </div>
  )
}

function OrderSummaryItem(props: { title: string; value: number; valueClassName?: string }) {
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

export function OrderSummarySkeleton() {
  return (
    <div className="grid grid-cols-[1fr_max-content_max-content] gap-x-3 xs:gap-x-8">
      <SectionTitle title="Tổng thanh toán" className="sr-only" />

      <OrderSummaryItem title="Tổng tiền hàng" value={0} />
      <OrderSummaryItem title="Giảm giá" value={0} valueClassName="text-highlight" />
      <OrderSummaryItem title="Thuế" value={0} />
      <OrderSummaryItem title="Phí vận chuyển" value={0} />
      <OrderSummaryItem title="Tổng thanh toán" value={0} valueClassName="h-12 text-base text-primary-red md:text-xl" />
    </div>
  )
}
