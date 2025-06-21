import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Percent, Truck, Calendar, UserCheck } from "lucide-react";

export default function SubscriptionSection() {
  const benefits = [
    {
      icon: Percent,
      title: "최대 30% 할인",
      description: "정기 구독 시 일반 구매 대비 최대 30% 할인된 가격으로 제공",
      color: "bg-usana-green-500"
    },
    {
      icon: Truck,
      title: "무료 배송",
      description: "매월 정기 배송 시 배송비 무료, 원하는 날짜에 정확한 배송",
      color: "bg-usana-blue-500"
    },
    {
      icon: Calendar,
      title: "맞춤형 스케줄",
      description: "개인별 건강 상태와 필요에 따라 맞춤형 배송 스케줄 설정 가능",
      color: "bg-usana-orange-500"
    },
    {
      icon: UserCheck,
      title: "전문가 상담",
      description: "영양 전문가의 1:1 맞춤 상담 및 건강 관리 가이드 제공",
      color: "bg-purple-500"
    }
  ];

  return (
    <section id="subscription" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">건강 구독 서비스</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            매월 정기적으로 필요한 건강기능식품을 받아보세요. 더 저렴하고 편리하게!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="건강 구독 서비스"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900">구독 혜택</h3>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
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

            <Card className="gradient-usana-income text-white">
              <CardContent className="p-6">
                <h4 className="text-2xl font-bold mb-2">🎉 특별 혜택</h4>
                <p className="text-lg mb-4">
                  지금 구독 신청하시면 <strong>첫 달 50% 할인</strong> + <strong>웰컴 키트 무료 증정</strong>
                </p>
                <Button 
                  className="bg-white text-usana-blue-600 hover:bg-gray-100 font-semibold"
                >
                  무료 체험 신청하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
