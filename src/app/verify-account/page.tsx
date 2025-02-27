'use client'

import { Suspense, useEffect } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useLoginByCodeToServerMutation } from '@/features/auth/hooks'

import { LoadingScreen } from '@/features/auth/components'

export default function VerifyAccountPage() {
  return (
    <Suspense fallback={<VerifyAccountView />}>
      <VerifyAccountContent />
    </Suspense>
  )
}

function VerifyAccountContent() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const { mutateAsync } = useLoginByCodeToServerMutation()

  useEffect(() => {
    if (code) {
      ;(async () => {
        try {
          await mutateAsync(code)

          router.push(PATH.HOME)
        } catch (error) {
          handleClientErrorApi({ error })
          router.push(PATH.HOME)
        }
      })()
    } else {
      router.push(PATH.HOME)
    }
  }, [code, mutateAsync, router])

  return <VerifyAccountView />
}

function VerifyAccountView() {
  return (
    <LoadingScreen>
      <LoaderCircleIcon className="size-8 animate-spin" />
      <span className="font-medium text-foreground">Đang xác thực...</span>
    </LoadingScreen>
  )
}
