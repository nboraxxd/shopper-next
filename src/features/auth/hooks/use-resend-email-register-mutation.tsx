import { useMutation } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'

export default function useResendEmailRegisterMutation() {
  return useMutation({
    mutationFn: authClientApi.resendEmailRegisterToBackend,
  })
}
