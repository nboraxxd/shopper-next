import http from '@/shared/utils/http'

import { CategoriesResponse } from '@/features/category/types'

const PREFIX = '/product'

export const categoryClientApi = {
  getCategoriesFromBackend: () => http.get<CategoriesResponse>(`${PREFIX}/categories`),
}
