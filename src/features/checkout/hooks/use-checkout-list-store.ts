import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type CheckoutListStore = {
  checkoutList: Array<number> | null
  setCheckoutList: (checkoutList: Array<number> | null) => void
}

const useCheckoutListStore = create<CheckoutListStore>()(
  devtools(
    persist(
      (set) => ({
        checkoutList: null,
        setCheckoutList: (checkoutList) => set({ checkoutList }),
      }),
      { name: 'checkoutList', storage: createJSONStorage(() => localStorage) }
    ),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'checkoutListStore',
    }
  )
)

export default useCheckoutListStore
