import { useState } from 'react'
import { useRouter } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { useCheckoutStore } from '@/features/checkout/hooks'
import { useCurrentPromotion, useSelectedCartItemIds } from '@/features/cart/hooks'

export default function useBuyProducts() {
  const [isNavigatingToCheckout, setIsNavigatingToCheckout] = useState(false)

  const router = useRouter()

  const selectedItemIds = useSelectedCartItemIds((state) => state.selectedItemId)
  const currentPromotion = useCurrentPromotion((state) => state.currentPromotion)

  const setCheckout = useCheckoutStore((state) => state.setCheckout)

  function handleBuyProduct() {
    if (!selectedItemIds || selectedItemIds.length === 0) return

    setIsNavigatingToCheckout(true)

    setCheckout({
      listItems: selectedItemIds,
      promotionCode: currentPromotion?.code ? [currentPromotion.code] : undefined,
    })

    router.push(PATH.CHECKOUT)
  }

  return {
    isNavigatingToCheckout,
    handleBuyProduct,
  }
}
