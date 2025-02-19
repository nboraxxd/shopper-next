export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'
export const REMOVE_TOKENS_EVENT = 'removeTokensFromLocalStorage'

export const AUTH_ERROR_MESSAGES = {
  NAME_IS_REQUIRED: 'Tên không được để trống',
  EMAIL_INVALID: 'Email không hợp lệ',
  PASSWORD_INVALID: 'Mật khẩu phải từ 6 đến 32 ký tự',
  PASSWORD_NOT_MATCH: 'Mật khẩu không khớp',
} as const
