import { cookies } from 'next/headers'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/features/auth/constants'

export async function POST() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(ACCESS_TOKEN)
  const refreshToken = cookieStore.get(REFRESH_TOKEN)

  cookieStore.delete(ACCESS_TOKEN)
  cookieStore.delete(REFRESH_TOKEN)

  if (!accessToken || !refreshToken) {
    return Response.json({
      message: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.',
    })
  }

  return Response.json({ message: 'Đăng xuất thành công' })
}
