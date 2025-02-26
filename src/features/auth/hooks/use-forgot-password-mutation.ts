import { useMutation } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'

export default function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: authClientApi.forgotPasswordToBackend,
  })
}
