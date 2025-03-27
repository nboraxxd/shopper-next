export const CHECKOUT_KEY = {
  PRE_CHECKOUT: 'preCheckout',
  CHECKOUT: 'checkout',
} as const

export const CHECKOUT_PAYMENT_METHOD = {
  MONEY: 'money',
  CARD: 'card',
} as const

export const CHECKOUT_PAYMENT_TABS = [
  {
    value: CHECKOUT_PAYMENT_METHOD.MONEY,
    label: 'Thanh toán khi nhận hàng',
  },
  {
    value: CHECKOUT_PAYMENT_METHOD.CARD,
    label: 'Thẻ tín dụng/ghi nợ',
  },
] as const
