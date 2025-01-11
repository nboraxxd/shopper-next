import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { User } from '@/features/user/types'

type UserStore = {
  profile: User | null
  setProfile: (profile: User | null) => void
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'userStore',
    }
  )
)
