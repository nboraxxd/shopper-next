export const GENDERS = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
] as const

export const PROFILE_KEY = {
  PROFILE: 'profile',
} as const

export const PROFILE_ERROR_MESSAGES = {
  PHONE_NUMBER_REQUIRED: 'Số điện thoại không được để trống',
  INVALID_PHONE_NUMBER: 'Số điện thoại không đúng định dạng',
  INVALID_FB_LINK: 'Link facebook không hợp lệ',
  INVALID_GENDER: 'Giới tính không hợp lệ',
  INVALID_BIRTHDAY: 'Ngày sinh không hợp lệ',
} as const
