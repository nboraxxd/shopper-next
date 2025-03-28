import {
  AddNewAddressResponse,
  AddressListResponse,
  DefaultAddressResponse,
  DistrictsResponseFromServer,
  ProvincesResponseFromServer,
  SetDefaultAddressResponse,
  UpdateAddressResponse,
  WardsResponseFromServer,
} from '@/features/address/types'
import http from '@/shared/utils/http'
import { MessageResponse } from '@/shared/types'
import envVariables from '@/shared/schemas/env-variables.schema'
import { AddNewAddressReqBody, UpdateAddressReqBody } from '@/features/address/schemas'

const SERVER_PREFIX = '/api/address'
const BACKEND_PREFIX = '/users/address'

export const addressClientApi = {
  getAddressListFromBackend: () => http.get<AddressListResponse>(BACKEND_PREFIX),

  getDefaultAddressFromBackend: () => http.get<DefaultAddressResponse>(BACKEND_PREFIX, { params: { default: 'true' } }),

  getPronvincesFromServer: () =>
    http.get<ProvincesResponseFromServer>(`${SERVER_PREFIX}/provinces`, { baseUrl: envVariables.NEXT_PUBLIC_URL }),

  getDistrictsFromServer: (provinceCode: number) =>
    http.get<DistrictsResponseFromServer>(`${SERVER_PREFIX}/districts/${provinceCode}`, {
      baseUrl: envVariables.NEXT_PUBLIC_URL,
    }),

  getWardsFromServer: (districtCode: number) =>
    http.get<WardsResponseFromServer>(`${SERVER_PREFIX}/wards/${districtCode}`, {
      baseUrl: envVariables.NEXT_PUBLIC_URL,
    }),

  addNewAddressToBackend: (body: AddNewAddressReqBody) => http.post<AddNewAddressResponse>(BACKEND_PREFIX, body),

  setDefaultAddressToBackend: (addressId: string) =>
    http.patch<SetDefaultAddressResponse>(`${BACKEND_PREFIX}/${addressId}`, { default: true }),

  updateAddressToBackend: (addressId: string, body: UpdateAddressReqBody) =>
    http.patch<UpdateAddressResponse>(`${BACKEND_PREFIX}/${addressId}`, body),

  deleteAddressFromBackend: (addressId: string) => http.delete<MessageResponse>(`${BACKEND_PREFIX}/${addressId}`),
}
