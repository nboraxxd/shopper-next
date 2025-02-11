import { useMutation } from '@tanstack/react-query'

import { paymentClientApi } from '@/features/payment/api/client'

export default function useSetDefaultPaymentCardToBackendMutation() {
  return useMutation({
    mutationFn: paymentClientApi.setDefaultPaymentCardToBackend,
  })
}
