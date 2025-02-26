import { z } from 'zod'
import { toast } from 'sonner'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'
import { BadRequestErrorPayload, ForbiddenErrorPayload } from '@/shared/types/error.type'

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }

  constructor({ status, payload, message = 'Http Error' }: { status: number; payload: any; message?: string }) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

export class BadRequestError extends HttpError {
  status: typeof HTTP_STATUS_CODE.BAD_REQUEST = HTTP_STATUS_CODE.BAD_REQUEST
  payload: BadRequestErrorPayload

  constructor(payload: BadRequestErrorPayload) {
    super({ status: HTTP_STATUS_CODE.BAD_REQUEST, payload, message: 'Bad Request Error' })
    this.payload = payload
  }
}

export class ForbiddenError extends HttpError {
  status: typeof HTTP_STATUS_CODE.FORBIDDEN = HTTP_STATUS_CODE.FORBIDDEN
  payload: ForbiddenErrorPayload

  constructor(payload: ForbiddenErrorPayload) {
    super({ status: HTTP_STATUS_CODE.FORBIDDEN, payload, message: 'Forbidden Error' })
    this.payload = payload
  }
}

export const handleClientErrorApi = <T extends FieldValues>({
  error,
  setError,
}: {
  error: any
  setError?: UseFormSetError<T>
}) => {
  if (error instanceof BadRequestError) {
    const formErrors = error.payload.detail
    if (formErrors) {
      const keys = Object.keys(formErrors)
      if (setError) {
        Object.entries(formErrors).forEach(([key, value]) => {
          setError(key as Path<T>, { type: z.ZodIssueCode.custom, message: value })
        })
      } else if (keys.length === 1) {
        toast.error(`${keys[0]} - ${formErrors[keys[0]]}`)
      } else {
        toast.error(error.payload.message)
      }
    } else {
      toast.error(error.payload.message || error.payload.error)
    }
  } else if (error instanceof DOMException) {
    console.log('AbortError:', error.message)
  } else if (
    error instanceof HttpError &&
    (error.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
      (error.status === HTTP_STATUS_CODE.FORBIDDEN && error.payload.error_code))
  ) {
    console.log('😰 Unauthorized:', error.payload.message)
  } else {
    toast.error(error.payload?.message || error.toString())
  }
}
