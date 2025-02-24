import { useMutation } from '@tanstack/react-query'

import { cartClientApi } from '@/features/cart/api/client'
import { handleClientErrorApi } from '@/shared/utils/error'
import { usePreCheckoutMutation } from '@/features/checkout/hooks'
import { useSelectedCartItemIds, useQueryCartList } from '@/features/cart/hooks'
import { CART_KEY } from '@/features/cart/constants'

export default function useRemoveItemAndRefetchCart() {
  const queryCartList = useQueryCartList(false)
  const preCheckoutMutation = usePreCheckoutMutation()

  const { selectedItemId, setSelectedItemId } = useSelectedCartItemIds((state) => state)

  return useMutation({
    mutationFn: cartClientApi.removeCartItemFromBackend,
    mutationKey: [CART_KEY.REMOVE_CART_ITEM],
    onSuccess: async (_, productId) => {
      try {
        await queryCartList.refetch()

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
