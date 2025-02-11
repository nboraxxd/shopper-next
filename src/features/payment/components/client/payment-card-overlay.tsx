'use client'

import { motion } from 'motion/react'
import { LoaderCircleIcon } from 'lucide-react'

import { usePaymentCardState } from '@/features/payment/hooks'

export default function PaymentCardOverlay() {
  const { isDisabled } = usePaymentCardState()

  return isDisabled ? (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 0.75,
      }}
      transition={{
        duration: 0.1,
      }}
      className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-dark-1/75"
    >
      <LoaderCircleIcon className="size-6 animate-spin" />
    </motion.div>
  ) : null
}
