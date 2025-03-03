'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { useDebounce } from '@/shared/hooks'
import { formatCurrency } from '@/shared/utils'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useQueryProductStock } from '@/features/product/hooks'
import { CartItem as CartItemType } from '@/features/cart/types'
import { usePreCheckoutMutation } from '@/features/checkout/hooks'
import { useCurrentPromotion, useSelectedCartItemIds, useUpdateCartItemQtyMutation } from '@/features/cart/hooks'

import { COMMON_MESSAGE } from '@/shared/constants/message'
import { Separator } from '@/shared/components/ui/separator'
import { QuantityInput } from '@/shared/components/quantity-input'
import { CheckboxWithRefreshTokenState } from '@/shared/components'
import { CartItemAction, RemoveCartItemDialog } from '@/features/cart/components/client/cart-item'

export default function CartItem({ product, productId, quantity: initialQty }: CartItemType) {
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  const [isInitialRender, setIsInitialRender] = useState(true)

  const [itemSubtotal, setItemSubtotal] = useState<number>(initialQty * product.real_price)

  const [quantity, setQuantity] = useState<string>(initialQty.toString())

  const [debouncedQuantity, setDebouncedQuantity] = useState<string>(initialQty.toString())
  const debouncedValue = useDebounce(debouncedQuantity, 500)

  const queryProductStock = useQueryProductStock(productId, false)
  const { refetch: refetchQueryProductStock } = queryProductStock

  const setSelectedItemIds = useSelectedCartItemIds((state) => state.setSelectedItemId)
  const selectedItemIds = useSelectedCartItemIds((state) => state.selectedItemId)
  const isChecked = selectedItemIds ? selectedItemIds.includes(productId) : false

  const currentPromo = useCurrentPromotion((state) => state.currentPromotion)
  const promoCode = currentPromo?.code

  const preCheckoutMutation = usePreCheckoutMutation()

  const { mutateAsync: updateCartItemQtyMutateAsync } = useUpdateCartItemQtyMutation(async () => {
    if (isChecked && selectedItemIds) {
      try {
        await preCheckoutMutation.mutateAsync({
          listItems: selectedItemIds,
          promotionCode: promoCode ? [promoCode] : undefined,
        })
      } catch (error) {
        handleClientErrorApi({ error })
      }
    }
  })

  const updateCartQuantityBasedOnStock = useCallback(
    async (currentQuantity: number) => {
      try {
        const productStockResponse = await refetchQueryProductStock()

        if (!productStockResponse.isSuccess) {
          return toast.error(COMMON_MESSAGE.SOMETHING_WENT_WRONG)
        }

        const stockItem = productStockResponse.data.payload.data[0].stock_item
        const maxPurchaseQuantity = Math.min(stockItem.max_sale_qty, stockItem.qty)

        if (currentQuantity > stockItem.qty) {
          toast.warning(`Số lượng còn lại của sản phẩm này là ${maxPurchaseQuantity}`)
        } else if (currentQuantity > stockItem.max_sale_qty) {
          toast.warning(`Số lượng được mua tối đa của sản phẩm này là ${maxPurchaseQuantity}`)
        }

        if (currentQuantity > stockItem.qty || currentQuantity > stockItem.max_sale_qty) {
          setQuantity(maxPurchaseQuantity.toString())
        }

        setItemSubtotal(Math.min(currentQuantity, maxPurchaseQuantity) * product.real_price)

        await updateCartItemQtyMutateAsync({
          productId,
          quantity: Math.min(currentQuantity, maxPurchaseQuantity),
        })
      } catch (error) {
        handleClientErrorApi({ error })
      }
    },
    [product.real_price, productId, refetchQueryProductStock, updateCartItemQtyMutateAsync]
  )

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    ;(async () => {
      await updateCartQuantityBasedOnStock(parseInt(debouncedValue))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  useEffect(() => {
    setQuantity(initialQty.toString())
    setItemSubtotal(initialQty * product.real_price)
  }, [initialQty, product.real_price])

  async function handleCheckedChange() {
    const newSelectedItemIds = isChecked
      ? (selectedItemIds || []).filter((id) => id !== productId)
      : [...(selectedItemIds || []), productId]

    setSelectedItemIds(newSelectedItemIds)
  }

  function handleQuantityChange(value: string) {
    setQuantity(value)
    setDebouncedQuantity(value)
  }

  return (
    <Fragment>
      <div className="relative flex items-start gap-2 md:gap-3">
        <label className="-ml-1 flex items-center self-stretch px-1 pt-0 xs:items-stretch xs:pt-8 md:-ml-2 md:items-center md:px-2 md:pt-0">
          <CheckboxWithRefreshTokenState
            className="block size-4 md:size-5"
            checked={isChecked}
            onCheckedChange={handleCheckedChange}
          />
        </label>

        <Link href={`/${product.slug}`} className="shrink-0 select-none self-center rounded-md border xs:self-auto">
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            width={96}
            height={96}
            className="size-16 rounded-md object-contain xs:size-20"
          />
        </Link>

        <div className="flex grow flex-col items-start gap-2 md:flex-row md:gap-3">
          <div className="grow font-medium">
            <Link href={`/${product.slug}`} className="flex w-fit justify-start">
              <h3 className="line-clamp-2 text-sm md:text-base">{product.name}</h3>
            </Link>
            <div className="mt-2 flex items-baseline gap-2 md:mt-3">
              <p className="text-sm text-highlight md:text-base">
                {formatCurrency(product.real_price)}
                <sup>₫</sup>
              </p>
              {product.price > product.real_price ? (
                <p className="hidden text-xs text-cart-price line-through xs:block">
                  {formatCurrency(product.price)}
                  <sup>₫</sup>
                </p>
              ) : null}
            </div>
          </div>
          <QuantityInput
            className="h-8 px-2 md:ml-3 md:h-9 [&_svg]:!size-5 md:[&_svg]:!size-6"
            inputClassName="w-10"
            value={quantity}
            onType={setQuantity}
            onFocusOut={async (value) => {
              await updateCartQuantityBasedOnStock(parseInt(value))
            }}
            onIncrease={handleQuantityChange}
            onDecrease={handleQuantityChange}
            onRemoveWhenZero={() => setShowAlertDialog(true)}
            disabled={queryProductStock.isRefetching}
            isAuthenticated
          />
          <p className="hidden text-end font-bold md:block md:min-w-32">
            {formatCurrency(itemSubtotal)}
            <sup>₫</sup>
          </p>
        </div>

        <CartItemAction productId={productId} />

        <RemoveCartItemDialog
          productId={productId}
          showAlertDialog={showAlertDialog}
          setShowAlertDialog={setShowAlertDialog}
        />
      </div>
      <Separator className="my-3 last:hidden md:my-5" />
    </Fragment>
  )
}
