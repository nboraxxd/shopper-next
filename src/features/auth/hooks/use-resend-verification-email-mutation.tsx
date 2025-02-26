import { useMutation } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'

export default function useResendEmailVerificationMutation() {
  return useMutation({
    mutationFn: authClientApi.resendVerificationEmailToBackend,
  })
}
