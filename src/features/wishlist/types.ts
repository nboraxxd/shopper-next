import { Paginate } from '@/shared/types'
import { Product } from '@/features/product/types'

export type WishlistResponse = {
  data: Product[]
  paginate: Paginate
}
