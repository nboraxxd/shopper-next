'use client'

import { toast } from 'sonner'
import { useEffect } from 'react'
import { useRouter } from 'nextjs-toploader/app'
import { useQueryClient } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth/auth-store'
import { useUserStore } from '@/features/user/user-store'
import { REMOVE_TOKENS_EVENT } from '@/features/auth/constants'
import { localStorageEventTarget } from '@/shared/utils/local-storage'
import { USER_KEY } from '@/features/user/constants'

export default function AuthCleanup() {
  const router = useRouter()

  const queryClient = useQueryClient()

  const setAuthState = useAuthStore((state) => state.setAuthState)
  const setProfile = useUserStore((state) => state.setProfile)

  useEffect(() => {
    const handleRemoveAuth = () => {
      setAuthState('unauthenticated')
      setProfile(null)
      queryClient.removeQueries({ queryKey: [USER_KEY.USER] })
      router.refresh()
      toast.info('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại. (force)')
    }

    localStorageEventTarget.addEventListener(REMOVE_TOKENS_EVENT, handleRemoveAuth)

    return () => {
      localStorageEventTarget.removeEventListener(REMOVE_TOKENS_EVENT, handleRemoveAuth)
    }
  }, [queryClient, router, setAuthState, setProfile])

  return null
}
