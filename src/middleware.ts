import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import PATH from '@/shared/constants/path'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/features/auth/constants'

const protectedPaths = [
  PATH.CART,
  PATH.ACCOUNT,
  PATH.ADDRESS,
  PATH.PAYMENT,
  PATH.PROFILE,
  PATH.ORDER_HISTORY,
  PATH.WISHLIST,
]
const unauthenticatedPaths = [
  PATH.LOGIN,
  PATH.REGISTER,
  PATH.VERIFY_ACCOUNT,
  PATH.RESEND_VERIFICATION_EMAIL,
  PATH.FORGOT_PASSWORD,
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value

  // Redirect to login page if not logged in (no refresh token in cookie) and trying to access protected paths
  if (protectedPaths.some((item) => pathname.startsWith(item)) && !refreshToken && !accessToken) {
    const url = new URL('/login', request.url)
    url.searchParams.set('next', pathname)

    return NextResponse.redirect(url)
  }

  // Redirect to home page if logged in (has refresh token in cookie) and trying to access unauthenticated paths
  if (unauthenticatedPaths.some((item) => pathname.startsWith(item)) && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect to home page if `code` query param is missing when accessing verify account page
  if (pathname.startsWith(PATH.VERIFY_ACCOUNT) && !request.nextUrl.searchParams.has('code')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Logged in but access token has expired
  if (protectedPaths.some((item) => pathname.startsWith(item)) && refreshToken && !accessToken) {
    const url = new URL('/refresh-token', request.url)
    url.searchParams.set('refreshToken', refreshToken)
    url.searchParams.set('next', pathname)

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dang-nhap',
    '/dang-ky',
    '/xac-thuc-tai-khoan',
    '/quen-mat-khau',
    '/gui-lai-email-xac-thuc',
    '/gio-hang',
    '/tai-khoan/:path*',
    '/dang-xuat',
  ],
}
