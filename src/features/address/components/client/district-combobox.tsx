'use client'

import { Region } from '@/features/address/schemas'
import { useQueryDistrictsFromServer } from '@/features/address/hooks'

import { RegionCombobox } from '@/features/address/components/client'

interface Props {
  value: string | undefined
  provinceCode: number | undefined
  onSelect: (value: Region) => void
}

export default function DistrictCombobox({ value, provinceCode, onSelect }: Props) {
  const queryDistrictsFromBackend = useQueryDistrictsFromServer(provinceCode)

  return (
    <RegionCombobox
      label="Quận/huyện"
      value={value}
      onSelect={onSelect}
      regions={queryDistrictsFromBackend.data?.payload.data ?? []}
      isQueryRegionLoading={queryDistrictsFromBackend.isLoading}
      isQueryRegionSuccess={queryDistrictsFromBackend.isSuccess}
      isChosenParentRegion={!!provinceCode}
      messageInfo="Vui lòng chọn tỉnh/thành phố trước"
    />
  )
}
