'use client'

import { EllipsisVerticalIcon } from 'lucide-react'

import { cn } from '@/shared/utils'

import { ButtonWithRefreshTokenState } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import {
  useDeletePaymentCardFromBackendMutation,
  usePaymentCardState,
  useSetDefaultPaymentCardToBackendMutation,
} from '@/features/payment/hooks'
import { toast } from 'sonner'
import { handleClientErrorApi } from '@/shared/utils/error'

const ACTION_ITEM_CLASSNAME = 'min-h-8 w-full rounded-none px-3'

export default function PaymentCardDropdown({ id, isDefault }: { id: string; isDefault: boolean }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { isDisabled, setIsDisabled } = usePaymentCardState()

  const router = useRouter()

  const deletePaymentCardMutation = useDeletePaymentCardFromBackendMutation()
  const setDefaultPaymentCardMutation = useSetDefaultPaymentCardToBackendMutation()

  async function handleDeletePaymentCard() {
    if (deletePaymentCardMutation.isPending || isDisabled) return

    setShowDeleteDialog(false)
    setIsDisabled(true)

    try {
      await deletePaymentCardMutation.mutateAsync(id)

      toast.success('Xoá thẻ thành công')
      router.refresh()
    } catch (error) {
      setIsDisabled(false)
      handleClientErrorApi({ error })
    }
  }

  async function handleSetDefaultPaymentCard() {
    if (setDefaultPaymentCardMutation.isPending || isDisabled) return

    try {
      await setDefaultPaymentCardMutation.mutateAsync(id)

      toast.success('Đặt thẻ mặc định thành công')
      router.refresh()
    } catch (error) {
      handleClientErrorApi({ error })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-1 right-1 size-[1.375rem] rounded-full hover:bg-[#d4d4d8]/20 [&_svg]:size-4"
            disabled={isDisabled}
          >
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-0 py-2 text-sm font-medium">
          {!isDefault ? (
            <DropdownMenuItem asChild className={ACTION_ITEM_CLASSNAME}>
              <ButtonWithRefreshTokenState
                isPlainButton
                className="disabled:pointer-events-none disabled:opacity-50"
                disabled={setDefaultPaymentCardMutation.isPending || isDisabled}
                onClick={handleSetDefaultPaymentCard}
              >
                Đặt làm mặc định
              </ButtonWithRefreshTokenState>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            asChild
            className={cn(ACTION_ITEM_CLASSNAME, 'text-primary-red focus:text-primary-red')}
            onClick={() => setShowDeleteDialog(true)}
          >
            <button>Xoá</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent
          className="max-w-sm gap-7 p-7"
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            document.body.style.pointerEvents = ''
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-medium">Bạn có chắc muốn xoá thẻ này?</AlertDialogTitle>
            <AlertDialogDescription>Đây là hành động không thể hoàn tác.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-10 w-32 px-0 py-1 uppercase focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0">
              Trở lại
            </AlertDialogCancel>
            <ButtonWithRefreshTokenState
              variant="destructive"
              className="h-10 w-32 px-0 py-1 uppercase focus-visible:shadow-focus-within focus-visible:ring-0"
              disabled={deletePaymentCardMutation.isPending || isDisabled}
              onClick={handleDeletePaymentCard}
            >
              Xoá
            </ButtonWithRefreshTokenState>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
