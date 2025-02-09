'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import PATH from '@/shared/constants/path'
import checkAndRefreshToken from '@/shared/utils/check-and-refresh-token'
import { getRefreshTokenFromLocalStorage } from '@/shared/utils/local-storage'

import { ShopperIcon } from '@/shared/components/icons'
import { useAuthStore } from '@/features/auth/auth-store'

export default function RefreshTokenPage() {
  return (
    <Suspense fallback={<RefreshTokenView />}>
      <RefreshTokenContent />
    </Suspense>
  )
}

function RefreshTokenContent() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next')
  const refreshTokenFromUrl = searchParams.get('refreshToken')

  const authState = useAuthStore((state) => state.authState)
  const setAuthState = useAuthStore((state) => state.setAuthState)

  useEffect(() => {
    if (refreshTokenFromUrl && refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) {
      setAuthState('loading')

      checkAndRefreshToken({
        onSuccess: () => {
          console.log('🚀 super first RefreshToken')
          setAuthState('authenticated')
          router.push(nextPath || PATH.HOME)
        },
        onError: () => router.push(PATH.HOME),
      })
    } else {
      router.push(PATH.HOME)
    }
  }, [nextPath, refreshTokenFromUrl, router, setAuthState])

  useEffect(() => {
    console.log('🔥 ~ authState:', authState)
  }, [authState])

  return <RefreshTokenView />
}

function RefreshTokenView() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 flex items-center justify-center shadow-section">
        <div className="flex items-center gap-2 lg:gap-3.5">
          <ShopperIcon className="size-8 text-secondary-blue lg:size-12" />
          <span className="text-xl font-bold lg:text-3xl">Shopper</span>
        </div>
      </div>
    </div>
  )
}
