'use client'

import { useState } from 'react'

import { Dialog } from '@/shared/components/ui/dialog'
import { PromoDialogContent } from '@/features/promotion/components/client'

export default function PromoDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <PromoDialogContent isOpen={isOpen} />
    </Dialog>
  )
}
