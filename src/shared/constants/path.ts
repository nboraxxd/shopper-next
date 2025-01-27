const ACCOUNT = '/tai-khoan'

const PATH = {
  HOME: '/',
  LOGIN: '/dang-nhap',
  REGISTER: '/dang-ky',
  FORGOT_PASSWORD: '/quen-mat-khau',
  PRODUCTS: '/san-pham',
  CART: '/gio-hang',
  RESEND_VERIFY_EMAIL: '/gui-lai-email-xac-thuc',
  SUPPORT: '/ho-tro',

  ACCOUNT,
  PROFILE: `${ACCOUNT}/ho-so`,
  PAYMENT: `${ACCOUNT}/the-thanh-toan`,
  ADD_PAYMENT: `${ACCOUNT}/the-thanh-toan/them-moi`,
  ADDRESS: `${ACCOUNT}/dia-chi`,
  ADD_ADDRESS: `${ACCOUNT}/dia-chi/them-moi`,
  WISHLIST: `${ACCOUNT}/san-pham-yeu-thich`,
  PURCHASE: `${ACCOUNT}/don-mua`,
} as const

export default PATH
