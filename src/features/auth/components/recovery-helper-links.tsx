import PATH from '@/shared/constants/path'

import { AuthHelperLinks } from '@/features/auth/components'

export default function RecoveryHelperLinks() {
  return (
    <AuthHelperLinks
      links={[
        { href: PATH.LOGIN, label: 'Đăng nhập' },
        { href: PATH.REGISTER, label: 'Đăng ký' },
      ]}
      className="mt-6"
    />
  )
}
