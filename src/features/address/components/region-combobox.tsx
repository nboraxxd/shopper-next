'use client'

import { CUSTOM_PROFILE_LABEL_CLASSNAME } from '@/features/profile/constants'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

import { Button } from '@/shared/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { cn } from '@/shared/utils'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Region } from '@/features/address/schemas'
import { RegionCommonInfo } from '@/features/address/types'

interface Props {
  label: string
  onSelect: (value: Region) => void
  regions: RegionCommonInfo[]
  disabled?: boolean
  isQueryRegionSuccess?: boolean
  value?: string
}

export default function RegionCombobox({
  disabled = false,
  isQueryRegionSuccess = true,
  label,
  onSelect,
  regions,
  value,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <FormItem className="flex flex-col space-y-1">
      <FormLabel className={cn(CUSTOM_PROFILE_LABEL_CLASSNAME, 'first-letter:capitalize')}>{label}</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className={cn(
            'h-11 justify-between rounded-xl px-3 py-1 disabled:cursor-not-allowed xl:text-sm 2xl:text-base [&_svg]:size-4',
            'focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0',
            {
              'text-muted-foreground': !value,
            }
          )}
          disabled={disabled}
        >
          <FormControl>
            <Button variant="outline" role="combobox">
              {value ?? `Chọn ${label.toLowerCase()}`}
              <ChevronDownIcon className="opacity-50" />
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
                  <ScrollArea className="h-52">
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
