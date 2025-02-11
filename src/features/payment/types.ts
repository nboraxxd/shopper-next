export type PaymentCardType = 'card' | 'paypall'

export type PaymentCard = {
  _id: string
  cvv: string
  cardName: string
  cardNumber: string
  expired: string
  type: PaymentCardType
  default: boolean
  user_id: string
}

export type PaymentCardListResponse = {
  data: PaymentCard[]
}

export type AddPaymentCardResponse = {
  data: PaymentCard
  insertCount: number
}

export type SetDefaultPaymentCardResponse = {
  data: PaymentCard
  updateCount: number
}
