import { useMutation } from '@tanstack/react-query'

import { addressClientApi } from '@/features/address/api/client'
import { UpdateAddressReqBody } from '@/features/address/schemas'

export default function useUpdateAddressToBackendMutation() {
  return useMutation({
    mutationFn: ({ addressId, body }: { addressId: string; body: UpdateAddressReqBody }) =>
      addressClientApi.updateAddressToBackend(addressId, body),
  })
}
