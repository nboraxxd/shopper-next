import { MessageResponse } from '@/shared/types'

export type RegisterReqBody = {
  name: string
  username: string
  password: string
}

export type RegisterResponse = MessageResponse & { success: boolean }

export type AuthResponse = {
  data: {
    accessToken: string
    refreshToken: string
  }
}

export type RefreshTokenResponse = {
  data: {
    accessToken: string
  }
}
