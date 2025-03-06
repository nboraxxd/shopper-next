'use client'

import { ComponentProps, useState } from 'react'

import { Input } from '@/shared/components/ui/input'

export default function NumberInput(props: ComponentProps<'input'> & { value?: string }) {
  const { className, onChange, value = '', ...rest } = props

  const [localValue, setLocalValue] = useState<string>(value)

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { value: inputValue } = ev.target
    if (/^\d+$/.test(inputValue) || inputValue === '') {
      onChange?.(ev)
      setLocalValue(inputValue)
    }
  }

  return <Input className={className} onChange={handleChange} value={value || localValue} {...rest} />
}
