export const dynamic = 'force-dynamic'

import { CartList, CartSummary, CartPromotion } from '@/features/cart/components/client'
import { CartSummaryEndIndicator, CartSummaryProvider } from '@/features/cart/components/client/cart-summary'

export default function CartPage() {
  return (
    <div className="min-h-[calc(100vh-var(--header-height))] bg-cart">
      <div className="container py-8">
        <CartSummaryProvider>
          <>
            <div className="grid gap-7 xl:grid-cols-[minmax(0,3fr)_1fr]">
              <main className="rounded-4xl bg-cart-section px-3 py-7 shadow-section xs:px-4 lg:px-7">
                <h1 className="sr-only">Giỏ hàng</h1>
                <CartList />
              </main>
              <aside className="sticky top-[calc(var(--header-height)+2rem)] flex flex-col gap-7 self-start">
                <CartPromotion />
                <CartSummary />
              </aside>
            </div>
            <CartSummaryEndIndicator />
          </>
        </CartSummaryProvider>
      </div>
    </div>
  )
}
