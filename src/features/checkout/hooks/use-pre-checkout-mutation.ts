import { useMutation } from '@tanstack/react-query'

import { checkoutClientApi } from '@/features/checkout/api/client'
import { CHECKOUT_KEY } from '@/features/checkout/constants'

export default function usePreCheckoutMutation() {
  return useMutation({
    mutationFn: checkoutClientApi.preCheckoutToBackend,
    mutationKey: [CHECKOUT_KEY.PRE_CHECKOUT],
  })
}
