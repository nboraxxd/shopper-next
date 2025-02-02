import { useMutation } from '@tanstack/react-query'

import profileClientApi from '@/features/profile/api/client'

export default function useChangePasswordToBackendMutation() {
  return useMutation({
    mutationFn: profileClientApi.changePasswordToBackend,
  })
}
