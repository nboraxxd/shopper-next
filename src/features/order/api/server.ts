import http from '@/shared/utils/http'
import { OrderCountResponse, OrderStatus } from '@/features/order/types'

const PREFIX = '/order/v2'

const orderServerApi = {
  getOrderCountFromBackend: (accessToken: string, status?: OrderStatus) =>
    http.get<OrderCountResponse>(`${PREFIX}/count`, {
      params: status ? { status } : undefined,
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
}

export default orderServerApi
