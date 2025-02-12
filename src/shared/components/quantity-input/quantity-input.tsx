'use client'

import { ComponentProps, useState } from 'react'

import { cn } from '@/shared/utils'
import { Button } from '@/shared/components/ui/button'
import { MinusIcon, PlusIcon, Svgr } from '@/shared/components/icons'
import { NumberInput } from '@/shared/components/quantity-input'

interface Props extends Omit<ComponentProps<'input'>, 'className'> {
  value?: string
  className?: string
  max?: number
  onIncrease?: (value: string) => void
  onDecrease?: (value: string) => void
  onType?: (value: string) => void
  onFocusOut?: (value: string) => void
}

const MAX_ORDER_QUANTITY = 999

export default function QuantityInput(props: Props) {
  const { className, max, onIncrease, onDecrease, onType, onFocusOut, value = '', disabled, ...rest } = props

  const [localValue, setLocalValue] = useState<string>(value)

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = ev.target.value

    if (inputValue.length > 3 || max === 0) return

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

    const newValue = Math.min(
      Number(value || localValue) + 1,
      (max && max > MAX_ORDER_QUANTITY ? MAX_ORDER_QUANTITY : max) ?? MAX_ORDER_QUANTITY
    )
    onIncrease?.(newValue.toString())
    setLocalValue(newValue.toString())
  }

  const handleDecrease = () => {
    if (max === 0) return

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
        'flex h-11 w-fit items-center rounded-xl border border-foreground px-5 shadow-sm focus-within:border-secondary-3/0 focus-within:shadow-focus-within',
        className
      )}
    >
      <Button
        size="icon"
        variant="ghost"
        tabIndex={-1}
        onClick={handleDecrease}
        disabled={max === 0 || disabled}
        className="size-auto"
      >
        <Svgr icon={MinusIcon} />
      </Button>
      <NumberInput
        type="text"
        inputMode="numeric"
        maxLength={3}
        className="w-[3.25rem] px-2.5 text-center"
        value={value || localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={max === 0 || disabled}
        {...rest}
      />
      <Button
        size="icon"
        variant="ghost"
        tabIndex={-1}
        onClick={handleIncrease}
        disabled={max === 0 || disabled}
        className="size-auto"
      >
        <Svgr icon={PlusIcon} />
      </Button>
    </div>
  )
}
