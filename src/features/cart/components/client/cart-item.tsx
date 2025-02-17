'use client'

import {
  useDelCartItemMutation,
  useQueryCartList,
  useSelectedCartItemIds,
  useUpdateCartItemQtyMutation,
} from '@/features/cart/hooks'
import { CartItem as CartItemType } from '@/features/cart/types'
import { usePreCheckoutMutation } from '@/features/checkout/hooks'
import { useQueryProductStock } from '@/features/product/hooks'
import { ButtonWithRefreshTokenState } from '@/shared/components'
import { PencilSquareIcon, Svgr } from '@/shared/components/icons'
import { QuantityInput } from '@/shared/components/quantity-input'
import { Checkbox } from '@/shared/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Separator } from '@/shared/components/ui/separator'
import { COMMON_MESSAGE } from '@/shared/constants/message'
import { useDebounce } from '@/shared/hooks'
import { cn, formatCurrency } from '@/shared/utils'
import { handleClientErrorApi } from '@/shared/utils/error'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'

type Props = CartItemType

export default function CartItem({ product, productId, quantity: initialQty }: Props) {
  const productStockRef = useRef<unknown>(null)
  const updateCartItemQtyRef = useRef<unknown>(null)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const [isInitialRender, setIsInitialRender] = useState(true)

  const [quantity, setQuantity] = useState<string>(initialQty.toString())
  const [debouncedQuantity, setDebouncedQuantity] = useState<string>(initialQty.toString())

  const debouncedValue = useDebounce(debouncedQuantity, 500)

  const queryCartList = useQueryCartList(false)

  const selectedItemIds = useSelectedCartItemIds((state) => state.cartItemIds)
  const setSelectedItemIds = useSelectedCartItemIds((state) => state.setCartItemIds)

  const delCartItemMutation = useDelCartItemMutation()

  const isChecked = selectedItemIds.includes(productId)

  const { refetch: refetchQueryProductStock, isRefetching: isRefetchQueryProductStock } = useQueryProductStock(
    productId,
    false
  )
  const preCheckoutMutation = usePreCheckoutMutation()

  const { mutateAsync: updateCartItemQtyMutateAsync, isPending: isCartItemQtyUpdatePending } =
    useUpdateCartItemQtyMutation(async () => {
      if (isChecked) {
        await preCheckoutMutation.mutateAsync({ listItems: selectedItemIds })
      }
    })

  useEffect(() => {
    let timeoutProductStock: NodeJS.Timeout | null = null
    let timeoutUpdateCartItemQty: NodeJS.Timeout | null = null

    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    ;(async () => {
      if (productStockRef.current || updateCartItemQtyRef.current) return

      productStockRef.current = refetchQueryProductStock
      const productStockResponse = await refetchQueryProductStock()

      timeoutProductStock = setTimeout(() => {
        productStockRef.current = null
      }, 0)

      if (productStockResponse.error) {
        return toast.error(COMMON_MESSAGE.SOMETHING_WENT_WRONG)
      }

      const productStock = productStockResponse.data?.payload.data[0].stock_item.qty || 0

      if (parseInt(debouncedValue) > productStock) {
        toast.warning(`Mặt hàng này chỉ còn ${productStock} sản phẩm`)
        setQuantity(productStock.toString())
        setDebouncedQuantity(productStock.toString())
      }

      updateCartItemQtyRef.current = updateCartItemQtyMutateAsync

      await updateCartItemQtyMutateAsync({ productId, quantity: Math.min(parseInt(debouncedValue), productStock) })

      timeoutUpdateCartItemQty = setTimeout(() => {
        updateCartItemQtyRef.current = null
      }, 0)
    })()

    return () => {
      if (timeoutProductStock) clearTimeout(timeoutProductStock)
      if (timeoutUpdateCartItemQty) clearTimeout(timeoutUpdateCartItemQty)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, productId, refetchQueryProductStock, updateCartItemQtyMutateAsync])

  useEffect(() => {
    setQuantity(initialQty.toString())
  }, [initialQty])

  async function handleCheckedChange(checked: boolean) {
    const newSelectedItemIds = !checked
      ? selectedItemIds.filter((id) => id !== productId)
      : [...selectedItemIds, productId]

    setSelectedItemIds(newSelectedItemIds)

    // if (newSelectedItemIds.length > 0) {
    await preCheckoutMutation.mutateAsync({ listItems: newSelectedItemIds })
    // }
  }

  return (
    <Fragment>
      <div className="flex items-start gap-2 md:gap-3">
        <label
          htmlFor={productId.toString()}
          className="-ml-1 flex items-center self-stretch px-1 pt-0 xs:items-stretch xs:pt-8 md:-ml-2 md:items-center md:px-2 md:pt-0"
        >
          <Checkbox
            id={productId.toString()}
            className="block size-4 md:size-5"
            checked={isChecked}
            onCheckedChange={handleCheckedChange}
            disabled={isRefetchQueryProductStock || isCartItemQtyUpdatePending}
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

        <div className="grow font-medium">
          <Link href={`/${product.slug}`}>
            <h3 className="line-clamp-2 text-sm md:text-base">{product.name}</h3>
          </Link>
          <div className="mt-2 flex flex-col items-stretch justify-between gap-2 md:mt-3 md:flex-row md:items-center md:justify-start md:gap-3">
            <div className="flex items-baseline gap-2 md:min-w-56">
              <p className="text-sm text-highlight md:text-base">
                {formatCurrency(product.real_price)}
                <sup>₫</sup>
              </p>
              {product.price > product.real_price ? (
                <p className="hidden text-xs text-cart-real-price line-through xs:block">
                  {formatCurrency(product.price)}
                  <sup>₫</sup>
                </p>
              ) : null}
            </div>
            <div className="flex grow justify-between">
              <QuantityInput
                className="h-8 px-2 md:h-9 [&_svg]:!size-5 md:[&_svg]:!size-6"
                inputClassName="w-10 md:w-12"
                value={quantity}
                onType={(value) => setQuantity(value)}
                // onFocusOut={(value) => setDebouncedQuantity(value)}
                onIncrease={(value) => {
                  setQuantity(value)
                  setDebouncedQuantity(value)
                }}
                onDecrease={(value) => {
                  setQuantity(value)
                  setDebouncedQuantity(value)
                }}
                onRemoveWhenDecreased={() => {
                  setShowDeleteDialog(true)
                }}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ButtonWithRefreshTokenState
                    size="icon"
                    variant="ghost"
                    className="inline-flex size-auto self-end text-secondary-2 hover:text-secondary-1 dark:hover:text-secondary-3 md:hidden [&_svg]:size-4 md:[&_svg]:size-5"
                  >
                    <Svgr icon={PencilSquareIcon} />
                  </ButtonWithRefreshTokenState>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-none p-0 py-2 text-sm font-medium shadow-popover">
                  <DropdownMenuItem asChild className="min-h-8 w-full rounded-none px-3">
                    <ButtonWithRefreshTokenState
                      isPlainButton
                      className="disabled:pointer-events-none disabled:opacity-50"
                    >
                      Yêu thích
                    </ButtonWithRefreshTokenState>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className={cn('min-h-8 w-full rounded-none px-3', 'text-primary-red focus:text-primary-red')}
                  >
                    <ButtonWithRefreshTokenState
                      isPlainButton
                      className="disabled:pointer-events-none disabled:opacity-50"
                    >
                      Xoá
                    </ButtonWithRefreshTokenState>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="hidden flex-col items-end justify-between self-stretch md:flex">
          <p className="text-lg font-bold">
            {formatCurrency(100000)}
            <sup>₫</sup>
          </p>
          <div className="flex gap-3">
            <ButtonWithRefreshTokenState
              size="icon"
              variant="ghost"
              className="size-auto text-secondary-2 hover:text-secondary-1 dark:hover:text-secondary-3 [&_svg]:size-4 md:[&_svg]:size-5"
            >
              <Svgr icon={PencilSquareIcon} />
            </ButtonWithRefreshTokenState>
          </div>
        </div>
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="max-w-sm gap-7 p-7">
            <AlertDialogHeader>
              <AlertDialogTitle className="line-clamp-2 text-base font-medium">
                Bạn chắc chắn muốn bỏ sản phẩm {product.name}?
              </AlertDialogTitle>
              <AlertDialogDescription className="sr-only">Đây là hành động không thể hoàn tác.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-10 w-32 px-0 py-1 uppercase focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0">
                Trở lại
              </AlertDialogCancel>
              <ButtonWithRefreshTokenState
                variant="destructive"
                className="h-10 w-32 px-0 py-1 uppercase focus-visible:shadow-focus-within focus-visible:ring-0"
                onClick={async () => {
                  try {
                    await delCartItemMutation.mutateAsync(productId, {
                      onSuccess: async () => {
                        setSelectedItemIds(selectedItemIds.filter((id) => id !== productId))
                        await queryCartList.refetch()
                      },
                    })
                  } catch (error) {
                    handleClientErrorApi({ error })
                  }
                }}
              >
                Xoá
              </ButtonWithRefreshTokenState>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Separator className="my-3 last:hidden md:my-5" />
    </Fragment>
  )
}
