import { redirect } from 'next/navigation'

import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from '@/shared/utils/local-storage'
import { isClient, addFirstSlashToUrl } from '@/shared/utils'
import envVariables from '@/shared/schemas/env-variables.schema'
import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'
import { BadRequestError, ForbiddenError, HttpError } from '@/shared/utils/error'
import type { BadRequestErrorPayload, ForbiddenErrorPayload } from '@/shared/types/error.type'

import type { AuthResponse } from '@/features/auth/types'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
  headers?: HeadersInit & { Authorization?: string }
  params?: string | Record<string, string> | URLSearchParams | string[][]
}

type CustomOptionsExcluedBody = Omit<CustomOptions, 'body'>

let clientLogoutRequest: Promise<any> | null = null

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: CustomOptions
) => {
  const body = options?.body instanceof FormData ? options.body : JSON.stringify(options?.body)

  const baseHeaders: HeadersInit = options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }

  const baseUrl = options?.baseUrl || envVariables.NEXT_PUBLIC_API_ENDPOINT

  const searchParams = new URLSearchParams(options?.params)

  const fullUrl = `${baseUrl}${addFirstSlashToUrl(url)}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

  if (isClient) {
    const accessToken = getAccessTokenFromLocalStorage()
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`
    }
  }

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    method,
    body,
  })

  let payload: T

  try {
    payload = await res.json()
  } catch (error) {
    payload = error as T
  }

  const data = {
    status: res.status,
    payload,
  }

  // Intercept errors
  if (!res.ok) {
    if (res.status === HTTP_STATUS_CODE.BAD_REQUEST) {
      throw new BadRequestError(data.payload as BadRequestErrorPayload)
    } else if (res.status === HTTP_STATUS_CODE.FORBIDDEN || res.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
      if (res.status === HTTP_STATUS_CODE.FORBIDDEN && !(payload as ForbiddenErrorPayload).error_code) {
        throw new ForbiddenError(data.payload as ForbiddenErrorPayload)
      }

      if (isClient && !clientLogoutRequest) {
        clientLogoutRequest = fetch('/api/auth/logout', {
          method: 'POST',
          body: null, // Logout sẽ luôn thành công
          headers: { ...baseHeaders },
        })

        try {
          await clientLogoutRequest
        } catch (error) {
          console.log('😰 clientLogoutRequest', error)
        } finally {
          removeTokensFromLocalStorage(true)
          clientLogoutRequest = null
        }
      }

      if (!isClient) {
        const accessToken = options?.headers?.Authorization?.split('Bearer ')[1]

        redirect(`/logout?accessToken=${accessToken}`)
      }
      throw new HttpError(data)
    } else {
      throw new HttpError(data)
    }
  }

  // Client gọi đến route handle, từ đó route handle sẽ gọi đến backend để login
  if (isClient && addFirstSlashToUrl(url) === '/api/auth/login') {
    const { accessToken, refreshToken } = (payload as AuthResponse).data

    setAccessTokenToLocalStorage(accessToken)
    setRefreshTokenToLocalStorage(refreshToken)
  }

  // Client gọi đến route handle, từ đó route handle sẽ gọi đến backend để logout
  if (isClient && addFirstSlashToUrl(url) === '/api/auth/logout') {
    removeTokensFromLocalStorage()
  }

  return data
}

const http = {
  get<Response>(url: string, options?: CustomOptionsExcluedBody) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: CustomOptionsExcluedBody) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: CustomOptionsExcluedBody) {
    return request<Response>('PUT', url, { ...options, body })
  },
  patch<Response>(url: string, body: any, options?: CustomOptionsExcluedBody) {
    return request<Response>('PATCH', url, { ...options, body })
  },
  delete<Response>(url: string, options?: CustomOptionsExcluedBody) {
    return request<Response>('DELETE', url, options)
  },
}

export default http
