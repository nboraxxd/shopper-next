import PATH from '@/shared/constants/path'

import addressServerApi from '@/features/address/api/server'
import { ProvincesResponseFromBackend } from '@/features/address/types'

import { AddressForm } from '@/features/address/components/client'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'

export default async function AddNewAddressPage() {
  let provinces: ProvincesResponseFromBackend | null = null

  try {
    const provicesResponse = await addressServerApi.getProvincesFromVietnamProvinces()

    provinces = provicesResponse.payload
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return (
    <AccountSectionWrapper>
      <AccountHeader prevPath={PATH.ADDRESS}>Thêm địa chỉ mới</AccountHeader>
      {provinces ? <AddressForm provinces={provinces} /> : null}
    </AccountSectionWrapper>
  )
}
