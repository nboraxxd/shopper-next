import http from '@/shared/utils/http'
import { GetCartListResponse, RemoveCartItemResponse, UpdateCartItemQtyResponse } from '@/features/cart/types'

const PREFIX = '/cart/v2'

export const cartClientApi = {
  getCartListFromBackend: () => http.get<GetCartListResponse>(`${PREFIX}`),

  updateCartItemQtyToBackend: ({ productId, quantity }: { productId: number; quantity: number }) =>
    http.patch<UpdateCartItemQtyResponse>(`${PREFIX}/${productId}`, { quantity }),

  removeCartItemFromBackend: (productId: number) => http.delete<RemoveCartItemResponse>(`${PREFIX}/${productId}`),
}
