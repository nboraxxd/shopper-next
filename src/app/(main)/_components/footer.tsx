import Link from 'next/link'
import { ModeToggle } from '@/app/(main)/_components'

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-2 bg-frame px-8 py-12 text-sm font-light sm:px-16 md:px-0">
      <div className="container flex flex-col-reverse justify-between gap-8 md:flex-row md:items-end md:gap-2">
        <div>
          The project was inspired by <Link href="https://spacedev.vn/course/react">React course</Link> by SpaceDev and
          and <Link href="https://fullstack.edu.vn/landing/htmlcss">HTML & CSS course</Link> by F8.
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border bg-popover p-1">
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
