import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Zap } from "lucide-react";
import ConsultationPopup from "./consultation-popup";

interface SiteSetting {
  id: number;
  key: string;
  value: string;
}

export default function SubscriptionSection() {
  const [isConsultationPopupOpen, setIsConsultationPopupOpen] = useState(false);

  // 사이트 설정 조회
  const { data: siteSettings = [] } = useQuery<SiteSetting[]>({
    queryKey: ['/api/site-settings'],
  });

  const freeConsumerSignupUrl = siteSettings.find(s => s.key === 'free_consumer_signup_url')?.value || 'https://okay7.usana.com/ko/kr/shop/home';

  const handleFreeConsumerSignup = () => {
    window.open(freeConsumerSignupUrl, '_blank');
  };
  return (
    <section id="subscription-innovation" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500/20 to-teal-500/15 border-2 border-blue-500/30 rounded-full mb-8 shadow-xl shadow-blue-500/20">
            <span className="text-blue-700 text-base sm:text-lg md:text-xl font-bold tracking-wider">돈버는 영양제구독 혁신</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-8 tracking-tighter">
            <span className="text-blue-600">돈버는 영양제</span><br />
            <span className="text-teal-600 font-semibold text-4xl lg:text-5xl">구독 혁신</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            건강을 챙기면서 동시에 <span className="text-blue-600 font-semibold">수익을 창출</span>하는<br />
            <span className="text-teal-600 font-semibold">혁신적인 건강구독 시스템</span>으로<br />
            <span className="text-blue-600 font-bold">스마트한 라이프스타일을 시작하세요</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">구독으로 꾸준한 건강관리</h3>
              <div className="text-slate-600 leading-relaxed space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>4주마다 영양제 구독으로 10% 할인 혜택</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>개인맞춤 상담으로 체계적인 건강관리</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>놓치기 쉬운 건강 체크를 전문가가 관리</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">건강구독 2명 소개</h3>
              <div className="text-slate-600 leading-relaxed space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>지인 2명에게 건강구독 소개</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>그들의 구독 매출 포인트 적립</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>소개한 모든 사람의 포인트까지 무한 누적</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>누적 포인트를 현금으로 매주 캐시백</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">스마트 수익</h3>
              <div className="text-slate-600 leading-relaxed space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <div>
                    <div>내가 소개한 2명도 각각 2명씩 소개</div>
                    <div className="ml-0">(2x2 소개시스템)</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>매월 구독료를 무료로 이용 가능</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>월급과 같은 안정적인 권리소득 창출</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>매주 주급 형태로 정기 지급</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => setIsConsultationPopupOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold px-12 py-4 text-lg shadow-xl hover:scale-105 transition-all duration-300"
            >
              건강구독 마케팅 문의
            </Button>
            <Button 
              size="lg"
              onClick={handleFreeConsumerSignup}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-4 text-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              직접 소비자가입 제품구매
            </Button>
          </div>
        </div>

        {/* 상담 팝업 */}
        <ConsultationPopup
          isOpen={isConsultationPopupOpen}
          onClose={() => setIsConsultationPopupOpen(false)}
          title="건강구독 상담 신청"
          description="건강한 생활과 수익 창출을 위한 맞춤 상담을 신청하세요."
        />

      </div>
    </section>
  );
}