'use client'

import { useRefreshTokenState } from '@/features/auth/auth-store'
import { Button, ButtonProps } from '@/shared/components/ui/button'

interface Props extends ButtonProps {
  isPlainButton?: boolean
}

export default function ButtonWithRefreshTokenState({ disabled, isPlainButton = false, asChild, ...rest }: Props) {
  const isRefreshingToken = useRefreshTokenState((state) => state.isRefreshingToken)

  return isPlainButton ? (
    <button disabled={disabled || isRefreshingToken} {...rest} />
  ) : (
    <Button disabled={disabled || isRefreshingToken} asChild={asChild} {...rest} />
  )
}
