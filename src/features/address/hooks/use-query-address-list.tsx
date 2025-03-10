import { useQuery } from '@tanstack/react-query'

import { ADDRESS_KEY } from '@/features/address/constants'
import { addressClientApi } from '@/features/address/api/client'

export default function useQueryAddressList(enabled = true) {
  return useQuery({
    queryFn: addressClientApi.getAddressListFromBackend,
    queryKey: [ADDRESS_KEY.ADDRESS_LIST],
    enabled,
  })
}
