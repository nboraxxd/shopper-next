import { useMutation } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'
import { useUserStore } from '@/features/user/user-store'
import { useAuthStore } from '@/features/auth/auth-store'

export default function useLogoutToServerMutation() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const setProfile = useUserStore((state) => state.setProfile)

  return useMutation({
    mutationFn: authClientApi.logoutToServer,
    onSuccess: () => {
      setIsAuth(false)
      setProfile(null)
    },
  })
}
