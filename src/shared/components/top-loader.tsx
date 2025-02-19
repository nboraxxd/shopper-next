'use client'

import { useTheme } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'

import { useIsClient } from '@/shared/hooks'

export default function TopLoader() {
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  return isClient ? (
    <NextTopLoader
      showSpinner={false}
      color={resolvedTheme === 'dark' ? '#77DAE6' : '#0071DC'}
      shadow={resolvedTheme === 'dark' ? '0 0 10px #77DAE6,0 0 5px #77DAE6' : '0 0 10px #0071DC,0 0 5px #0071DC'}
    />
  ) : null
}
