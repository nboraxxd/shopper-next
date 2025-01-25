import Link from 'next/link'

import { ACCOUNT_MENU } from '@/features/account/constants'

export default function SidebarNavDesktop() {
  return (
    <nav className="hidden py-6 lg:block">
      {ACCOUNT_MENU.map((menu, index) => (
        <div key={index} className="mt-6 px-4 first:mt-0 2xl:px-7">
          <h3 className="text-lg font-medium">{menu.title}</h3>
          <ul className="mt-2">
            {menu.items.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex h-9 items-center gap-2 rounded-md px-1 transition-colors hover:bg-account-link-hover"
                  >
                    <Icon width={24} height={24} strokeWidth={1.5} />
                    <span className="text-[0.9375rem] font-medium">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
