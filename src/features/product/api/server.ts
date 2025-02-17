import http from '@/shared/utils/http'

import { PRODUCT_DETAIL_FIELDS, PRODUCT_KEY } from '@/features/product/constants'
import { ProductParameters, ProductResponse, ProductsResponse } from '@/features/product/types'

const PREFIX = '/product'

export const productServerApi = {
  getProductsFromBackend: <T>(params?: ProductParameters) => http.get<ProductsResponse<T>>(PREFIX, { params }),

  getProductDetailFromBackend: (productId: string) =>
    http.get<ProductResponse>(PREFIX, {
      params: { id: productId, fields: PRODUCT_DETAIL_FIELDS },
      cache: 'force-cache',
      next: { tags: [`${PRODUCT_KEY.PRODUCT}/${productId}`] },
    }),
}
