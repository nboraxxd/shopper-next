import { useMutationState } from '@tanstack/react-query'

import { CHECKOUT_KEY } from '@/features/checkout/constants'
import { PreCheckoutResponse } from '@/features/checkout/types'

export default function useLatestPreCheckoutData() {
  const preCheckoutData = useMutationState({
    filters: { mutationKey: [CHECKOUT_KEY.PRE_CHECKOUT], exact: true, status: 'success' },
    select: (mutation) => mutation.state.data as { payload: PreCheckoutResponse } | undefined,
  })

  return preCheckoutData[preCheckoutData.length - 1]
}
