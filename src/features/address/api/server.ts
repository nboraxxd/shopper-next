import ms from 'ms'

import {
  AddressDetailResponse,
  AddressListResponse,
  DefaultAddressResponse,
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
    http.get<AddressListResponse>(PREFIX, {
      params: { default: `${isDefault}` },
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  getDefaultAddressFromBackend: ({ accessToken }: { accessToken: string }) =>
    http.get<DefaultAddressResponse>(PREFIX, {
      params: { default: 'true' },
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  getAddressDetailFromBackend: ({ accessToken, id }: { accessToken: string; id: string }) =>
    http.get<AddressDetailResponse>(`${PREFIX}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  getProvincesFromVietnamProvinces: () =>
    http.get<ProvincesResponseFromBackend>('/p', {
      baseUrl: envVariables.NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT,
      cache: 'force-cache',
      next: { revalidate: ms('1d'), tags: [ADDRESS_KEY.PROVINCES] },
    }),

  getDistrictsFromVietnamProvinces: (provinceCode: number) =>
    http.get<DistrictsResponseFromBackend>(`/p/${provinceCode}`, {
      baseUrl: envVariables.NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT,
      cache: 'force-cache',
      next: { revalidate: ms('1d'), tags: [ADDRESS_KEY.DISTRICTS] },
      params: { depth: '2' },
    }),

  getWardsFromVietnamProvinces: (districtCode: number) =>
    http.get<WardsResponseFromBackend>(`/d/${districtCode}`, {
      baseUrl: envVariables.NEXT_PUBLIC_VIETNAM_PROVINCES_API_ENDPOINT,
      cache: 'force-cache',
      next: { revalidate: ms('1d'), tags: [ADDRESS_KEY.WARDS] },
      params: { depth: '2' },
    }),
}

export default addressServerApi
