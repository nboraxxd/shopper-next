import { cn } from '@/shared/utils'

import { ModeToggle, TextLink } from '@/shared/components'
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
            The project was inspired by the React course by <TextLink href="https://spacedev.vn">Spacedev</TextLink>.
          </p>
          <div className="ml-auto flex items-center">
            <ModeToggle />
          </div>
        </div>
      </footer>
    </>
  )
}
