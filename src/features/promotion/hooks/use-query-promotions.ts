import { useQuery } from '@tanstack/react-query'

import { PROMOTION_KEY } from '@/features/promotion/constants'
import { PromotionsParameters } from '@/features/promotion/types'
import { promotionClientApi } from '@/features/promotion/api/client'

export default function useQueryPromotions(payload?: { params?: PromotionsParameters } & { enabled?: boolean }) {
  const enabled = payload?.enabled ?? false
  const params = payload?.params

  return useQuery({
    queryFn: () => promotionClientApi.getPromotionsFromServer(params),
    queryKey: [PROMOTION_KEY.PROMOTIONS_FROM_SERVER, params],
    enabled,
  })
}
