import { useMutation } from '@tanstack/react-query'

import { cartClientApi } from '@/features/cart/api/client'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useSelectedCartItemIds } from '@/features/cart/hooks'
import { usePreCheckoutMutation } from '@/features/checkout/hooks'

export default function useRemoveItem() {
  const preCheckoutMutation = usePreCheckoutMutation()

  const { selectedItemId, setSelectedItemId } = useSelectedCartItemIds((state) => state)

  return useMutation({
    mutationFn: cartClientApi.removeCartItemFromBackend,
    onSuccess: async (_, productId) => {
      try {
        if (selectedItemId.includes(productId)) {
          const newSelectedCartItemIds = selectedItemId.filter((id) => id !== productId)

          setSelectedItemId(newSelectedCartItemIds)

          await preCheckoutMutation.mutateAsync({ listItems: newSelectedCartItemIds })
        }
      } catch (error) {
        handleClientErrorApi({ error })
      }
    },
  })
}
