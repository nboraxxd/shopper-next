'use client'

import { LoaderCircleIcon } from 'lucide-react'
import { ComponentProps, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { cn, formatSecondsToMMSS } from '@/shared/utils'

import { Button } from '@/shared/components/ui/button'

interface Props extends ComponentProps<'button'> {
  children: ReactNode
  timer: number
  className?: string
  isLoading?: boolean
  enableCountdown?: boolean
  setEnableCountdown?: Dispatch<SetStateAction<boolean>>
}

export default function CountdownButton(props: Props) {
  const { children, timer, enableCountdown, setEnableCountdown, className, isLoading, disabled, ...rest } = props

  const [isWaiting, setIsWaiting] = useState(Boolean(enableCountdown))
  const [countdown, setCountdown] = useState(timer)
  const [startTime, setStartTime] = useState<number | null>(null) // Lưu timestamp bắt đầu

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isWaiting) {
      const updateCountdown = () => {
        if (startTime) {
          const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
          const remaining = Math.max(timer - elapsedSeconds, 0)

          setCountdown(remaining)
          if (remaining === 0) {
            setIsWaiting(false)
            if (setEnableCountdown) setEnableCountdown(false)
            clearInterval(interval)
          }
        }
      }

      interval = setInterval(updateCountdown, 1000)
      updateCountdown() // Cập nhật ngay lập tức khi component mount
    }

    return () => {
      clearInterval(interval)
    }
  }, [isWaiting, setEnableCountdown, startTime, timer])

  useEffect(() => {
    if (enableCountdown) {
      setIsWaiting(true)
      setCountdown(timer)
      setStartTime(Date.now()) // Lưu thời gian bắt đầu
    }
  }, [timer, enableCountdown])

  return (
    <Button className={cn('gap-1.5', className)} disabled={disabled || isLoading || isWaiting} {...rest}>
      {isLoading ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
      {children} {isWaiting ? `sau ${formatSecondsToMMSS(countdown)}` : ''}
    </Button>
  )
}
