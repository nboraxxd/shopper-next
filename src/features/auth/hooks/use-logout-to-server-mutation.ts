import { useMutation } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'
import { useUserStore } from '@/features/user/user-store'
import { useAuthStore } from '@/features/auth/auth-store'

export default function useLogoutToServerMutation() {
  const setAuthState = useAuthStore((state) => state.setAuthState)
  const setProfile = useUserStore((state) => state.setProfile)

  return useMutation({
    mutationFn: authClientApi.logoutToServer,
    onSuccess: () => {
      setAuthState('unauthenticated')
      setProfile(null)
    },
  })
}
