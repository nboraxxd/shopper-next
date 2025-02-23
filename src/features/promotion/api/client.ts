import http from '@/shared/utils/http'
import envVariables from '@/shared/schemas/env-variables.schema'
import { GetPromotionDetailResponse, PromotionsResponseFromServer } from '@/features/promotion/types'

const BACKEND_PREFIX = '/cart/v2'
const SERVER_PREFIX = '/api/promotions'

export const promotionClientApi = {
  getPromotionsFromServer: () =>
    http.get<PromotionsResponseFromServer>(SERVER_PREFIX, {
      baseUrl: envVariables.NEXT_PUBLIC_URL,
    }),

  getPromotionDetailFromBackend: (promotion: string) =>
    http.get<GetPromotionDetailResponse>(`${BACKEND_PREFIX}/promotion/${promotion}`),
}
