import { useMutation } from '@tanstack/react-query'

import { cartClientApi } from '@/features/cart/api/client'

export default function useUpdateCartItemQtyMutation(onSuccess?: () => Promise<void>) {
  return useMutation({
    mutationFn: cartClientApi.updateCartItemQtyToBackend,
    onSuccess,
  })
}
