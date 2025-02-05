'use client'

import { Region } from '@/features/address/schemas'
import { useQueryWardsFromServer } from '@/features/address/hooks'

import { RegionCombobox } from '@/features/address/components/client'

interface Props {
  value: string | undefined
  districtCode: number | undefined
  onSelect: (value: Region) => void
}

export default function WardCombobox({ value, districtCode, onSelect }: Props) {
  const queryWardsFromBackend = useQueryWardsFromServer(districtCode)

  return (
    <RegionCombobox
      label="Phường/xã"
      value={value}
      onSelect={onSelect}
      regions={queryWardsFromBackend.data?.payload.data ?? []}
      isQueryRegionLoading={queryWardsFromBackend.isLoading}
      isQueryRegionSuccess={queryWardsFromBackend.isSuccess}
      isChosenParentRegion={!!districtCode}
      messageInfo="Vui lòng chọn quận/huyện trước"
    />
  )
}
