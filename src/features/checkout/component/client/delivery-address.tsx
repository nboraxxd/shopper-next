'use client'

import { useState } from 'react'
import lowerFirst from 'lodash/lowerFirst'
import { CheckCircle2Icon } from 'lucide-react'

import { formatPhoneNumber } from '@/shared/utils'
import { Address } from '@/features/address/types'

import { AddNewAddressDialog, AddressDialog } from '@/features/checkout/component/client'

export default function DeliveryAddress({ defaultAddress }: { defaultAddress?: Address }) {
  return defaultAddress ? (
    <DeliveryAddressDisplay defaultAddress={defaultAddress} />
  ) : (
    <div>
      <p className="font-medium text-muted-foreground">
        Bạn chưa có địa chỉ nhận hàng nào.{' '}
        <span className="text-highlight">
          <AddNewAddressDialog />
        </span>
      </p>
    </div>
  )
}

function DeliveryAddressDisplay({ defaultAddress }: { defaultAddress: Address }) {
  const [deliveryAddress, setDeliveryAddress] = useState(defaultAddress)

  return (
    <>
      <AddressDialog inititalDeliveryAddress={deliveryAddress} setInititalDeliveryAddress={setDeliveryAddress} />
      <div className="space-y-1.5">
        <div className="flex flex-col-reverse gap-1.5 md:flex-row md:items-center md:gap-3">
          <p className="text-[0.9375rem] font-semibold">{deliveryAddress.fullName}</p>
          {deliveryAddress.default ? (
            <div className="flex shrink-0 items-center gap-0.5 text-highlight">
              <CheckCircle2Icon className="size-4" />
              <span className="mt-0.5 text-xs">Mặc định</span>
            </div>
          ) : null}
        </div>
        <p className="text-sm">
          <span className="font-medium text-muted-foreground">Địa chỉ: </span>
          {deliveryAddress.address}, {lowerFirst(deliveryAddress.district)}, {lowerFirst(deliveryAddress.province)}
        </p>
        <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:gap-6 xl:gap-8">
          <p className="line-clamp-1 shrink-0 break-all text-sm">
            <span className="font-medium text-muted-foreground">Điện thoại: </span>{' '}
            {formatPhoneNumber(deliveryAddress.phone)}
          </p>
          <p className="line-clamp-1 break-all text-sm">
            <span className="font-medium text-muted-foreground">Email: </span>
            {deliveryAddress.email}
          </p>
        </div>
      </div>
    </>
  )
}
