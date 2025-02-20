'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/shared/utils'
import { ACCOUNT_MENU } from '@/features/account/constants'

import { Svgr } from '@/shared/components/icons'

export default function AccountSidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden py-6 lg:block">
      {ACCOUNT_MENU.map((menu, index) => (
        <div key={index} className="mt-6 px-4 first:mt-0 2xl:px-7">
          <h3 className="text-lg font-medium">{menu.title}</h3>
          <ul className="mt-2 space-y-1">
            {menu.items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-8 items-center gap-2 rounded-md px-1 transition-colors hover:bg-account-highlight',
                    {
                      'text-highlight bg-account-highlight':
                        item.href.split('/').length === 3
                          ? item.href.split('/')[2] === pathname.split('/')[2]
                          : item.href === pathname,
                    }
                  )}
                >
                  <Svgr icon={item.icon} />
                  <span className="text-[0.9375rem] font-medium">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
