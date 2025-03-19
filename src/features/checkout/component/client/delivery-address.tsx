'use client'

import { useEffect } from 'react'
import lowerFirst from 'lodash/lowerFirst'
import { CheckCircle2Icon } from 'lucide-react'

import { formatPhoneNumber } from '@/shared/utils'
import { useQueryDefaultAddress } from '@/features/address/hooks'
import { useCheckoutAddressStore } from '@/features/checkout/hooks'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { AddNewAddressDialog, AddressDialog } from '@/features/checkout/component/client'

export default function DeliveryAddress() {
  const queryDefaultAddress = useQueryDefaultAddress()

  const { checkoutAddress, setCheckoutAddress } = useCheckoutAddressStore()

  useEffect(() => {
    if (queryDefaultAddress.isSuccess && queryDefaultAddress.data.payload.data[0]) {
      setCheckoutAddress(queryDefaultAddress.data.payload.data[0])
    }
  }, [queryDefaultAddress.isSuccess, queryDefaultAddress.data?.payload.data, setCheckoutAddress])

  if (queryDefaultAddress.isLoading)
    return (
      <div className="space-y-1.5">
        <Skeleton className="h-[1.125rem] w-1/4 md:hidden" />
        <Skeleton className="h-[1.375rem] w-1/2 sm:w-48" />
        <div>
          <Skeleton className="h-[1.125rem] w-full lg:h-5" />
          <Skeleton className="mt-1 h-[1.125rem] w-full xs:w-1/2 lg:hidden" />
          <Skeleton className="mt-1 h-[1.125rem] w-1/2 xs:hidden" />
        </div>
        <Skeleton className="h-5 w-1/3 lg:w-96" />
        <Skeleton className="h-5 w-1/3 lg:hidden" />
      </div>
    )

  return queryDefaultAddress.isSuccess ? (
    checkoutAddress ? (
      <>
        <AddressDialog />
        <div className="space-y-1.5">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
            <p className="text-[0.9375rem] font-semibold">{checkoutAddress.fullName}</p>
            {checkoutAddress.default ? (
              <div className="flex shrink-0 items-center gap-0.5 text-highlight">
                <CheckCircle2Icon className="size-4" />
                <span className="mt-0.5 text-xs">Mặc định</span>
              </div>
            ) : null}
          </div>
          <p className="text-sm">
            <span className="font-medium text-muted-foreground">Địa chỉ: </span>
            {checkoutAddress.address}, {lowerFirst(checkoutAddress.district)}, {lowerFirst(checkoutAddress.province)}
          </p>
          <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:gap-6 xl:gap-8">
            <p className="line-clamp-1 shrink-0 break-all text-sm">
              <span className="font-medium text-muted-foreground">Điện thoại: </span>{' '}
              {formatPhoneNumber(checkoutAddress.phone)}
            </p>
            <p className="line-clamp-1 break-all text-sm">
              <span className="font-medium text-muted-foreground">Email: </span>
              {checkoutAddress.email}
            </p>
          </div>
        </div>
      </>
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
  ) : null
}
