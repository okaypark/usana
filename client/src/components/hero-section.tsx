import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Heart } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative gradient-usana-executive text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-usana-blue-500/20 border border-usana-blue-400/30 rounded-full">
                <span className="text-usana-blue-400 text-sm font-semibold tracking-wider uppercase">Premium Business Opportunity</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-white">건강과 성공을</span><br />
                <span className="text-usana-blue-400 font-light">함께 실현하는</span><br />
                <span className="text-white">전문 비즈니스</span>
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-light">
              USANA 글로벌 네트워크와 함께하는<br />
              <span className="text-usana-blue-400 font-medium">월 200~300만원</span> 프리미엄 비즈니스 기회
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-usana-blue-500 hover:bg-usana-blue-600 text-white px-10 py-5 text-lg font-semibold h-auto shadow-xl hover:shadow-2xl transition-all duration-300 tracking-wide"
              >
                <MessageCircle className="mr-3 h-5 w-5" />
                전문 상담 신청
              </Button>
              <Button
                onClick={() => scrollToSection("products")}
                variant="outline"
                className="border-2 border-usana-blue-400/50 text-white hover:bg-usana-blue-400 hover:text-usana-blue-900 px-10 py-5 text-lg font-semibold h-auto backdrop-blur-sm bg-white/5 transition-all duration-300 tracking-wide"
              >
                <Play className="mr-3 h-5 w-5" />
                프리미엄 제품 보기
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="건강과 성공을 함께 - USANA 기회"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-usana-platinum-200">
              <div className="flex items-center space-x-5">
                <div className="bg-usana-blue-500 p-4 rounded-xl">
                  <Heart className="text-white h-7 w-7" />
                </div>
                <div>
                  <p className="text-usana-blue-600 text-sm font-semibold tracking-wide uppercase">Premium Success</p>
                  <p className="text-3xl font-bold text-usana-blue-900">10,000+</p>
                  <p className="text-xs text-usana-blue-600 font-medium">Global Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
