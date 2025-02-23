import http from '@/shared/utils/http'
import { GetCartListResponse } from '@/features/cart/types'

const PREFIX = '/cart/v2'

const cartServerApi = {
  getCartListFromBackend: (accessToken: string) =>
    http.get<GetCartListResponse>(PREFIX, { headers: { Authorization: `Bearer ${accessToken}` } }),
}

export default cartServerApi
