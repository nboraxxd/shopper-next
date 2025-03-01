import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { PromotionServerItem } from '@/features/promotion/types'

type CurrentPromotionStore = {
  currentPromotion: PromotionServerItem | null
  setCurrentPromotion: (currentPromotion: PromotionServerItem | null) => void
}

const useCurrentPromotion = create<CurrentPromotionStore>()(
  devtools(
    (set) => ({
      currentPromotion: null,
      setCurrentPromotion: (currentPromotion) => set({ currentPromotion }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'currentPromotionStore',
    }
  )
)

export default useCurrentPromotion
