'use client'

import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { ControllerRenderProps } from 'react-hook-form'

import { cn } from '@/shared/utils'
import { CUSTOM_INPUT_CLASSNAME } from '@/shared/constants/class-name'

import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { FormControl } from '@/shared/components/ui/form'

export default function PasswordInput({ field }: { field: ControllerRenderProps<any> }) {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <>
      <FormControl>
        <Input
          type={isShowPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="••••••••"
          className={cn(CUSTOM_INPUT_CLASSNAME)}
          required
          {...field}
        />
      </FormControl>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        tabIndex={-1}
        className="size-auto"
        onClick={() => setIsShowPassword((prev) => !prev)}
      >
        {isShowPassword ? <EyeIcon className="text-secondary-3" /> : <EyeOffIcon className="text-secondary-3" />}
      </Button>
    </>
  )
}
