'use client'

import { useSearchParams } from 'next/navigation'

import { TextLink } from '@/shared/components'

interface Props {
  children: React.ReactNode
  pathname: string
}

function AuthRedirectLink({ children, pathname }: Props) {
  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  return (
    <TextLink
      href={{
        pathname,
        query: next ? { next } : undefined,
      }}
    >
      {children}
    </TextLink>
  )
}

function AuthRedirectLinkFallback({ children, pathname }: Props) {
  return <TextLink href={{ pathname }}>{children}</TextLink>
}

export { AuthRedirectLink, AuthRedirectLinkFallback }
