import http from '@/shared/utils/http'

import { PRODUCT_DETAIL_FIELDS } from '@/features/product/constants'
import { ProductParameters, ProductResponse, ProductsResponse } from '@/features/product/types'

const PREFIX = '/product'

export const productServerApi = {
  getProductsFromBackend: <T>(params?: ProductParameters) => http.get<ProductsResponse<T>>(PREFIX, { params }),

  getProductDetailFromBackend: (id: string) =>
    http.get<ProductResponse>(PREFIX, {
      params: { id, fields: PRODUCT_DETAIL_FIELDS },
    }),
}
