import { AddressesResponse } from '@/features/address/types'
import http from '@/shared/utils/http'

const PREFIX = '/users/address'

const addressServerApi = {
  getAddressesFromBackend: (accessToken: string, isDefault?: boolean) =>
    http.get<AddressesResponse>(PREFIX, {
      params: { default: `${isDefault}` },
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
}

export default addressServerApi
