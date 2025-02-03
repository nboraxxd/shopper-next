import http from '@/shared/utils/http'

import envVariables from '@/shared/schemas/env-variables.schema'
import { AddNewAddressResponse, DistrictsResponseFromServer, WardsResponseFromServer } from '@/features/address/types'
import { AddNewAddressReqBody } from '@/features/address/schemas'

const SERVER_PREFIX = '/api/address'
const BACKEND_PREFIX = '/users/address'

export const addressClientApi = {
  getDistrictsFromServer: (provinceCode: number) =>
    http.get<DistrictsResponseFromServer>(`${SERVER_PREFIX}/districts/${provinceCode}`, {
      baseUrl: envVariables.NEXT_PUBLIC_URL,
    }),

  getWardsFromServer: (districtCode: number) =>
    http.get<WardsResponseFromServer>(`${SERVER_PREFIX}/wards/${districtCode}`, {
      baseUrl: envVariables.NEXT_PUBLIC_URL,
    }),

  addNewAddressToBackend: (body: AddNewAddressReqBody) => http.post<AddNewAddressResponse>(BACKEND_PREFIX, body),
}
