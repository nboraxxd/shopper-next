'use client'

import range from 'lodash/range'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { convertBirthdateToDayMonthYear } from '@/features/profile/utils'
import { cn } from '@/shared/utils'

interface Props {
  value: string | null
  onChange: (value: string) => void
}

type UserBirthdate =
  | {
      day?: string
      month?: string
      year?: string
    }
  | undefined

export default function BirthdaySelect({ value, onChange }: Props) {
  const [userBirthdate, setUserBirthdate] = useState<UserBirthdate>(undefined)

  useEffect(() => {
    const birthdateInDMY = convertBirthdateToDayMonthYear(value)

    if (!birthdateInDMY) return undefined

    setUserBirthdate({
      day: birthdateInDMY.day.toString(),
      month: birthdateInDMY.month.toString(),
      year: birthdateInDMY.year.toString(),
    })
  }, [value])

  function handleSelectChange(value: string, field: 'day' | 'month' | 'year') {
    setUserBirthdate((prev) => ({ ...prev, [field]: value }))

    const updatedBirthdate = {
      ...userBirthdate,
      [field]: value,
    }

    const { day, month, year } = updatedBirthdate

    if (day && month && year) {
      onChange(new Date(Number(year), Number(month) - 1, Number(day)).toISOString())
    }
  }

  return (
    <div className="flex items-center gap-1.5 xs:gap-3">
      <Select
        name="day"
        value={userBirthdate?.day}
        onValueChange={(value) => {
          if (!value) return
          handleSelectChange(value, 'day')
        }}
      >
        <SelectTrigger
          className={cn(
            'h-11 rounded-xl p-2 text-xs font-medium transition-none placeholder:text-input-placeholder focus:border-transparent focus:shadow-focus-within focus:ring-0 md:text-sm'
          )}
        >
          <SelectValue placeholder="Ngày" />
        </SelectTrigger>
        <SelectContent className="min-w-20">
          <ScrollArea className="h-52">
            {range(1, 32).map((day) => (
              <SelectItem key={day} value={day.toString()}>
                {day}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Select
        name="month"
        value={userBirthdate?.month}
        onValueChange={(value) => {
          if (!value) return
          handleSelectChange(value, 'month')
        }}
      >
        <SelectTrigger
          className={cn(
            'h-11 rounded-xl p-2 text-xs font-medium transition-none placeholder:text-input-placeholder focus:border-transparent focus:shadow-focus-within focus:ring-0 md:text-sm'
          )}
        >
          <SelectValue placeholder="Tháng" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-52">
            {range(1, 13).map((month) => (
              <SelectItem key={month} value={month.toString()}>
                Tháng {month}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Select
        name="year"
        value={userBirthdate?.year}
        onValueChange={(value) => {
          if (!value) return
          handleSelectChange(value, 'year')
        }}
      >
        <SelectTrigger
          className={cn(
            'h-11 rounded-xl p-2 text-xs font-medium transition-none placeholder:text-input-placeholder focus:border-transparent focus:shadow-focus-within focus:ring-0 md:text-sm'
          )}
        >
          <SelectValue placeholder="Năm" />
        </SelectTrigger>
        <SelectContent className="min-w-20" align="end">
          <ScrollArea className="h-52">
            {range(new Date().getFullYear() - 99, new Date().getFullYear() + 1).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  )
}
