import { PackageIcon } from 'lucide-react'

import { LocationIcon } from '@/shared/components/icons'
import { CheckoutSectionTitle } from '@/features/checkout/component/server'
import { CheckoutList, DeliveryAddress } from '@/features/checkout/component/client'

export default async function CheckoutPage() {
  return (
    <div className="bg-checkout">
      <main className="container pt-8 xl:pb-8">
        <h1 className="sr-only">Thanh toán các sản phẩm đã chọn</h1>
        <section className="rounded-4xl bg-checkout-section px-3 py-7 shadow-section xs:px-4 lg:px-7">
          <div className="relative">
            <div className="mb-4 flex items-center justify-between gap-1">
              <CheckoutSectionTitle icon={LocationIcon} title="Địa chỉ nhận hàng" />
            </div>
            <DeliveryAddress />
          </div>
        </section>

        <section className="mt-4 rounded-4xl bg-checkout-section px-3 py-7 shadow-section xs:px-4 md:mt-7 lg:px-7">
          <div className="mb-4 flex items-center gap-4">
            <CheckoutSectionTitle
              icon={PackageIcon}
              title="Chi tiết đơn hàng"
              className="w-full lg:w-[calc(70%_+_110px)]"
            />
            <span className="hidden w-[10%] text-end font-medium lg:block">Số lượng</span>
            <span className="hidden w-1/5 text-end font-medium lg:block">Thành tiền</span>
          </div>

          <CheckoutList />
        </section>
      </main>
    </div>
  )
}
