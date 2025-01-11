'use client'

import ms from 'ms'
import { useEffect } from 'react'

import { useAuthStore } from '@/features/auth/auth-store'
import checkAndRefreshToken from '@/shared/utils/check-and-refresh-token'

export default function RefreshToken() {
  const setAuthState = useAuthStore((state) => state.setAuthState)

  useEffect(() => {
    console.log('🛹🛹🛹 RefreshToken')

    let interval: NodeJS.Timeout | null = null

    const onError = () => {
      if (interval) {
        clearInterval(interval)
      }
    }

    // Phải gọi 1 lần đầu tiên vì interval sẽ chỉ chạy sau thời gian TIMEOUT
    checkAndRefreshToken({
      onUserNotLoggedIn: () => setAuthState('unauthenticated'),
      onRefreshTokenNotNeeded: () => setAuthState('authenticated'),
      onSuccess: () => {
        console.log('🚀 first refreshToken')
        setAuthState('authenticated')
      },
      onError,
    })

    // `refreshTokenCheckInterval` phải nhỏ hơn 1/3 thời gian hết hạn của access token
    // Ví dụ access token hết hạn sau 30s thì ít nhất 10s chúng ta sẽ check refresh token 1 lần
    const refreshTokenCheckInterval = ms('3s')
    interval = setInterval(
      () =>
        checkAndRefreshToken({
          onSuccess: () => {
            console.log('🚀 other refreshToken')
          },
          onError,
        }),
      refreshTokenCheckInterval
    )

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [setAuthState])

  return null
}
