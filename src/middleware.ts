import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/features/auth/constants'
import PATH from '@/shared/constants/path'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = [PATH.CART, '/checkout', '/user', '/logout', '/refresh-token']
const unauthenticatedPaths = [PATH.LOGIN, PATH.REGISTER, '/resend-email', PATH.FORGOT_PASSWORD]

// This function can be marked `async` if using `await` inside
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

  // Logged in but access token has expired
  if (protectedPaths.some((item) => pathname.startsWith(item)) && refreshToken && !accessToken) {
    const url = new URL('/refresh-token', request.url)
    url.searchParams.set('refreshToken', refreshToken)
    url.searchParams.set('next', pathname)

    return NextResponse.redirect(url)
  }

  // Redirect to /user/profile if user navigates to /user
  if (pathname === '/user') {
    return NextResponse.redirect(new URL('/user/profile', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dang-nhap',
    '/dang-ky',
    '/quen-mat-khau',
    '/gio-hang',
    '/resend-email',
    '/user/:path*',
    '/logout',
    '/refresh-token',
  ],
}