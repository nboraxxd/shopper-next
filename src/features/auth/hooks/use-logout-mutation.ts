import { useMutation, useQueryClient } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'
import { useAuthStore } from '@/features/auth/auth-store'
import { PROFILE_KEY } from '@/features/profile/constants'
import { useCheckoutStore } from '@/features/checkout/hooks'
import { useProfileStore } from '@/features/profile/profile-store'

export default function useLogoutMutation() {
  const queryClient = useQueryClient()

  const setAuthState = useAuthStore((state) => state.setAuthState)
  const setProfile = useProfileStore((state) => state.setProfile)
  const setCheckout = useCheckoutStore((state) => state.setCheckout)

  return useMutation({
    mutationFn: authClientApi.logoutToServer,
    onSuccess: () => {
      setAuthState('unauthenticated')
      setProfile(null)
      setCheckout(null)
      queryClient.removeQueries({ queryKey: [PROFILE_KEY.PROFILE] })
    },
  })
}
