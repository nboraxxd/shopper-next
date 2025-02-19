import { CartList, CartSummary } from '@/features/cart/components/client'
import { CartSummaryEndIndicator, CartSummaryProvider } from '@/features/cart/components/client/payment-summary'

export default function CartPage() {
  return (
    <div className="min-h-[calc(100vh-var(--header-height))] bg-cart">
      <div className="container py-8">
        <CartSummaryProvider>
          <>
            <div className="grid gap-7 xl:grid-cols-[2fr_1fr]">
              <main className="rounded-4xl bg-cart-section px-3 py-7 shadow-section xs:px-4 lg:px-7">
                <h1 className="sr-only">Giỏ hàng</h1>
                <CartList />
              </main>
              <CartSummary />
            </div>
            <CartSummaryEndIndicator />
          </>
        </CartSummaryProvider>
      </div>
    </div>
  )
}
