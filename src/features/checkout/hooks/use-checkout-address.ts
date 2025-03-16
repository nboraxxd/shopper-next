import { Address } from '@/features/address/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CheckoutAddressStore = {
  checkoutAddress: Address | null
  setCheckoutAddress: (checkoutAddress: Address) => void
}

const useCheckoutAddress = create<CheckoutAddressStore>()(
  devtools(
    (set) => ({
      checkoutAddress: null,
      setCheckoutAddress: (checkoutAddress) => set({ checkoutAddress }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'checkoutAddressStore',
    }
  )
)

export default useCheckoutAddress
