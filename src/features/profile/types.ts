import { GENDERS } from '@/features/profile/constants'
import type { MessageResponse } from '@/shared/types'

type GenderValue = (typeof GENDERS)[number]['value']

export type Profile = {
  _id: string
  username: string
  name: string
  avatar: string | null
  fb: string | null
  birthday: string | null
  gender: GenderValue | null
  phone: string | null
}

export type UpdateProfileReqBody = {
  name?: string
  avatar?: string | null
  fb?: string | null
  birthday?: string | null
  gender?: GenderValue | null
  phone?: string | null
}

export type ProfileResponse = {
  data: Profile
}

export type ChangePasswordReqBody = {
  currentPassword: string
  newPassword: string
}

export type ChangePasswordResponse = MessageResponse & { success: boolean }
