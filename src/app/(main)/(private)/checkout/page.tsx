import { Suspense } from 'react'
import { getAccessTokenInServer } from '@/shared/utils/server'
import { LocationIcon, Svgr } from '@/shared/components/icons'
import { AddressContent, AddressContentSkeleton } from '@/features/checkout/component/server'

export default async function CheckoutPage() {
  const accessToken = await getAccessTokenInServer()

  return (
    <div className="bg-checkout">
      <main className="container pt-8 xl:pb-8">
        <h1 className="sr-only">Thanh toán các sản phẩm đã chọn</h1>
        <section className="rounded-4xl bg-checkout-section px-3 py-7 shadow-section xs:px-4 lg:px-7">
          <div className="relative">
            <div className="mb-3 flex items-center justify-between gap-1">
              <h2 className="flex items-center gap-1 text-sm font-bold xs:gap-1.5 xs:text-base sm:gap-2 sm:text-lg">
                <Svgr icon={LocationIcon} className="size-4 xs:size-5 sm:size-6" />
                <span className="mt-0.5 sm:mt-1">Địa chỉ nhận hàng</span>
              </h2>
            </div>
            <Suspense fallback={<AddressContentSkeleton />}>
              <AddressContent accessToken={accessToken} />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  )
}
