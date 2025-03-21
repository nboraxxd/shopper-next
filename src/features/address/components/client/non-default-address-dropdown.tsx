'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { EllipsisVerticalIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useDeleteAddressFromBackendMutation, useSetDefaultAddressToBackendMutation } from '@/features/address/hooks'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'
import { Button } from '@/shared/components/ui/button'
import { ButtonWithRefreshTokenState } from '@/shared/components'

interface Props {
  id: string
  isDisabled: boolean
  setIsDisabled: Dispatch<SetStateAction<boolean>>
}

const ACTION_ITEM_CLASSNAME = 'min-h-8 w-full rounded-none px-3'

export default function NonDefaultAddressDropdown({ id, isDisabled, setIsDisabled }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const router = useRouter()

  const setDefaultAddressMutation = useSetDefaultAddressToBackendMutation()
  const deleteAddressMutation = useDeleteAddressFromBackendMutation()

  async function handleSetDefaultAddress() {
    if (setDefaultAddressMutation.isPending || isDisabled) return

    try {
      await setDefaultAddressMutation.mutateAsync(id)

      toast.success('Thiết lập địa chỉ mặc định thành công')
      router.refresh()
    } catch (error) {
      handleClientErrorApi({ error })
    }
  }

  async function handleDeleteAddress() {
    if (deleteAddressMutation.isPending || isDisabled) return

    setShowDeleteDialog(false)
    setIsDisabled(true)

    try {
      await deleteAddressMutation.mutateAsync(id)

      toast.success('Xoá địa chỉ thành công')
      router.refresh()
    } catch (error) {
      setIsDisabled(false)
      handleClientErrorApi({ error })
    }
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          asChild
          disabled={setDefaultAddressMutation.isPending || deleteAddressMutation.isPending || isDisabled}
        >
          <Button variant="ghost" size="icon" className="size-[1.375rem] hover:bg-account-highlight [&_svg]:size-4">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-none p-0 py-2 text-sm font-medium shadow-popover">
          <>
            <DropdownMenuItem
              asChild
              className={ACTION_ITEM_CLASSNAME}
              disabled={setDefaultAddressMutation.isPending || isDisabled}
              onClick={handleSetDefaultAddress}
            >
              <ButtonWithRefreshTokenState isPlainButton className="disabled:pointer-events-none disabled:opacity-50">
                Đặt làm mặc định
              </ButtonWithRefreshTokenState>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="-mx-2 my-2" />
          </>
          <DropdownMenuItem asChild className={ACTION_ITEM_CLASSNAME}>
            <Link href={`${PATH.UPDATE_ADDRESS}/${id}`}>Chỉnh sửa</Link>
          </DropdownMenuItem>
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
            <AlertDialogTitle className="text-base font-medium">Bạn có chắc muốn xoá địa chỉ này?</AlertDialogTitle>
            <AlertDialogDescription className="sr-only">Đây là hành động không thể hoàn tác.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-10 w-32 px-0 py-1 uppercase focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0">
              Trở lại
            </AlertDialogCancel>
            <ButtonWithRefreshTokenState
              variant="destructive"
              className="h-10 w-32 px-0 py-1 uppercase focus-visible:shadow-focus-within focus-visible:ring-0"
              disabled={deleteAddressMutation.isPending}
              onClick={handleDeleteAddress}
            >
              Xoá
            </ButtonWithRefreshTokenState>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
