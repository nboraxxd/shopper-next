import { GetCartResponse } from '@/features/cart/types'
import http from '@/shared/utils/http'

const BACKEND_PREFIX = '/cart/v2'

export const cartClientApi = {
  getCartFromBackend: () => http.get<GetCartResponse>(`${BACKEND_PREFIX}`),
}
