import http from '@/utils/http'
import { CategoriesResponse, ProductParameters, ProductsResponse } from '@/types/product.type'

const PRODUCT_PREFIX = '/product'

export const productServerApi = {
  getCategoriesFromServerToBackend: () =>
    http.get<CategoriesResponse>(`${PRODUCT_PREFIX}/categories`, {
      cache: 'force-cache',
      next: { tags: ['categories'] },
    }),

  getProductsFromServerToBackend: <T>(params?: ProductParameters) =>
    http.get<ProductsResponse<T>>(`${PRODUCT_PREFIX}`, { params }),
}
