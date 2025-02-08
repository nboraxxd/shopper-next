import addressServerApi from '@/features/address/api/server'
import { ProvincesResponseFromBackend } from '@/features/address/types'

import { AddNewAddressForm } from '@/features/address/components/client'

export default async function AddNewAddressContent() {
  let provinces: ProvincesResponseFromBackend | null = null

  try {
    const provicesResponse = await addressServerApi.getProvincesFromVietnamProvinces()

    provinces = provicesResponse.payload
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return provinces ? <AddNewAddressForm provinces={provinces} /> : null
}
