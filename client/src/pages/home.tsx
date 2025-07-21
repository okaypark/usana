import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import ProductsSection from "@/components/products-section";
import HealthPackageSection from "@/components/health-package-section-new";
import SubscriptionSection from "@/components/subscription-section";
import FreeSubscriptionSection from "@/components/free-subscription-section";
import BusinessSection from "@/components/business-section";
import AboutSection from "@/components/about-section";
import SimpleContactCTA from "@/components/simple-contact-cta";
import QnaSection from "@/components/qna-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import FloatingActionButton from "@/components/floating-action-button";

export default function Home() {
  return (
    <div className="min-h-screen gradient-usana-premium">
      <Navigation />
      
      {/* 메인 히어로 섹션 */}
      <HeroSection />
      
      {/* 통계/성과 섹션 */}
      <div className="border-t-4 border-blue-200/50">
        <StatsSection />
      </div>
      
      {/* 프리미엄 제품 포트폴리오 섹션 */}
      <div className="border-t-4 border-indigo-200/50 bg-gradient-to-br from-slate-50 to-blue-50">
        <ProductsSection />
      </div>
      
      {/* 건강구독 테마별 패키지 섹션 */}
      <div className="border-t-4 border-teal-200/50 bg-gradient-to-br from-white to-slate-50">
        <HealthPackageSection />
      </div>
      
      {/* 구독 혁신 섹션 */}
      <div className="border-t-4 border-blue-200/50">
        <SubscriptionSection />
      </div>
      
      {/* 무료 체험 섹션 */}
      <div className="border-t-4 border-green-200/50 bg-gradient-to-br from-green-50 to-teal-50">
        <FreeSubscriptionSection />
      </div>
      
      {/* 비즈니스 기회 섹션 */}
      <div className="border-t-4 border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50">
        <BusinessSection />
      </div>
      
      {/* 회사 소개 섹션 */}
      <div className="border-t-4 border-slate-200/50 bg-gradient-to-br from-slate-50 to-gray-100">
        <AboutSection />
      </div>
      
      {/* 간단 상담 CTA 섹션 */}
      <div className="border-t-4 border-blue-200/50">
        <SimpleContactCTA />
      </div>
      
      {/* FAQ 섹션 */}
      <div className="border-t-4 border-gray-200/50 bg-gradient-to-br from-gray-50 to-slate-100">
        <QnaSection />
      </div>
      
      {/* 상담 신청 섹션 */}
      <div className="border-t-4 border-blue-200/50">
        <ContactSection />
      </div>
      
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
