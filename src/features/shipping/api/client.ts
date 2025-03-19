import { ShippingMethodResponse } from '@/features/shipping/types'
import http from '@/shared/utils/http'

const PREFIX = '/cart/v2/shipping-method'

export const shippingClientApi = {
  getshippingMethodFromBackend: () => http.get<ShippingMethodResponse>(PREFIX),
}
