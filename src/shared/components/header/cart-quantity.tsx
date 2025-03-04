'use client'

import { useIsClient } from '@/shared/hooks'
import { useQueryCartList } from '@/features/cart/hooks'
import { useAuthStore } from '@/features/auth/auth-store'

export default function CartQuantity() {
  const isClient = useIsClient()

  const authState = useAuthStore((state) => state.authState)

  if (!isClient || authState === 'loading') return <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

  return authState === 'authenticated' ? <CartQuantityContent /> : null
}

function CartQuantityContent() {
  const queryCartList = useQueryCartList()

  if (queryCartList.isLoading) return <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

  return queryCartList.isSuccess ? (
    <span>
      {queryCartList.data.payload.data.listItems.length > 99
        ? '99+'
        : queryCartList.data.payload.data.listItems.length > 0
          ? queryCartList.data.payload.data.listItems.length.toString().padStart(2, '0')
          : '0'}
    </span>
  ) : null
}
