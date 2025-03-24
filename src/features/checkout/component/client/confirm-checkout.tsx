'use client'

import omit from 'lodash/omit'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircleIcon } from 'lucide-react'

import {
  useNoteStore,
  useCheckoutMutation,
  useCheckoutListStore,
  useCheckoutAddressStore,
  useCheckoutPaymentMethodStore,
  useCheckoutShippingMethodStore,
} from '@/features/checkout/hooks'
import PATH from '@/shared/constants/path'
import { CheckoutReqBody } from '@/features/checkout/types'
import { handleClientErrorApi } from '@/shared/utils/error'
import { SHIPPING_METHODS_DATA } from '@/features/shipping/constants'
import { useCurrentPromotion, useQueryCartList, useSelectedCartItemIds } from '@/features/cart/hooks'

import { ButtonWithRefreshTokenState } from '@/shared/components'

export default function ConfirmCheckout() {
  const [isNavigating, setIsNavigating] = useState(false)

  const router = useRouter()

  const { note, setNote } = useNoteStore()
  const { checkoutList, setCheckoutList } = useCheckoutListStore()
  const { currentPromotion, setCurrentPromotion } = useCurrentPromotion()
  const checkoutAddress = useCheckoutAddressStore((state) => state.checkoutAddress)
  const { checkoutPaymentMethod, setCheckoutPaymentMethod } = useCheckoutPaymentMethodStore()
  const { checkoutShippingMethod, setCheckoutShippingMethod } = useCheckoutShippingMethodStore()
  const setSelectedItemId = useSelectedCartItemIds((state) => state.setSelectedItemId)

  const queryCartList = useQueryCartList(false)
  const checkoutMutation = useCheckoutMutation()

  const isDisabled = !checkoutList || !checkoutAddress || checkoutMutation.isPending || isNavigating

  async function handleCheckout() {
    if (isDisabled) return

    const body: CheckoutReqBody = {
      listItems: checkoutList,
      payment: {
        paymentMethod: checkoutPaymentMethod,
      },
      shippingMethod: checkoutShippingMethod.code,
      shipping: omit(checkoutAddress, ['user_id', '_id', 'default']),
      promotionCode: currentPromotion?.code ? [currentPromotion.code] : undefined,
      note: note || undefined,
    }

    try {
      setIsNavigating(true)

      await checkoutMutation.mutateAsync(body)
      await queryCartList.refetch()

      setNote(null)
      setCheckoutList(null)
      setCurrentPromotion(null)
      setCheckoutPaymentMethod('money')
      setCheckoutShippingMethod(SHIPPING_METHODS_DATA.payload.data.find((item) => item.code === 'mien-phi')!)
      setSelectedItemId([])

      router.push(`${PATH.ORDER_HISTORY}?status=pending`)
      router.refresh()
    } catch (error) {
      setIsNavigating(false)
      handleClientErrorApi({ error })
    }
  }

  return (
    <div className="border-t border-dashed px-3 py-4 text-end xs:px-4 md:py-7 lg:px-7">
      <ButtonWithRefreshTokenState className="h-11 w-full xs:w-52" onClick={handleCheckout} disabled={isDisabled}>
        {checkoutMutation.isPending || isNavigating ? <LoaderCircleIcon className="animate-spin" /> : null}
        Đặt hàng
      </ButtonWithRefreshTokenState>
    </div>
  )
}
