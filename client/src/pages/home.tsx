import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import ProductsSection from "@/components/products-section";
import SubscriptionSection from "@/components/subscription-section";
import FreeSubscriptionSection from "@/components/free-subscription-section";
import BusinessSection from "@/components/business-section";
import AboutSection from "@/components/about-section";
import QnaSection from "@/components/qna-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import FloatingActionButton from "@/components/floating-action-button";

export default function Home() {
  return (
    <div className="min-h-screen gradient-usana-premium">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <ProductsSection />
      <SubscriptionSection />
      <FreeSubscriptionSection />
      <BusinessSection />
      <AboutSection />
      <QnaSection />
      <ContactSection />
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
