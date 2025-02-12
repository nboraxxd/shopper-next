import { ProductBase } from '@/features/product/types'

type ItemInCart = {
  productId: number
  quantity: number
  product: ProductBase
}

export type GetCartResponse = {
  data: {
    subTotal: number
    totalQuantity: number
    listItems: ItemInCart[]
  }
}

export type UpdateQtyItemInCartResponse = {
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
