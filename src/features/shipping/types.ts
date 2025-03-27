import { SHIPPING_METHODS } from '@/features/shipping/constants'

export type ShippingMethodValue = (typeof SHIPPING_METHODS)[keyof typeof SHIPPING_METHODS]

export type ShippingMethodItem = {
  price: number
  title: string
  description: string
  code: ShippingMethodValue
}

export type ShippingMethodResponse = {
  data: ShippingMethodItem[]
}
