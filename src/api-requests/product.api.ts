import http from '@/utils/http'
import { CategoriesResponse, ProductParameters, ProductResponse, ProductsResponse } from '@/types/product.type'

const PRODUCT_PREFIX = '/product'

const productApi = {
  // API OF BACKEND SERVER
  getCategoriesFromServerToBackend: () => http.get<CategoriesResponse>(`${PRODUCT_PREFIX}/categories`),

  getProductsFromServerToBackend: <T>(params?: ProductParameters) =>
    http.get<ProductsResponse<T>>(`${PRODUCT_PREFIX}`, { params }),

  getProductDetailFromServerToBackend: (id: string) => http.get<ProductResponse>(`${PRODUCT_PREFIX}/${id}`),

  // API OF NEXT.JS SERVER
}

export default productApi
