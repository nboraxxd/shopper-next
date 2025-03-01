'use client'

import { useMutationState } from '@tanstack/react-query'
import { ChevronUpIcon } from 'lucide-react'
import { useRef } from 'react'

import { useCartList } from '@/features/cart/hooks'
import { CHECKOUT_KEY } from '@/features/checkout/constants'
import { PreCheckoutResponse } from '@/features/checkout/types'
import { formatCurrency } from '@/shared/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Separator } from '@/shared/components/ui/separator'
import { DialogTrigger } from '@/shared/components/ui/dialog'
import { ArrowRightIcon, Svgr, VoucherIcon } from '@/shared/components/icons'
import { CartPromoDialog, CartSelectAll } from '@/features/cart/components/client'

export default function CartPromotionSticky() {
  const stickyRef = useRef<HTMLDivElement>(null)

  const cartList = useCartList((state) => state.cartList)

  const dataPreCheckout = useMutationState({
    filters: { mutationKey: [CHECKOUT_KEY.PRE_CHECKOUT], exact: true, status: 'success' },
    select: (mutation) => mutation.state.data as { payload: PreCheckoutResponse } | undefined,
  })

  const latestPreCheckout = dataPreCheckout.at(-1)

  return (
    <div className="sticky inset-x-0 bottom-0 mt-7 xl:hidden">
      <div className="!pointer-events-auto md:container">
        <div
          ref={stickyRef}
          className="flex h-full flex-col gap-2 border-t border-dashed border-border bg-cart-section py-3 shadow-[0px_-25px_32px_-23px_rgba(0,0,0,0.2)] dark:shadow-[0px_-25px_32px_-23px_rgba(150,150,150,0.08)]"
        >
          <div className="grid grid-cols-2 px-3 sm:px-7">
            <div className="col-span-2 col-start-1 flex items-center justify-between gap-2 lg:col-start-2">
              <h2 className="flex items-center gap-1 text-sm font-medium">
                <Svgr icon={VoucherIcon} className="size-5" />
                <span className="hidden sm:inline-block">Shopper khuyến mãi</span>
              </h2>
              <CartPromoDialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group h-auto justify-start gap-0.5 p-0 text-sm text-highlight [&_svg]:size-4"
                  >
                    <span>Nhập hoặc chọn mã</span>
                    <Svgr icon={ArrowRightIcon} className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </DialogTrigger>
              </CartPromoDialog>
            </div>
          </div>
          <Separator className="h-0 w-full border-t border-dashed border-border bg-transparent" />
          <div className="flex items-center px-3 sm:px-7">
            <div className="hidden md:flex lg:w-1/2">
              {cartList ? (
                <CartSelectAll titleClassName="text-sm" cartList={cartList} />
              ) : (
                <div className="flex items-center gap-3 md:gap-5">
                  <Skeleton className="size-5 md:size-6" />
                  <Skeleton className="h-5 w-36 md:h-6" />
                </div>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="group flex cursor-pointer flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-1 md:ml-auto lg:ml-0 lg:grow lg:justify-start">
                  <span className="hidden sm:inline-block">Tổng thanh toán:</span>
                  <span className="text-[0.625rem] sm:hidden">Tổng tiền</span>
                  <div className="flex items-center gap-1 sm:ml-1 lg:ml-auto">
                    <span className="text-sm font-bold text-primary-red sm:text-base md:text-lg">
                      {formatCurrency(latestPreCheckout?.payload.data.viewCartTotal || 0)}
                      <sup>₫</sup>
                    </span>
                    <ChevronUpIcon className="size-4 text-secondary-2 transition-colors group-hover:text-cart-icon-highlight" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                alignOffset={-171}
                sideOffset={14}
                isDefaultAnimation={false}
                className="rounded-none"
                style={{
                  width: `${stickyRef.current?.clientWidth}px`,
                }}
                onInteractOutside={(ev) => {
                  if (stickyRef.current?.contains(ev.target as Node)) {
                    ev.preventDefault()
                  }
                }}
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="ml-auto h-9 rounded-md text-sm font-medium md:ml-4">
              Mua hàng ({latestPreCheckout?.payload.data.listItems.length || 0})
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
