export const CHECKOUT_KEY = {
  PRE_CHECKOUT: 'preCheckout',
  CHECKOUT: 'checkout',
} as const

export const CHECKOUT_PAYMENT_METHOD = [
  {
    value: 'money',
    label: 'Thanh toán khi nhận hàng',
  },
  {
    value: 'card',
    label: 'Thẻ tín dụng/ghi nợ',
  },
] as const
