'use client'

import { Region } from '@/features/address/schemas'
import { useQueryDistrictsFromServer } from '@/features/address/hooks'

import { RegionCombobox } from '@/features/address/components/client'
import { DistrictsResponseFromBackend } from '@/features/address/types'

interface Props {
  value?: string
  provinceCode?: number
  initialDistricts?: DistrictsResponseFromBackend['districts']
  enablePopoverPortal?: boolean
  onSelect: (region: Region) => void
}

export default function DistrictCombobox(props: Props) {
  const { value, provinceCode, initialDistricts, enablePopoverPortal, onSelect } = props

  const queryDistricts = useQueryDistrictsFromServer(initialDistricts ? undefined : provinceCode)

  return (
    <RegionCombobox
      label="Quận/huyện"
      value={value}
      onSelect={onSelect}
      regions={queryDistricts.data?.payload.data ?? initialDistricts ?? []}
      isQueryRegionLoading={queryDistricts.isLoading}
      isChosenParentRegion={!!provinceCode || !!initialDistricts}
      messageInfo="Vui lòng chọn tỉnh/thành phố trước"
      enablePopoverPortal={enablePopoverPortal}
    />
  )
}
