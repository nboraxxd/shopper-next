export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'

export const AUTH_MESSAGES = {
  NAME_IS_REQUIRED: 'Tên không được để trống',
  EMAIL_INVALID: 'Email không hợp lệ',
  PASSWORD_INVALID: 'Mật khẩu phải từ 6 đến 32 ký tự',
  PASSWORD_NOT_MATCH: 'Mật khẩu không khớp',
} as const

export const AUTH_KEY = {
  USER: 'user',
}

export const AUTH_INPUT_CLASSNAME =
  'h-full border-none p-0 text-base font-medium shadow-none placeholder:text-auth-content-placeholder focus-visible:ring-0 sm:text-lg'