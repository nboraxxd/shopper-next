import http from '@/shared/utils/http'
import { GetCartResponse, UpdateQtyItemInCartResponse } from '@/features/cart/types'

const BACKEND_PREFIX = '/cart/v2'

export const cartClientApi = {
  getCartFromBackend: () => http.get<GetCartResponse>(`${BACKEND_PREFIX}`),

  updateQtyItemInCartToBackend: ({ productId, quantity }: { productId: number; quantity: number }) =>
    http.patch<UpdateQtyItemInCartResponse>(`${BACKEND_PREFIX}/${productId}`, { quantity }),
}
