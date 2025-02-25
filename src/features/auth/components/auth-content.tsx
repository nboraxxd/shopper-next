import { Slot } from '@radix-ui/react-slot'
import { Url } from 'next/dist/shared/lib/router/router'

import { TextLink } from '@/shared/components'

/**
 * AuthContent is a wrapper component for authentication pages.
 *
 * Anatomy of an AuthContent:
 * ```tsx
 * <AuthContent>
 *   <AuthContent.Heading>Heading</AuthContent.Heading>
 *   <AuthContent.Description>Description</AuthContent.Description>
 *   <AuthContent.Form>
 *     <Form />
 *   </AuthContent.Form>
 *   <AuthContent.Redirect href={somewherePath} label="Redirect to somewhere">
 *     Somewhere
 *   </AuthContent.Redirect>
 * </AuthContent>
 * ```
 */
export default function AuthContent({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}

function AuthHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-7 text-center text-3xl font-medium uppercase text-auth-content-heading sm:text-4xl">
      {children}
    </h2>
  )
}

function AuthDescription({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-2.5 text-balance text-center text-sm font-medium text-auth-content-foreground sm:text-base">
      {children}
    </h3>
  )
}

function AuthForm({ children, asChild = true }: { children: React.ReactNode; asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return <Comp>{children}</Comp>
}

interface AuthRedirectProps {
  href: Url
  label: string
  children: React.ReactNode
}

function AuthRedirect({ href, label, children }: AuthRedirectProps) {
  return (
    <div className="mt-7 flex items-center justify-center gap-2.5 sm:text-lg lg:mt-10">
      <span className="text-auth-content-foreground">{label}</span>
      <TextLink href={href}>{children}</TextLink>
    </div>
  )
}

AuthContent.Heading = AuthHeading
AuthContent.Description = AuthDescription
AuthContent.Form = AuthForm
AuthContent.Redirect = AuthRedirect
