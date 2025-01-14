import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CategoryHoverStore = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const useCategoryHoverStore = create<CategoryHoverStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'categoryHoverStore',
    }
  )
)

export default useCategoryHoverStore
