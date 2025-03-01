import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { ACCESS_TOKEN } from '@/features/auth/constants'

import { Button } from '@/shared/components/ui/button'
import { DialogTrigger } from '@/shared/components/ui/dialog'
import { CurrentPromotion } from '@/features/promotion/components/client'
import { ArrowRightIcon, Svgr, VoucherIcon } from '@/shared/components/icons'
import { CartList, CartListSketeton } from '@/features/cart/components/server'
import { CartPromoDialog, CartPromotionSticky, CartSummary } from '@/features/cart/components/client'

export default async function CartPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  return (
    <div className="bg-cart">
      <div className="container pt-8 xl:pb-8">
        <div className="grid gap-7 xl:grid-cols-[minmax(0,3fr)_1fr]">
          <main className="rounded-4xl bg-cart-section px-3 py-7 shadow-section xs:px-4 lg:px-7">
            <h1 className="sr-only">Giỏ hàng</h1>
            <Suspense fallback={<CartListSketeton />}>
              <CartList accessToken={accessToken} />
            </Suspense>
          </main>
          <aside className="grid gap-4 self-start md:grid-cols-2 xl:sticky xl:top-[calc(var(--header-height)+2rem)] xl:grid-cols-1 xl:gap-7">
            <section className="hidden flex-col gap-4 rounded-4xl bg-cart-section px-4 py-7 shadow-section md:flex">
              <div className="flex flex-col gap-0.5 xs:flex-row xs:items-center xs:justify-between">
                <h2 className="text-sm font-medium">Shopper khuyến mãi</h2>
                <span className="text-xs font-medium text-secondary-2">(có thể chọn 1)</span>
              </div>
              <CurrentPromotion />
              <CartPromoDialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group mt-auto h-auto justify-start gap-1.5 p-0 text-highlight [&_svg]:size-5"
                  >
                    <Svgr icon={VoucherIcon} />
                    <span>Nhập hoặc chọn mã</span>
                    <Svgr icon={ArrowRightIcon} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </DialogTrigger>
              </CartPromoDialog>
            </section>

            <CartSummary />
          </aside>
        </div>
      </div>
      <CartPromotionSticky />
    </div>
  )
}
