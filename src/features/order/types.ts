import { ProductBase } from '@/features/product/types'
import { ORDER_STATUS } from '@/features/order/constants'
import { ShippingMethodValue } from '@/features/shipping/types'
import { CheckoutPaymentMethod } from '@/features/checkout/types'

// This type only used in internal Order type
type Shipping = {
  fullName: string
  phone: string
  email: string
  province: string
  district: string
  address: string
  shippingMethod: ShippingMethodValue
  shippingPrice: number
}

type ListItem = {
  productId: number
  quantity: number
  product: ProductBase
  price: number
  review: string | null
}

type Payment = {
  paymentMethod: CheckoutPaymentMethod
}

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS]

export type OrderCountResponse = {
  count: number
}

export type Order = {
  _id: string
  total: number
  subTotal: number
  tax: number
  promotion: string | null
  shipping: Shipping
  totalQuantity: number
  viewCartTotal: number
  listItems: ListItem[]
  user: string
  payment: Payment
  note: string
  type: string
  status: OrderStatus
  createdAt: number
  shippingDate?: number
  confirmDate?: number
  finishedDate?: number
}
