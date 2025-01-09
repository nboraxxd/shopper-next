import { GENDERS } from '@/features/user/constants'
import type { MessageResponse } from '@/shared/types'

type GenderValue = (typeof GENDERS)[number]['value']

export type User = {
  _id: string
  username: string
  name: string
  avatar: string | null
  fb: string | null
  birthday: string | null
  gender: GenderValue | null
  phone: string | null
}

export type UpdateMeReqBody = {
  name?: string
  avatar?: string | null
  fb?: string | null
  birthday?: string | null
  gender?: GenderValue | null
  phone?: string | null
}

export type UserResponse = {
  data: User
}

export type ChangePasswordReqBody = {
  currentPassword: string
  newPassword: string
}

export type ChangePasswordResponse = MessageResponse & { success: boolean }
