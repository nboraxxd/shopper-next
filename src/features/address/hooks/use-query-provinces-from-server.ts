import { useQuery } from '@tanstack/react-query'

import { ADDRESS_KEY } from '@/features/address/constants'
import { addressClientApi } from '@/features/address/api/client'

export default function useQueryProvincesFromServer() {
  return useQuery({
    queryFn: addressClientApi.getPronvincesFromServer,
    queryKey: [ADDRESS_KEY.PROVINCES],
    staleTime: Infinity,
  })
}
