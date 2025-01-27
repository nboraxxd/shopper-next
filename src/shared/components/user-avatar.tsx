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
  fallbackClassName?: string
  variant?: 'square' | 'round'
}

export default function UserAvatar(props: UserAvatarProps) {
  const { name, avatarUrl, className, fallbackClassName, variant, height, width } = props

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

  return (
    <Avatar className={cn(className, variantOptions({ variant }))}>
      {avatarUrl ? (
        <AvatarImage asChild src={avatarUrl} className={cn('object-cover', variantOptions({ variant }))}>
          <Image width={width} height={height} src={avatarUrl} alt={name} />
        </AvatarImage>
      ) : null}
      <AvatarFallback className={cn(fallbackClassName, variantOptions({ variant }))}>
        {name.substring(0, 2).toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
