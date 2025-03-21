import { Address } from '@/features/address/types'
import { CartItem } from '@/features/cart/types'
import { CHECKOUT_PAYMENT_METHOD } from '@/features/checkout/constants'
import { ShippingMethodValue } from '@/features/shipping/types'

export type DialogMode = 'list' | 'update' | 'create'

export type CheckoutPaymentMethod = (typeof CHECKOUT_PAYMENT_METHOD)[number]['value']

export type PreCheckoutReqBody = {
  listItems: Array<number>
  shippingMethod?: ShippingMethodValue
  promotionCode?: [string]
}

export type PreCheckoutResponse = {
  data: {
    total: number // tổng giá trị đơn hàng sau trừ khuyến mãi và cộng thuế
    subTotal: number // tổng giá trị sản phẩm
    tax: number
    promotion: {
      code: string
      discount: number
      description: string
      title: string
    } | null
    shipping: {
      shippingMethod: ShippingMethodValue
      shippingPrice: number
    } | null
    totalQuantity: number
    viewCartTotal: number
    listItems: (CartItem & { price: number })[]
  }
}

export type CheckoutReqBody = {
  listItems: Array<number>
  payment: {
    paymentMethod: CheckoutPaymentMethod
  }
  shippingMethod: ShippingMethodValue
  shipping: Omit<Address, 'user_id' | '_id' | 'default'>
  promotionCode?: [string]
  note?: string
}
