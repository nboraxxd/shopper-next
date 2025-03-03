import { useMutation, useQueryClient } from '@tanstack/react-query'

import { PROFILE_KEY } from '@/features/profile/constants'
import authClientApi from '@/features/auth/api/client'
import { useProfileStore } from '@/features/profile/profile-store'
import { useAuthStore } from '@/features/auth/auth-store'

export default function useLogoutMutation() {
  const queryClient = useQueryClient()

  const setAuthState = useAuthStore((state) => state.setAuthState)
  const setProfile = useProfileStore((state) => state.setProfile)

  return useMutation({
    mutationFn: authClientApi.logoutToServer,
    onSuccess: () => {
      setAuthState('unauthenticated')
      setProfile(null)
      queryClient.removeQueries({ queryKey: [PROFILE_KEY.PROFILE] })
    },
  })
}
