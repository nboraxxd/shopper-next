import { notFound } from 'next/navigation'
import upperFirst from 'lodash/upperFirst'

import {
  AddressDetailResponse,
  DistrictsResponseFromBackend,
  ProvincesResponseFromBackend,
  WardsResponseFromBackend,
} from '@/features/address/types'
import addressServerApi from '@/features/address/api/server'

import { UpdateAddressForm } from '@/features/address/components/client'

export default async function UpdateAddressContent({ id, accessToken }: { id: string; accessToken: string }) {
  let addressDetail: AddressDetailResponse['data'] | undefined = undefined

  let provinces: ProvincesResponseFromBackend | undefined = undefined
  let initialDistricts: DistrictsResponseFromBackend['districts'] | undefined = undefined
  let initialWards: WardsResponseFromBackend['wards'] | undefined = undefined

  let provinceCode: number | undefined = undefined
  let districtCode: number | undefined = undefined
  let wardCode: number | undefined = undefined

  try {
    const [provicesResponse, addressDetailResponse] = await Promise.all([
      addressServerApi.getProvincesFromVietnamProvinces(),
      addressServerApi.getAddressDetailFromBackend({ accessToken, id }),
    ])

    provinces = provicesResponse.payload
    addressDetail = addressDetailResponse.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  if (!addressDetail) return notFound()

  const wardName =
    addressDetail.address.split(', ').length > 1 ? upperFirst(addressDetail.address.split(', ').pop()) : undefined

  const { province: provinceName, district: districtName } = addressDetail

  try {
    provinceCode = provinces?.find((province) => province.name === provinceName)?.code

    if (provinceCode) {
      const districtsResponse = await addressServerApi.getDistrictsFromVietnamProvinces(provinceCode)

      initialDistricts = districtsResponse.payload.districts

      districtCode = initialDistricts.find((district) => district.name === districtName)?.code
    }

    if (provinceCode && districtCode) {
      const wardsResponse = await addressServerApi.getWardsFromVietnamProvinces(districtCode)

      initialWards = wardsResponse.payload.wards

      wardCode = initialWards.find((ward) => ward.name === wardName)?.code
    }
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return provinces ? (
    <UpdateAddressForm
      provinces={provinces}
      initialDistricts={initialDistricts}
      initialWards={initialWards}
      currentAddress={addressDetail}
      currentProvince={{ code: provinceCode, name: provinceName }}
      currentDistrict={{ code: districtCode, name: districtName }}
      currentWard={{ code: wardCode, name: wardName }}
    />
  ) : null
}
