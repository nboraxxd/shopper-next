'use client'

import { Dispatch, SetStateAction } from 'react'

import { handleClientErrorApi } from '@/shared/utils/error'
import { useRemoveItemAndRefetchCart } from '@/features/cart/hooks'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'
import { ButtonWithRefreshTokenState } from '@/shared/components'

interface Props {
  productId: number
  showAlertDialog: boolean
  setShowAlertDialog: Dispatch<SetStateAction<boolean>>
}

export default function CartItemAlertDialog({ productId, showAlertDialog, setShowAlertDialog }: Props) {
  const removeCartItemMutation = useRemoveItemAndRefetchCart()

  async function handleRemoveCartItem() {
    if (removeCartItemMutation.isPending) return

    setShowAlertDialog(false)

    try {
      await removeCartItemMutation.mutateAsync(productId)
    } catch (error) {
      handleClientErrorApi({ error })
    }
  }

  return (
    <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
      <AlertDialogContent
        className="max-w-sm gap-7 p-7"
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          document.body.style.pointerEvents = ''
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="line-clamp-2 text-base font-medium">Xoá sản phẩm</AlertDialogTitle>
          <AlertDialogDescription>Bạn có muốn xóa sản phẩm đang chọn?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-10 w-32 px-0 py-1 uppercase focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0">
            Trở lại
          </AlertDialogCancel>
          <ButtonWithRefreshTokenState
            variant="destructive"
            className="h-10 w-32 px-0 py-1 uppercase focus-visible:shadow-focus-within focus-visible:ring-0"
            onClick={handleRemoveCartItem}
          >
            Xoá
          </ButtonWithRefreshTokenState>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
