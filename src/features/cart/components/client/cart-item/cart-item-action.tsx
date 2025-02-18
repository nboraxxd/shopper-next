'use client'

import { ButtonWithRefreshTokenState } from '@/shared/components'
import { PencilSquareIcon, Svgr } from '@/shared/components/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { cn } from '@/shared/utils'

import { Button } from '@/shared/components/ui/button'
import { useState } from 'react'
import CartItemAlertDialog from '@/features/cart/components/client/cart-item/cart-item-alert-dialog'

export default function CartItemAction({ productId }: { productId: number }) {
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="absolute bottom-0 right-0 size-auto text-secondary-2 hover:text-cart-icon-highlight [&_svg]:size-4"
          >
            <Svgr icon={PencilSquareIcon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-none p-0 py-2 text-sm font-medium shadow-popover">
          <DropdownMenuItem asChild className="min-h-8 w-full rounded-none px-3">
            <ButtonWithRefreshTokenState isPlainButton className="disabled:pointer-events-none disabled:opacity-50">
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
              onClick={() => setShowAlertDialog(true)}
            >
              Xoá
            </ButtonWithRefreshTokenState>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CartItemAlertDialog
        productId={productId}
        showAlertDialog={showAlertDialog}
        setShowAlertDialog={setShowAlertDialog}
      />
    </>
  )
}
