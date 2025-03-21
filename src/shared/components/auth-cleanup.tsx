'use client'

import { toast } from 'sonner'
import { useEffect } from 'react'
import { useRouter } from 'nextjs-toploader/app'
import { useQueryClient } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth/auth-store'
import { useProfileStore } from '@/features/profile/profile-store'
import { REMOVE_TOKENS_EVENT } from '@/features/auth/constants'
import { localStorageEventTarget } from '@/shared/utils/local-storage'
import { PROFILE_KEY } from '@/features/profile/constants'
import { useCheckoutStore } from '@/features/checkout/hooks'

export default function AuthCleanup() {
  const router = useRouter()

  const queryClient = useQueryClient()

  const setAuthState = useAuthStore((state) => state.setAuthState)
  const setProfile = useProfileStore((state) => state.setProfile)
  const setCheckout = useCheckoutStore((state) => state.setCheckout)

  useEffect(() => {
    const handleRemoveAuth = () => {
      setAuthState('unauthenticated')
      setProfile(null)
      setCheckout(null)
      queryClient.removeQueries({ queryKey: [PROFILE_KEY.PROFILE] })
      router.refresh()
      toast.info('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại. (force)')
    }

    localStorageEventTarget.addEventListener(REMOVE_TOKENS_EVENT, handleRemoveAuth)

    return () => {
      localStorageEventTarget.removeEventListener(REMOVE_TOKENS_EVENT, handleRemoveAuth)
    }
  }, [queryClient, router, setAuthState, setCheckout, setProfile])

  return null
}
