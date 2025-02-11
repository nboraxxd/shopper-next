import { useMutation } from '@tanstack/react-query'

import { paymentClientApi } from '@/features/payment/api/client'

export default function useDeletePaymentCardFromBackendMutation() {
  return useMutation({
    mutationFn: paymentClientApi.deletePaymentCardFromBackend,
  })
}
