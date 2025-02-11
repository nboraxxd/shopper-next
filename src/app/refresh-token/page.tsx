'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import PATH from '@/shared/constants/path'
import checkAndRefreshToken from '@/shared/utils/check-and-refresh-token'
import { getRefreshTokenFromLocalStorage } from '@/shared/utils/local-storage'

import { ShopperIcon } from '@/shared/components/icons'

export default function RefreshTokenPage() {
  return (
    <Suspense fallback={<RefreshTokenView />}>
      <RefreshTokenContent />
    </Suspense>
  )
}

function RefreshTokenContent() {
  const checkAndRefreshTokenRef = useRef<unknown>(null)

  const router = useRouter()

  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next')
  const refreshTokenFromUrl = searchParams.get('refreshToken')

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    const redirectToNextPath = () => router.push(nextPath || PATH.HOME)
    const redirectHomepage = () => router.push(PATH.HOME)

    if (checkAndRefreshTokenRef.current) return

    if (refreshTokenFromUrl && refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) {
      checkAndRefreshTokenRef.current = checkAndRefreshToken

      checkAndRefreshToken({
        onSuccess: () => {
          // console.log('🚀 super first refresh token')
          redirectToNextPath()
        },
        onRefreshTokenNotNeeded: redirectToNextPath,
        onError: redirectHomepage,
      })

      timeout = setTimeout(() => {
        checkAndRefreshTokenRef.current = null
      }, 0)
    } else {
      redirectHomepage()
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [nextPath, refreshTokenFromUrl, router])

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
