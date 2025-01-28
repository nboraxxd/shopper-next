import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { Profile } from '@/features/profile/types'

type ProfileStore = {
  profile: Profile | null
  setProfile: (profile: Profile | null) => void
}

export const useProfileStore = create<ProfileStore>()(
  devtools(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'profileStore',
    }
  )
)
