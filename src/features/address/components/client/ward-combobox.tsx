'use client'

import { useEffect, useState } from 'react'

import { Region } from '@/features/address/schemas'
import { useQueryWardsFromServer } from '@/features/address/hooks'

import { RegionCombobox } from '@/features/address/components/client'
import { WardsResponseFromBackend } from '@/features/address/types'

interface Props {
  value?: string
  districtCode?: number
  initialWards?: WardsResponseFromBackend['wards']
  onSelect: (region: Region) => void
}

export default function WardCombobox({ value, districtCode, initialWards, onSelect }: Props) {
  const [localWards, setLocalWards] = useState(initialWards)

  const queryWardsFromBackend = useQueryWardsFromServer(localWards ? undefined : districtCode)

  useEffect(() => {
    if (localWards) setLocalWards(undefined)
  }, [localWards, districtCode])

  return (
    <RegionCombobox
      label="Phường/xã"
      value={value}
      onSelect={(region) => {
        onSelect(region)
        if (localWards) {
          setLocalWards(undefined)
        }
      }}
      regions={queryWardsFromBackend.data?.payload.data ?? localWards ?? []}
      isQueryRegionLoading={queryWardsFromBackend.isLoading}
      isChosenParentRegion={!!districtCode || !!localWards}
      messageInfo="Vui lòng chọn quận/huyện trước"
    />
  )
}
