import { Metadata } from 'next'
import { PackageIcon } from 'lucide-react'

import {
  CheckoutList,
  ConfirmCheckout,
  DeliveryAddress,
  PaymentMethod,
  CheckoutSummary,
  ShippingMethod,
} from '@/features/checkout/component/client'
import { SectionTitle } from '@/shared/components'
import { LocationIcon } from '@/shared/components/icons'
import { Separator } from '@/shared/components/ui/separator'
import { PromoTrigger } from '@/features/promotion/components/client'

export const metadata: Metadata = {
  title: 'Thanh toán',
}

export default async function CheckoutPage() {
  return (
    <div className="bg-checkout">
      <main className="container py-8">
        <h1 className="sr-only">Thanh toán các sản phẩm đã chọn</h1>
        <section className="rounded-4xl bg-checkout-section px-3 py-4 shadow-section xs:px-4 md:py-7 lg:px-7">
          <div className="relative">
            <div className="mb-4 flex items-center justify-between gap-1">
              <SectionTitle icon={LocationIcon} title="Địa chỉ nhận hàng" />
            </div>
            <DeliveryAddress />
          </div>
        </section>

        <section className="mt-4 rounded-4xl bg-checkout-section shadow-section md:mt-7">
          <div className="px-3 py-4 xs:px-4 md:py-7 lg:px-7">
            <div className="mb-4 flex items-center gap-3">
              <SectionTitle icon={PackageIcon} title="Chi tiết đơn hàng" className="w-full lg:w-3/4" />
              <span className="hidden w-[10%] text-end font-medium lg:block">Số lượng</span>
              <span className="hidden w-[15%] text-end font-medium lg:block">Thành tiền</span>
            </div>
            <CheckoutList />
          </div>

          <Separator />

          <PromoTrigger className="px-3 py-4 xs:px-4 md:py-7 lg:px-7" />

          <div className="px-3 xs:px-4 lg:px-7">
            <Separator className="h-0 border-t border-dashed border-border bg-transparent" />
          </div>

          <ShippingMethod />
        </section>

        <section className="mt-4 rounded-4xl bg-checkout-section shadow-section md:mt-7">
          <PaymentMethod />

          <Separator />

          <CheckoutSummary />

          <ConfirmCheckout />
        </section>
      </main>
    </div>
  )
}
