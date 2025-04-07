import http from '@/shared/utils/http'
import { OrderCountResponse, OrderStatus } from '@/features/order/types'

const PREFIX = '/order/v2'

const orderClientApi = {
  getOrdersFromBackend: (status?: OrderStatus) =>
    http.get<OrderCountResponse>(`${PREFIX}`, {
      params: status ? { status } : undefined,
    }),
}

export default orderClientApi
