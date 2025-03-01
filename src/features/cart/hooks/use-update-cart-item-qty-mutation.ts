import { useMutation } from '@tanstack/react-query'

import { CART_KEY } from '@/features/cart/constants'
import { cartClientApi } from '@/features/cart/api/client'

export default function useUpdateCartItemQtyMutation(onSuccess?: () => Promise<void>) {
  return useMutation({
    mutationFn: cartClientApi.updateCartItemQtyToBackend,
    mutationKey: [CART_KEY.UPDATE_CART_ITEM_QTY],
    onSuccess,
  })
}
