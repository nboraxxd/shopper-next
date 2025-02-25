import { Metadata } from 'next'

import PATH from '@/shared/constants/path'

import { AuthContent, RegisterForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Đăng ký ngay',
}

export default function RegisterPage() {
  return (
    <AuthContent>
      <AuthContent.Heading>Đăng ký</AuthContent.Heading>
      <AuthContent.Description>
        <span className="hidden sm:inline">Chào mừng bạn đến với Shopper.</span> Cùng tạo tài khoản để mua sắm thông
        minh và tiết kiệm chi phí nha!
      </AuthContent.Description>

      <AuthContent.Form>
        <RegisterForm />
      </AuthContent.Form>

      <AuthContent.Redirect label="Bạn đã có tài khoản?" href={PATH.LOGIN}>
        Đăng nhập
      </AuthContent.Redirect>
    </AuthContent>
  )
}
