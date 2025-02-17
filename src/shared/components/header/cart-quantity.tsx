'use client'

import { LoaderCircleIcon } from 'lucide-react'

import { useIsClient } from '@/shared/hooks'
import { useQueryCartList } from '@/features/cart/hooks'
import { useAuthStore } from '@/features/auth/auth-store'

export default function CartQuantity() {
  const isClient = useIsClient()

  const authState = useAuthStore((state) => state.authState)

  if (!isClient || authState === 'loading') return <CartQuantityLoader />

  return authState === 'authenticated' ? <CartQuantityContent /> : null
}

function CartQuantityContent() {
  const queryCartList = useQueryCartList()

  if (queryCartList.isLoading) return <CartQuantityLoader />

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

function CartQuantityLoader() {
  return <LoaderCircleIcon className="!size-5 animate-spin" />
}
