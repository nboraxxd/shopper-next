'use client'

import ms from 'ms'
import { useEffect } from 'react'

import { useAuthStore, useRefreshTokenState } from '@/features/auth/auth-store'
import checkAndRefreshToken from '@/shared/utils/check-and-refresh-token'
import { usePathname } from 'next/navigation'
import PATH from '@/shared/constants/path'
import envVariables from '@/shared/schemas/env-variables.schema'

// không check refresh token cho các path này
const UNAUTHENTICATED_PATHS = [PATH.LOGIN, PATH.REGISTER, '/logout', '/refresh-token']

export default function RefreshToken() {
  const pathname = usePathname()

  const setAuthState = useAuthStore((state) => state.setAuthState)
  const setIsRefreshingToken = useRefreshTokenState((state) => state.setIsRefreshingToken)

  useEffect(() => {
    if (UNAUTHENTICATED_PATHS.includes(pathname)) return

    let interval: NodeJS.Timeout | null = null

    function clearTokenCheckInterval() {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }

    function startTokenCheckInterval() {
      clearTokenCheckInterval()

      // delay của setInterval phải khoảng 1/5 thời gian hết hạn của access token
      // Ví dụ access token hết hạn sau 15s thì recommend 3s check refresh token 1 lần
      interval = setInterval(
        () =>
          checkAndRefreshToken({
            onSuccess: () => {
              // console.log('🚀 other refresh token')
            },
            onError: clearTokenCheckInterval,
          }),
        ms(envVariables.NEXT_PUBLIC_REFRESH_TOKEN_CHECK_INTERVAL)
      )
    }

    // function này không cần handle error
    // vì đã có logic handle error trong file http
    function handleReconnect() {
      setIsRefreshingToken(true)

      checkAndRefreshToken({
        onSuccess: () => {
          // console.log('🚀 reconnect refresh token')
          setIsRefreshingToken(false)

          startTokenCheckInterval()
        },

        onRefreshTokenNotNeeded: () => {
          setIsRefreshingToken(false)

          startTokenCheckInterval()
        },
      })
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        handleReconnect()
      } else {
        clearTokenCheckInterval()
      }
    }

    // Phải gọi 1 lần đầu tiên
    checkAndRefreshToken({
      onUserNotLoggedIn: () => setAuthState('unauthenticated'),
      onRefreshTokenNotNeeded: () => {
        setAuthState('authenticated')

        startTokenCheckInterval()
      },
      onSuccess: () => {
        // console.log('🚀 first refresh token')
        setAuthState('authenticated')

        startTokenCheckInterval()
      },
      onError: clearTokenCheckInterval,
    })

    window.addEventListener('offline', clearTokenCheckInterval)

    window.addEventListener('online', handleReconnect)

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('offline', clearTokenCheckInterval)
      window.removeEventListener('online', handleReconnect)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTokenCheckInterval()
    }
  }, [pathname, setAuthState, setIsRefreshingToken])

  return null
}
