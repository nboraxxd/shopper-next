'use client'

import { useEffect, useRef } from 'react'
import { LoaderCircleIcon } from 'lucide-react'

import { cn, formatCurrency } from '@/shared/utils'
import { handleClientErrorApi } from '@/shared/utils/error'
import { usePreCheckoutMutation, useLatestPreCheckoutData } from '@/features/checkout/hooks'
import { useBuyProducts, useCurrentPromotion, useSelectedCartItemIds } from '@/features/cart/hooks'

import { Separator } from '@/shared/components/ui/separator'
import { ButtonWithRefreshTokenState } from '@/shared/components'

const CART_SUMMARY_DATA = [
  {
    title: 'Tiền hàng',
    value: 'subTotal',
  },
  {
    title: 'Giảm giá',
    value: 'discount',
  },
  {
    title: 'Thuế',
    value: 'tax',
  },
] as const

export default function CartSummary() {
  const preCheckoutRef = useRef<unknown>(null)

  const selectedItemIds = useSelectedCartItemIds((state) => state.selectedItemId)
  const currentPromotion = useCurrentPromotion((state) => state.currentPromotion)
  const promotionCode = currentPromotion?.code

  const { mutateAsync: preCheckoutMutateAsync } = usePreCheckoutMutation()

  const latestPreCheckoutData = useLatestPreCheckoutData()

  const { handleBuyProduct, isNavigatingToCheckout } = useBuyProducts()

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (selectedItemIds && !preCheckoutRef.current) {
      ;(async () => {
        preCheckoutRef.current = preCheckoutMutateAsync

        try {
          await preCheckoutMutateAsync({
            listItems: selectedItemIds,
            promotionCode: promotionCode ? [promotionCode] : undefined,
          })

          timeout = setTimeout(() => {
            preCheckoutRef.current = null
          }, 0)
        } catch (error) {
          handleClientErrorApi({ error })
        }
      })()
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [preCheckoutMutateAsync, promotionCode, selectedItemIds])

  return (
    <section className="flex flex-col gap-2.5 rounded-4xl bg-cart-section px-4 py-7 shadow-section md:gap-3">
      {CART_SUMMARY_DATA.map((item) => (
        <CartSummaryItem
          key={item.title}
          title={item.title}
          value={
            item.value === 'discount'
              ? latestPreCheckoutData?.payload.data.promotion?.discount
                ? -latestPreCheckoutData.payload.data.promotion.discount
                : -0
              : latestPreCheckoutData?.payload.data[item.value] || 0
          }
          valueClassName={cn({ 'text-highlight': item.value === 'discount' })}
        />
      ))}

      <Separator />
      <CartSummaryItem
        title="Tổng tiền"
        value={latestPreCheckoutData?.payload.data.viewCartTotal || 0}
        valueClassName="font-bold text-primary-red"
      />

      <ButtonWithRefreshTokenState
        className="mt-2 h-11 rounded-full font-medium"
        onClick={handleBuyProduct}
        disabled={isNavigatingToCheckout}
      >
        {isNavigatingToCheckout ? <LoaderCircleIcon className="animate-spin" /> : null}
        Mua hàng ({latestPreCheckoutData?.payload.data.listItems.length || 0})
      </ButtonWithRefreshTokenState>
    </section>
  )
}

function CartSummaryItem({ title, value, valueClassName }: { title: string; value: number; valueClassName?: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium">{title}</span>
      <span className={cn('font-medium', valueClassName)}>
        {formatCurrency(value)}
        <sup>₫</sup>
      </span>
    </div>
  )
}
