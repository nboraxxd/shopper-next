export type BadRequestErrorPayload = {
  message: string
  error?: string
  detail?: {
    [key: string]: string
  }
}

export type ForbiddenErrorPayload = {
  message: string
  error?: number
  error_code?: 'TOKEN_EXPIRED' | 'TOKEN_INVALID' | 'MISSING_TOKEN'
}
