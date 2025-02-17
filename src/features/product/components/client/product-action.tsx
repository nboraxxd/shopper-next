'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import { CSSProperties, useState } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

import PATH from '@/shared/constants/path'
import { cn, formatCurrency } from '@/shared/utils'
import { BadRequestError } from '@/shared/utils/error'
import { useAuthStore } from '@/features/auth/auth-store'
import { COMMON_MESSAGE } from '@/shared/constants/message'
import { PRODUCT_MESSAGE } from '@/features/product/constants'
import { useShowStickyAction } from '@/features/product/hooks'
import { useQueryCartList, useUpdateCartItemQtyMutation, useLatestCartItemId } from '@/features/cart/hooks'

import { ButtonWithRefreshTokenState } from '@/shared/components'
import { QuantityInput } from '@/shared/components/quantity-input'

interface Props {
  productId: number
  name: string
  image: string
  stock: number
  realPrice: number
}

export default function ProductAction({ productId, stock, name, image, realPrice }: Props) {
  const INITIAL_QUANTITY = '1'
  const [quantity, setQuantity] = useState<string>(INITIAL_QUANTITY)

  const router = useRouter()
  const pathname = usePathname()

  const authState = useAuthStore((state) => state.authState)
  const setProductId = useLatestCartItemId((state) => state.setProductId)

  const isShowFixedAction = useShowStickyAction((state) => state.isShow)
  const toastStyle: CSSProperties = { bottom: isShowFixedAction ? '3.5rem' : '0rem' }

  // Another way to responsive toast style
  // const toastStyle: CSSProperties = { bottom: 'var(--product-toast-bottom)' }

  const updateCartItemQtyMutation = useUpdateCartItemQtyMutation()
  const { refetch: refetchQueryCartList, isRefetching: isRefetchQueryCartList } = useQueryCartList(false)

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
      return toast.info(COMMON_MESSAGE.LOADING_DATA, { style: toastStyle })
    }

    // Stop the function if the query is refetching or the mutation is pending
    if (isRefetchQueryCartList || updateCartItemQtyMutation.isPending) return

    // Show toast if the product is out of stock
    if (stock < 1) {
      return toast.error(PRODUCT_MESSAGE.OUT_OF_STOCK, { style: toastStyle })
    }

    const cartListResponse = await refetchQueryCartList()

    if (cartListResponse.error) {
      return toast.error(COMMON_MESSAGE.SOMETHING_WENT_WRONG, { style: toastStyle })
    }

    // Calculate the quantity of the product in the cart
    const productQuantityInCart = cartListResponse.isSuccess
      ? (cartListResponse.data.payload.data.listItems.find((item) => item.productId === productId)?.quantity ?? 0)
      : 0

    // Validate the quantity input and parse it to integer
    const parsedQuantity = parseInt(quantity) ? parseInt(quantity) : 1

    // Show toast if stock is less than the quantity in the cart and the quantity input
    if (productQuantityInCart + parsedQuantity > stock) {
      return toast.info(PRODUCT_MESSAGE.PRODUCT_ALREADY_IN_CART(productQuantityInCart), {
        duration: 5000,
        style: toastStyle,
      })
    }

    // Proceed to update the quantity of the product in the cart
    toast.promise(
      updateCartItemQtyMutation.mutateAsync({
        productId,
        quantity: productQuantityInCart > 0 ? productQuantityInCart + parsedQuantity : parsedQuantity,
      }),
      {
        loading: PRODUCT_MESSAGE.ADDING_PRODUCT_TO_CART,
        success: async () => {
          setProductId(productId)
          await refetchQueryCartList()

          return PRODUCT_MESSAGE.ADDED_PRODUCT_TO_CART
        },
        error: (err) => {
          if (err instanceof BadRequestError) {
            return err.payload.message
          } else {
            return COMMON_MESSAGE.SOMETHING_WENT_WRONG
          }
        },
        style: toastStyle,
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
        <AddToCartButton
          handleAddToCart={handleAddToCart}
          disabled={stock === 0}
          isShowLoader={isRefetchQueryCartList || updateCartItemQtyMutation.isPending}
          className="h-12 w-full"
        />
        <div className="mt-3 flex items-center gap-3 sm:mt-4 sm:gap-4">
          <BuyNowButton disabled={stock === 0} className="h-12 w-1/2 sm:text-lg" />
          <ButtonWithRefreshTokenState
            variant="ghost"
            className="h-12 w-1/2 rounded-md border border-highlight px-2 py-0 text-highlight hover:bg-accent/50 hover:text-highlight sm:text-lg"
          >
            Yêu thích
          </ButtonWithRefreshTokenState>
        </div>
      </div>
      <AnimatePresence>
        {isShowFixedAction ? (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-10 h-[4.5rem] bg-product-sticky-action shadow-section lg:hidden"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.4 }}
          >
            <div className="container flex h-full justify-center gap-3 sm:justify-between">
              <div className="hidden sm:flex sm:w-1/2 sm:items-center sm:gap-3">
                <Image src={image} alt={name} width={72} height={72} className="size-14 shrink-0 rounded" />
                <div>
                  <h2 className="line-clamp-1 text-sm font-medium">{name}</h2>
                  <p className="text-sm font-medium">
                    {formatCurrency(realPrice)}
                    <sup>₫</sup> x {quantity}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center gap-3 sm:w-1/2">
                <AddToCartButton
                  handleAddToCart={handleAddToCart}
                  disabled={stock === 0}
                  isShowLoader={isRefetchQueryCartList || updateCartItemQtyMutation.isPending}
                  className="h-11 w-1/2 gap-1 text-sm [&_svg]:size-4"
                />
                <BuyNowButton disabled={stock === 0} className="h-11 w-1/2" />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

interface AddToCartButtonProps {
  handleAddToCart: () => Promise<string | number | undefined>
  disabled?: boolean
  isShowLoader?: boolean
  className?: string
}

function AddToCartButton({ handleAddToCart, disabled, isShowLoader, className }: AddToCartButtonProps) {
  return (
    <ButtonWithRefreshTokenState
      variant="ghost"
      className={cn(
        'rounded-md border border-highlight px-2 py-0 text-lg text-highlight hover:bg-accent/50 hover:text-highlight',
        className
      )}
      disabled={disabled}
      onClick={handleAddToCart}
    >
      {isShowLoader ? <LoaderCircleIcon className="animate-spin" /> : null}
      Thêm vào giỏ
    </ButtonWithRefreshTokenState>
  )
}

function BuyNowButton({ disabled, className }: { disabled?: boolean; className?: string }) {
  return (
    <ButtonWithRefreshTokenState className={cn('rounded-md px-2 py-0', className)} disabled={disabled}>
      Mua ngay
    </ButtonWithRefreshTokenState>
  )
}
