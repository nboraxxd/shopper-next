import { ProductBase } from '@/features/product/types'

export type CartItem = {
  productId: number
  quantity: number
  product: ProductBase
}

export type GetCartListResponse = {
  data: {
    subTotal: number
    totalQuantity: number
    listItems: CartItem[]
  }
}

export type UpdateCartItemQtyReq = {
  productId: number
  quantity: number
}

export type UpdateCartItemQtyResponse = {
  data: {
    listItems: {
      productId: number
      quantity: number
    }[]
    status: string
    totalQuantity: number
    type: string
    user: string
    _id: string
  }
  updateCount: number
}

export type RemoveCartItemResponse = {
  deleteCount: number
}
