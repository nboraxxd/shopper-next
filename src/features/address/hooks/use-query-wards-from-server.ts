import { useQuery } from '@tanstack/react-query'

import { addressClientApi } from '@/features/address/api/client'
import { ADDRESS_KEY } from '@/features/address/constants'

export default function useQueryWardsFromServer(districtCode?: number) {
  return useQuery({
    enabled: !!districtCode,
    queryFn: () => addressClientApi.getWardsFromServer(districtCode!),
    queryKey: [ADDRESS_KEY.WARDS, districtCode],
    staleTime: Infinity,
  })
}
