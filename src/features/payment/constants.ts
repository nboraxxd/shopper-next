import { CreditCardIcon, PayPalIcon } from '@/shared/components/icons'

export const PAYMENT_CARD_TYPE = [
  { icon: CreditCardIcon, label: 'Thẻ tín dụng', value: 'card' },
  { icon: PayPalIcon, label: 'PayPal', value: 'paypall' },
] as const

export const PAYMENT_KEY = {} as const

export const PAYMENT_ERROR_MESSAGES = {
  CARD_NUMBER_REQUIRED: 'Vui lòng nhập số thẻ',
  CARD_NUMBER_INVALID: 'Số thẻ không hợp lệ',

  EXPIRY_DATE_REQUIRED: 'Vui lòng nhập ngày hết hạn',
  EXPIRY_DATE_INVALID: 'Ngày hết hạn không hợp lệ',

  CVV_REQUIRED: 'Vui lòng nhập CVV',
  CVV_INVALID: 'CVV không hợp lệ',
  EXPIRY_DATE_IN_FUTURE: 'Ngày hết hạn phải ở tương lai',

  TYPE_INVALID: 'Vui lòng chọn loại thẻ',
} as const
