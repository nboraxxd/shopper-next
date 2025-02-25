import { Metadata } from 'next'

import PATH from '@/shared/constants/path'

import { AuthContent, LoginForm, LoginFormFallback } from '@/features/auth/components'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Đăng nhập tài khoản',
}

export default function LoginPage() {
  return (
    <AuthContent>
      <AuthContent.Heading>Đăng nhập</AuthContent.Heading>
      <AuthContent.Description>
        <span className="hidden sm:inline">Chào mừng bạn quay trở lại.</span> Đăng nhập để tiếp tục mua sắm thông minh
        và tiết kiệm chi phí nha!
      </AuthContent.Description>

      <AuthContent.Form>
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </AuthContent.Form>

      <AuthContent.Redirect label="Bạn chưa có tài khoản?" href={PATH.REGISTER}>
        Đăng ký
      </AuthContent.Redirect>
    </AuthContent>
  )
}
