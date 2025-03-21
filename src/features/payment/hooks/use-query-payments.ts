import { useQuery } from '@tanstack/react-query'

import { PAYMENT_KEY } from '@/features/payment/constants'
import { paymentClientApi } from '@/features/payment/api/client'

export default function useQueryCategories(enabled = true) {
  return useQuery({
    queryFn: paymentClientApi.getPaymentsFromBackend,
    queryKey: [PAYMENT_KEY.PAYMENTS],
    enabled,
  })
}
