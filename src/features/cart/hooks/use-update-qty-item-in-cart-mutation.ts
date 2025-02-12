import { useMutation } from '@tanstack/react-query'

import { cartClientApi } from '@/features/cart/api/client'

export default function useUpdateQtyItemInCartMutation() {
  return useMutation({
    mutationFn: cartClientApi.updateQtyItemInCartToBackend,
  })
}
