import { cartClientApi } from '@/features/cart/api/client'
import { CART_KEY } from '@/features/cart/constants'
import { useQuery } from '@tanstack/react-query'

export default function useQueryCartList(enabled = true) {
  return useQuery({
    queryFn: () => cartClientApi.getCartListFromBackend(),
    enabled,
    queryKey: [CART_KEY.CART_LIST],
  })
}
