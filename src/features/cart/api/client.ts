import http from '@/shared/utils/http'
import {
  GetCartListResponse,
  RemoveCartItemResponse,
  UpdateCartItemQtyReq,
  UpdateCartItemQtyResponse,
} from '@/features/cart/types'

const PREFIX = '/cart/v2'

export const cartClientApi = {
  getCartListFromBackend: () => http.get<GetCartListResponse>(`${PREFIX}`),

  updateCartItemQtyToBackend: ({ productId, quantity }: UpdateCartItemQtyReq) =>
    http.patch<UpdateCartItemQtyResponse>(`${PREFIX}/${productId}`, { quantity }),

  removeCartItemFromBackend: (productId: number) => http.delete<RemoveCartItemResponse>(`${PREFIX}/${productId}`),
}
