import http from '@/shared/utils/http'

import { CATEGORY_KEY } from '@/features/category/constants'
import { CategoriesResponse } from '@/features/category/types'

const PREFIX = '/product'

export const categoryServerApi = {
  getCategoriesFromBackend: () =>
    http.get<CategoriesResponse>(`${PREFIX}/categories`, {
      cache: 'force-cache',
      next: { tags: [CATEGORY_KEY.CATEGORIES] },
    }),
}
