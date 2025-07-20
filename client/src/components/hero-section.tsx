import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Heart } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative gradient-usana-executive text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="space-y-10 animate-fade-in-up lg:col-span-3">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-usana-blue-500/20 border border-usana-blue-400/30 rounded-full">
                <span className="text-usana-blue-400 text-sm font-semibold tracking-wider uppercase">돈버는 영양제구독 마케팅</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight tracking-tighter">
                <span className="text-white">프리미엄 영양제 구독하고</span><br />
                <span className="text-usana-blue-400 font-light">2명에게 소개하면</span><br />
                <span className="text-white">당신도 </span><span className="text-usana-blue-400 font-bold">매주 주급받는</span><br />
                <span className="text-white">스마트한 소비자</span>
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-light">
              유사나 프리미엄 영양제 구독으로 건강해지면서<br />
              <span className="text-usana-blue-400 font-semibold">매주 주급 50만원</span>을 받는 스마트한 소비자가 되세요<br />
              전세계 약 <span className="text-usana-blue-400 font-bold">45만명</span>의 스마트한 소비자들이 돈을 벌어가며<br />
              건강구독하고 있습니다.
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
          <div className="relative lg:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="프리미엄 영양제와 스마트한 라이프스타일"
              className="rounded-2xl shadow-2xl w-full h-auto opacity-80 filter brightness-110 contrast-90"
            />
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-bottom-6 lg:-right-6 lg:top-auto lg:bottom-auto bg-white/95 backdrop-blur-md p-3 sm:p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl border border-usana-platinum-200 scale-65 sm:scale-75 lg:scale-100">
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-5">
                <div className="bg-usana-blue-500 p-1.5 sm:p-2 lg:p-4 rounded-lg lg:rounded-xl">
                  <Heart className="text-white h-3 w-3 sm:h-4 sm:w-4 lg:h-7 lg:w-7" />
                </div>
                <div>
                  <p className="text-usana-blue-600 text-[10px] sm:text-xs lg:text-sm font-semibold tracking-wide uppercase">USANA SUCCESS</p>
                  <p className="text-sm sm:text-lg lg:text-3xl font-bold text-usana-blue-900">450,000+</p>
                  <p className="text-[9px] sm:text-xs text-usana-blue-600 font-medium">Global Brand Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
