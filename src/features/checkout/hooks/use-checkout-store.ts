import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { PreCheckoutReqBody } from '@/features/checkout/types'

type Checkout = Omit<PreCheckoutReqBody, 'shippingMethod'> | null

type CheckoutStore = {
  checkout: Checkout
  setCheckout: (checkout: Checkout) => void
}

const useCheckoutStore = create<CheckoutStore>()(
  devtools(
    persist(
      (set) => ({
        checkout: null,
        setCheckout: (checkout) => set({ checkout }),
      }),
      { name: 'checkout', storage: createJSONStorage(() => localStorage) }
    ),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'checkoutStore',
    }
  )
)

export default useCheckoutStore
