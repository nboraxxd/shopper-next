import { useMutation, useQueryClient } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'
import { useAuthStore } from '@/features/auth/auth-store'
import { PROFILE_KEY } from '@/features/profile/constants'
import { useCheckoutListStore } from '@/features/checkout/hooks'
import { useProfileStore } from '@/features/profile/profile-store'

export default function useLogoutMutation() {
  const queryClient = useQueryClient()

  const setAuthState = useAuthStore((state) => state.setAuthState)
  const setProfile = useProfileStore((state) => state.setProfile)
  const setCheckoutList = useCheckoutListStore((state) => state.setCheckoutList)

  return useMutation({
    mutationFn: authClientApi.logoutToServer,
    onSuccess: () => {
      setAuthState('unauthenticated')
      setProfile(null)
      setCheckoutList(null)
      queryClient.removeQueries({ queryKey: [PROFILE_KEY.PROFILE] })
    },
  })
}
