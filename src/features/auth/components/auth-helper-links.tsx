import { TextLink } from '@/shared/components'
import { cn } from '@/shared/utils'
import { Url } from 'next/dist/shared/lib/router/router'

type LinkItem = { href: Url; label: string }

interface Props {
  links: LinkItem | [LinkItem, LinkItem]
  className?: string
}

export default function AuthHelperLinks({ links, className }: Props) {
  return (
    <div className={cn('flex justify-end gap-1 text-sm xs:gap-1.5 xs:text-base', className)}>
      {Array.isArray(links) ? (
        <>
          <TextLink href={links[0].href}>{links[0].label}</TextLink>
          <span className="text-highlight">•</span>
          <TextLink href={links[1].href}>{links[1].label}</TextLink>
        </>
      ) : (
        <TextLink href={links.href}>{links.label}</TextLink>
      )}
    </div>
  )
}
