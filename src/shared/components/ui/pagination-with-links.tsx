'use client'

import { type ReactNode, useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination'
import { cn } from '@/shared/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

export interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string
    pageSizeOptions: number[]
  }
  totalPage: number
  pageSize: number
  page: number
  pageSearchParam?: string
}

/**
 * Navigate with Nextjs links (need to update your own `pagination.tsx` to use Nextjs Link)
 * 
 * @example
 * ```
 * <PaginationWithLinks
    page={1}
    pageSize={20}
    totalPage={25}
  />
 * ```
 */
export function PaginationWithLinks({
  pageSizeSelectOptions,
  pageSize,
  totalPage,
  page,
  pageSearchParam,
}: PaginationWithLinksProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || 'page'
      if (!searchParams) return `${pathname}?${key}=${newPage}`
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(key, String(newPage))
      return `${pathname}?${newSearchParams.toString()}`
    },
    [pageSearchParam, pathname, searchParams]
  )

  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const key = pageSizeSelectOptions?.pageSizeSearchParam || 'pageSize'
      const newSearchParams = new URLSearchParams(searchParams || undefined)
      newSearchParams.set(key, String(newPageSize))
      newSearchParams.delete(pageSearchParam || 'page') // Clear the page number when changing page size
      router.push(`${pathname}?${newSearchParams.toString()}`)
    },
    [pageSearchParam, pageSizeSelectOptions?.pageSizeSearchParam, pathname, router, searchParams]
  )

  const renderPageNumbers = () => {
    const items: ReactNode[] = []
    const maxVisiblePages = 5

    if (totalPage <= maxVisiblePages) {
      for (let i = 1; i <= totalPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={buildLink(1)} isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPage, page + 1)

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (page < totalPage - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }

    return items
  }

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-3 md:mt-7 md:flex-row">
      {pageSizeSelectOptions && (
        <div className="flex flex-1 flex-col gap-4">
          <SelectRowsPerPage
            options={pageSizeSelectOptions.pageSizeOptions}
            setPageSize={navToPageSize}
            pageSize={pageSize}
          />
        </div>
      )}
      <Pagination className={cn({ 'md:justify-end': pageSizeSelectOptions })}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={page === 1 ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, totalPage))}
              aria-disabled={page === totalPage}
              tabIndex={page === totalPage ? -1 : undefined}
              className={page === totalPage ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function SelectRowsPerPage({
  options,
  setPageSize,
  pageSize,
}: {
  options: number[]
  setPageSize: (newSize: number) => void
  pageSize: number
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-sm">Rows per page</span>

      <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
        <SelectTrigger>
          <SelectValue placeholder="Select page size">{String(pageSize)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
