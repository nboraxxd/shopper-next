import { useMutation } from '@tanstack/react-query'

import authClientApi from '@/features/auth/api/client'

export default function useResetPasswordMutation() {
  return useMutation({
    mutationFn: authClientApi.resetPasswordToServer,
  })
}
