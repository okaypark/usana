import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Heart } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import usanaMarketingBg from "@assets/건강구독마케팅-네트워크마케팅 유사나 박현진 pc31_1752997037407.png";
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
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.25) 80%, transparent 100%)' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/3 via-transparent to-black/15"></div>
      <div className="relative w-full h-full flex items-start justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-3 lg:py-4 pt-12 sm:pt-6 lg:pt-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-usana-blue-500/20 to-usana-blue-600/15 border-2 border-usana-blue-500/30 rounded-full shadow-lg shadow-usana-blue-500/20">
                <span className="text-usana-blue-300 text-sm font-bold tracking-wider uppercase">돈버는 영양제구독 마케팅</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-relaxed tracking-tighter">
                <span className="text-white">프리미엄 영양제 구독하고</span><br />
                <span className="text-usana-blue-400 font-light">2명에게 구독소개하면</span><br />
                <span className="text-white">당신도 매주 </span><span className="text-yellow-400 font-bold">주급받는</span><br />
                <span className="text-white">스마트한 </span><span className="text-usana-blue-400 font-bold">브랜드 파트너</span>
              </h1>
              <div className="inline-block mt-12 mb-2">
                <div className="relative bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm border-2 border-amber-400/50 rounded-2xl px-8 py-4 shadow-2xl shadow-amber-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl"></div>
                  <p className="relative text-sm sm:text-base md:text-lg text-white font-bold tracking-wide">
                    프리미엄 영양제를 돈 벌면서 마음껏 누리세요!!
                  </p>
                </div>
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-gray-200 leading-relaxed font-light max-w-5xl">
              유사나 프리미엄 영양제, 스킨케어 구독으로<br />
              건강해지면서 소비자에서<br />
              매주 <span className="text-yellow-400 font-bold bg-yellow-400/20 px-2 py-1 rounded-md">리워드 10만~ 50만원</span>을 받는<br />
              스마트한 <span className="text-usana-blue-400 font-bold bg-usana-blue-400/20 px-2 py-1 rounded-md">'브랜드 파트너'</span>가 되세요<br />
              <br />
              전세계 <span className="text-yellow-400 font-bold bg-yellow-400/20 px-2 py-1 rounded-md">45만명</span>이 스마트한 브랜드 파트너로<br />
              <span className="text-yellow-400 font-bold bg-yellow-400/20 px-2 py-1 rounded-md">'소비 리워드'</span>를 받으며 <span className="text-usana-blue-400 font-bold">건강구독</span> 중입니다.
            </p>
            
            {/* Success Box - positioned below text, left aligned */}
            <div className="mt-8 sm:mt-10 flex justify-start">
              <div className="bg-white/95 backdrop-blur-md p-2 sm:p-3 lg:p-3 rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl border border-usana-platinum-200 w-auto max-w-xs sm:max-w-sm group cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-2 sm:space-x-2 lg:space-x-3">
                  <div className="bg-usana-blue-500 p-1 sm:p-1.5 lg:p-2 rounded-md lg:rounded-lg group-hover:scale-110 group-hover:bg-usana-blue-600 transition-all duration-300">
                    <Heart className="text-white h-3 w-3 sm:h-3 sm:w-3 lg:h-4 lg:w-4 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-usana-blue-600 text-[9px] sm:text-xs lg:text-xs font-semibold tracking-wide uppercase group-hover:text-usana-blue-700 transition-all duration-300">USANA SUCCESS</p>
                    <p className="text-sm sm:text-base lg:text-lg font-bold text-usana-blue-900 group-hover:text-usana-blue-800 group-hover:scale-105 transition-all duration-300">450,000+</p>
                    <p className="text-[8px] sm:text-xs lg:text-xs text-usana-blue-600 font-medium group-hover:text-usana-blue-700 transition-all duration-300">Global Brand Partners</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-2xl mt-6 sm:mt-4 lg:mt-2">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-usana-blue-500 hover:bg-usana-blue-600 text-white px-10 py-4 text-lg font-semibold h-auto shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 tracking-wide group"
              >
                <MessageCircle className="mr-3 h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                건강구독 알아보기
              </Button>
              <Button
                onClick={() => scrollToSection("products")}
                variant="outline"
                className="border-2 border-usana-blue-400/50 text-white hover:bg-usana-blue-400 hover:text-usana-blue-900 px-10 py-4 text-lg font-semibold h-auto backdrop-blur-sm bg-white/5 hover:scale-105 hover:-translate-y-1 transition-all duration-300 tracking-wide group"
              >
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                건강구독 제품보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
