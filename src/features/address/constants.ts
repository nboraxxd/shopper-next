export const ADDRESS_KEY = {
  PROVINCES: 'provinces',
  DISTRICTS: 'districts',
  WARDS: 'wards',
} as const

export const ADDRESS_ERROR_MESSAGES = {
  PROVINCE_REQUIRED: 'Tỉnh/thành phố không được để trống',
  DISTRICT_REQUIRED: 'Quận/huyện không được để trống',
  WARD_REQUIRED: 'Phường/xã không được để trống',
  ADDRESS_REQUIRED: 'Địa chỉ không được để trống',
} as const
