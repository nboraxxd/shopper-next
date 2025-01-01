import Link from 'next/link'

import { NAVBAR } from '@/app/(main)/constants'
import { Button } from '@/components/ui/button'
import { SearchIcon, ShopperIcon } from '@/assets/icons'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-header-height bg-frame shadow-section">
      <div className="container flex h-full items-center gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3.5">
          <ShopperIcon className="size-8" />
          <span className="text-bold-22">Shopper</span>
        </Link>

        <nav className="max-lg:hidden lg:ml-10 xl:ml-32">
          <ul className="flex items-center">
            {NAVBAR.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="flex items-center px-4 py-2 text-medium-15">
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 md:ml-auto">
          <Button
            size="icon"
            variant="ghost"
            className="size-11 rounded-md shadow-sm hover:bg-background/40 md:bg-popover md:hover:bg-popover/80 lg:size-12"
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
    </header>
  )
}
