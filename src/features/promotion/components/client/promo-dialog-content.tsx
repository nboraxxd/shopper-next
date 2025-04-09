'use client'

import { format } from 'date-fns'
import { InfoIcon, XIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

import { cn } from '@/shared/utils'
import { useCurrentPromotion } from '@/features/cart/hooks'
import { useQueryPromotions } from '@/features/promotion/hooks'
import { PromotionServerItem, PromotionsResponseFromServer } from '@/features/promotion/types'

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import {
  PromotionButton,
  PromotionCard,
  PromotionContent,
  PromotionForm,
  PromotionImage,
  PromotionImageSkeleton,
  PromotionTooltip,
  PromotionTooltipCode,
  PromotionTooltipConditions,
  PromotionTooltipExpirationDate,
} from '@/features/promotion/components/client'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { ChevronDownIcon, Svgr } from '@/shared/components/icons'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible'

export default function PromoDialogContent({ isOpen }: { isOpen: boolean }) {
  const queryPromotions = useQueryPromotions({ enabled: isOpen })

  const currentPromotion = useCurrentPromotion((state) => state.currentPromotion)
  const setCurrentPromotion = useCurrentPromotion((state) => state.setCurrentPromotion)

  const [selectedPromo, setSelectedPromo] = useState<PromotionServerItem | null>(currentPromotion)

  return (
    <DialogContent
      className={cn(
        'px-0 py-4 sm:max-w-[30rem] sm:py-6',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
      )}
      isCloseIcon={false}
      isDefaultAnimation={false}
    >
      <DialogHeader className="space-y-4 px-3 sm:space-y-6 sm:px-6">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-base font-medium">Shopper khuyến mãi</DialogTitle>
          <DialogClose className="rounded-sm opacity-75 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">Nhập hoặc chọn mã giảm giá để nhận ưu đãi từ Shopper</DialogDescription>
        <PromotionForm />
      </DialogHeader>

      <ScrollArea className="mt-4 h-[500px] overflow-y-auto sm:mt-6">
        <div className="p-3 sm:px-6">
          {queryPromotions.isLoading ? (
            <>
              <PromoListSkeleton title="Mã giảm giá" />
              <PromoListSkeleton title="Mã vận chuyển" wrapperClassName="mt-3" />
            </>
          ) : null}
          {queryPromotions.isSuccess ? (
            <>
              <PromoList
                title="Mã giảm giá"
                promotions={queryPromotions.data.payload.data.filter((promo) => promo.type === 'discount')}
                selectedPromo={selectedPromo}
                setSelectedPromo={setSelectedPromo}
              />
              <PromoList
                title="Mã vận chuyển"
                promotions={queryPromotions.data.payload.data.filter((promo) => promo.type === 'shipping')}
                selectedPromo={selectedPromo}
                setSelectedPromo={setSelectedPromo}
                wrapperClassName="mt-3"
              />
            </>
          ) : null}
        </div>
      </ScrollArea>
      <DialogFooter className="mt-4 px-2 sm:mt-6 sm:px-6">
        <DialogClose asChild>
          <Button
            className="h-9 w-full sm:h-11"
            onClick={() => {
              setCurrentPromotion(selectedPromo)
            }}
          >
            Xong
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

interface PromoListProps {
  title: string
  promotions: PromotionsResponseFromServer['data']
  selectedPromo: PromotionServerItem | null
  setSelectedPromo: Dispatch<SetStateAction<PromotionServerItem | null>>
  wrapperClassName?: string
}

function PromoList({ title, promotions, selectedPromo, setSelectedPromo, wrapperClassName }: PromoListProps) {
  const STARTING_VISIBLE_PROMOTIONS = 2

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={cn(wrapperClassName)}>
      <p className="mb-2 font-medium text-secondary-2">{title}</p>
      <Collapsible className="space-y-2" open={isExpanded} onOpenChange={setIsExpanded}>
        {promotions.slice(0, STARTING_VISIBLE_PROMOTIONS).map((promo) => (
          <PromoItem key={promo._id} promo={promo} selectedPromo={selectedPromo} setSelectedPromo={setSelectedPromo} />
        ))}

        <CollapsibleContent className="space-y-2">
          {promotions.slice(STARTING_VISIBLE_PROMOTIONS).map((promo) => (
            <PromoItem
              key={promo._id}
              promo={promo}
              selectedPromo={selectedPromo}
              setSelectedPromo={setSelectedPromo}
            />
          ))}
        </CollapsibleContent>

        {promotions.length > STARTING_VISIBLE_PROMOTIONS ? (
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-full gap-1 text-highlight [&_svg]:size-4">
              {isExpanded ? 'Thu gọn' : 'Xem thêm '}
              {!isExpanded ? `(${promotions.length - STARTING_VISIBLE_PROMOTIONS})` : null}
              <Svgr icon={ChevronDownIcon} className={cn({ 'rotate-180 transition-transform': isExpanded })} />
            </Button>
          </CollapsibleTrigger>
        ) : null}
      </Collapsible>
    </div>
  )
}

function PromoItem(props: { promo: PromotionServerItem } & Pick<PromoListProps, 'selectedPromo' | 'setSelectedPromo'>) {
  const { promo, selectedPromo, setSelectedPromo } = props

  function toggleCurrentPromotion() {
    if (promo.status !== 'active') return

    if (selectedPromo?._id === promo._id) {
      setSelectedPromo(null)
    } else {
      setSelectedPromo(promo)
    }
  }

  return (
    <PromotionCard>
      <PromotionImage
        src={promo.image}
        alt={promo.title}
        width={60}
        height={60}
        className={cn({ 'grayscale opacity-70': promo.status !== 'active' })}
      />
      <PromotionContent>
        <div
          className={cn('flex flex-col gap-0.5 sm:justify-between', {
            'opacity-50': promo.status !== 'active',
          })}
        >
          <p className="text-xs font-medium sm:text-base">{promo.title}</p>
          <p className="text-[0.625rem] text-secondary-2 sm:text-sm">
            HSD: <span>{format(new Date(promo.exp), 'dd/MM/yyyy')}</span>
          </p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <InfoIcon className="block size-3 text-secondary-2 sm:size-4 lg:hidden" />
          <PromotionTooltip isPortal={false} side="bottom" sideOffset={10} align="end" alignOffset={-25}>
            <PromotionTooltipCode code={promo.code} />
            <PromotionTooltipExpirationDate expirationDate={new Date(promo.exp)} />
            <PromotionTooltipConditions conditions={promo.conditions} />
          </PromotionTooltip>
          <PromotionButton disabled={promo.status !== 'active'} onClick={toggleCurrentPromotion}>
            {selectedPromo?._id === promo._id ? 'Bỏ chọn' : 'Áp dụng'}
          </PromotionButton>
        </div>
      </PromotionContent>
    </PromotionCard>
  )
}

function PromoListSkeleton({ title, wrapperClassName }: { title: string; wrapperClassName?: string }) {
  return (
    <div className={cn('space-y-2', wrapperClassName)}>
      <p className="font-medium text-secondary-2">{title}</p>
      {Array.from({ length: 2 }).map((_, index) => (
        <PromotionCard key={index}>
          <PromotionImageSkeleton />
          <PromotionContent>
            <div className="flex flex-col gap-0.5 sm:justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-28" />
            </div>
          </PromotionContent>
        </PromotionCard>
      ))}
      <Button variant="ghost" size="sm" className="h-8 w-full gap-1 text-highlight [&_svg]:size-4" asChild>
        <span>
          Xem thêm
          <Svgr icon={ChevronDownIcon} />
        </span>
      </Button>
    </div>
  )
}
