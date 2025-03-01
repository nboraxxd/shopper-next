export type PromotionServerItem = {
  _id: string
  code: string
  title: string
  type: 'discount' | 'shipping'
  conditions: string[]
  status: 'active' | 'inactive' | 'expired' | 'upcoming'
  image: string
  iat: string
  exp: string
}

export type PromotionsParameters = {
  limit?: string
  type?: 'discount' | 'shipping'
}

export type PromotionsResponseFromServer = {
  data: PromotionServerItem[]
}

export type GetPromotionDetailResponse = {
  data: {
    code: string
    title: string
    description: string
    value: number
  }
}
