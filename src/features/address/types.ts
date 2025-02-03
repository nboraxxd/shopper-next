type Address = {
  _id: string
  phone: string
  email: string
  address: string
  province: string
  district: string
  fullName: string
  default: boolean
  user_id: string
}

export type AddressesResponse = {
  data: Address[]
}

export type AddNewAddressResponse = {
  data: Address
  insertCount: number
}

type DivisionType =
  | 'tỉnh'
  | 'thành phố trung ương'
  | 'huyện'
  | 'quận'
  | 'thành phố'
  | 'thị xã'
  | 'xã'
  | 'thị trấn'
  | 'phường'

export type RegionCommonInfo = {
  code: number
  codename: string
  division_type: DivisionType
  name: string
}

export type Province = RegionCommonInfo & { phone_code: number }

export type ProvincesResponseFromBackend = Province[]

export type District = RegionCommonInfo & { province_code: number }

export type DistrictsResponseFromBackend = Province & { districts: District[] }

export type DistrictsResponseFromServer = { data: District[] }

export type Ward = RegionCommonInfo & { district_code: number }

export type WardsResponseFromBackend = District & { wards: Ward[] }

export type WardsResponseFromServer = { data: Ward[] }
