import { BestSellerSection, CategoriesSection, HeroSection, PromotionSection } from './_components'

export default function Homepage() {
  return (
    <div>
      <h1 className="sr-only">
        Shopper - Tiện lợi mua sắm hàng triệu mặt hàng, dịch vụ. Vô vàn ưu đãi freeship, mã giảm giá. Hoàn tiền 111% nếu
        giả. Đổi trả miễn phí trong 30 ngày.
      </h1>
      <HeroSection />
      <main className="container pb-16 lg:pb-24">
        <CategoriesSection />
        <BestSellerSection />
      </main>
      <PromotionSection />
    </div>
  )
}
