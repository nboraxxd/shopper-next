import lowerFirst from 'lodash/lowerFirst'

import addressServerApi from '@/features/address/api/server'
import { AddressListResponse } from '@/features/address/types'

import { SmileStarIcon } from '@/shared/components/icons'
import { AddressItem } from '@/features/address/components/client'

export default async function AddressContent({ accessToken }: { accessToken: string }) {
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
    addressList
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
      ))
  ) : (
    <div className="flex h-96 flex-col items-center justify-center gap-2">
      <SmileStarIcon />
      <p className="text-center text-sm leading-relaxed sm:text-base">
        Chưa có địa chỉ nào, thêm ngay <br /> để mua sắm dễ dàng hơn
      </p>
    </div>
  )
}
