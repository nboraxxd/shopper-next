'use client'

import { CUSTOM_PROFILE_LABEL_CLASSNAME } from '@/features/profile/constants'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

import { ProvincesResponseFromBackend } from '@/features/address/types'
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

interface Props {
  value: string | undefined
  provinces: ProvincesResponseFromBackend
  onSelect: (value: Region) => void
}

export default function ProvinceCombobox({ value, provinces, onSelect }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <FormItem className="flex flex-col space-y-1">
      <FormLabel className={CUSTOM_PROFILE_LABEL_CLASSNAME}>Tỉnh/thành phố</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn('h-11 justify-between px-3 py-1 [&_svg]:size-5', {
                'text-muted-foreground': !value,
              })}
            >
              {value ?? 'Chọn tỉnh/thành phố'}
              <ChevronDownIcon className="opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Tìm tỉnh/thành phố" className="h-9 py-1" />
            <CommandList>
              <CommandEmpty>Không tìm thấy kết quả nào</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-52">
                  {provinces.map((province) => (
                    <CommandItem
                      value={province.name}
                      key={province.code}
                      onSelect={(value) => {
                        onSelect({ code: province.code, name: value })
                        setOpen(false)
                      }}
                    >
                      {province.name}
                      <CheckIcon className={cn('ml-auto', province.name === value ? 'opacity-100' : 'opacity-0')} />
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
