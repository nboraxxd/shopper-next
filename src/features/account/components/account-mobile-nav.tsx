'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

import { ACCOUNT_MENU } from '@/features/account/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/utils'
import { Svgr } from '@/shared/components/icons'

export default function AccountMobileNav() {
  const MotionLink = motion.create(Link)

  const pathname = usePathname()

  return (
    <nav className="rounded-4xl bg-account-section px-4 shadow-section lg:hidden">
      <div className="flex overflow-x-auto py-2">
        <ul className="flex h-fit gap-3 text-xs font-semibold md:gap-6">
          {ACCOUNT_MENU.map((menu) =>
            menu.items.map((item) => {
              const isActiveMenuItem =
                item.href.split('/').length === 3
                  ? item.href.split('/')[2] === pathname.split('/')[2]
                  : item.href === pathname

              return (
                <li key={item.href} className="relative shrink-0">
                  <MotionLink
                    href={item.href}
                    whileTap={{ scale: 0.95 }}
                    className={cn('flex flex-col items-center gap-1 px-2 py-1', {
                      'text-highlight': isActiveMenuItem,
                    })}
                  >
                    <Svgr icon={item.icon} className="size-5" width={20} height={20} />
                    <span className="text-xs font-medium">{item.title}</span>
                  </MotionLink>
                  <AnimatePresence>
                    {isActiveMenuItem ? (
                      <motion.div
                        className="absolute -bottom-1 left-0 z-0 h-0.5 w-full rounded-full bg-highlight"
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
      </div>
    </nav>
  )
}
