import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Heart } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import usanaMarketingBg from "@assets/강구독마케팅-네트워크마케팅 유사나 박현진2_1752988831788.png";
import usanaMarketingMobileBg from "@assets/스크린샷 2025-07-20 143223_1752989552583.png";

export default function HeroSection() {
  return (
    <section 
      className="relative text-white bg-cover bg-center bg-no-repeat min-h-screen w-full hero-background"
      style={{ 
        '--desktop-bg': `url(${usanaMarketingBg})`,
        '--mobile-bg': `url(${usanaMarketingMobileBg})`,
        backgroundImage: `var(--desktop-bg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'scroll'
      } as React.CSSProperties & { '--desktop-bg': string; '--mobile-bg': string }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="w-full max-w-7xl mx-auto">
          <div className="space-y-8 sm:space-y-10 lg:space-y-12 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-usana-blue-500/20 border border-usana-blue-400/30 rounded-full">
                <span className="text-usana-blue-400 text-sm font-semibold tracking-wider uppercase">돈버는 영양제구독 마케팅</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tighter">
                <span className="text-white">프리미엄 영양제 구독하고</span><br />
                <span className="text-usana-blue-400 font-light">2명에게 소개하면</span><br />
                <span className="text-white">당신도 </span><span className="text-usana-blue-400 font-bold">매주 주급받는</span><br />
                <span className="text-white">스마트한 소비자</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-gray-200 leading-relaxed font-light max-w-5xl">
              유사나 프리미엄 영양제 구독으로 건강해지면서<br />
              <span className="text-usana-blue-400 font-semibold">매주 주급 50만원</span>을 받는 스마트한 소비자가 되세요<br />
              전세계 약 <span className="text-usana-blue-400 font-bold">45만명</span>의 스마트한 소비자들이 <span className="text-yellow-400 font-bold bg-yellow-400/20 px-2 py-1 rounded-md">'매주 주급'</span>을 받으며<br />
              건강구독 중입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-2xl">
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
            
            {/* Success Box - positioned below buttons on PC, centered on mobile */}
            <div className="mt-8 sm:mt-12 lg:mt-20 flex justify-center lg:justify-start lg:ml-12">
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 lg:p-5 xl:p-6 rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl border border-usana-platinum-200 w-full max-w-xs sm:max-w-sm lg:max-w-sm xl:max-w-md">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  <div className="bg-usana-blue-500 p-1.5 sm:p-2 lg:p-3 rounded-lg lg:rounded-xl">
                    <Heart className="text-white h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-usana-blue-600 text-[10px] sm:text-xs lg:text-xs xl:text-sm font-semibold tracking-wide uppercase">USANA SUCCESS</p>
                    <p className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold text-usana-blue-900">450,000+</p>
                    <p className="text-[9px] sm:text-xs lg:text-xs xl:text-sm text-usana-blue-600 font-medium">Global Brand Partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
