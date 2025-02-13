import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type StickyActionStore = {
  isShow: boolean
  setIsShow: (isShow: boolean) => void
}

const useShowStickyAction = create<StickyActionStore>()(
  devtools(
    (set) => ({
      isShow: false,
      setIsShow: (isShow) => set({ isShow }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'stickyActionStore',
    }
  )
)

export default useShowStickyAction
