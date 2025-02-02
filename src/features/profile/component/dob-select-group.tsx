'use client'

import range from 'lodash/range'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { convertDOBToDayMonthYear } from '@/features/profile/utils'
import { cn } from '@/shared/utils'

interface DOBSelectGroupProps {
  value: string | null
  onChange: (value: string) => void
}

type UserDOB =
  | {
      day?: string
      month?: string
      year?: string
    }
  | undefined

type SelectionField = 'day' | 'month' | 'year'

export default function DOBSelectGroup({ value, onChange }: DOBSelectGroupProps) {
  const [userDOB, setUserDOB] = useState<UserDOB>(undefined)

  useEffect(() => {
    const dobInDMYFormat = convertDOBToDayMonthYear(value)

    if (!dobInDMYFormat) return undefined

    setUserDOB({
      day: dobInDMYFormat.day.toString(),
      month: dobInDMYFormat.month.toString(),
      year: dobInDMYFormat.year.toString(),
    })
  }, [value])

  function onSelectChange(value: string, field: SelectionField) {
    setUserDOB((prev) => ({ ...prev, [field]: value }))

    const updatedDOB = {
      ...userDOB,
      [field]: value,
    }

    const { day, month, year } = updatedDOB

    if (day && month && year) {
      onChange(new Date(Number(year), Number(month) - 1, Number(day)).toISOString())
    }
  }

  return (
    <div className="flex items-center gap-1.5 xs:gap-3">
      <DOBSelect
        name="day"
        value={userDOB?.day}
        onSelectChange={onSelectChange}
        placeholder="Ngày"
        contentClassName="min-w-20"
      >
        {range(1, 32).map((day) => (
          <SelectItem key={day} value={day.toString()}>
            {day}
          </SelectItem>
        ))}
      </DOBSelect>

      <DOBSelect name="month" value={userDOB?.month} onSelectChange={onSelectChange} placeholder="Tháng">
        {range(1, 13).map((month) => (
          <SelectItem key={month} value={month.toString()}>
            Tháng {month}
          </SelectItem>
        ))}
      </DOBSelect>

      <DOBSelect name="year" value={userDOB?.year} onSelectChange={onSelectChange} placeholder="Năm">
        {range(new Date().getFullYear() - 99, new Date().getFullYear() + 1).map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </DOBSelect>
    </div>
  )
}

interface DOBSelectProps {
  name: SelectionField
  value: string | undefined
  onSelectChange: (value: string, field: SelectionField) => void
  placeholder?: string
  triggerClassName?: string
  contentClassName?: string
  children?: React.ReactNode
}

function DOBSelect(props: DOBSelectProps) {
  const { name, value, onSelectChange, placeholder, triggerClassName, contentClassName, children } = props

  return (
    <Select
      name={name}
      value={value}
      onValueChange={(value) => {
        if (!value) return
        onSelectChange(value, name)
      }}
    >
      <SelectTrigger
        className={cn(
          'h-11 rounded-xl px-2 text-sm font-medium transition-none placeholder:text-input-placeholder focus:border-transparent focus:shadow-focus-within focus:ring-0 md:px-3 md:text-base',
          triggerClassName
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        <ScrollArea className="h-52">{children}</ScrollArea>
      </SelectContent>
    </Select>
  )
}
