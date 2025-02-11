export const PAYMENT_KEY = {} as const

export const PAYMENT_ERROR_MESSAGES = {
  CARD_NUMBER_INVALID: 'Số thẻ phải từ 12 đến 19 số',
  EXPIRY_DATE_INVALID: 'Ngày hết hạn phải ở dạng MM/YY (01/50)',
  EXPIRY_DATE_IN_FUTURE: 'Ngày hết hạn phải ở tương lai',
  CVV_INVALID: 'CVV phải 3 hoặc 4 số',
  TYPE_INVALID: 'Thẻ thanh toán phải là card hoặc PayPal',
} as const
