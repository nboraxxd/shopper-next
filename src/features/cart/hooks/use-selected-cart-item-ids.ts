import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { PreCheckoutReqBody } from '@/features/checkout/types'

type SelectedCartItemIdsStore = {
  cartItemIds: PreCheckoutReqBody['listItems']
  setCartItemIds: (cartItemIds: PreCheckoutReqBody['listItems']) => void
}

const useSelectedCartItemIds = create<SelectedCartItemIdsStore>()(
  devtools(
    (set) => ({
      cartItemIds: [],
      setCartItemIds: (cartItemIds) => set({ cartItemIds }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'selectedCartItemIdsStore',
    }
  )
)

export default useSelectedCartItemIds
