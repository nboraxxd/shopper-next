'use client'

import { cn } from '@/shared/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'
import { ButtonWithRefreshTokenState } from '@/shared/components'
import { PencilSquareIcon, Svgr } from '@/shared/components/icons'
import { useRemoveItemAndRefetchCart } from '@/features/cart/hooks'
import { handleClientErrorApi } from '@/shared/utils/error'

export default function CartItemAction({ productId }: { productId: number }) {
  const removeCartItemMutation = useRemoveItemAndRefetchCart()

  async function handleRemoveCartItem() {
    if (removeCartItemMutation.isPending) return

    try {
      await removeCartItemMutation.mutateAsync(productId)
    } catch (error) {
      handleClientErrorApi({ error })
    }
  }

  return (
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
            onClick={handleRemoveCartItem}
          >
            Xoá
          </ButtonWithRefreshTokenState>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
