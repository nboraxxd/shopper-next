import http from '@/shared/utils/http'

import { RelatedProductsResponse } from '@/features/product/types'
import { RELATED_PRODUCTS_FIELDS } from '@/features/product/constants'

const PREFIX = '/product'

export const productClientApi = {
  getRelatedProductsFromBackend: (categoryId: number) =>
    http.get<RelatedProductsResponse>(PREFIX, {
      params: { categories: categoryId.toString(), fields: RELATED_PRODUCTS_FIELDS, limit: '18' },
    }),
}
