'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { BadRequestError } from '@/shared/utils/error'
import { useAuthStore } from '@/features/auth/auth-store'
import { COMMON_MESSAGE } from '@/shared/constants/message'
import { PRODUCT_MESSAGE } from '@/features/product/constants'
import { useQueryCartFromBackend, useUpdateQtyItemInCartMutation } from '@/features/cart/hooks'

import { ButtonWithRefreshTokenState } from '@/shared/components'
import { QuantityInput } from '@/shared/components/quantity-input'
import { LoaderCircleIcon } from 'lucide-react'

export default function ProductAction({ productId, stock }: { productId: number; stock: number }) {
  const INITIAL_QUANTITY = '1'
  const [quantity, setQuantity] = useState<string>(INITIAL_QUANTITY)

  const router = useRouter()
  const pathname = usePathname()

  const authState = useAuthStore((state) => state.authState)

  const { refetch: refetchQueryCart, isRefetching: isRefetchQueryCart } = useQueryCartFromBackend(false)
  const updateQtyItemInCartMutation = useUpdateQtyItemInCartMutation()

  function handleChangeQuantity(value: string) {
    setQuantity(value)
  }

  async function handleAddToCart() {
    // Redirect to login page with next query param if user is not authenticated
    if (authState === 'unauthenticated') {
      const next = new URLSearchParams()
      next.set('next', pathname)

      router.push(`${PATH.LOGIN}?${next.toString()}`)
    }

    // Show toast if user is still being authenticated
    if (authState === 'loading') {
      return toast.info(COMMON_MESSAGE.LOADING_DATA)
    }

    // Stop the function if the query is refetching or the mutation is pending
    if (isRefetchQueryCart || updateQtyItemInCartMutation.isPending) return

    // Show toast if the product is out of stock
    if (stock < 1) {
      return toast.error(PRODUCT_MESSAGE.OUT_OF_STOCK)
    }

    const queryCartResponse = await refetchQueryCart()

    if (queryCartResponse.error) {
      return toast.error(COMMON_MESSAGE.SOMETHING_WENT_WRONG)
    }

    // Calculate the quantity of the product in the cart
    const productQuantityInCart = queryCartResponse.isSuccess
      ? (queryCartResponse.data.payload.data.listItems.find((item) => item.productId === productId)?.quantity ?? 0)
      : 0

    // Validate the quantity input and parse it to integer
    const parsedQuantity = parseInt(quantity) ? parseInt(quantity) : 1

    // Show toast if stock is less than the quantity in the cart and the quantity input
    if (productQuantityInCart + parsedQuantity > stock) {
      return toast.info(PRODUCT_MESSAGE.PRODUCT_ALREADY_IN_CART(productQuantityInCart), {
        duration: 5000,
      })
    }

    // Proceed to update the quantity of the product in the cart
    toast.promise(
      updateQtyItemInCartMutation.mutateAsync({
        productId,
        quantity: productQuantityInCart > 0 ? productQuantityInCart + parsedQuantity : parsedQuantity,
      }),
      {
        loading: PRODUCT_MESSAGE.ADDING_PRODUCT_TO_CART,
        success: async () => {
          await refetchQueryCart()

          return PRODUCT_MESSAGE.ADDED_PRODUCT_TO_CART
        },
        error: (err) => {
          if (err instanceof BadRequestError) {
            return err.payload.message
          } else {
            return COMMON_MESSAGE.SOMETHING_WENT_WRONG
          }
        },
      }
    )
  }

  return (
    <>
      <div className="flex items-center gap-3 xl:flex-col xl:items-start">
        <span className="text-lg font-medium">Số lượng:</span>
        <QuantityInput
          max={stock}
          onDecrease={handleChangeQuantity}
          onIncrease={handleChangeQuantity}
          onType={handleChangeQuantity}
          value={quantity.toString()}
        />
      </div>
      {stock > 0 && stock < 10 ? (
        <p className="mt-3 text-sm font-medium text-primary-yellow">Chỉ còn {stock} sản phẩm</p>
      ) : null}
      {stock <= 0 ? <p className="mt-3 text-sm font-medium text-primary-red">Sản phẩm đã hết hàng</p> : null}
      <div className="mt-5">
        <ButtonWithRefreshTokenState
          variant="ghost"
          className="h-[46px] w-full rounded-md border border-highlight text-lg text-highlight hover:bg-accent/50 hover:text-highlight"
          disabled={stock === 0}
          onClick={handleAddToCart}
        >
          {isRefetchQueryCart || updateQtyItemInCartMutation.isPending ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : null}
          Thêm vào giỏ
        </ButtonWithRefreshTokenState>
        <div className="mt-3 flex items-center gap-3 sm:mt-4 sm:gap-4">
          <ButtonWithRefreshTokenState className="h-[46px] grow rounded-md sm:text-lg" disabled={stock === 0}>
            Mua ngay
          </ButtonWithRefreshTokenState>
          <ButtonWithRefreshTokenState
            variant="ghost"
            className="h-[46px] grow rounded-md border border-highlight text-highlight hover:bg-accent/50 hover:text-highlight sm:text-lg"
          >
            Yêu thích
          </ButtonWithRefreshTokenState>
        </div>
      </div>
    </>
  )
}
