import type { MessageResponse } from '@/shared/types'

export type Profile = {
  _id: string
  username: string
  name: string
  avatar: string | null
  fb: string | null
  birthday: string | null
  gender: string | null
  phone: string | null
}

export type ProfileResponse = {
  data: Profile
}

export type ChangePasswordResponse = MessageResponse & { success: boolean }
