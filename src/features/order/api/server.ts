import http from '@/shared/utils/http'
import { OrderCountResponse, OrderDetailResponse, OrderStatus } from '@/features/order/types'

const PREFIX = '/order/v2'

const orderServerApi = {
  getOrderCountFromBackend: (accessToken: string, status?: OrderStatus) =>
    http.get<OrderCountResponse>(`${PREFIX}/count`, {
      params: status ? { status } : undefined,
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  getOrderDetailFromBackend: ({ accessToken, id }: { accessToken: string; id: string }) =>
    http.get<OrderDetailResponse>(`${PREFIX}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
}

export default orderServerApi
