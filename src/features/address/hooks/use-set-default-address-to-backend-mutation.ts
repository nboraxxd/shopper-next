import { useMutation } from '@tanstack/react-query'

import { addressClientApi } from '@/features/address/api/client'

export default function useSetDefaultAddressToBackendMutation() {
  return useMutation({
    mutationFn: addressClientApi.setDefaultAddressToBackend,
  })
}
