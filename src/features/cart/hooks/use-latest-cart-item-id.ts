import { create } from 'zustand'
import { devtools, createJSONStorage, persist } from 'zustand/middleware'

type LatestCartItemIdStore = {
  productId: number | null
  setProductId: (productId: number) => void
}

const useLatestCartItemId = create<LatestCartItemIdStore>()(
  devtools(
    persist(
      (set) => ({
        productId: Number(createJSONStorage(() => localStorage)?.getItem('latestCartItemId')) || null,
        setProductId: (productId) => set({ productId }),
      }),
      {
        name: 'latestCartItemId',
      }
    ),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'latestCartItemIdStore',
    }
  )
)

export default useLatestCartItemId
