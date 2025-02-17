import http from '@/shared/utils/http'

import { ProductStockResponse, RelatedProductsResponse } from '@/features/product/types'
import { PRODUCT_STOCK_FIELDS, RELATED_PRODUCTS_FIELDS } from '@/features/product/constants'

const PREFIX = '/product'

export const productClientApi = {
  getRelatedProductsFromBackend: (categoryId: number) =>
    http.get<RelatedProductsResponse>(PREFIX, {
      params: { categories: categoryId.toString(), fields: RELATED_PRODUCTS_FIELDS, limit: '12' },
    }),
  getProductStockFromBackend: (productId: number) =>
    http.get<ProductStockResponse>(PREFIX, {
      params: { id: productId.toString(), fields: PRODUCT_STOCK_FIELDS, limit: '1' },
    }),
}
