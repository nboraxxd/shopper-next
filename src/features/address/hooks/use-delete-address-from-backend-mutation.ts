import { useMutation } from '@tanstack/react-query'

import { addressClientApi } from '@/features/address/api/client'

export default function useDeleteAddressFromBackendMutation() {
  return useMutation({
    mutationFn: addressClientApi.deleteAddressFromBackend,
  })
}
