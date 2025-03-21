import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CheckoutPaymentMethodStore = {
  checkoutPaymentMethod: 'money' | 'card'
  setCheckoutPaymentMethod: (checkoutPaymentMethod: 'money' | 'card') => void
}

const useCheckoutPaymentMethodStore = create<CheckoutPaymentMethodStore>()(
  devtools(
    (set) => ({
      checkoutPaymentMethod: 'money',
      setCheckoutPaymentMethod: (checkoutPaymentMethod) => set({ checkoutPaymentMethod }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'checkoutPaymentMethodStore',
    }
  )
)

export default useCheckoutPaymentMethodStore
