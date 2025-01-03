import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isBrowser = typeof window !== 'undefined'

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

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number).replace('₫', '').trim()
}

export function extractCategorySlug(categorySlugInput: string) {
  const parts = categorySlugInput.split(/-id[^-]*$/)
  return parts[0]
}

export function extractProductId(productSlugInput: string) {
  const parts = productSlugInput.split('-p')

  return parts.at(-1)
}

export function extractProductSlug(productSlugInput: string) {
  const slugLastDashIndex = productSlugInput.lastIndexOf('-')
  const partialSlug = productSlugInput.substring(0, slugLastDashIndex)

  return partialSlug
}
