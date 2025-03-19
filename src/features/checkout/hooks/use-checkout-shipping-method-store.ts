import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { ShippingMethodItem } from '@/features/shipping/types'
import { SHIPPING_METHODS_DATA } from '@/features/shipping/constants'

type CheckoutShippingMethodStore = {
  checkoutShippingMethod: ShippingMethodItem
  setCheckoutShippingMethod: (checkoutShippingMethod: ShippingMethodItem) => void
}

const useCheckoutShippingMethodStore = create<CheckoutShippingMethodStore>()(
  devtools(
    (set) => ({
      checkoutShippingMethod: SHIPPING_METHODS_DATA.payload.data.find((item) => item.code === 'mien-phi')!,
      setCheckoutShippingMethod: (checkoutShippingMethod) => set({ checkoutShippingMethod }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'checkoutShippingMethodStore',
    }
  )
)

export default useCheckoutShippingMethodStore
