import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getAccessTokenFromLocalStorage } from '@/shared/utils/local-storage'

type AuthStore = {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      isAuth: Boolean(getAccessTokenFromLocalStorage()),
      setIsAuth: (isAuth) => set({ isAuth }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'authStore',
    }
  )
)
