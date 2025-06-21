import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Heart } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative gradient-usana-blue text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              건강한 삶과 <br />
              <span className="text-green-400">경제적 자유</span>를<br />
              동시에 실현하세요
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              USANA 프리미엄 건강기능식품으로 시작하는<br />
              건강 구독 서비스와 월 200~300만원 권리소득 기회
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-usana-orange-600 hover:bg-usana-orange-500 text-white px-8 py-4 text-lg font-semibold h-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                무료 상담 신청
              </Button>
              <Button
                onClick={() => scrollToSection("products")}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-usana-blue-800 px-8 py-4 text-lg font-semibold h-auto"
              >
                <Play className="mr-2 h-5 w-5" />
                제품 둘러보기
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="USANA 건강기능식품"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-usana-green-500 p-3 rounded-full">
                  <Heart className="text-white h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">건강한 변화</p>
                  <p className="text-2xl font-bold text-gray-900">10,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
