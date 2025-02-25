import { useMutation } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'

export default function useRegisterToBackendMutation() {
  return useMutation({
    mutationFn: authClientApi.registerUserToBackend,
  })
}
