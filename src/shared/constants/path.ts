const ACCOUNT = '/tai-khoan'

const PATH = {
  HOME: '/',
  LOGIN: '/dang-nhap',
  REGISTER: '/dang-ky',
  REFRESH_TOKEN: '/refresh-token',
  LOGOUT: '/dang-xuat',
  VERIFY_ACCOUNT: '/xac-thuc-tai-khoan',
  RESEND_VERIFICATION_EMAIL: '/gui-lai-email-xac-thuc',
  FORGOT_PASSWORD: '/quen-mat-khau',
  RESET_PASSWORD: '/dat-lai-mat-khau',
  PRODUCTS: '/san-pham',
  CART: '/gio-hang',
  CHECKOUT: '/thanh-toan',
  SUPPORT: '/ho-tro',

  ACCOUNT,
  PROFILE: `${ACCOUNT}/ho-so`,
  PAYMENT: `${ACCOUNT}/the-thanh-toan`,
  ADD_PAYMENT: `${ACCOUNT}/the-thanh-toan/them-moi`,
  ADDRESS: `${ACCOUNT}/dia-chi`,
  ADD_ADDRESS: `${ACCOUNT}/dia-chi/them-moi`,
  UPDATE_ADDRESS: `${ACCOUNT}/dia-chi/cap-nhat`,
  WISHLIST: `${ACCOUNT}/san-pham-yeu-thich`,
  ORDER_HISTORY: `${ACCOUNT}/don-mua`,
} as const

export default PATH
