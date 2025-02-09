import jwt from 'jsonwebtoken'

import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
} from '@/shared/utils/local-storage'
import { TokenPayload } from '@/shared/types'
import authClientApi from '@/features/auth/api/client'

type CallbackOptions = {
  onUserNotLoggedIn?: () => void
  onRefreshTokenNotNeeded?: () => void
  onSuccess?: () => void
  onError?: () => void
}

export default async function checkAndRefreshToken(callbackOptions?: CallbackOptions) {
  // Không nên đưa logic lấy access token và refresh token ra khỏi function `checkAndRefreshToken`
  // Vì để mỗi lần mà gọi function `checkAndRefreshToken` thì sẽ lấy access token và refresh token mới
  // Để tránh hiện tượng bug nó lấy access token và refresh token cũ ở lần đầu rồi gọi cho các lần tiếp theo
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()

  // Chưa đăng nhập thì không cần check refresh token
  if (!accessToken || !refreshToken) {
    callbackOptions?.onUserNotLoggedIn?.()
    return
  }

  const accessTokenDecoded = jwt.decode(accessToken) as TokenPayload
  const refreshTokenDecoded = jwt.decode(refreshToken) as TokenPayload

  // Thời điểm hết hạn của token được tính theo epoch time (s)
  // Còn khi dùng cú pháp `new Date().getTime()` thì nó sẽ trả về epoch time (ms) nên cần chia cho 1000
  const now = Math.floor(new Date().getTime() / 1000)

  console.log('🔥 ~ Thời gian còn lại của access token:', accessTokenDecoded.exp - now)
  console.log('🔥 ~ Thời gian hết hạn của access token:', accessTokenDecoded.exp - accessTokenDecoded.iat)

  // Ví dụ access token có thời gian hết hạn là 30s
  // thì chúng ta sẽ refresh token khi access token còn 1/3 thời gian, tức còn 10s
  // Số giây còn lại của access token từ thời điểm hiện tại, tính theo công thức: accessTokenDecoded.exp - now (giây)
  // Tổng số giây mà access token tồn tại, tính theo công thức: accessTokenDecoded.exp - accessTokenDecoded.iat (example: 15p = 900s)
  // Số giây còn lại của access token nhỏ hơn 1/3 tổng số giây mà access token tồn tại thì tiến hành refresh token
  const shouldRefreshToken = accessTokenDecoded.exp - now < (accessTokenDecoded.exp - accessTokenDecoded.iat) / 3

  // Trường hợp KHÔNG CẦN refresh token
  if (!shouldRefreshToken) {
    callbackOptions?.onRefreshTokenNotNeeded?.()
    return
  }

  // Trường hợp BẮT BUỘC PHẢI refresh token nhưng khi đó refresh token đã hết hạn
  if (shouldRefreshToken && refreshTokenDecoded.exp <= now) {
    removeTokensFromLocalStorage(true)
    callbackOptions?.onError?.()
    return
  }

  if (shouldRefreshToken) {
    try {
      const response = await authClientApi.refreshTokenToServer()
      const { accessToken } = response.payload.data

      setAccessTokenToLocalStorage(accessToken)
      callbackOptions?.onSuccess?.()
    } catch (_error) {
      callbackOptions?.onError?.()
    }
  }
}
