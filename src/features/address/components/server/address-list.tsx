import lowerFirst from 'lodash/lowerFirst'

import addressServerApi from '@/features/address/api/server'
import { AddressListResponse } from '@/features/address/types'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { AddressItem } from '@/features/address/components/client'
import { SmileStarIcon } from '@/shared/components/icons'

export async function AddressList({ accessToken }: { accessToken: string }) {
  let addressList: AddressListResponse['data'] | null = null

  try {
    const addressListResponse = await addressServerApi.getAddressesFromBackend({ accessToken })

    addressList = addressListResponse.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  if (!addressList) return null

  return addressList.length > 0 ? (
    <ul className="mt-3 space-y-3 md:mt-5 md:space-y-4">
      {addressList
        .sort((a, b) => Number(b.default) - Number(a.default))
        .map((item) => (
          <AddressItem
            key={item._id}
            id={item._id}
            fullName={item.fullName}
            address={`${item.address}, ${lowerFirst(item.district)}, ${lowerFirst(item.province)}`}
            phone={item.phone}
            email={item.email}
            isDefault={item.default}
          />
        ))}
    </ul>
  ) : (
    <div className="flex h-96 flex-col items-center justify-center gap-2">
      <SmileStarIcon />
      <p className="text-center text-sm leading-relaxed sm:text-base">
        Chưa có địa chỉ nào, thêm ngay <br /> để mua sắm dễ dàng hơn
      </p>
    </div>
  )
}

export function AddressListSkeleton() {
  return (
    <div className="mt-3 space-y-3 md:mt-5 md:space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-[8.875rem] rounded-xl md:h-[8.125rem]" />
      ))}
    </div>
  )
}
