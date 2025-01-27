import { ProductBase } from '@/features/product/types'

// TODO: Điều chỉnh lại `shippingMethod` từ 'giao-hang-nhanh' | 'tieu-chuan' | 'mien-phi' thành constant
type Shipping = {
  fullName: string
  phone: string
  email: string
  province: string
  district: string
  address: string
  shippingMethod: 'giao-hang-nhanh' | 'tieu-chuan' | 'mien-phi'
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
  paymentMethod: 'money' | 'card'
}

export type OrderStatus = 'pending' | 'shipping' | 'confirm' | 'finished' | 'cancel'

export type OrderCount = {
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
