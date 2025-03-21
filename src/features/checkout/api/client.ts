import http from '@/shared/utils/http'

import { CheckoutReqBody, PreCheckoutReqBody, PreCheckoutResponse } from '@/features/checkout/types'

const BACKEND_PREFIX = '/cart/v2'

export const checkoutClientApi = {
  preCheckoutToBackend: (body: PreCheckoutReqBody) =>
    http.post<PreCheckoutResponse>(`${BACKEND_PREFIX}/pre-checkout`, body),

  checkoutToBackend: (body: CheckoutReqBody) => http.post(`${BACKEND_PREFIX}/checkout`, body),
}
