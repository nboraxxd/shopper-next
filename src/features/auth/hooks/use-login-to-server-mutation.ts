import { useMutation } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'
import { useAuthStore } from '@/features/auth/auth-store'

export default function useLoginToServerMutation() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  return useMutation({
    mutationFn: authClientApi.loginFromClientToServer,
    onSuccess: () => setIsAuth(true),
  })
}
