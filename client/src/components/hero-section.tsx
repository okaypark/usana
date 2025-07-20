import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Heart } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="한국 여성이 USANA 제품과 수익을 확인하는 모습"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Gradient Overlay - Dark on left, transparent on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-usana-blue-900/95 via-usana-blue-800/70 to-transparent"></div>
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          <div className="space-y-8 lg:space-y-10 animate-fade-in-up lg:col-span-3 z-10">
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
              건강관리 하시면서 주변 2명에게만 추천하세요.<br />
              그럼 <span className="text-usana-blue-400 font-semibold">매주 75만원씩</span> 정기적으로 들어오는 새로운 라이프스타일이 시작됩니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-usana-blue-500 hover:bg-usana-blue-600 text-white px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold h-auto shadow-xl hover:shadow-2xl transition-all duration-300 tracking-wide"
              >
                <MessageCircle className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                건강구독 시작하기
              </Button>
              <Button
                onClick={() => scrollToSection("products")}
                variant="outline"
                className="border-2 border-usana-blue-400/50 text-white hover:bg-usana-blue-400 hover:text-usana-blue-900 px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold h-auto backdrop-blur-sm bg-white/10 transition-all duration-300 tracking-wide"
              >
                <Play className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                건강구독 제품보기
              </Button>
            </div>
          </div>
          <div className="relative lg:col-span-2 z-10 flex justify-center lg:justify-end">
            {/* Success Stats Card - positioned over the background image */}
            <div className="bg-white/95 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl border border-usana-blue-200/50 max-w-sm lg:max-w-md">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="bg-usana-blue-500 p-3 sm:p-4 rounded-xl">
                  <Heart className="text-white h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <p className="text-usana-blue-600 text-xs sm:text-sm font-semibold tracking-wide uppercase">이번주 주급</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-usana-blue-900">50만원</p>
                  <p className="text-xs sm:text-sm text-usana-blue-600 font-medium">건강구독 수익</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-sm sm:text-base text-usana-blue-700 font-medium">
                  USANA 헬스팩으로<br />
                  건강과 수익 동시에! 🎉
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
