import { BestSellerSection, CategoriesSection, HeroSection, PromotionSection } from './_components'

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <main className="container">
        <CategoriesSection />
        <BestSellerSection />
      </main>
      <PromotionSection />
    </div>
  )
}
