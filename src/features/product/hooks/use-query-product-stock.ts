import { useQuery } from '@tanstack/react-query'

import { PRODUCT_KEY } from '@/features/product/constants'
import { productClientApi } from '@/features/product/api/client'

export default function useQueryProductStock(productId: number, enabled = true) {
  return useQuery({
    queryFn: () => productClientApi.getProductStockFromBackend(productId),
    queryKey: [PRODUCT_KEY.PRODUCT_STOCK, productId],
    enabled,
  })
}
