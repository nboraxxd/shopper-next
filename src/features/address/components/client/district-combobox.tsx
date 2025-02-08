'use client'

import { useEffect, useState } from 'react'

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

export default function DistrictCombobox({ value, provinceCode, onSelect, initialDistricts }: Props) {
  const [localDistricts, setLocalDistricts] = useState(initialDistricts)

  const queryDistrictsFromBackend = useQueryDistrictsFromServer(localDistricts ? undefined : provinceCode)

  useEffect(() => {
    console.log('chay do day')
    if (localDistricts) setLocalDistricts(undefined)
  }, [localDistricts, provinceCode])

  return (
    <RegionCombobox
      label="Quận/huyện"
      value={value}
      onSelect={(region) => {
        onSelect(region)
        if (localDistricts) {
          setLocalDistricts(undefined)
        }
      }}
      regions={queryDistrictsFromBackend.data?.payload.data ?? localDistricts ?? []}
      isQueryRegionLoading={queryDistrictsFromBackend.isLoading}
      isChosenParentRegion={!!provinceCode || !!localDistricts}
      messageInfo="Vui lòng chọn tỉnh/thành phố trước"
    />
  )
}
