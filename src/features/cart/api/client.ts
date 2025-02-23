import http from '@/shared/utils/http'
import {
  GetCartListResponse,
  GetPromotionDetailResponse,
  RemoveCartItemResponse,
  UpdateCartItemQtyResponse,
} from '@/features/cart/types'

const BACKEND_PREFIX = '/cart/v2'

export const cartClientApi = {
  getCartListFromBackend: () => http.get<GetCartListResponse>(`${BACKEND_PREFIX}`),

  updateCartItemQtyToBackend: ({ productId, quantity }: { productId: number; quantity: number }) =>
    http.patch<UpdateCartItemQtyResponse>(`${BACKEND_PREFIX}/${productId}`, { quantity }),

  removeCartItemFromBackend: (productId: number) =>
    http.delete<RemoveCartItemResponse>(`${BACKEND_PREFIX}/${productId}`),

  getPromotionDetailFromBackend: (promotion: string) =>
    http.get<GetPromotionDetailResponse>(`${BACKEND_PREFIX}/promotion/${promotion}`),
}
