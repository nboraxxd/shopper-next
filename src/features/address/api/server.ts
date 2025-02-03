import ms from 'ms'

import {
  AddressesResponse,
  DistrictsResponseFromBackend,
  ProvincesResponseFromBackend,
  WardsResponseFromBackend,
} from '@/features/address/types'
import http from '@/shared/utils/http'
import { ADDRESS_KEY } from '@/features/address/constants'
import envVariables from '@/shared/schemas/env-variables.schema'

const PREFIX = '/users/address'

const addressServerApi = {
  getAddressesFromBackend: ({ accessToken, isDefault = false }: { accessToken: string; isDefault?: boolean }) =>
    http.get<AddressesResponse>(PREFIX, {
      params: { default: `${isDefault}` },
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  getProvincesFromVietnamProvinces: () =>
    http.get<ProvincesResponseFromBackend>('/p', {
      baseUrl: envVariables.NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT,
      cache: 'force-cache',
      next: { revalidate: ms('7d'), tags: [ADDRESS_KEY.PROVINCES] },
    }),

  getDistrictsFromVietnamProvinces: (provinceCode: number) =>
    http.get<DistrictsResponseFromBackend>(`/p/${provinceCode}`, {
      baseUrl: envVariables.NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT,
      cache: 'force-cache',
      next: { revalidate: ms('7d'), tags: [ADDRESS_KEY.DISTRICTS] },
      params: { depth: '2' },
    }),

  getWardsFromVietnamProvinces: (districtCode: number) =>
    http.get<WardsResponseFromBackend>(`/d/${districtCode}`, {
      baseUrl: envVariables.NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT,
      cache: 'force-cache',
      next: { revalidate: ms('7d'), tags: [ADDRESS_KEY.WARDS] },
      params: { depth: '2' },
    }),
}

export default addressServerApi
