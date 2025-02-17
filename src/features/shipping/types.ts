import { SHIPPING_METHODS } from '@/features/shipping/constants'

export type ShippingMethodKey = keyof typeof SHIPPING_METHODS

export type ShippingMethodValue = (typeof SHIPPING_METHODS)[keyof typeof SHIPPING_METHODS]
