type Payment = {
  _id: string
  cvv: string
  cardName: string
  cardNumber: string
  expired: string
  type: 'card' | 'paypall'
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
