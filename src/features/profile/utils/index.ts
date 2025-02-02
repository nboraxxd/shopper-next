import { parse, isValid, getDate, getMonth, getYear } from 'date-fns'

import { GENDERS } from '@/features/profile/constants'

export function validateGenderValue(gender: string | null): (typeof GENDERS)[number]['value'] | null {
  if (!gender) return null

  return ['male', 'female', 'other'].includes(gender) ? (gender as (typeof GENDERS)[number]['value']) : null
}

export function convertDOBToDayMonthYear(userDateOfBirth: string | null) {
  if (!userDateOfBirth) return undefined

  // Kiểm tra định dạng ISO 8601 hoặc YYYY-MM-DD
  const timestamp = Date.parse(userDateOfBirth)

  if (!isNaN(timestamp)) {
    const parsedDate = new Date(timestamp)
    const day = getDate(parsedDate) // Ngày
    const month = getMonth(parsedDate) + 1 // Tháng (cần +1)
    const year = getYear(parsedDate) // Năm

    return { day, month, year }
  }

  // Kiểm tra định dạng dd/MM/yyyy
  const parsedDate = parse(userDateOfBirth, 'dd/MM/yyyy', new Date())

  if (isValid(parsedDate)) {
    const day = getDate(parsedDate) // Ngày
    const month = getMonth(parsedDate) + 1 // Tháng (cần +1)
    const year = getYear(parsedDate) // Năm

    return { day, month, year }
  }

  return undefined
}
