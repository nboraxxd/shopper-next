export type PaymentType = 'card' | 'paypall'

export type Payment = {
  _id: string
  cvv: string
  cardName: string
  cardNumber: string
  expired: string
  type: PaymentType
  default: boolean
  user_id: string
}

export type PaymentsResponse = {
  data: Payment[]
}

export type AddPaymentResponse = {
  data: Payment
  insertCount: number
}
