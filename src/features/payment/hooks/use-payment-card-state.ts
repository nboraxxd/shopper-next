import { use } from 'react'

import { PaymentCardContext } from '@/features/payment/components/client'

export default function usePaymentCardState() {
  const context = use(PaymentCardContext)

  if (!context) {
    throw new Error('usePaymentCardState must be used within a PaymentCardProvider')
  }

  return context
}
