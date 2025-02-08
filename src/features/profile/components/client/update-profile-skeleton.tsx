import { Separator } from '@/shared/components/ui/separator'
import { Skeleton } from '@/shared/components/ui/skeleton'

export default function UpdateProfileSkeleton() {
  return (
    <div className="mt-3 md:mt-5">
      <div className="flex flex-col gap-2 md:flex-row-reverse md:items-start md:gap-0">
        <div className="flex justify-center md:basis-2/5 md:justify-start">
          <Separator orientation="vertical" className="mx-10 hidden h-auto md:block" />
          <div className="mx-auto flex flex-col items-center space-y-2 md:py-7">
            <Skeleton className="size-20 rounded-full md:size-24" />
            <Skeleton className="h-9 w-[6.75rem]" />
            <Skeleton className="h-5 w-48" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:basis-3/5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-1">
              <Skeleton className="h-5 w-24 md:h-[1.375rem]" />
              <Skeleton className="h-11 w-full" />
            </div>
          ))}

          <Skeleton className="h-11 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}
