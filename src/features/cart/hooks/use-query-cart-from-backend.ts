import { cartClientApi } from '@/features/cart/api/client'
import { CART_KEY } from '@/features/cart/constants'
import { useQuery } from '@tanstack/react-query'

export default function useQueryCartFromBackend(enabled = true) {
  return useQuery({
    queryFn: () => cartClientApi.getCartFromBackend(),
    enabled,
    queryKey: [CART_KEY.CART],
  })
}
