import { use } from 'react'

import { CartSummaryContext } from '@/features/cart/components/client/payment-summary'

export default function useCartSummaryState() {
  const context = use(CartSummaryContext)

  if (!context) {
    throw new Error('useCartSummaryState must be used within a CartSummaryProvider')
  }

  return context
}
