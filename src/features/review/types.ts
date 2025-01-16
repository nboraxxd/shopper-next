import { Paginate } from '@/shared/types'

type Review = {
  _id: string
  orderId: string
  productId: number
  senderId: string
  createdAt: number
  content: string
  star: number
  user: {
    _id: string
    name: string
    avatar: string | null
  }
}

export type ReviewsResponse = {
  data: Review[]
  paginate: Paginate
}
