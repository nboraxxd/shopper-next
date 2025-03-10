'use client'

import { cn } from '@/shared/utils'
import { Dispatch, SetStateAction, useState } from 'react'

import { Address } from '@/features/address/types'
import { DialogMode } from '@/features/checkout/types'
import AddressList from '@/features/checkout/component/client/address-list'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { ArrowLeftIcon, Svgr } from '@/shared/components/icons'
import { ButtonWithRefreshTokenState } from '@/shared/components'
import { UpdateAddress, AddNewAddress } from '@/features/checkout/component/client'

interface Props {
  inititalDeliveryAddress: Address
  setInititalDeliveryAddress: Dispatch<SetStateAction<Address>>
}

export default function AddressDialog({ inititalDeliveryAddress, setInititalDeliveryAddress }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<DialogMode>('list')

  const [addressToUpdate, setAddressToUpdate] = useState<Address>()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        setTimeout(() => {
          setMode('list')
        }, 200)
      }}
    >
      <DialogTrigger asChild>
        <ButtonWithRefreshTokenState
          variant="ghost"
          className="absolute right-0 top-0 h-auto p-0.5 text-sm text-highlight sm:p-1"
        >
          Thay đổi
        </ButtonWithRefreshTokenState>
      </DialogTrigger>
      <DialogContent
        className={cn(
          'px-0 py-4 sm:max-w-[30rem] sm:py-6',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        )}
        isDefaultAnimation={false}
        onEscapeKeyDown={(e) => {
          if (mode !== 'list') {
            e.preventDefault()
            setMode('list')
          }
        }}
        onPointerDownOutside={(e) => {
          if (mode !== 'list') {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader className="border-b border-b-border px-3 pb-4 shadow-custom-down sm:px-6">
          {mode === 'list' ? <DialogTitle className="font-medium">Sổ địa chỉ</DialogTitle> : null}
          {mode === 'update' ? (
            <div className="flex items-center gap-1.5">
              <BackToListBtn setMode={setMode} />
              <DialogTitle className="font-medium">Cập nhật địa chỉ</DialogTitle>
            </div>
          ) : null}
          {mode === 'create' ? (
            <div className="flex items-center gap-1.5">
              <BackToListBtn setMode={setMode} />
              <DialogTitle className="font-medium">Thêm địa chỉ mới</DialogTitle>
            </div>
          ) : null}
          <DialogDescription className="sr-only">Chọn, cập nhật hoặc thêm mới địa chỉ nhận hàng</DialogDescription>
        </DialogHeader>

        {mode === 'list' ? (
          <AddressList
            inititalDeliveryAddress={inititalDeliveryAddress}
            setInititalDeliveryAddress={setInititalDeliveryAddress}
            setAddressToUpdate={setAddressToUpdate}
            setMode={setMode}
          />
        ) : null}

        {mode === 'update' && addressToUpdate ? (
          <UpdateAddress addressToUpdate={addressToUpdate} setMode={setMode} />
        ) : null}

        {mode === 'create' ? <AddNewAddress onSubmitNavigate={() => setMode('list')} /> : null}
      </DialogContent>
    </Dialog>
  )
}
function BackToListBtn({ setMode }: { setMode: Dispatch<SetStateAction<DialogMode>> }) {
  return (
    <ButtonWithRefreshTokenState
      variant="ghost"
      size="icon"
      className="-ml-2 size-6 rounded-full transition-colors hover:bg-checkout-highlight [&_svg]:size-4"
      onClick={() => setMode('list')}
    >
      <Svgr icon={ArrowLeftIcon} />
      <span className="sr-only">Quay lại danh sách địa chỉ</span>
    </ButtonWithRefreshTokenState>
  )
}
