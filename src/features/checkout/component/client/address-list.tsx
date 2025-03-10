'use client'

import { CheckCircle2Icon, PlusIcon } from 'lucide-react'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'

import { formatPhoneNumber } from '@/shared/utils'
import { Address } from '@/features/address/types'
import { DialogMode } from '@/features/checkout/types'
import { useQueryAddressList } from '@/features/address/hooks'

import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Separator } from '@/shared/components/ui/separator'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { PencilSquareIcon, Svgr } from '@/shared/components/icons'
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'

interface Props {
  inititalDeliveryAddress: Address
  setInititalDeliveryAddress: Dispatch<SetStateAction<Address>>
  setMode: Dispatch<SetStateAction<DialogMode>>
  setAddressToUpdate: Dispatch<SetStateAction<Address | undefined>>
}

export default function AddressList(props: Props) {
  const { inititalDeliveryAddress, setInititalDeliveryAddress, setMode, setAddressToUpdate } = props

  const [deliveryAddress, setDeliveryAddress] = useState(inititalDeliveryAddress)

  const queryAddressList = useQueryAddressList()

  useEffect(() => {
    if (queryAddressList.isSuccess) {
      const selectedAddress = queryAddressList.data.payload.data.find((address) => address._id === deliveryAddress._id)
      if (selectedAddress && selectedAddress.default !== deliveryAddress.default) {
        setDeliveryAddress(selectedAddress)
      }
    }
  }, [deliveryAddress._id, deliveryAddress.default, queryAddressList.data?.payload.data, queryAddressList.isSuccess])

  return (
    <>
      <ScrollArea className="h-[38rem]">
        <div className="px-3 sm:px-6">
          {queryAddressList.isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Fragment key={index}>
                  <div className="space-y-1 py-4">
                    <Skeleton className="h-5 w-36" />
                    <div className="space-y-1">
                      <Skeleton className="h-[1.125rem] w-full" />
                      <Skeleton className="h-[1.125rem] w-1/2" />
                    </div>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-44" />
                  </div>
                  <Separator className="last:hidden" />
                </Fragment>
              ))
            : null}
          {queryAddressList.isSuccess ? (
            <>
              <RadioGroup
                value={deliveryAddress._id}
                onValueChange={(value) => {
                  const selectedAddress = queryAddressList.data.payload.data.find((address) => address._id === value)
                  if (selectedAddress) {
                    setDeliveryAddress(selectedAddress)
                  }
                }}
                className="gap-0"
              >
                {[...queryAddressList.data.payload.data]
                  .sort((a, b) => Number(b.default) - Number(a.default))
                  .map((address) => (
                    <Fragment key={address._id}>
                      <Label className="flex gap-2 py-4">
                        <RadioGroupItem value={address._id} className="mt-0.5 hidden xs:block" />
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value={address._id} className="xs:hidden" />
                              <p className="line-clamp-1 text-sm font-semibold">{address.fullName}</p>
                              {address.default ? (
                                <div className="hidden shrink-0 items-center gap-0.5 text-highlight xs:flex">
                                  <CheckCircle2Icon className="size-4" />
                                  <span className="mt-px text-xs">Mặc định</span>
                                </div>
                              ) : null}
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-auto p-0.5 text-highlight/75 hover:text-highlight [&_svg]:size-4"
                              onClick={() => {
                                setAddressToUpdate(address)
                                setMode('update')
                              }}
                            >
                              <Svgr icon={PencilSquareIcon} />
                            </Button>
                          </div>
                          <p className="text-sm">
                            <span className="font-medium text-muted-foreground">Địa chỉ: </span>
                            {address.address}, {address.district}, {address.province}
                          </p>
                          <p className="line-clamp-1 break-all text-sm">
                            <span className="font-medium text-muted-foreground">Điện thoại: </span>
                            {formatPhoneNumber(address.phone)}
                          </p>
                          <p className="line-clamp-1 break-all text-sm">
                            <span className="font-medium text-muted-foreground">Email: </span>
                            {address.email}
                          </p>
                          {address.default ? (
                            <p className="flex w-fit items-center border border-highlight px-1 py-0.5 text-xs text-highlight xs:hidden">
                              Mặc định
                            </p>
                          ) : null}
                        </div>
                      </Label>
                      <Separator className="last:hidden" />
                    </Fragment>
                  ))}
              </RadioGroup>
              <div className="text-center">
                <Button
                  variant="outline"
                  className="mb-6 mt-4 gap-1 px-3 py-0 [&_svg]:size-5"
                  onClick={() => setMode('create')}
                >
                  <PlusIcon />
                  Thêm địa chỉ mới
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </ScrollArea>

      <DialogFooter className="flex-row justify-end gap-1 border-t border-t-border px-3 pt-4 shadow-custom-up sm:px-6">
        <DialogClose asChild>
          <Button size="sm" variant="outline" className="h-9 min-w-24">
            Huỷ
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            size="sm"
            className="h-9 min-w-24"
            onClick={() => {
              if (
                deliveryAddress._id !== inititalDeliveryAddress._id ||
                (deliveryAddress._id === inititalDeliveryAddress._id &&
                  deliveryAddress.default !== inititalDeliveryAddress.default)
              ) {
                setInititalDeliveryAddress(deliveryAddress)
              }
            }}
          >
            Xác nhận
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}
