import { isClient } from '@/shared/utils'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/features/auth/constants'

export const localStorageEventTarget = new EventTarget()

export const setAccessTokenToLocalStorage = (accessToken: string) => localStorage.setItem(ACCESS_TOKEN, accessToken)

export const getAccessTokenFromLocalStorage = () => (isClient ? localStorage.getItem(ACCESS_TOKEN) : null)

export const setRefreshTokenToLocalStorage = (refreshToken: string) => localStorage.setItem(REFRESH_TOKEN, refreshToken)

export const getRefreshTokenFromLocalStorage = () => (isClient ? localStorage.getItem(REFRESH_TOKEN) : null)

export const removeTokensFromLocalStorage = (isForce: boolean = false) => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)

  if (isForce) localStorageEventTarget.dispatchEvent(new Event('removeLocalStorage'))
}
