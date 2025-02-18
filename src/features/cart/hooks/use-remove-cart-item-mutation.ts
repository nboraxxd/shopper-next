import { useMutation } from '@tanstack/react-query'

import { cartClientApi } from '@/features/cart/api/client'

export default function useRemoveCartItemMutation() {
  return useMutation({
    mutationFn: cartClientApi.removeCartItemFromBackend,
  })
}
