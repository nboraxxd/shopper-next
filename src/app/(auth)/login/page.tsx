import { Suspense } from 'react'

import PATH from '@/shared/constants/path'

import { AuthRedirectLink, AuthRedirectLinkFallback, LoginForm, LoginFormFallback } from '@/features/auth/components'

export default function LoginPage() {
  return (
    <>
      <h2 className="mt-14 text-xl font-medium uppercase text-auth-content-heading sm:text-4xl">Đăng nhập</h2>
      <p className="mt-2.5 text-balance text-center text-sm font-medium text-auth-content-foreground sm:text-base">
        <span className="hidden sm:inline">Chào mừng bạn quay trở lại.</span> Tận hưởng trải nghiệm liền mạch cùng toàn
        bộ thông tin đã lưu của bạn.
      </p>

      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>

      <div className="mt-14 flex items-center justify-center gap-2.5 sm:text-lg lg:mt-24">
        <span className="text-auth-content-foreground">Bạn chưa có tài khoản?</span>
        <Suspense fallback={<AuthRedirectLinkFallback pathname={PATH.REGISTER}>Đăng ký</AuthRedirectLinkFallback>}>
          <AuthRedirectLink pathname={PATH.REGISTER}>Đăng ký</AuthRedirectLink>
        </Suspense>
      </div>
    </>
  )
}
