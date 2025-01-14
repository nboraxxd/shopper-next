import { useQuery } from '@tanstack/react-query'

import { CATEGORY_KEY } from '@/features/category/constants'
import { categoryClientApi } from '@/features/category/api/client'

export default function useQueryCategoriesFromBackend() {
  return useQuery({
    queryFn: categoryClientApi.getCategoriesFromBackend,
    queryKey: [CATEGORY_KEY.CATEGORIES],
  })
}
