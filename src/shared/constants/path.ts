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
  BANK: `${ACCOUNT}/ngan-hang`,
  ADDRESS: `${ACCOUNT}/dia-chi`,
  WISHLIST: `${ACCOUNT}/san-pham-yeu-thich`,
  PURCHASES: `${ACCOUNT}/don-mua`,
} as const

export default PATH
