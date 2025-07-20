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
                <span className="text-usana-blue-400 text-sm font-semibold tracking-wider uppercase">돈버는 영양제구독 마케팅</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-white">유튜브 구독 안내로 돈버는시대</span><br />
                <span className="text-usana-blue-400 font-light">프리미엄 영양제 구독 안내로</span><br />
                <span className="text-white">매월 </span><span className="text-usana-blue-400 font-bold">2~300만원 돈벌면서</span><br />
                <span className="text-white">건강지키세요!!</span>
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-light">
              매달 영양제 구독하는 건강 소비자에서<br />
              <span className="text-usana-blue-400 font-bold">수익 창출하는 스마트 소비자</span>로 업그레이드하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-usana-blue-500 hover:bg-usana-blue-600 text-white px-10 py-5 text-lg font-semibold h-auto shadow-xl hover:shadow-2xl transition-all duration-300 tracking-wide"
              >
                <MessageCircle className="mr-3 h-5 w-5" />
                건강구독 시작하기
              </Button>
              <Button
                onClick={() => scrollToSection("products")}
                variant="outline"
                className="border-2 border-usana-blue-400/50 text-white hover:bg-usana-blue-400 hover:text-usana-blue-900 px-10 py-5 text-lg font-semibold h-auto backdrop-blur-sm bg-white/5 transition-all duration-300 tracking-wide"
              >
                <Play className="mr-3 h-5 w-5" />
                건강구독 제품보기
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
