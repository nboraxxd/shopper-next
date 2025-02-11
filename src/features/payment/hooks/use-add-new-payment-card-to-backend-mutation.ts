import { useMutation } from '@tanstack/react-query'

import { paymentClientApi } from '@/features/payment/api/client'

export default function useAddNewPaymentCardToBackendMutation() {
  return useMutation({
    mutationFn: paymentClientApi.addNewPaymentCardToBackend,
  })
}
