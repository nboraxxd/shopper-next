'use client'

import { ComponentProps, useState } from 'react'

import { cn } from '@/shared/utils'
import { useRefreshTokenState } from '@/features/auth/auth-store'

import { Button } from '@/shared/components/ui/button'
import { NumberInput } from '@/shared/components/quantity-input'
import { MinusIcon, PlusIcon, Svgr } from '@/shared/components/icons'
import { CUSTOM_INPUT_CLASSNAME } from '@/shared/constants/class-name'

interface Props extends Omit<ComponentProps<'input'>, 'className'> {
  value?: string
  className?: string
  max?: number
  onIncrease?: (value: string) => void
  onDecrease?: (value: string) => void
  onRemoveWhenZero?: () => void
  onType?: (value: string) => void
  onFocusOut?: (value: string) => void
  inputClassName?: string
  isAuthenticated?: boolean
}

export default function QuantityInput(props: Props) {
  const {
    className,
    max,
    onIncrease,
    onDecrease,
    onRemoveWhenZero,
    onType,
    onFocusOut,
    value = '',
    disabled,
    inputClassName,
    isAuthenticated = false,
    ...rest
  } = props

  const [localValue, setLocalValue] = useState<string>(value)

  const isRefreshingToken = useRefreshTokenState((state) => state.isRefreshingToken)

  const isDisabledOnTokenRefresh = isAuthenticated && isRefreshingToken

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = ev.target.value

    if (max === 0) return

    if (max && Number(inputValue) > max) {
      inputValue = max.toString()
    } else if (inputValue === '0') {
      inputValue = '1'
    }

    onType?.(inputValue)
    setLocalValue(inputValue)
  }

  const handleIncrease = () => {
    if (max === 0) return

    const newValue = Math.min(Number(value || localValue) + 1, max || Number.MAX_SAFE_INTEGER)
    onIncrease?.(newValue.toString())
    setLocalValue(newValue.toString())
  }

  const handleDecrease = () => {
    if (max === 0) return

    if (Number(value || localValue) - 1 === 0) {
      onRemoveWhenZero?.()
    }

    const newValue = Math.max(Number(value || localValue) - 1, 1)
    onDecrease?.(newValue.toString())
    setLocalValue(newValue.toString())
  }

  const handleBlur = () => {
    if (!value) {
      onType?.('1')
    }

    if (!localValue) {
      setLocalValue('1')
    }

    onFocusOut?.(value || localValue)
  }

  return (
    <div
      className={cn(
        'flex h-11 w-fit items-center rounded-xl border border-foreground px-3 shadow-sm focus-within:border-secondary-3/0 focus-within:shadow-focus-within',
        className
      )}
    >
      <Button
        size="icon"
        variant="ghost"
        tabIndex={-1}
        onClick={handleDecrease}
        disabled={max === 0 || disabled || isDisabledOnTokenRefresh}
        className="size-auto"
      >
        <Svgr icon={MinusIcon} />
      </Button>
      <NumberInput
        type="text"
        inputMode="numeric"
        className={cn(CUSTOM_INPUT_CLASSNAME, 'w-12 p-1 text-center', inputClassName)}
        value={value || localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={max === 0 || disabled || isDisabledOnTokenRefresh}
        {...rest}
      />
      <Button
        size="icon"
        variant="ghost"
        tabIndex={-1}
        onClick={handleIncrease}
        disabled={max === 0 || disabled || isDisabledOnTokenRefresh}
        className="size-auto"
      >
        <Svgr icon={PlusIcon} />
      </Button>
    </div>
  )
}
