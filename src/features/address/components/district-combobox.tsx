'use client'

import { Region } from '@/features/address/schemas'
import { useQueryDistrictsFromServer } from '@/features/address/hooks'

import { RegionCombobox } from '@/features/address/components'

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
      isQueryRegionSuccess={queryDistrictsFromBackend.isSuccess}
      disabled={!provinceCode || !queryDistrictsFromBackend.isSuccess}
    />
  )
}
