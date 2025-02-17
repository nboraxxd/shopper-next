import { useMutation } from '@tanstack/react-query'

import { cartClientApi } from '@/features/cart/api/client'

export default function useDelCartItemMutation() {
  return useMutation({
    mutationFn: cartClientApi.delCartItemFromBackend,
  })
}
