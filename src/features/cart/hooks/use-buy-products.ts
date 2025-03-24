import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { useSelectedCartItemIds } from '@/features/cart/hooks'
import { useCheckoutListStore } from '@/features/checkout/hooks'

export default function useBuyProducts() {
  const [isNavigatingToCheckout, setIsNavigatingToCheckout] = useState(false)

  const router = useRouter()

  const selectedItemIds = useSelectedCartItemIds((state) => state.selectedItemId)

  const setCheckoutList = useCheckoutListStore((state) => state.setCheckoutList)

  function handleBuyProduct() {
    if (!selectedItemIds || selectedItemIds.length === 0) {
      toast.error('Vui lòng chọn sản phẩm để mua')
      return
    }

    setIsNavigatingToCheckout(true)

    setCheckoutList(selectedItemIds)

    router.push(PATH.CHECKOUT)
  }

  return {
    isNavigatingToCheckout,
    handleBuyProduct,
  }
}
