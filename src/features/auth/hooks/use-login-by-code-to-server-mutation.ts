import { useMutation } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'
import { useAuthStore } from '@/features/auth/auth-store'

export default function useLoginByCodeToServerMutation() {
  const setAuthState = useAuthStore((state) => state.setAuthState)

  return useMutation({
    mutationFn: authClientApi.loginByCodeToServer,
    onSuccess: () => setAuthState('authenticated'),
  })
}
