'use client'

import { RegionCombobox } from '@/features/address/components'
import { useQueryWardsFromServer } from '@/features/address/hooks'
import { Region } from '@/features/address/schemas'

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
      isQueryRegionSuccess={queryWardsFromBackend.isSuccess}
      disabled={!districtCode || !queryWardsFromBackend.isSuccess}
    />
  )
}
