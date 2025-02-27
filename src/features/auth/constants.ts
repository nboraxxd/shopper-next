export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'
export const REMOVE_TOKENS_EVENT = 'removeTokensFromLocalStorage'

export const AUTH_MESSAGES = {
  NAME_IS_REQUIRED: 'Tên không được để trống',
  EMAIL_INVALID: 'Email không hợp lệ',
  PASSWORD_IS_REQUIRED: 'Mật khẩu không được để trống',
  PASSWORD_INVALID: 'Mật khẩu phải từ 6 đến 32 ký tự',
  PASSWORD_NOT_MATCH: 'Mật khẩu không khớp',
  CODE_IS_REQUIRED: 'Không tìm thấy mã xác thực',

  PASSWORD_RESET_SUCCESS: 'Mật khẩu mới của bạn đã được tạo thành công. Vui lòng đăng nhập lại.',
} as const
