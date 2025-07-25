import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import usanaMarketingBg from "@assets/건강구독마케팅-네트워크마케팅 유사나 박현진 pc31_1752997037407.png";
import usanaMarketingMobileBg from "@assets/스크린샷 2025-07-20 143223_1752989552583.png";
import { useQuery } from "@tanstack/react-query";
import ConsultationPopup from "@/components/consultation-popup";

export default function HeroSection() {
  const [showExpandedContent, setShowExpandedContent] = useState(false); // 1초 후에 자동으로 표시
  const [showSuccessContent, setShowSuccessContent] = useState(false);
  const [isConsultationPopupOpen, setIsConsultationPopupOpen] = useState(false);

  // 사이트 설정 불러오기
  const { data: siteSettings = [] } = useQuery({
    queryKey: ['/api/site-settings'],
    queryFn: async () => {
      const response = await fetch('/api/site-settings');
      return response.json();
    },
  });

  // 히어로 이미지 가져오기 (기본값은 기존 이미지)
  const heroDesktopImage = siteSettings.find(s => s.key === 'hero_desktop_image')?.value || usanaMarketingBg;
  const heroMobileImage = siteSettings.find(s => s.key === 'hero_mobile_image')?.value || usanaMarketingMobileBg;

  // 페이지 로딩시 프리미엄 배지는 1초 후부터, Success 배지는 2초 후부터 자동 표시
  useEffect(() => {
    // 프리미엄 배지: 1초 후에 표시
    const expandedShowTimer = setTimeout(() => {
      setShowExpandedContent(true);
    }, 1000);

    // 프리미엄 배지: 1초 후 표시하고 3초간 유지 후 숨김 (1초~4초)
    const expandedHideTimer = setTimeout(() => {
      setShowExpandedContent(false);
    }, 4000);

    // Success 배지: 2초 후에 표시하고 3초간 유지 (2초~5초)
    const successShowTimer = setTimeout(() => {
      setShowSuccessContent(true);
    }, 2000);

    return () => {
      clearTimeout(expandedShowTimer);
      clearTimeout(expandedHideTimer);
      clearTimeout(successShowTimer);
    };
  }, []);

  // Auto-hide expanded content after 5 seconds when manually clicked
  useEffect(() => {
    if (showExpandedContent) {
      const timer = setTimeout(() => {
        setShowExpandedContent(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showExpandedContent]);

  // Auto-hide success content after 5 seconds
  useEffect(() => {
    if (showSuccessContent) {
      const timer = setTimeout(() => {
        setShowSuccessContent(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessContent]);
  return (
    <section 
      className="relative text-white bg-cover bg-center bg-no-repeat min-h-screen w-full hero-background"
      style={{ 
        '--desktop-bg': `url(${heroDesktopImage})`,
        '--mobile-bg': `url(${heroMobileImage})`,
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
                <span className="text-usana-blue-300 text-sm sm:text-base md:text-lg font-bold tracking-wider uppercase">돈버는 영양제구독 마케팅</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight sm:leading-relaxed tracking-tighter">
                <span className="text-white">프리미엄 영양제 구독하고</span><br />
                <span className="text-usana-blue-400 font-light">2명에게 구독소개하면</span><br />
                <span className="text-white">당신도 매주 </span><span className="text-yellow-400 font-bold">주급받는</span><br />
                <span className="text-white">스마트한 </span><span className="text-usana-blue-400 font-bold">브랜드 파트너</span>
              </h1>
              <div className="inline-block mt-12 mb-2 w-full flex justify-center sm:justify-start">
                <div 
                  className="relative bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm border-2 border-amber-400/50 rounded-2xl px-8 py-4 shadow-2xl shadow-amber-500/30 cursor-pointer hover:scale-105 hover:shadow-3xl transition-all duration-300 group badge-pulse-animation shimmer-overlay mobile-click-bounce"
                  onClick={() => setShowExpandedContent(!showExpandedContent)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl"></div>
                  <div className="relative flex items-center justify-between">
                    <p className="text-sm sm:text-base md:text-lg text-white font-bold tracking-wide">
                      프리미엄 영양제를 돈 벌면서 마음껏 누리세요!!
                    </p>
                    {showExpandedContent ? (
                      <ChevronUp className="ml-3 h-5 w-5 text-white group-hover:scale-110 transition-all duration-300" />
                    ) : (
                      <ChevronDown className="ml-3 h-5 w-5 text-white group-hover:scale-110 transition-all duration-300" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {showExpandedContent && (
                <div className="mt-4 animate-fade-in-up">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-6 shadow-xl text-center">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-relaxed font-medium">
                      <span className="text-usana-blue-400 font-bold">유사나 프리미엄 영양제, 스킨케어 구독</span>으로<br />
                      건강해지면서 소비자에서<br />
                      매주 <span className="text-yellow-400 font-bold bg-yellow-400/20 px-2 py-1 rounded-md">주급 10만~ 50만원</span>을 받는<br />
                      스마트한 <span className="text-usana-blue-400 font-bold bg-usana-blue-400/20 px-2 py-1 rounded-md">'브랜드 파트너'</span>가 되세요
                    </p>
                  </div>
                </div>
              )}
            </div>

            
            {/* Success Box - center aligned on mobile, left aligned on larger screens */}
            <div className="mt-20 sm:mt-20 lg:mt-24 xl:mt-28 flex justify-center sm:justify-start">
              <div 
                className="bg-white/95 backdrop-blur-md p-2 sm:p-3 lg:p-3 rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl border border-usana-platinum-200 w-auto max-w-xs sm:max-w-sm group cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-float-gentle mobile-success-click"
                onClick={() => setShowSuccessContent(true)}
              >
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

            {/* Success Expanded Content */}
            {showSuccessContent && (
              <div className="mt-4 animate-fade-in-up">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-6 shadow-xl text-center">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-relaxed font-medium">
                    전세계 <span className="text-yellow-400 font-bold bg-yellow-400/20 px-2 py-1 rounded-md">45만명</span>이 스마트한 브랜드 파트너로<br />
                    <span className="text-yellow-400 font-bold bg-yellow-400/20 px-2 py-1 rounded-md">'주급'</span>을 받으며 <span className="text-usana-blue-400 font-bold">건강구독</span> 중입니다.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mt-6 sm:mt-4 lg:mt-2">
              <Button
                onClick={() => setIsConsultationPopupOpen(true)}
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-2 border-cyan-400/80 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 px-6 py-3 text-lg font-semibold h-auto backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 tracking-wide group"
              >
                <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                건강구독상담
              </Button>
              <Button
                onClick={() => scrollToSection("subscription-innovation")}
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-2 border-emerald-400/80 text-emerald-300 hover:text-emerald-200 hover:border-emerald-300 px-6 py-3 text-lg font-semibold h-auto backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 tracking-wide group"
              >
                <Heart className="mr-2 h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                건강구독이란?
              </Button>
              <Button
                onClick={() => scrollToSection("products")}
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-2 border-rose-400/80 text-rose-300 hover:text-rose-200 hover:border-rose-300 px-6 py-3 text-lg font-semibold h-auto backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 tracking-wide group"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                건강구독 제품보기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 상담 팝업 */}
      <ConsultationPopup
        isOpen={isConsultationPopupOpen}
        onClose={() => setIsConsultationPopupOpen(false)}
        title="건강구독 상담 신청"
        description="건강한 생활과 수익 창출을 위한 맞춤 상담을 신청하세요."
      />
    </section>
  );
}
