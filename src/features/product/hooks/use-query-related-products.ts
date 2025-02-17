import { useQuery } from '@tanstack/react-query'

import { PRODUCT_KEY } from '@/features/product/constants'
import { productClientApi } from '@/features/product/api/client'

export default function useQueryRelatedProducts(categoryId: number, enabled = true) {
  return useQuery({
    queryFn: () => productClientApi.getRelatedProductsFromBackend(categoryId),
    queryKey: [PRODUCT_KEY.RELATED_PRODUCTS, categoryId],
    enabled,
  })
}
