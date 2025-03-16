import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type BuyNowProductIdStore = {
  productId: number | null
  setProductId: (productId: number | null) => void
}

const useBuyNowProductId = create<BuyNowProductIdStore>()(
  devtools(
    (set) => ({
      productId: null,
      setProductId: (productId) => set({ productId }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'buyNowProductIdStore',
    }
  )
)

export default useBuyNowProductId
