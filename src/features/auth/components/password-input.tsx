'use client'

import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { ControllerRenderProps } from 'react-hook-form'

import { cn } from '@/shared/utils'
import { LoginReqBody } from '@/features/auth/schemas'
import { AUTH_INPUT_CLASSNAME } from '@/features/auth/constants'

import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'

export default function PasswordInput({ field }: { field: ControllerRenderProps<LoginReqBody, 'password'> }) {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <>
      <Input
        id="password"
        type={isShowPassword ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="Mật khẩu"
        className={cn(AUTH_INPUT_CLASSNAME)}
        required
        {...field}
      />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="size-auto"
        onClick={() => setIsShowPassword((prev) => !prev)}
      >
        {isShowPassword ? <EyeIcon className="text-secondary-3" /> : <EyeOffIcon className="text-secondary-3" />}
      </Button>
    </>
  )
}
