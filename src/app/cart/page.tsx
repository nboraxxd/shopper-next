export const dynamic = 'force-dynamic'

import { CartList, CartSummary, CartPromotion, CartPromotionSticky } from '@/features/cart/components/client'

export default function CartPage() {
  return (
    <div className="min-h-[calc(100vh-var(--header-height))] bg-cart">
      <div className="container pt-8">
        <div className="grid gap-7 xl:grid-cols-[minmax(0,3fr)_1fr]">
          <main className="rounded-4xl bg-cart-section px-3 py-7 shadow-section xs:px-4 lg:px-7">
            <h1 className="sr-only">Giỏ hàng</h1>
            <CartList />
          </main>
          <aside className="grid gap-4 self-start md:grid-cols-2 xl:sticky xl:top-[calc(var(--header-height)+2rem)] xl:grid-cols-1 xl:gap-7">
            <CartPromotion />
            <CartSummary />
          </aside>
          {/* <div className="grid grid-cols-2 gap-4">
              <CartPromotion />
              <CartSummary />
            </div> */}
        </div>
      </div>
      <CartPromotionSticky />
    </div>
  )
}
