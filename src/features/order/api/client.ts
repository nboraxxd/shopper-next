import http from '@/shared/utils/http'
import { OrdersResponse, OrderStatus } from '@/features/order/types'
import { isUndefined, omitBy } from 'lodash'

const PREFIX = '/order/v2'

const orderClientApi = {
  getOrdersFromBackend: (params: { status?: OrderStatus; page?: string }) =>
    http.get<OrdersResponse>(`${PREFIX}`, { params: omitBy(params, isUndefined) }),
}

export default orderClientApi
