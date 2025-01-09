import http from '@/shared/utils/http'

import { ProductParameters, ProductResponse, ProductsResponse } from '@/features/product/types'

const PREFIX = '/product'

export const productServerApi = {
  getProductsFromServerToBackend: <T>(params?: ProductParameters) =>
    http.get<ProductsResponse<T>>(`${PREFIX}`, { params }),

  getProductDetailFromServerToBackend: (id: string) => http.get<ProductResponse>(`${PREFIX}/${id}`),
}
