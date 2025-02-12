import { cartClientApi } from '@/features/cart/api/client'
import { CART_KEY } from '@/features/cart/constants'
import { useQuery } from '@tanstack/react-query'

export default function useQueryCartFromBackend() {
  return useQuery({
    queryFn: () => cartClientApi.getCartFromBackend(),
    queryKey: [CART_KEY.CART],
  })
}
