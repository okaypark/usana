import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Share2, Users, Trophy } from "lucide-react";
import { openKakaoChat } from "@/lib/utils";
import kitchenImage from "@assets/image_fx_1750525351905.jpg";
import usanaProductImage from "@assets/유사나 뉴트리션_1750525611258.png";
import talkIcon from "@assets/image_1753027266756.png";

export default function FreeSubscriptionSection() {
  const steps = [
    {
      number: 1,
      title: "건강상담 &\n구독신청",
      description: "전문 상담을 통해 개인에게 맞는 건강구독을 신청해보세요.",
      icon: UserPlus,
      color: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 2,
      title: "건강한 제품체험\n(건강구독)",
      description: "직접 경험한 건강한 변화를 지인들에게 자연스럽게 공유해보세요.",
      icon: Share2,
      color: "bg-green-600",
      image: kitchenImage
    },
    {
      number: 3,
      title: "친구 2명\n건강구독 안내",
      description: "좋은 경험을 바탕으로 친구 2명에게 건강구독을 안내해주세요.",
      icon: Users,
      color: "bg-purple-600",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 4,
      title: "친구 2명도\n1번 반복",
      description: "친구들도 같은 과정을 반복하면서 자연스러운 네트워크가 형성됩니다.",
      icon: Trophy,
      color: "bg-orange-600",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  return (
    <section className="bg-usana-slate-50 py-24 border-t border-usana-platinum-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-usana-blue-500/20 to-usana-blue-600/15 border-2 border-usana-blue-500/30 rounded-full mb-6 shadow-lg shadow-usana-blue-500/20">
            <span className="text-usana-blue-700 text-sm font-bold tracking-wider uppercase">돈버는 영양제구독 프로세스</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-usana-blue-900 mb-6 tracking-tighter">
            <span className="text-usana-blue-600 font-bold">돈버는 스마트 건강구독</span><br />
            <span className="font-light">시작방법</span>
          </h2>
          <p className="text-xl text-usana-blue-600 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
            간단한 4단계로 건강 소비자에서 수익 창출 <span className="font-bold text-usana-blue-700">브랜드 파트너</span>로 업그레이드하세요
          </p>
          
          <div className="gradient-usana-luxury text-white rounded-2xl p-10 max-w-5xl mx-auto mb-16 shadow-2xl border border-usana-blue-400/20">
            <div className="flex items-center mb-6">
              <div className="w-1 h-16 bg-usana-blue-400 mr-6"></div>
              <h3 className="text-3xl font-bold tracking-tight">스마트 구독 혜택 시스템</h3>
            </div>
            <p className="text-xl leading-relaxed font-light">
              <span className="font-semibold">건강구독 2~3단계 확장 시</span> 구독료 50% 할인에서 
              <span className="text-usana-blue-400 font-bold"> 100% 무료구독</span>까지 
              똑똑한 소비자 혜택을 경험하세요
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-usana-platinum-200/50 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-52 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    {index === 1 && (
                      <img
                        src={usanaProductImage}
                        alt="USANA 제품"
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-22 object-contain drop-shadow-lg"
                        style={{
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                        }}
                      />
                    )}
                    <div className="absolute top-6 left-6 bg-usana-blue-900 text-usana-blue-400 rounded-xl w-14 h-14 flex items-center justify-center text-xl font-bold shadow-xl border border-usana-blue-400/30">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-start mb-4">
                      <Icon className="text-usana-blue-600 h-7 w-7 mr-4 mt-1 flex-shrink-0" />
                      <h3 className="text-lg font-bold text-usana-blue-900 tracking-tight whitespace-pre-line leading-tight min-h-[3.5rem] flex items-center">{step.title}</h3>
                    </div>
                    <p className="text-usana-blue-600 leading-relaxed font-medium">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-usana-blue-900 mb-4">🎯 건강구독으로 돈버는 방법</h3>
            <p className="text-gray-600 mb-6">
              개인별 맞춤 상담을 통해 가장 효율적인 무료구독 방법을 안내해드립니다.
            </p>
            <Button 
              onClick={openKakaoChat}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold h-auto hover:opacity-90 rounded-lg flex items-center justify-center mx-auto"
            >
              <img 
                src={talkIcon} 
                alt="KakaoTalk" 
                className="h-5 w-5 object-contain mr-2" 
              />
              카톡 문의하기
            </Button>
          </div>
          
          <p className="text-gray-500 text-sm">
            * 개인별 네트워크와 상황에 따라 무료구독 달성 시점이 달라질 수 있습니다
          </p>
        </div>
      </div>
    </section>
  );
}