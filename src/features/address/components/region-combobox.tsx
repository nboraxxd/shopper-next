'use client'

import { useState } from 'react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import { Region } from '@/features/address/schemas'
import { RegionCommonInfo } from '@/features/address/types'
import { CUSTOM_PROFILE_LABEL_CLASSNAME } from '@/features/profile/constants'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface Props {
  label: string
  onSelect: (value: Region) => void
  regions: RegionCommonInfo[]
  disabled?: boolean
  isQueryRegionSuccess?: boolean
  value?: string
}

export default function RegionCombobox(props: Props) {
  const { disabled = false, isQueryRegionSuccess = true, label, onSelect, regions, value } = props

  const [open, setOpen] = useState(false)

  return (
    <FormItem className="flex flex-1 flex-col space-y-1">
      <FormLabel className={cn(CUSTOM_PROFILE_LABEL_CLASSNAME, 'first-letter:capitalize')}>{label}</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className={cn(
            'h-11 justify-between rounded-xl bg-accent px-3 py-1 xl:text-sm 2xl:text-base [&_svg]:size-4',
            'focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0 disabled:hover:bg-background disabled:hover:text-muted-foreground',
            {
              'text-muted-foreground': !value,
            }
          )}
          disabled={disabled}
        >
          <FormControl>
            <Button variant="outline" role="combobox">
              {value ?? `Chọn ${label.toLowerCase()}`}
              <ChevronsUpDownIcon className="opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder={`Tìm ${label.toLowerCase()}`} className="h-9 py-1" />
            <CommandList className="max-h-full">
              <CommandEmpty>Không tìm thấy kết quả nào</CommandEmpty>
              {isQueryRegionSuccess ? (
                <CommandGroup>
                  <ScrollArea className={cn(regions.length > 6 ? 'h-52' : 'h-auto')}>
                    {regions
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((region) => (
                        <CommandItem
                          value={region.name}
                          key={region.code}
                          onSelect={(value) => {
                            onSelect({ name: value, code: region.code })
                            setOpen(false)
                          }}
                        >
                          {region.name}
                          <CheckIcon className={cn('ml-auto', region.name === value ? 'opacity-100' : 'opacity-0')} />
                        </CommandItem>
                      ))}
                  </ScrollArea>
                </CommandGroup>
              ) : null}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
