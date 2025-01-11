'use client'

import { toast } from 'sonner'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/features/auth/auth-store'
import { useUserStore } from '@/features/user/user-store'
import { REMOVE_TOKENS_EVENT } from '@/features/auth/constants'
import { localStorageEventTarget } from '@/shared/utils/local-storage'

export default function AuthCleanup() {
  const router = useRouter()

  const setAuthState = useAuthStore((state) => state.setAuthState)
  const setProfile = useUserStore((state) => state.setProfile)

  useEffect(() => {
    const handleRemoveAuth = () => {
      setAuthState('unauthenticated')
      setProfile(null)
      router.refresh()
      toast.info('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại. (force)')
    }

    localStorageEventTarget.addEventListener(REMOVE_TOKENS_EVENT, handleRemoveAuth)

    return () => {
      localStorageEventTarget.removeEventListener(REMOVE_TOKENS_EVENT, handleRemoveAuth)
    }
  }, [router, setAuthState, setProfile])

  return null
}
