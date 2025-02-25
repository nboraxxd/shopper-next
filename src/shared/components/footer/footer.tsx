import Link from 'next/link'

import { cn } from '@/shared/utils'

import { ModeToggle } from '@/shared/components'
import { FooterIndicator } from '@/shared/components/footer'

export default function Footer({ className }: { className?: string }) {
  return (
    <>
      <FooterIndicator />
      <footer
        className={cn(
          'flex w-full flex-col items-center gap-2 bg-footer px-8 py-12 text-sm font-light sm:px-16 md:px-0',
          className
        )}
      >
        <div className="container flex w-full flex-col justify-between gap-4">
          <p className="mx-auto text-balance text-center font-medium">
            The project was inspired by{' '}
            <Link href="https://spacedev.vn/course/react" className="text-primary-purple underline">
              React course
            </Link>{' '}
            by{' '}
            <Link href="https://spacedev.vn" className="text-primary-purple underline">
              Spacedev
            </Link>{' '}
            and{' '}
            <Link href="https://fullstack.edu.vn/landing/htmlcss" className="text-primary-purple underline">
              HTML & CSS course
            </Link>{' '}
            by{' '}
            <Link href="https://fullstack.edu.vn" className="text-primary-purple underline">
              F8
            </Link>
            .
          </p>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center rounded-full border bg-popover p-1">
              <ModeToggle />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
