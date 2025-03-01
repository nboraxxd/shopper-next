import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { PreCheckoutReqBody } from '@/features/checkout/types'

type SelectedCartItemIdsStore = {
  selectedItemId: PreCheckoutReqBody['listItems'] | null
  setSelectedItemId: (selectedItemId: PreCheckoutReqBody['listItems']) => void
}

const useSelectedCartItemIds = create<SelectedCartItemIdsStore>()(
  devtools(
    (set) => ({
      selectedItemId: null,
      setSelectedItemId: (selectedItemId) => set({ selectedItemId }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'selectedCartItemIdsStore',
    }
  )
)

export default useSelectedCartItemIds
