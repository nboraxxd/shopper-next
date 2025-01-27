import http from '@/shared/utils/http'
import { OrderCount, OrderStatus } from '@/features/order/types'

const PREFIX = '/order/v2'

const orderServerApi = {
  getOrderCountFromBackend: (accessToken: string, status?: OrderStatus) =>
    http.get<OrderCount>(`${PREFIX}/count`, {
      params: status ? { status } : undefined,
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
}

export default orderServerApi
