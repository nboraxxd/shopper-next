import { useQuery } from '@tanstack/react-query'

import { ADDRESS_KEY } from '@/features/address/constants'
import { addressClientApi } from '@/features/address/api/client'

export default function useQueryDefaultAddress() {
  return useQuery({
    queryFn: addressClientApi.getDefaultAddressFromBackend,
    queryKey: [ADDRESS_KEY.DEFAULT_ADDRESS],
  })
}
