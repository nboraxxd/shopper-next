import { Skeleton } from '@/shared/components/ui/skeleton'

export default function AddressFormSkeleton() {
  return (
    <div className="mt-3 md:mt-5">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-1.5">
            <Skeleton className="h-5 w-36 md:h-6" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}

        <div className="flex flex-col gap-4 xl:flex-row">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex-1 space-y-1.5">
              <Skeleton className="h-5 w-36 md:h-6" />
              <Skeleton className="h-11 w-full" />
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <Skeleton className="h-5 w-36 md:h-6" />
          <Skeleton className="h-[3.625rem] w-full" />
        </div>

        <Skeleton className="h-[1.625rem] w-64" />

        <Skeleton className="h-11 w-36 rounded-full" />
      </div>
    </div>
  )
}
