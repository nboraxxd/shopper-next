'use client'

import { LoaderCircleIcon } from 'lucide-react'
import { Suspense, useEffect, useRef } from 'react'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useLogoutToServerMutation } from '@/features/auth/hooks'
import { getAccessTokenFromLocalStorage } from '@/shared/utils/local-storage'

import { LoadingScreen } from '@/features/auth/components'

function LogoutPageContent() {
  const logoutRef = useRef<UseMutateAsyncFunction | null>(null)

  const router = useRouter()

  const pathname = usePathname()

  const searchParams = useSearchParams()
  const accessTokenFromUrl = searchParams.get('accessToken')

  const { mutateAsync } = useLogoutToServerMutation()

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (!logoutRef.current && accessTokenFromUrl === getAccessTokenFromLocalStorage()) {
      ;(async () => {
        logoutRef.current = mutateAsync

        try {
          await mutateAsync()

          const from = new URLSearchParams()
          from.set('from', pathname)
          router.push(`${PATH.HOME}?${from}`)
          router.refresh()

          timeout = setTimeout(() => {
            logoutRef.current = null
          }, 1000)
        } catch (error) {
          handleClientErrorApi({ error })
        }
      })()
    } else {
      router.push(PATH.HOME)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [mutateAsync, pathname, router, accessTokenFromUrl])

  return accessTokenFromUrl ? <LogoutView /> : null
}

function LogoutView() {
  return (
    <LoadingScreen>
      <LoaderCircleIcon className="size-8 animate-spin" />
      <span className="font-medium text-foreground">Đang đăng xuất...</span>
    </LoadingScreen>
  )
}

export default function LogoutPage() {
  return (
    <Suspense fallback={<LogoutView />}>
      <LogoutPageContent />
    </Suspense>
  )
}
