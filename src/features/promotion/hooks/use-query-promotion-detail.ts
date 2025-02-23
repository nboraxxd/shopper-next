import { useQuery } from '@tanstack/react-query'

import { PROMOTION_KEY } from '@/features/promotion/constants'
import { promotionClientApi } from '@/features/promotion/api/client'

export default function useQueryPromotionDetail(promotion?: string) {
  return useQuery({
    queryFn: () => promotionClientApi.getPromotionDetailFromBackend(promotion!),
    enabled: Boolean(promotion),
    queryKey: [PROMOTION_KEY.PROMOTION_DETAIL_FROM_BACKEND, promotion],
  })
}
