import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Share2, Users, Trophy } from "lucide-react";
import { openKakaoChat } from "@/lib/utils";
import kitchenImage from "@assets/image_fx_1750525351905.jpg";
import usanaProductImage from "@assets/유사나 뉴트리션_1750525611258.png";

export default function FreeSubscriptionSection() {
  const steps = [
    {
      number: 1,
      title: "회원가입 & 건강구독 신청",
      description: "USANA 회원가입과 건강구독을 신청하여 좋은 제품을 경험해보세요.",
      icon: UserPlus,
      color: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 2,
      title: "건강한 제품체험 (건강구독)",
      description: "직접 경험한 건강한 변화를 지인들에게 자연스럽게 공유해보세요.",
      icon: Share2,
      color: "bg-green-600",
      image: kitchenImage
    },
    {
      number: 3,
      title: "친구 2명 건강구독 안내",
      description: "좋은 경험을 바탕으로 친구 2명에게 건강구독을 안내해주세요.",
      icon: Users,
      color: "bg-purple-600",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 4,
      title: "친구 2명도 1번 반복",
      description: "친구들도 같은 과정을 반복하면서 자연스러운 네트워크가 형성됩니다.",
      icon: Trophy,
      color: "bg-orange-600",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">🎁 무료 구독 받는 방법</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            간단한 4단계로 USANA 제품을 무료로 받아보세요!
          </p>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-4">💰 캐시백 시스템</h3>
            <p className="text-lg leading-relaxed">
              <strong>2~3단계 내려가면</strong> 50% 할인에서 <strong className="text-yellow-300">100% 할인</strong>을 
              캐시백을 통해 가능해집니다!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {index === 1 && (
                      <img
                        src={usanaProductImage}
                        alt="USANA 제품"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-22 object-contain drop-shadow-lg"
                        style={{
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                        }}
                      />
                    )}
                    <div className={`absolute top-4 left-4 ${step.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg`}>
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Icon className={`${step.color.replace('bg-', 'text-')} h-6 w-6 mr-3`} />
                      <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 자세한 무료구독 방법</h3>
            <p className="text-gray-600 mb-6">
              개인별 맞춤 상담을 통해 가장 효율적인 무료구독 방법을 안내해드립니다.
            </p>
            <Button 
              onClick={openKakaoChat}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold h-auto hover:opacity-90 rounded-lg"
            >
              💬 상담 문의하기
            </Button>
          </div>
          
          <p className="text-gray-500 text-sm">
            * 개인별 네트워크와 상황에 따라 무료구독 달성 시점이 달라질 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}