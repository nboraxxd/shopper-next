'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { CopyCheckIcon, CopyIcon, InfoIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import { useCopyToClipboard } from '@/shared/hooks'

import { Button, ButtonProps } from '@/shared/components/ui/button'
import { PromotionBgSmIcon } from '@/shared/components/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipContentWithoutPortal,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { Skeleton } from '@/shared/components/ui/skeleton'

interface PromotionCardProps {
  children: React.ReactNode
  wrapperClassname?: string
  bgClassName?: string
  cardClassName?: string
}

/**
 * Anatomy of PromotionCard
 * ```
 * <PromotionCard>
 *  <PromotionCard.Image />
 * <PromotionCard.Content>
 *  <PromotionCard.Title />
 *  <PromotionCard.ExpirationDate />
 *  <PromotionCard.PromotionInfoIcon />
 *  <PromotionCard.Tooltip>
 *   <PromotionCard.TooltipCode />
 *   <PromotionCard.TooltipExpirationDate />
 *   <PromotionCard.TooltipConditions />
 *  </PromotionCard.Tooltip>
 * </PromotionCard.Content>
 * </PromotionCard>
 * ```
 */
export function PromotionCard({ children, wrapperClassname, bgClassName, cardClassName }: PromotionCardProps) {
  return (
    <div className={cn('relative', wrapperClassname)}>
      <PromotionBgSmIcon
        className={cn(
          'w-full fill-promotion-card text-promotion-card-foreground [filter:drop-shadow(0px_1px_3px_rgba(0,0,0,0.15))]',
          bgClassName
        )}
      />
      <div className={cn('absolute inset-0 flex items-center', cardClassName)}>{children}</div>
    </div>
  )
}

interface PromotionImageProps extends React.ComponentProps<typeof Image> {
  wrapperClassname?: string
}

export function PromotionImage({ wrapperClassname, className, alt, ...props }: PromotionImageProps) {
  return (
    <div className={cn('flex h-full w-[21.25%] shrink-0 items-center justify-center p-2 xs:p-3', wrapperClassname)}>
      <Image
        {...props}
        alt={alt}
        className={cn('size-9 rounded object-contain drop-shadow-xl xs:size-12', className)}
      />
    </div>
  )
}

export function PromotionImageSkeleton() {
  return (
    <div className="flex h-full w-[21.25%] shrink-0 items-center justify-center p-2 xs:p-3">
      <Skeleton className="size-12 xs:size-16" />
    </div>
  )
}

export function PromotionContent({ children, classname }: { children: React.ReactNode; classname?: string }) {
  return <div className={cn('flex size-full justify-between gap-1 p-2 xs:p-3', classname)}>{children}</div>
}

interface PromotionTooltipProps {
  children: React.ReactNode
  className?: string
  delayDuration?: number
  triggerClassname?: string
  align?: 'center' | 'end' | 'start'
  alignOffset?: number
  side?: 'bottom' | 'top' | 'right' | 'left'
  sideOffset?: number
  isPortal?: boolean
}

const ITEM_TOOLTIP_CLASSNAME = 'flex items-center gap-x-8 px-4 py-2 text-sm'
const ITEM_TITLE_TOOLTIP_CLASSNAME = 'inline-block min-w-20 text-secondary-2'

export function PromotionTooltip(props: PromotionTooltipProps) {
  const { children, className, delayDuration = 100, triggerClassname, isPortal = true, ...rest } = props

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn('relative hidden size-auto p-0.5 lg:inline-flex [&_svg]:size-4', triggerClassname)}
          >
            <InfoIcon className="text-secondary-2" />
          </Button>
        </TooltipTrigger>
        {isPortal ? (
          <TooltipContent
            className={cn('max-w-sm rounded-lg bg-cart-section p-3 text-foreground shadow-popover', className)}
            {...rest}
          >
            {children}
          </TooltipContent>
        ) : (
          <TooltipContentWithoutPortal
            className={cn('max-w-sm rounded-lg bg-cart-section p-3 text-foreground shadow-popover', className)}
            {...rest}
          >
            {children}
          </TooltipContentWithoutPortal>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export function PromotionTooltipCode({ code }: { code: string }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const hasCopiedText = Boolean(copiedText)

  useEffect(() => {
    if (hasCopiedText) {
      setTimeout(() => {
        copyToClipboard(null)
      }, 2000)
    }
  }, [copyToClipboard, hasCopiedText])

  function handleCopy() {
    if (hasCopiedText) return
    copyToClipboard(code)
    toast.success('Đã sao chép mã giảm giá')
  }

  return (
    <div className={cn(ITEM_TOOLTIP_CLASSNAME, 'rounded-lg bg-cart')}>
      <span className={cn(ITEM_TITLE_TOOLTIP_CLASSNAME)}>Mã</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">{code}</span>
        <Button
          variant="ghost"
          className="size-auto rounded-full p-1.5 text-highlight hover:bg-highlight/10 [&_svg]:size-4"
          onClick={handleCopy}
        >
          {hasCopiedText ? <CopyCheckIcon /> : <CopyIcon />}
        </Button>
      </div>
    </div>
  )
}

export function PromotionTooltipExpirationDate({ expirationDate }: { expirationDate: Date }) {
  return (
    <div className={cn(ITEM_TOOLTIP_CLASSNAME)}>
      <span className={cn(ITEM_TITLE_TOOLTIP_CLASSNAME)}>HSD</span>
      <span className="font-medium">{format(expirationDate, 'dd/MM/yyyy')}</span>
    </div>
  )
}

export function PromotionTooltipConditions({ conditions }: { conditions: string[] }) {
  return (
    <div className={cn(ITEM_TOOLTIP_CLASSNAME, 'flex-col items-start gap-1 rounded-lg bg-cart')}>
      <span className={cn(ITEM_TITLE_TOOLTIP_CLASSNAME)}>Điều kiện</span>
      <ul className="space-y-1 pl-6">
        {conditions.map((condition, index) => (
          <li key={index} className="list-disc font-medium">
            {condition}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PromotionButton({ children, className, ...rest }: ButtonProps) {
  return (
    <Button
      className={cn('h-5 px-1.5 py-0 text-[0.625rem] font-medium sm:h-7 sm:px-2 sm:text-xs', className)}
      {...rest}
    >
      {children}
    </Button>
  )
}
