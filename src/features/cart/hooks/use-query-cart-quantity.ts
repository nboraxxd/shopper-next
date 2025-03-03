import { useQuery } from '@tanstack/react-query'

import { CART_KEY } from '@/features/cart/constants'
import { cartClientApi } from '@/features/cart/api/client'

export default function useQueryCartQuantity() {
  const { isError, isLoading, isSuccess, data } = useQuery({
    queryFn: () => cartClientApi.getCartListFromBackend(),
    queryKey: [CART_KEY.CART_QUANTITY],
  })

  if (isSuccess) {
    const quantity = data.payload.data.listItems.length
    const displayQuantity = quantity > 99 ? '99+' : quantity > 0 ? quantity.toString().padStart(2, '0') : '0'

    return {
      isError,
      isLoading,
      isSuccess,
      quantity: displayQuantity,
    }
  }

  return {
    isError,
    isLoading,
    isSuccess,
    quantity: undefined,
  }
}
