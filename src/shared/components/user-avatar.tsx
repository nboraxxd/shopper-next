import Image from 'next/image'
import { cva } from 'class-variance-authority'

import { cn } from '@/shared/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'

interface UserAvatarProps {
  name: string
  avatarUrl: string | null
  width: number
  height: number
  className?: string
  variant?: 'square' | 'round'
}

export default function UserAvatar({ name, avatarUrl, className, variant, height, width }: UserAvatarProps) {
  const variantOptions = cva('', {
    variants: {
      variant: {
        square: 'rounded-lg',
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'round',
    },
  })

  return avatarUrl ? (
    <Avatar className={cn(className, variantOptions({ variant }))}>
      <AvatarImage asChild src={avatarUrl}>
        <Image width={width} height={height} className="size-full" src={avatarUrl} alt={name} />
      </AvatarImage>
      <AvatarFallback>{name.substring(0, 2).toLocaleUpperCase()}</AvatarFallback>
    </Avatar>
  ) : (
    <Avatar className={cn(className, variantOptions({ variant }))}>
      <AvatarFallback>{name.substring(0, 2).toLocaleUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
