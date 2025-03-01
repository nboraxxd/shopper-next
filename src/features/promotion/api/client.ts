import http from '@/shared/utils/http'
import envVariables from '@/shared/schemas/env-variables.schema'
import {
  GetPromotionDetailResponse,
  PromotionsParameters,
  PromotionsResponseFromServer,
} from '@/features/promotion/types'

const BACKEND_PREFIX = '/cart/v2'
const SERVER_PREFIX = '/api/promotions'

export const promotionClientApi = {
  getPromotionsFromServer: (params?: PromotionsParameters) =>
    http.get<PromotionsResponseFromServer>(SERVER_PREFIX, {
      baseUrl: envVariables.NEXT_PUBLIC_URL,
      params,
    }),

  getPromotionDetailFromBackend: (promotion: string) =>
    http.get<GetPromotionDetailResponse>(`${BACKEND_PREFIX}/promotion/${promotion}`),
}
