'use client'

import { Region } from '@/features/address/schemas'
import { useQueryWardsFromServer } from '@/features/address/hooks'

import { RegionCombobox } from '@/features/address/components/client'
import { WardsResponseFromBackend } from '@/features/address/types'

interface Props {
  value?: string
  districtCode?: number
  initialWards?: WardsResponseFromBackend['wards']
  enablePopoverPortal?: boolean
  onSelect: (region: Region) => void
}

export default function WardCombobox({ value, districtCode, initialWards, enablePopoverPortal, onSelect }: Props) {
  const queryWardsFromBackend = useQueryWardsFromServer(initialWards ? undefined : districtCode)

  return (
    <RegionCombobox
      label="Phường/xã"
      value={value}
      onSelect={onSelect}
      regions={queryWardsFromBackend.data?.payload.data ?? initialWards ?? []}
      isQueryRegionLoading={queryWardsFromBackend.isLoading}
      isChosenParentRegion={!!districtCode || !!initialWards}
      messageInfo="Vui lòng chọn quận/huyện trước"
      enablePopoverPortal={enablePopoverPortal}
    />
  )
}
