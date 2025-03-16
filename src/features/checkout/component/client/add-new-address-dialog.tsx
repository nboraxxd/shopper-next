'use client'

import { useState } from 'react'
import { cn } from '@/shared/utils'

import { useCheckoutAddress } from '@/features/checkout/hooks'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { ButtonWithRefreshTokenState } from '@/shared/components'
import { AddNewAddress } from '@/features/checkout/component/client'

export default function AddNewAddressDialog() {
  const [isOpen, setIsOpen] = useState(true)

  const setCheckoutAddress = useCheckoutAddress((state) => state.setCheckoutAddress)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ButtonWithRefreshTokenState variant="ghost" className="h-auto p-0.5 text-sm text-highlight sm:p-1">
          Thêm mới ngay
        </ButtonWithRefreshTokenState>
      </DialogTrigger>
      <DialogContent
        className={cn(
          'px-0 py-4 sm:max-w-[30rem] sm:py-6',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        )}
        isDefaultAnimation={false}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="border-b border-b-border px-3 pb-4 shadow-custom-down sm:px-6">
          <DialogTitle className="font-medium">Thêm địa chỉ mới</DialogTitle>
          <DialogDescription className="sr-only">Thêm mới địa chỉ nhận hàng</DialogDescription>
        </DialogHeader>

        <AddNewAddress
          isDefaultCheckboxVisible={false}
          addNewAddressCallback={(address) => {
            if (address) {
              setCheckoutAddress(address)
            }
            setIsOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
