'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next')
  const refreshTokenFromUrl = searchParams.get('refreshToken')

  useEffect(() => {
    function redirectToNextPath() {
      const from = new URLSearchParams({ from: pathname })

      router.push(nextPath ? `${nextPath}?${from}` : PATH.HOME)
      router.refresh()
    }

    function redirectHomepage() {
      router.push(PATH.HOME)
      router.refresh()
    }

    if (refreshTokenFromUrl && refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) {
      ;(async () => {
        await checkAndRefreshToken({
          onSuccess: () => {
            // console.log('🚀 super first refresh token ~ onSuccess', nextPath)
            redirectToNextPath()
          },
          onRefreshTokenNotNeeded: () => {
            // console.log('🚀 super first refresh token ~ onRefreshTokenNotNeeded', nextPath)
            redirectToNextPath()
          },
          onError: () => {
            // console.log('🚀 super first refresh token ~ onError')
            redirectHomepage()
          },
        })
      })()
    } else {
      redirectHomepage()
    }
  }, [nextPath, pathname, refreshTokenFromUrl, router])

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
