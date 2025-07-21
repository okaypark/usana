import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Percent, Truck, Calendar, UserCheck } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";
import healthSubscriptionImage from "@assets/2010ca4d-c010-4f90-b826-5e585a679fcf_1750522576482.png";
import travelBrazil from "@assets/유사나 인센티브여행 브라질_1753085923560.png";
import travelDubai from "@assets/유사나 인센티브여행 두바이_1753085923560.png";
import travelVietnam from "@assets/유사나 인센티브여행 베트남_1753085923560.png";
import travelJapan from "@assets/유사나 인센티브여행 일본_1753085923560.png";

export default function SubscriptionSection() {
  const travelImages = [
    travelBrazil,
    travelDubai,
    travelVietnam,
    travelJapan
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 3000); // 3초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  const benefits1 = [
    {
      icon: Percent,
      title: "10% 할인",
      description: "정기 구독 시 일반 구매 대비 10% 할인된 가격으로 제공",
      color: "bg-blue-600"
    },
    {
      icon: Truck,
      title: "패스트 보너스",
      description: "직추천 가입자의 소비포인트의 10% $로 캐쉬백",
      color: "bg-green-600"
    },
    {
      icon: Calendar,
      title: "포인트 적립",
      description: "하부 무한단계 소비자들의 소비포인트 누적 적립 (레버리지효과)",
      color: "bg-indigo-600"
    },
    {
      icon: UserCheck,
      title: "매칭 보너스",
      description: "직추천 가입자가 받는 후원수당의 10%를 추가 지급",
      color: "bg-teal-600"
    }
  ];

  const benefits2 = [
    {
      icon: "✈️",
      title: "인센티브 여행",
      description: "목표 달성 시 가족과 함께하는 프리미엄 여행 패키지",
      color: "bg-orange-600"
    },
    {
      icon: "🌍",
      title: "글로벌 컨벤션",
      description: "전 세계 파트너들과의 네트워킹 및 교육 기회",
      color: "bg-rose-600"
    }
  ];

  const benefits3 = [
    {
      icon: "💰",
      title: "무한단계 수당",
      description: "소개인과 지인들의 매출에 따른 무한단계 포인트 적립",
      color: "bg-emerald-600"
    },
    {
      icon: "📈",
      title: "지속적 캐쉬백",
      description: "하부 조직의 소비 인프라에서 발생하는 지속적인 캐쉬백 수익",
      color: "bg-cyan-600"
    },
    {
      icon: "🔄",
      title: "자동 수익 구조",
      description: "한 번 구축된 네트워크를 통한 자동화된 수익 창출 시스템",
      color: "bg-violet-600"
    }
  ];

  return (
    <section id="subscription" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">건강 구독 서비스</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            건강한 삶을 배달해주고 캐쉬백도 받는 건강구독서비스
          </p>
        </div>

        <div className="space-y-16">
          {/* 혜택 1 - 이미지 + 텍스트 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 shadow-xl">
                <img
                  src={healthSubscriptionImage}
                  alt="건강 구독 서비스 제품"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md">
                  <span className="text-sm font-semibold text-green-600">💝 매월 배송</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-md">
                  <span className="text-sm font-semibold text-blue-600">💰 캐쉬백</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">구독 혜택 1</h3>
              <div className="space-y-6">
                {benefits1.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`${benefit.color} p-2 rounded-lg flex-shrink-0`}>
                        <Icon className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 혜택 2 - 텍스트 + 이미지 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">구독 혜택 2 - 여행</h3>
              <div className="space-y-6">
                {benefits2.map((benefit, index) => {
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`${benefit.color} p-2 rounded-lg flex-shrink-0 text-white text-xl`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-orange-100 rounded-2xl p-8 shadow-xl overflow-hidden">
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container flex">
                    {travelImages.map((image, index) => (
                      <div className="embla__slide flex-[0_0_100%] min-w-0" key={index}>
                        <img
                          src={image}
                          alt={`유사나 인센티브 여행 ${index + 1}`}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md">
                  <span className="text-sm font-semibold text-purple-600">✈️ 해외 여행</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-md">
                  <span className="text-sm font-semibold text-orange-600">🏆 인센티브</span>
                </div>
              </div>
            </div>
          </div>

          {/* 혜택 3 - 이미지 + 텍스트 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-2xl p-8 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="수익 창출"
                  className="w-full h-auto object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md">
                  <span className="text-sm font-semibold text-emerald-600">💰 무한수당</span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-md">
                  <span className="text-sm font-semibold text-cyan-600">📈 자동수익</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">구독 혜택 3 - 소개수당</h3>
              <div className="space-y-6">
                {benefits3.map((benefit, index) => {
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`${benefit.color} p-2 rounded-lg flex-shrink-0 text-white text-xl`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
            <CardContent className="p-6">
              <h4 className="text-2xl font-bold mb-2">💰 추가 수당 혜택</h4>
              <p className="text-lg mb-4">
                <strong>다양한 수당 지급 시스템</strong>으로 지속적인 수익 창출이 가능하며, 
                새로운 혜택이 계속 업데이트됩니다.
              </p>
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                수당 시스템 자세히 보기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}