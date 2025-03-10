'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { CheckIcon, ChevronsUpDownIcon, LoaderCircleIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import { Region } from '@/features/address/schemas'
import { RegionCommonInfo } from '@/features/address/types'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Popover, PopoverContentBase, PopoverTrigger } from '@/shared/components/ui/popover'

type Props = {
  label: string
  onSelect: (region: Region) => void
  regions: RegionCommonInfo[]
  isQueryRegionLoading?: boolean
  value?: string
} & (
  | {
      isChosenParentRegion: true
      messageInfo?: never
    }
  | {
      isChosenParentRegion: boolean
      messageInfo: string
    }
)

export default function RegionCombobox(props: Props) {
  const { isChosenParentRegion, isQueryRegionLoading, label, messageInfo, onSelect, regions, value } = props

  const [open, setOpen] = useState(false)

  return (
    <FormItem className="flex flex-1 flex-col md:space-y-1">
      <FormLabel className="w-fit first-letter:capitalize">{label}</FormLabel>
      <Popover open={open} onOpenChange={(open) => (isChosenParentRegion ? setOpen(open) : toast.info(messageInfo))}>
        <PopoverTrigger
          asChild
          className={cn(
            'h-11 justify-between rounded-xl bg-accent px-3 py-1 xl:text-sm 2xl:text-base [&_svg]:size-4',
            'focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0',
            {
              'text-muted-foreground': !value,
              'text-muted-foreground hover:text-muted-foreground': !isChosenParentRegion,
            }
          )}
        >
          <Button variant="outline" role="combobox" className="[&_svg]:size-4">
            <span className="flex items-center gap-1.5">
              {value ?? `Chọn ${label.toLowerCase()}`}
              {isQueryRegionLoading ? <LoaderCircleIcon className="animate-spin" /> : null}
            </span>
            <ChevronsUpDownIcon className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContentBase
          className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={`Tìm ${label.toLowerCase()}`} className="h-9 py-1" />
            <CommandList className="max-h-full">
              {!isQueryRegionLoading ? <CommandEmpty>Không tìm thấy kết quả nào</CommandEmpty> : null}
              <CommandGroup>
                {isQueryRegionLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton key={index} className="mt-2 h-6 first:mt-0" />
                    ))
                  : null}
                <ScrollArea className={cn(regions.length > 6 ? 'h-52' : 'h-auto')}>
                  {regions
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((region) => (
                      <CommandItem
                        value={`${region.name} ${region.codename.replace(/_/g, ' ')}`}
                        key={region.code}
                        onSelect={() => {
                          onSelect({ name: region.name, code: region.code })
                          setOpen(false)
                        }}
                      >
                        {region.name}
                        <CheckIcon className={cn('ml-auto', region.name === value ? 'opacity-100' : 'opacity-0')} />
                      </CommandItem>
                    ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContentBase>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
