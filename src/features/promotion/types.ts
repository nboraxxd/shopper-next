export type PromotionServerItem = {
  _id: string
  code: string
  title: string
  type: 'discount' | 'shipping'
  conditions: string[]
  status: 'active' | 'inactive' | 'expired' | 'upcoming'
  iat: string
  exp: string
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
