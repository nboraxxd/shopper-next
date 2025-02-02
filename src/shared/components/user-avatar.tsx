import Image from 'next/image'
import { cva } from 'class-variance-authority'

import { cn } from '@/shared/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { Skeleton } from '@/shared/components/ui/skeleton'

interface UserAvatarProps extends React.ComponentProps<typeof Avatar> {
  name: string
  avatarUrl: string | null
  width: number
  height: number
  className?: string
  fallbackClassName?: string
  variant?: 'square' | 'round'
  imagePriority?: boolean
}

export default function UserAvatar(props: UserAvatarProps) {
  const { name, avatarUrl, className, fallbackClassName, variant, height, width, imagePriority, ...rest } = props

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
    <Avatar className={cn(className, variantOptions({ variant }))} {...rest}>
      <AvatarImage asChild src={avatarUrl} className={cn('object-cover', variantOptions({ variant }))}>
        <Image width={width} height={height} src={avatarUrl} alt={name} priority={imagePriority} />
      </AvatarImage>
      <AvatarFallback className={cn(fallbackClassName, variantOptions({ variant }))} asChild>
        <Skeleton />
      </AvatarFallback>
    </Avatar>
  ) : (
    <Avatar className={cn(className, variantOptions({ variant }))} {...rest}>
      <AvatarFallback className={cn(fallbackClassName, variantOptions({ variant }))}>
        {name.substring(0, 2).toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
