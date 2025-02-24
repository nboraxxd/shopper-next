'use client'

import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { HeartIcon, Svgr, TrashIcon } from '@/shared/components/icons'
import { RemoveCartItemDialog } from '@/features/cart/components/client/cart-item'

export default function CartItemAction({ productId }: { productId: number }) {
  const [showDelDialog, setDelDialog] = useState(false)

  return (
    <div className="absolute bottom-0 right-0 flex items-center gap-2">
      <Button
        size="icon"
        variant="ghost"
        className="size-auto text-secondary-2 hover:text-cart-icon-highlight [&_svg]:size-4"
      >
        <Svgr icon={HeartIcon} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="size-auto text-primary-red/75 hover:text-primary-red [&_svg]:size-4"
        onClick={() => setDelDialog(true)}
      >
        <Svgr icon={TrashIcon} />
      </Button>

      <RemoveCartItemDialog productId={productId} showAlertDialog={showDelDialog} setShowAlertDialog={setDelDialog} />
    </div>
  )
}
