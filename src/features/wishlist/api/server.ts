import { WishlistResponse } from '@/features/wishlist/types'
import http from '@/shared/utils/http'

const PREFIX = '/product/wishlist'

const wishlistServerApi = {
  getWishlistFromBackend: (payload: { accessToken: string; limit?: number; page?: number }) => {
    const { accessToken, limit = 5, page = 1 } = payload

    return http.get<WishlistResponse>(PREFIX, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { limit: limit.toString(), page: page.toString() },
    })
  },
}

export default wishlistServerApi
