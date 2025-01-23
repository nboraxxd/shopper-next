import { productClientApi } from '@/features/product/api/client'
import { PRODUCT_KEY } from '@/features/product/constants'
import { useQuery } from '@tanstack/react-query'

export default function useQueryRelatedProductsFromBackend(categoryId: number, enabled = true) {
  return useQuery({
    queryFn: () => productClientApi.getRelatedProductsFromBackend(categoryId),
    queryKey: [PRODUCT_KEY.RELATED_PRODUCTS, categoryId],
    enabled,
  })
}
