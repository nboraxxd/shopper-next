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
