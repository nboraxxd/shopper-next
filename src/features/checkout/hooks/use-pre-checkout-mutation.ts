import { useMutation } from '@tanstack/react-query'

import { CHECKOUT_KEY } from '@/features/checkout/constants'
import { checkoutClientApi } from '@/features/checkout/api/client'

export default function usePreCheckoutMutation() {
  return useMutation({
    mutationFn: checkoutClientApi.preCheckoutToBackend,
    mutationKey: [CHECKOUT_KEY.PRE_CHECKOUT],
  })
}
