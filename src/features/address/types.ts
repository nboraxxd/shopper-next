type Address = {
  _id: string
  phone: string
  email: string
  address: string
  province: string
  district: string
  fullName: string
  default: boolean
  user_id: string
}

export type AddressesResponse = {
  data: Address[]
}

export type AddPaymentResponse = {
  data: Address
  insertCount: number
}
