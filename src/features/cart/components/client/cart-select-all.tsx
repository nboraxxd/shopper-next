'use client'

import { cn } from '@/shared/utils'
import { CartItem } from '@/features/cart/types'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useSelectedCartItemIds } from '@/features/cart/hooks'
import { usePreCheckoutMutation } from '@/features/checkout/hooks'

import { Label } from '@/shared/components/ui/label'
import { CheckboxWithRefreshTokenState } from '@/shared/components'

type Props = {
  cartList: CartItem[]
  labelClassName?: string
  titleClassName?: string
}

export default function CartSelectAll({ cartList, labelClassName, titleClassName }: Props) {
  const selectedItemIds = useSelectedCartItemIds((state) => state.selectedItemId)
  const setSelectedItemIds = useSelectedCartItemIds((state) => state.setSelectedItemId)

  const selectedItemIdsSet = new Set(selectedItemIds)

  const isChecked = cartList.length > 0 ? cartList.every((item) => selectedItemIdsSet.has(item.productId)) : false

  const preCheckoutMutation = usePreCheckoutMutation()

  async function handleCheckedChange(checked: boolean) {
    const newSelectedItemIds = checked ? cartList.map((item) => item.productId) : []

    setSelectedItemIds(newSelectedItemIds)

    try {
      await preCheckoutMutation.mutateAsync({ listItems: newSelectedItemIds })
    } catch (error) {
      handleClientErrorApi({ error })
    }
  }

  return cartList.length > 0 ? (
    <Label className={cn('flex items-center gap-3 md:gap-5', labelClassName)}>
      <CheckboxWithRefreshTokenState
        className="size-4 md:size-5"
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
      />
      <span className={cn('font-medium', titleClassName)}>Chọn tất cả ({cartList.length})</span>
    </Label>
  ) : null
}
