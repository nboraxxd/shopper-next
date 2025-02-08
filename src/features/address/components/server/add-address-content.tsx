import addressServerApi from '@/features/address/api/server'
import { AddressForm } from '@/features/address/components/client'
import { ProvincesResponseFromBackend } from '@/features/address/types'

export default async function AddAddressContent() {
  let provinces: ProvincesResponseFromBackend | null = null

  try {
    const provicesResponse = await addressServerApi.getProvincesFromVietnamProvinces()

    provinces = provicesResponse.payload
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return provinces ? <AddressForm provinces={provinces} /> : null
}
