import { clsx, type ClassValue } from 'clsx'
import { DateArg, format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isClient = typeof window !== 'undefined'

export function addFirstSlashToUrl(url: string) {
  return url.startsWith('/') ? url : `/${url}`
}

export function formatSecondsToMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSecs = seconds % 60
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSecs).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}

export function formatCurrency(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number).replace('₫', '').trim()
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value).toLowerCase()
}

export function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
}

export function formatVietnameseDate(date: DateArg<Date> & {}) {
  return `${format(date, 'dd')} tháng ${format(date, 'MM')}`
}
