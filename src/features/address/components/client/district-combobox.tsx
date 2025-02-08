'use client'

import { Region } from '@/features/address/schemas'
import { useQueryDistrictsFromServer } from '@/features/address/hooks'

import { RegionCombobox } from '@/features/address/components/client'
import { DistrictsResponseFromBackend } from '@/features/address/types'

interface Props {
  value?: string
  provinceCode?: number
  initialDistricts?: DistrictsResponseFromBackend['districts']
  onSelect: (region: Region) => void
}

export default function DistrictCombobox({ value, provinceCode, initialDistricts, onSelect }: Props) {
  const queryDistrictsFromBackend = useQueryDistrictsFromServer(initialDistricts ? undefined : provinceCode)

  return (
    <RegionCombobox
      label="Quận/huyện"
      value={value}
      onSelect={onSelect}
      regions={queryDistrictsFromBackend.data?.payload.data ?? initialDistricts ?? []}
      isQueryRegionLoading={queryDistrictsFromBackend.isLoading}
      isChosenParentRegion={!!provinceCode || !!initialDistricts}
      messageInfo="Vui lòng chọn tỉnh/thành phố trước"
    />
  )
}
