import { Suspense } from 'react'

export default async function UpdateAddressPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <Suspense fallback={<div>Loading...</div>}>{/* <UpdateAddressContent /> */}</Suspense>
}
