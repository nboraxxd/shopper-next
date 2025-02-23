import { cartClientApi } from '@/features/cart/api/client'
import { CART_KEY } from '@/features/cart/constants'
import { useQuery } from '@tanstack/react-query'

export default function useQueryPromotionDetail(promotion?: string) {
  return useQuery({
    queryFn: () => cartClientApi.getPromotionDetailFromBackend(promotion!),
    enabled: Boolean(promotion),
    queryKey: [CART_KEY.PROMOTION_DETAIL, promotion],
  })
}
