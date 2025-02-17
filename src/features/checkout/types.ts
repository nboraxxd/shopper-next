import { CartItem } from '@/features/cart/types'
import { ShippingMethodValue } from '@/features/shipping/types'

export type PreCheckoutReqBody = {
  listItems: Array<number>
  shippingMethod?: string
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
    listItems: CartItem & { price: number }[]
  }
}
