import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { CheckoutPaymentMethod } from '@/features/checkout/types'
import { CHECKOUT_PAYMENT_METHOD } from '@/features/checkout/constants'

type CheckoutPaymentMethodStore = {
  checkoutPaymentMethod: CheckoutPaymentMethod
  setCheckoutPaymentMethod: (checkoutPaymentMethod: CheckoutPaymentMethod) => void
}

const useCheckoutPaymentMethodStore = create<CheckoutPaymentMethodStore>()(
  devtools(
    (set) => ({
      checkoutPaymentMethod: CHECKOUT_PAYMENT_METHOD.MONEY,
      setCheckoutPaymentMethod: (checkoutPaymentMethod) => set({ checkoutPaymentMethod }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'checkoutPaymentMethodStore',
    }
  )
)

export default useCheckoutPaymentMethodStore
