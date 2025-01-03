export type LoginReqBody = {
  username: string
  password: string
}

export type AuthResponse = {
  data: {
    accessToken: string
    refreshToken: string
  }
}
