import { useMutation } from '@tanstack/react-query'

import { addressClientApi } from '@/features/address/api/client'

export default function useAddNewAddressToBackendMutation() {
  return useMutation({
    mutationFn: addressClientApi.addNewAddressToBackend,
  })
}
