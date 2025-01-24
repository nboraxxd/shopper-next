'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

import { ACCOUNT_MENU } from '@/features/account/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/utils'

export default function SidebarNavMobile() {
  const MotionLink = motion.create(Link)

  const pathname = usePathname()

  return (
    <nav className="my-2 flex p-2 lg:hidden">
      <ul className="mx-auto flex gap-3 text-xs font-semibold md:gap-6">
        {ACCOUNT_MENU.map((menu) =>
          menu.items.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href} className="relative shrink-0">
                <MotionLink
                  href={item.href}
                  whileTap={{ scale: 0.95 }}
                  className={cn('flex flex-col items-center gap-1 px-2 py-1', {
                    'text-primary': pathname === item.href,
                  })}
                >
                  <Icon className="size-5" width={20} height={20} />
                  <span className="text-[0.9375rem]">{item.title}</span>
                </MotionLink>
                <AnimatePresence>
                  {pathname === item.href ? (
                    <motion.div
                      className="absolute -bottom-1 left-0 z-0 h-0.5 w-full rounded-full bg-primary"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 35 }}
                    />
                  ) : null}
                </AnimatePresence>
              </li>
            )
          })
        )}
      </ul>
    </nav>
  )
}
