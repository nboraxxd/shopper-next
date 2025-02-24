import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { Checkbox } from '@/shared/components/ui/checkbox'
import { useRefreshTokenState } from '@/features/auth/auth-store'
import React from 'react'

type Props = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

export default function CheckboxWithRefreshTokenState({ disabled, ...props }: Props) {
  const isRefreshingToken = useRefreshTokenState((state) => state.isRefreshingToken)

  return <Checkbox className="block size-4 md:size-5" disabled={disabled || isRefreshingToken} {...props} />
}
