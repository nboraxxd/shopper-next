'use client'

import { toast } from 'sonner'
import { Dispatch, SetStateAction, useState } from 'react'
import { CheckIcon, ChevronsUpDownIcon, LoaderCircleIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import { Region } from '@/features/address/schemas'
import { RegionCommonInfo } from '@/features/address/types'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { Button, ButtonProps } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Popover, PopoverContent, PopoverContentBase, PopoverTrigger } from '@/shared/components/ui/popover'
import { useMediaQuery } from '@/shared/hooks'

type RegionComboboxProps = {
  label: string
  onSelect: (region: Region) => void
  regions: RegionCommonInfo[]
  isQueryRegionLoading?: boolean
  value?: string
  enablePopoverPortal?: boolean
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

const POPOVER_CONTENT_CLASS_NAME =
  'max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0'

export default function RegionCombobox(props: RegionComboboxProps) {
  const {
    isChosenParentRegion,
    isQueryRegionLoading,
    label,
    messageInfo,
    onSelect,
    regions,
    value,
    enablePopoverPortal = true,
  } = props

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const is768AndUp = useMediaQuery({ minWidth: 768 })

  return (
    <FormItem className="flex flex-1 flex-col md:space-y-1">
      <FormLabel className="w-fit first-letter:capitalize">{label}</FormLabel>
      {is768AndUp ? (
        <Popover
          open={popoverOpen}
          onOpenChange={(open) => (isChosenParentRegion ? setPopoverOpen(open) : toast.info(messageInfo))}
        >
          <PopoverTrigger asChild>
            <TriggerButton
              isChosenParentRegion={isChosenParentRegion}
              isQueryRegionLoading={isQueryRegionLoading}
              label={label}
              value={value}
            />
          </PopoverTrigger>
          {enablePopoverPortal ? (
            <PopoverContent className={POPOVER_CONTENT_CLASS_NAME}>
              <RegionCommand
                label={label}
                onSelect={onSelect}
                regions={regions}
                setOpen={setPopoverOpen}
                value={value}
              />
            </PopoverContent>
          ) : (
            <PopoverContentBase className={POPOVER_CONTENT_CLASS_NAME}>
              <RegionCommand
                label={label}
                onSelect={onSelect}
                regions={regions}
                setOpen={setPopoverOpen}
                value={value}
              />
            </PopoverContentBase>
          )}
        </Popover>
      ) : (
        <Drawer
          open={drawerOpen}
          onOpenChange={(open) => (isChosenParentRegion ? setDrawerOpen(open) : toast.info(messageInfo))}
        >
          <DrawerTrigger asChild>
            <TriggerButton
              isChosenParentRegion={isChosenParentRegion}
              isQueryRegionLoading={isQueryRegionLoading}
              label={label}
              value={value}
            />
          </DrawerTrigger>
          <DrawerContent className="bg-popover px-4 pb-6">
            <DrawerHeader className="mb-3 py-0">
              <DrawerTitle className="sr-only">Chọn {label.toLowerCase()}</DrawerTitle>
              <DrawerDescription className="sr-only">Chọn {label.toLowerCase()} từ danh sách dưới</DrawerDescription>
            </DrawerHeader>

            <RegionCommand label={label} onSelect={onSelect} regions={regions} setOpen={setDrawerOpen} value={value} />
          </DrawerContent>
        </Drawer>
      )}
      <FormMessage />
    </FormItem>
  )
}

interface RegionCommandProps extends Omit<RegionComboboxProps, 'isChosenParentRegion' | 'messageInfo'> {
  setOpen: Dispatch<SetStateAction<boolean>>
}

function RegionCommand({ isQueryRegionLoading, label, onSelect, regions, setOpen, value }: RegionCommandProps) {
  return (
    <Command>
      <CommandInput placeholder={`Tìm ${label.toLowerCase()}`} className="h-9 py-1" />
      <CommandList className="max-h-none">
        {!isQueryRegionLoading ? <CommandEmpty>Không tìm thấy kết quả nào</CommandEmpty> : null}
        <CommandGroup>
          {isQueryRegionLoading
            ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="mt-2 h-6 first:mt-0" />)
            : null}
          <ScrollArea className={cn(regions.length > 6 ? 'h-80 lg:h-52' : 'h-52 lg:h-auto')}>
            {regions
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((region) => (
                <CommandItem
                  key={region.code}
                  value={`${region.name} ${region.codename.replace(/_/g, ' ')}`}
                  onSelect={() => {
                    onSelect({ name: region.name, code: region.code })
                    setOpen(false)
                  }}
                  className="pl-2 pr-4"
                >
                  {region.name}
                  <CheckIcon className={cn('ml-auto', region.name === value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
          </ScrollArea>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

type TriggerButtonProps = Pick<
  RegionComboboxProps,
  'isChosenParentRegion' | 'label' | 'isQueryRegionLoading' | 'value'
> &
  ButtonProps

function TriggerButton(props: TriggerButtonProps) {
  const { isChosenParentRegion, label, isQueryRegionLoading, value, className, ...rest } = props

  return (
    <Button
      variant="outline"
      role="combobox"
      className={cn(
        'h-11 justify-between rounded-xl bg-accent px-3 py-1 text-sm lg:text-base [&_svg]:size-4',
        'focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0',
        {
          'text-muted-foreground': !value,
          'text-muted-foreground hover:text-muted-foreground': !isChosenParentRegion,
        },
        className
      )}
      {...rest}
    >
      <span className="flex items-center gap-1.5">
        {value ?? `Chọn ${label.toLowerCase()}`}
        {isQueryRegionLoading ? <LoaderCircleIcon className="animate-spin" /> : null}
      </span>
      <ChevronsUpDownIcon className="opacity-50" />
    </Button>
  )
}
