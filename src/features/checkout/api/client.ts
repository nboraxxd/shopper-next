import http from '@/shared/utils/http'

import { PreCheckoutReqBody, PreCheckoutResponse } from '@/features/checkout/types'

const BACKEND_PREFIX = '/cart/v2'

export const checkoutClientApi = {
  preCheckoutToBackend: (body: PreCheckoutReqBody) =>
    http.post<PreCheckoutResponse>(`${BACKEND_PREFIX}/pre-checkout`, body),
}
