import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { ACCESS_TOKEN } from '@/features/auth/constants'

import {
  CartList,
  CartListSketeton,
  CartPromotion,
  CartPromotionSticky,
  CartSummary,
} from '@/features/cart/components/client'

export default async function CartPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  return (
    <div className="min-h-[calc(100vh-var(--header-height))] bg-cart">
      <div className="container pt-8 xl:pb-8">
        <div className="grid gap-7 xl:grid-cols-[minmax(0,3fr)_1fr]">
          <main className="rounded-4xl bg-cart-section px-3 py-7 shadow-section xs:px-4 lg:px-7">
            <h1 className="sr-only">Giỏ hàng</h1>
            <Suspense fallback={<CartListSketeton />}>
              <CartList accessToken={accessToken} />
            </Suspense>
          </main>
          <aside className="grid gap-4 self-start md:grid-cols-2 xl:sticky xl:top-[calc(var(--header-height)+2rem)] xl:grid-cols-1 xl:gap-7">
            <CartPromotion />
            <CartSummary />
          </aside>
        </div>
      </div>
      <CartPromotionSticky />
    </div>
  )
}
