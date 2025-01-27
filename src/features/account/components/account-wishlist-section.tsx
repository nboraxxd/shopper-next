import AccountSectionWrapper from '@/features/account/components/account-section-wrapper'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import wishlistServerApi from '@/features/wishlist/api/server'
import { WishlistResponse } from '@/features/wishlist/types'
import PATH from '@/shared/constants/path'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function AccountWishlistSection() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  let wishlistResponse: WishlistResponse['data'] | null = null

  try {
    const response = await wishlistServerApi.getWishlistFromBackend({ accessToken, limit: 5, page: 1 })

    wishlistResponse = response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return wishlistResponse ? (
    <AccountSectionWrapper title="Sản phẩm yêu thích" className="mt-7">
      {wishlistResponse.map((wishlistItem) => (
        <article key={wishlistItem.id} className="flex items-center gap-3 md:gap-5">
          <Image
            src={wishlistItem.thumbnail_url}
            alt={wishlistItem.name}
            width={120}
            height={120}
            className="inline-block w-[6.75rem] object-contain"
          />
          <div>
            <h3 className="text-lg font-semibold">{wishlistItem.name}</h3>
            <p className="text-sm text-neutral-500">{wishlistItem.real_price}</p>
          </div>
        </article>
      ))}
    </AccountSectionWrapper>
  ) : null
}
