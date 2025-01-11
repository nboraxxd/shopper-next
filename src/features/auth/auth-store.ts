import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AuthState } from '@/features/auth/types'

type AuthStore = {
  authState: AuthState
  setAuthState: (authState: AuthState) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      authState: 'loading',
      setAuthState: (authState) => set({ authState }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'authStore',
    }
  )
)
