import { GENDERS } from '@/constants/list'

export type User = {
  _id: string
  username: string
  name: string
  avatar: string | null
  fb: string | null
  birthday: string | null
  gender: string | null
  phone: string | null
}

export type RegisterReqBody = {
  name: string
  username: string
  password: string
}

export type UpdateMeReqBody = {
  name?: string
  avatar?: string | null
  fb?: string | null
  birthday?: string | null
  gender?: (typeof GENDERS)[number]['value'] | null
  phone?: string | null
}

export type ChangePasswordReqBody = {
  currentPassword: string
  newPassword: string
}
export type UserResponse = {
  data: User
}
