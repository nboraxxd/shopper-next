'use client'

import { LoaderCircleIcon } from 'lucide-react'

import { useIsClient } from '@/shared/hooks'
import { useAuthStore } from '@/features/auth/auth-store'
import { useQueryCartFromBackend } from '@/features/cart/hooks'

export default function CartQuantity() {
  const isClient = useIsClient()

  const authState = useAuthStore((state) => state.authState)

  if (!isClient || authState === 'loading') return <CartQuantityLoader />

  return authState === 'authenticated' ? <CartQuantityContent /> : null
}

function CartQuantityContent() {
  const queryCartFromBackend = useQueryCartFromBackend()

  if (queryCartFromBackend.isLoading) return <CartQuantityLoader />

  return queryCartFromBackend.isSuccess ? (
    <span>
      {queryCartFromBackend.data.payload.data.totalQuantity > 99
        ? '99+'
        : queryCartFromBackend.data.payload.data.totalQuantity > 0
          ? queryCartFromBackend.data.payload.data.totalQuantity.toString().padStart(2, '0')
          : '0'}
    </span>
  ) : null
}

function CartQuantityLoader() {
  return <LoaderCircleIcon className="!size-5 animate-spin" />
}
