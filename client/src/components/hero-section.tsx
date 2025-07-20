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
                <span className="text-white">프리미엄 영양제로 건강구독</span><br />
                <span className="text-usana-blue-400 font-light">2명에게 건강구독마케팅 소개하면</span><br />
                <span className="text-white">당신도 </span><span className="text-usana-blue-400 font-bold">매주 주급받는</span><br />
                <span className="text-white">스마트한 돈버는 소비자</span>
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-light">
              건강관리 하시면서 주변 2명에게만 추천하세요.<br />
              그럼 <span className="text-usana-blue-400 font-semibold">매주 75만원씩</span> 정기적으로 들어오는 새로운 라이프스타일이 시작됩니다.
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
              src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="건강과 성공을 함께 - USANA 기회"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -right-6 lg:-bottom-6 lg:-right-6 sm:-bottom-4 sm:-right-4 -bottom-2 -right-2 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border border-usana-platinum-200 scale-75 sm:scale-90 lg:scale-100">
              <div className="flex items-center space-x-3 sm:space-x-5">
                <div className="bg-usana-blue-500 p-2 sm:p-3 lg:p-4 rounded-xl">
                  <Heart className="text-white h-4 w-4 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                </div>
                <div>
                  <p className="text-usana-blue-600 text-xs sm:text-sm font-semibold tracking-wide uppercase">Premium Success</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-usana-blue-900">10,000+</p>
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
