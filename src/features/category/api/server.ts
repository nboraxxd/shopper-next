import http from '@/shared/utils/http'

import { CategoriesResponse } from '@/features/category/types'

const PREFIX = '/product'

export const categoryServerApi = {
  getCategoriesFromServerToBackend: () =>
    http.get<CategoriesResponse>(`${PREFIX}/categories`, {
      cache: 'force-cache',
      next: { tags: ['categories'] },
    }),
}
