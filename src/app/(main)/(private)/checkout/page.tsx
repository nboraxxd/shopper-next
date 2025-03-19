import { PackageIcon } from 'lucide-react'

import { LocationIcon, ShippingTruckIcon, Svgr } from '@/shared/components/icons'
import { PromoTrigger } from '@/features/promotion/components/client'
import { CheckoutSectionTitle } from '@/features/checkout/component/server'
import { CheckoutList, DeliveryAddress } from '@/features/checkout/component/client'
import { Separator } from '@/shared/components/ui/separator'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { cn, formatCurrency, formatVietnameseDate } from '@/shared/utils'
import { addDays } from 'date-fns'
import { CUSTOM_ACCOUNT_INPUT_CLASSNAME } from '@/features/account/constants'
import { Label } from '@/shared/components/ui/label'

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

        <section className="mt-4 rounded-4xl bg-checkout-section shadow-section md:mt-7">
          <div className="px-3 py-7 xs:px-4 lg:px-7">
            <div className="mb-4 flex items-center gap-3">
              <CheckoutSectionTitle icon={PackageIcon} title="Chi tiết đơn hàng" className="w-full lg:w-3/4" />
              <span className="hidden w-[10%] text-end font-medium lg:block">Số lượng</span>
              <span className="hidden w-[15%] text-end font-medium lg:block">Thành tiền</span>
            </div>
            <CheckoutList />
          </div>

          <Separator />

          <PromoTrigger className="px-3 py-7 xs:px-4 lg:px-7" />

          <Separator className="h-0 border-t border-dashed border-border bg-transparent" />

          <div className="grid grid-cols-5">
            <div className="col-span-2 flex flex-col gap-2 border-r border-dashed border-border px-3 py-7 xs:px-4 lg:px-7">
              <Label htmlFor="note">Lời nhắn:</Label>
              <Input className={cn(CUSTOM_ACCOUNT_INPUT_CLASSNAME, 'h-9 rounded')} id="note" />
            </div>
            <div className="col-span-3 px-3 py-7 font-medium xs:px-4 lg:px-7">
              <p>Phương thức vận chuyển:</p>
              <div className="mt-1 grid grid-cols-4 gap-3 text-sm">
                <span className="col-span-2">Giao hàng nhanh</span>
                <div className="text-center">
                  <Button variant="ghost" className="col-span-1 h-auto w-fit px-3 py-0 text-highlight">
                    Thay đổi
                  </Button>
                </div>
                <span className="col-span-1 text-end">
                  {formatCurrency(35000)}
                  <sup>₫</sup>
                </span>
              </div>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-primary-green">
                <Svgr icon={ShippingTruckIcon} width="19" height="13" />
                <span>
                  Nhận hàng từ {formatVietnameseDate(addDays(new Date(), 1))} đến{' '}
                  {formatVietnameseDate(addDays(new Date(), 2))}
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
