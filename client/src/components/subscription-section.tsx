import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Percent, Truck, Calendar, UserCheck } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import healthSubscriptionImage from "@assets/2010ca4d-c010-4f90-b826-5e585a679fcf_1750522576482.png";
import travelBrazil from "@assets/유사나 인센티브여행 브라질_1753085923560.png";
import travelDubai from "@assets/유사나 인센티브여행 두바이_1753085923560.png";
import travelVietnam from "@assets/유사나 인센티브여행 베트남_1753085923560.png";
import travelJapan from "@assets/유사나 인센티브여행 일본_1753085923560.png";

export default function SubscriptionSection() {
  const [selectedPackage, setSelectedPackage] = useState<{type: string, theme: string} | null>(null);
  
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
      title: "10% 할인가 구매",
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
      title: "무한단계 포인트적립",
      description: "직추천 1명으로 인해 늘어난 인프라에 대한 무한단계 포인트 적립\n(MAXOUT 5000P)",
      color: "bg-indigo-600"
    },
    {
      icon: UserCheck,
      title: "매칭 보너스",
      description: "직추천 가입자들이 받는 모든 후원수당의 10%를 나에게도 추가 지급",
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

  // 제품구성 데이터
  const packageDetails = {
    면역건강구독: {
      standard: {
        products: [
          { name: "비타민 C", description: "면역력 강화 및 항산화 작용", price: "40P" },
          { name: "아연", description: "면역세포 활성화", price: "30P" },
          { name: "프로바이오틱스", description: "장 건강 및 면역력 증진", price: "50P" }
        ],
        totalPrice: "120P"
      },
      premium: {
        products: [
          { name: "비타민 C (고함량)", description: "프리미엄 면역력 강화", price: "60P" },
          { name: "아연 + 셀레늄", description: "강화된 면역세포 활성화", price: "45P" },
          { name: "프로바이오틱스 플러스", description: "장 건강 및 면역력 증진", price: "70P" },
          { name: "에키네시아", description: "자연 면역력 부스터", price: "35P" }
        ],
        totalPrice: "210P"
      }
    },
    해독다이어트구독: {
      standard: {
        products: [
          { name: "화이버지", description: "식이섬유로 노폐물 배출", price: "45P" },
          { name: "리셋", description: "간 해독 및 정화", price: "40P" },
          { name: "뉴트리밀", description: "건강한 체중관리", price: "35P" }
        ],
        totalPrice: "120P"
      },
      premium: {
        products: [
          { name: "화이버지 플러스", description: "프리미엄 식이섬유", price: "65P" },
          { name: "리셋 프로", description: "강화된 간 해독", price: "60P" },
          { name: "뉴트리밀 골드", description: "프리미엄 체중관리", price: "55P" },
          { name: "디톡스 컴플렉스", description: "체내 독소 완전 배출", price: "35P" }
        ],
        totalPrice: "215P"
      }
    },
    피부건강구독: {
      standard: {
        products: [
          { name: "셀라바이브", description: "피부 세포 재생", price: "50P" },
          { name: "비타민 E", description: "피부 보습 및 탄력", price: "35P" },
          { name: "코큐텐", description: "피부 노화 방지", price: "40P" }
        ],
        totalPrice: "125P"
      },
      premium: {
        products: [
          { name: "셀라바이브 골드", description: "프리미엄 피부 재생", price: "75P" },
          { name: "비타민 E 컴플렉스", description: "강화된 피부 보습", price: "50P" },
          { name: "코큐텐 플러스", description: "고급 노화 방지", price: "60P" },
          { name: "콜라겐 부스터", description: "피부 탄력 극대화", price: "35P" }
        ],
        totalPrice: "220P"
      }
    }
  };

  const handlePackageClick = (type: string, theme: string) => {
    if (selectedPackage?.type === type && selectedPackage?.theme === theme) {
      setSelectedPackage(null); // 같은 것을 클릭하면 닫기
    } else {
      setSelectedPackage({ type, theme }); // 새로운 것 선택
    }
  };

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
      description: "하부 조직의 소비 인프라에서 발생하는 지속적인 캐쉬백 수익\n(유사나 건강구독 재구매율 67%, 안정적 매출 발생)",
      color: "bg-cyan-600"
    },
    {
      icon: "⚡",
      title: "빠른 캐쉬백",
      description: "구독시작후 4명 구독소개 후 13주 동안 최대 90만원 캐쉬백\n(빠른 무료구독 전환가능 - 200P 약45만 건강구독)",
      color: "bg-yellow-600"
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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">스마트 건강구독 혜택</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
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
              <div className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold tracking-wide">구독 혜택 1</h3>
              </div>
              <div className="space-y-6">
                {benefits1.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`${benefit.color} p-2 rounded-lg flex-shrink-0`}>
                        <Icon className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
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
              <div className="inline-block bg-gradient-to-r from-purple-500 to-orange-500 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold tracking-wide">구독 혜택 2 - 여행</h3>
              </div>
              <div className="space-y-6">
                {benefits2.map((benefit, index) => {
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`${benefit.color} p-2 rounded-lg flex-shrink-0 text-white text-xl`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
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
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold tracking-wide">구독 혜택 3 - 소개수당</h3>
              </div>
              <div className="space-y-6">
                {benefits3.map((benefit, index) => {
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`${benefit.color} p-2 rounded-lg flex-shrink-0 text-white text-xl`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">
                          {benefit.title === "지속적 캐쉬백" ? (
                            <>
                              하부 조직의 소비 인프라에서 발생하는 지속적인 캐쉬백 수익 
                              (유사나 건강구독 <span className="font-bold text-cyan-700">재구매율 67%</span>, <span className="font-bold text-cyan-700">안정적 매출</span> 발생)
                            </>
                          ) : benefit.title === "빠른 캐쉬백" ? (
                            <>
                              구독시작후 4명 구독소개 후 <span className="font-bold text-yellow-700">13주 동안 최대 90만원 캐쉬백</span> 
                              (<span className="font-bold text-yellow-700">빠른 무료구독 전환가능</span> - 200P 약45만 건강구독)
                            </>
                          ) : benefit.title === "무한단계 수당" ? (
                            <>
                              소개인과 지인들의 매출에 따른 <span className="font-bold text-emerald-700">무한단계 포인트 적립</span>
                            </>
                          ) : benefit.title === "자동 수익 구조" ? (
                            <>
                              한 번 구축된 네트워크를 통한 <span className="font-bold text-violet-700">자동화된 수익 창출 시스템</span>
                            </>
                          ) : (
                            benefit.description
                          )}
                        </p>
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
                추가수당 자세히 보기
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 건강구독 테마별 패키지 섹션 */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">건강구독 테마별 패키지</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              개인 맞춤형 건강 목표에 따른 전문 구독 패키지로 더 스마트한 건강관리를 시작하세요
            </p>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              건강상담으로 개인최적맞춤 패키지로 내용 변경될 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 면역건강구독 */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-3">면역건강구독</h4>
                  <p className="text-green-700 mb-4 leading-relaxed">
                    계절변화와 스트레스로부터 몸을 보호하는<br />
                    <span className="font-bold">면역력 강화 전문 패키지</span>
                  </p>
                  <div className="bg-green-100 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-800 font-medium">
                      비타민C + 아연 + 프로바이오틱스
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center items-center">
                    <div 
                      className={`border-2 border-green-600 text-green-600 px-4 py-2 rounded-full font-medium text-center cursor-pointer transition-all duration-200 ${
                        selectedPackage?.type === 'standard' && selectedPackage?.theme === '면역건강구독' 
                          ? 'bg-green-600 text-white scale-105' 
                          : 'hover:bg-green-50 hover:scale-105'
                      }`}
                      onClick={() => handlePackageClick('standard', '면역건강구독')}
                    >
                      스탠다드<br />월 100P~
                    </div>
                    <div 
                      className={`bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-600 text-white px-5 py-3 rounded-full font-bold shadow-2xl text-center cursor-pointer transition-all duration-300 border-2 border-amber-300 ${
                        selectedPackage?.type === 'premium' && selectedPackage?.theme === '면역건강구독'
                          ? 'scale-110 shadow-2xl ring-4 ring-amber-200' 
                          : 'hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-amber-200'
                      }`}
                      onClick={() => handlePackageClick('premium', '면역건강구독')}
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)',
                        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      ✨ 프리미엄 ✨<br />월 200P~
                    </div>
                  </div>
                  
                  {/* 제품구성 상세 정보 */}
                  {selectedPackage?.theme === '면역건강구독' && (
                    <div className={`mt-4 p-6 rounded-xl border-2 animate-in slide-in-from-top duration-300 ${
                      selectedPackage.type === 'premium' 
                        ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg' 
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex items-center mb-4">
                        {selectedPackage.type === 'premium' && <span className="mr-2 text-xl">👑</span>}
                        <h5 className={`font-bold text-lg ${
                          selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-green-800'
                        }`}>
                          {selectedPackage.type === 'standard' ? '스탠다드' : '✨ 프리미엄 럭셔리'} 제품구성
                        </h5>
                        {selectedPackage.type === 'premium' && (
                          <span className="ml-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            EXCLUSIVE
                          </span>
                        )}
                      </div>
                      <div className="space-y-3">
                        {packageDetails.면역건강구독[selectedPackage.type === 'standard' ? 'standard' : 'premium'].products.map((product, index) => (
                          <div key={index} className={`flex justify-between items-start p-4 rounded-lg border-2 ${
                            selectedPackage.type === 'premium' 
                              ? 'bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow' 
                              : 'bg-white border-green-100'
                          }`}>
                            <div className="flex-1">
                              <div className={`font-semibold ${
                                selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-green-800'
                              }`}>
                                {selectedPackage.type === 'premium' && '🌟 '}{product.name}
                              </div>
                              <div className={`text-sm mt-1 ${
                                selectedPackage.type === 'premium' ? 'text-amber-600' : 'text-green-600'
                              }`}>
                                {product.description}
                              </div>
                            </div>
                            <div className={`font-bold text-lg ${
                              selectedPackage.type === 'premium' ? 'text-amber-700' : 'text-green-700'
                            }`}>
                              {product.price}
                            </div>
                          </div>
                        ))}
                        <div className={`flex justify-between items-center p-4 rounded-lg font-bold border-3 ${
                          selectedPackage.type === 'premium' 
                            ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-400 shadow-lg' 
                            : 'bg-green-100 text-green-800 border-green-300'
                        }`}>
                          <span className="text-lg">
                            {selectedPackage.type === 'premium' && '👑 '}총 구독료
                          </span>
                          <span className="text-xl">
                            {packageDetails.면역건강구독[selectedPackage.type === 'standard' ? 'standard' : 'premium'].totalPrice}
                          </span>
                        </div>
                        {selectedPackage.type === 'premium' && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg text-center">
                            <div className="font-bold">🎁 프리미엄 특별혜택</div>
                            <div className="text-sm mt-1">무료 건강상담 + VIP 고객 전용 서비스 + 우선 배송</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 해독다이어트구독 */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-orange-800 mb-3">해독다이어트구독</h4>
                  <p className="text-orange-700 mb-4 leading-relaxed">
                    체내 독소 배출과 건강한 체중관리를 위한<br />
                    <span className="font-bold">디톡스 + 다이어트 패키지</span>
                  </p>
                  <div className="bg-orange-100 rounded-lg p-3 mb-4">
                    <p className="text-sm text-orange-800 font-medium">
                      화이버지 + 리셋 + 뉴트리밀
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center items-center">
                    <div 
                      className={`border-2 border-orange-600 text-orange-600 px-4 py-2 rounded-full font-medium text-center cursor-pointer transition-all duration-200 ${
                        selectedPackage?.type === 'standard' && selectedPackage?.theme === '해독다이어트구독' 
                          ? 'bg-orange-600 text-white scale-105' 
                          : 'hover:bg-orange-50 hover:scale-105'
                      }`}
                      onClick={() => handlePackageClick('standard', '해독다이어트구독')}
                    >
                      스탠다드<br />월 100P~
                    </div>
                    <div 
                      className={`bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-600 text-white px-5 py-3 rounded-full font-bold shadow-2xl text-center cursor-pointer transition-all duration-300 border-2 border-amber-300 ${
                        selectedPackage?.type === 'premium' && selectedPackage?.theme === '해독다이어트구독'
                          ? 'scale-110 shadow-2xl ring-4 ring-amber-200' 
                          : 'hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-amber-200'
                      }`}
                      onClick={() => handlePackageClick('premium', '해독다이어트구독')}
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)',
                        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      ✨ 프리미엄 ✨<br />월 200P~
                    </div>
                  </div>
                  
                  {/* 제품구성 상세 정보 */}
                  {selectedPackage?.theme === '해독다이어트구독' && (
                    <div className={`mt-4 p-6 rounded-xl border-2 animate-in slide-in-from-top duration-300 ${
                      selectedPackage.type === 'premium' 
                        ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg' 
                        : 'bg-orange-50 border-orange-200'
                    }`}>
                      <div className="flex items-center mb-4">
                        {selectedPackage.type === 'premium' && <span className="mr-2 text-xl">👑</span>}
                        <h5 className={`font-bold text-lg ${
                          selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-orange-800'
                        }`}>
                          {selectedPackage.type === 'standard' ? '스탠다드' : '✨ 프리미엄 럭셔리'} 제품구성
                        </h5>
                        {selectedPackage.type === 'premium' && (
                          <span className="ml-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            EXCLUSIVE
                          </span>
                        )}
                      </div>
                      <div className="space-y-3">
                        {packageDetails.해독다이어트구독[selectedPackage.type === 'standard' ? 'standard' : 'premium'].products.map((product, index) => (
                          <div key={index} className={`flex justify-between items-start p-4 rounded-lg border-2 ${
                            selectedPackage.type === 'premium' 
                              ? 'bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow' 
                              : 'bg-white border-orange-100'
                          }`}>
                            <div className="flex-1">
                              <div className={`font-semibold ${
                                selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-orange-800'
                              }`}>
                                {selectedPackage.type === 'premium' && '🌟 '}{product.name}
                              </div>
                              <div className={`text-sm mt-1 ${
                                selectedPackage.type === 'premium' ? 'text-amber-600' : 'text-orange-600'
                              }`}>
                                {product.description}
                              </div>
                            </div>
                            <div className={`font-bold text-lg ${
                              selectedPackage.type === 'premium' ? 'text-amber-700' : 'text-orange-700'
                            }`}>
                              {product.price}
                            </div>
                          </div>
                        ))}
                        <div className={`flex justify-between items-center p-4 rounded-lg font-bold border-3 ${
                          selectedPackage.type === 'premium' 
                            ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-400 shadow-lg' 
                            : 'bg-orange-100 text-orange-800 border-orange-300'
                        }`}>
                          <span className="text-lg">
                            {selectedPackage.type === 'premium' && '👑 '}총 구독료
                          </span>
                          <span className="text-xl">
                            {packageDetails.해독다이어트구독[selectedPackage.type === 'standard' ? 'standard' : 'premium'].totalPrice}
                          </span>
                        </div>
                        {selectedPackage.type === 'premium' && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg text-center">
                            <div className="font-bold">🎁 프리미엄 특별혜택</div>
                            <div className="text-sm mt-1">무료 건강상담 + VIP 고객 전용 서비스 + 우선 배송</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 피부건강구독 */}
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0112.12 15.12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-pink-800 mb-3">피부건강구독</h4>
                  <p className="text-pink-700 mb-4 leading-relaxed">
                    안티에이징과 피부 재생을 위한<br />
                    <span className="font-bold">뷰티 + 안티에이징 패키지</span>
                  </p>
                  <div className="bg-pink-100 rounded-lg p-3 mb-4">
                    <p className="text-sm text-pink-800 font-medium">
                      셀라바이브 + 비타민E + 코큐텐
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center items-center">
                    <div 
                      className={`border-2 border-pink-600 text-pink-600 px-4 py-2 rounded-full font-medium text-center cursor-pointer transition-all duration-200 ${
                        selectedPackage?.type === 'standard' && selectedPackage?.theme === '피부건강구독' 
                          ? 'bg-pink-600 text-white scale-105' 
                          : 'hover:bg-pink-50 hover:scale-105'
                      }`}
                      onClick={() => handlePackageClick('standard', '피부건강구독')}
                    >
                      스탠다드<br />월 100P~
                    </div>
                    <div 
                      className={`bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-600 text-white px-5 py-3 rounded-full font-bold shadow-2xl text-center cursor-pointer transition-all duration-300 border-2 border-amber-300 ${
                        selectedPackage?.type === 'premium' && selectedPackage?.theme === '피부건강구독'
                          ? 'scale-110 shadow-2xl ring-4 ring-amber-200' 
                          : 'hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-amber-200'
                      }`}
                      onClick={() => handlePackageClick('premium', '피부건강구독')}
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)',
                        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      ✨ 프리미엄 ✨<br />월 200P~
                    </div>
                  </div>
                  
                  {/* 제품구성 상세 정보 */}
                  {selectedPackage?.theme === '피부건강구독' && (
                    <div className={`mt-4 p-6 rounded-xl border-2 animate-in slide-in-from-top duration-300 ${
                      selectedPackage.type === 'premium' 
                        ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg' 
                        : 'bg-pink-50 border-pink-200'
                    }`}>
                      <div className="flex items-center mb-4">
                        {selectedPackage.type === 'premium' && <span className="mr-2 text-xl">👑</span>}
                        <h5 className={`font-bold text-lg ${
                          selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-pink-800'
                        }`}>
                          {selectedPackage.type === 'standard' ? '스탠다드' : '✨ 프리미엄 럭셔리'} 제품구성
                        </h5>
                        {selectedPackage.type === 'premium' && (
                          <span className="ml-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            EXCLUSIVE
                          </span>
                        )}
                      </div>
                      <div className="space-y-3">
                        {packageDetails.피부건강구독[selectedPackage.type === 'standard' ? 'standard' : 'premium'].products.map((product, index) => (
                          <div key={index} className={`flex justify-between items-start p-4 rounded-lg border-2 ${
                            selectedPackage.type === 'premium' 
                              ? 'bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow' 
                              : 'bg-white border-pink-100'
                          }`}>
                            <div className="flex-1">
                              <div className={`font-semibold ${
                                selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-pink-800'
                              }`}>
                                {selectedPackage.type === 'premium' && '🌟 '}{product.name}
                              </div>
                              <div className={`text-sm mt-1 ${
                                selectedPackage.type === 'premium' ? 'text-amber-600' : 'text-pink-600'
                              }`}>
                                {product.description}
                              </div>
                            </div>
                            <div className={`font-bold text-lg ${
                              selectedPackage.type === 'premium' ? 'text-amber-700' : 'text-pink-700'
                            }`}>
                              {product.price}
                            </div>
                          </div>
                        ))}
                        <div className={`flex justify-between items-center p-4 rounded-lg font-bold border-3 ${
                          selectedPackage.type === 'premium' 
                            ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-400 shadow-lg' 
                            : 'bg-pink-100 text-pink-800 border-pink-300'
                        }`}>
                          <span className="text-lg">
                            {selectedPackage.type === 'premium' && '👑 '}총 구독료
                          </span>
                          <span className="text-xl">
                            {packageDetails.피부건강구독[selectedPackage.type === 'standard' ? 'standard' : 'premium'].totalPrice}
                          </span>
                        </div>
                        {selectedPackage.type === 'premium' && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg text-center">
                            <div className="font-bold">🎁 프리미엄 특별혜택</div>
                            <div className="text-sm mt-1">무료 건강상담 + VIP 고객 전용 서비스 + 우선 배송</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              개인별 건강 상담을 통해 최적의 패키지를 추천받으세요
            </p>
            <Button className="bg-usana-blue-600 hover:bg-usana-blue-700 text-white px-8 py-3 text-lg font-semibold">
              맞춤 건강구독 상담받기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}