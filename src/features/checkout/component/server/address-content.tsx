import addressServerApi from '@/features/address/api/server'
import { DefaultAddressResponse } from '@/features/address/types'
import { DeliveryAddress } from '@/features/checkout/component/client'
import { Skeleton } from '@/shared/components/ui/skeleton'

export async function AddressContent({ accessToken }: { accessToken: string }) {
  let defaultAddress: DefaultAddressResponse['data'] | null = null

  try {
    const addressResponse = await addressServerApi.getDefaultAddressFromBackend({ accessToken })
    defaultAddress = addressResponse.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  if (!defaultAddress) {
    return null
  }

  return <DeliveryAddress defaultAddress={defaultAddress[0]} />
}

export function AddressContentSkeleton() {
  return (
    <div className="space-y-1.5">
      <Skeleton className="h-[1.125rem] w-1/4 md:hidden" />
      <Skeleton className="h-[1.375rem] w-1/2 sm:w-48" />
      <div>
        <Skeleton className="h-[1.125rem] w-full xl:h-5" />
        <Skeleton className="mt-1 h-[1.125rem] w-full md:w-1/2 xl:hidden" />
        <Skeleton className="mt-1 h-[1.125rem] w-1/2 md:hidden" />
      </div>
      <Skeleton className="h-5 w-1/3 lg:w-96" />
      <Skeleton className="h-5 w-1/3 lg:hidden" />
    </div>
  )
}
