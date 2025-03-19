import { useQuery } from '@tanstack/react-query'

import { shippingClientApi } from '@/features/shipping/api/client'
import { SHIPPING_KEY, SHIPPING_METHODS_DATA } from '@/features/shipping/constants'

export default function useQueryShippingMethod(enabled = true) {
  return useQuery({
    queryFn: shippingClientApi.getshippingMethodFromBackend,
    queryKey: [SHIPPING_KEY.SHIPPING_METHODS],
    enabled,
    initialData: SHIPPING_METHODS_DATA,
  })
}
