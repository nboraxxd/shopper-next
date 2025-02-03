import { useQuery } from '@tanstack/react-query'

import { addressClientApi } from '@/features/address/api/client'
import { ADDRESS_KEY } from '@/features/address/constants'

export default function useQueryDistrictsFromServer(provinceCode?: number) {
  return useQuery({
    enabled: !!provinceCode,
    queryFn: () => addressClientApi.getDistrictsFromServer(provinceCode!),
    queryKey: [ADDRESS_KEY.DISTRICTS, provinceCode],
    staleTime: Infinity,
  })
}
