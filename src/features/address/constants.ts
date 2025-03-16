export const ADDRESS_KEY = {
  PROVINCES: 'provinces',
  DISTRICTS: 'districts',
  WARDS: 'wards',
  ADDRESS_LIST: 'addressList',
  DEFAULT_ADDRESS: 'defaultAddress',
} as const

export const ADDRESS_ERROR_MESSAGES = {
  PROVINCE_REQUIRED: 'Tỉnh/thành phố không được để trống',
  INVALID_PROVINCE: 'Tỉnh/thành phố không hợp lệ',
  DISTRICT_REQUIRED: 'Quận/huyện không được để trống',
  INVALID_DISTRICT: 'Quận/huyện không hợp lệ',
  WARD_REQUIRED: 'Phường/xã không được để trống',
  INVALID_WARD: 'Phường/xã không hợp lệ',
  ADDRESS_REQUIRED: 'Địa chỉ không được để trống',
} as const
