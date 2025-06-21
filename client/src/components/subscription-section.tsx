import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Percent, Truck, Calendar, UserCheck } from "lucide-react";

export default function SubscriptionSection() {
  const benefits = [
    {
      icon: Percent,
      title: "10% 할인",
      description: "정기 구독 시 일반 구매 대비 10% 할인된 가격으로 제공",
      color: "bg-blue-600"
    },
    {
      icon: Truck,
      title: "소개자 캐쉬백",
      description: "2명 건강구독 소개 시 소개자 소비금액의 10%를 달러로 캐쉬백",
      color: "bg-green-600"
    },
    {
      icon: Calendar,
      title: "포인트 적립",
      description: "소비자들의 소비포인트가 나에게 적립되어 캐쉬백으로 지급",
      color: "bg-indigo-600"
    },
    {
      icon: UserCheck,
      title: "다단계 수당",
      description: "직접 소개한 사람의 지인 소개 시 그의 수당의 10% 추가 지급",
      color: "bg-teal-600"
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
      </div>
    </section>
  );
}
