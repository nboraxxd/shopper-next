'use client'

import { useIsClient } from '@/shared/hooks'
import { useAuthStore } from '@/features/auth/auth-store'
import { useQueryCartQuantity } from '@/features/cart/hooks'

export default function CartQuantity() {
  const isClient = useIsClient()

  const authState = useAuthStore((state) => state.authState)

  if (!isClient || authState === 'loading') return <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

  return authState === 'authenticated' ? <CartQuantityContent /> : null
}

function CartQuantityContent() {
  const { isLoading, isSuccess, quantity } = useQueryCartQuantity()

  if (isLoading) return <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

  return isSuccess ? <span>{quantity}</span> : null
}
