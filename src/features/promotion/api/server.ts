import http from '@/shared/utils/http'
import envVariables from '@/shared/schemas/env-variables.schema'
import { PromotionsParameters, PromotionsResponseFromServer } from '@/features/promotion/types'

const SERVER_PREFIX = '/api/promotions'

export const promotionServerApi = {
  getPromotionsFromServer: (accessToken: string, params: PromotionsParameters) =>
    http.get<PromotionsResponseFromServer>(SERVER_PREFIX, {
      baseUrl: envVariables.NEXT_PUBLIC_URL,
      headers: { Authorization: `Bearer ${accessToken}` },
      params,
    }),
}
