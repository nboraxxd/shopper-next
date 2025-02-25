import { MessageResponse } from '@/shared/types'

export type AuthState = 'loading' | 'authenticated' | 'unauthenticated'

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
