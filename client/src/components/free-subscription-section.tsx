import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Star, Gift, Rocket } from "lucide-react";

export default function FreeSubscriptionSection() {
  const steps = [
    {
      number: 1,
      title: "회원가입 & 체험신청",
      description: "간단한 정보 입력만으로 USANA 회원이 되어 7일 무료 체험을 신청하세요.",
      icon: UserPlus,
      color: "bg-usana-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-usana-blue-700",
      time: "소요시간: 3분"
    },
    {
      number: 2,
      title: "제품 체험 & 후기작성",
      description: "7일간 제품을 체험하고 솔직한 후기를 작성해주세요. 추가 혜택이 기다립니다.",
      icon: Star,
      color: "bg-usana-green-500",
      bgColor: "bg-green-50",
      textColor: "text-usana-green-700",
      time: "추가 혜택: 포인트 적립"
    },
    {
      number: 3,
      title: "친구 추천하기",
      description: "지인 2명에게 USANA를 추천하면 다음 달 제품을 무료로 받을 수 있습니다.",
      icon: Gift,
      color: "bg-usana-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-usana-orange-700",
      time: "혜택: 1개월 무료 구독"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">🎁 무료 구독 받는 방법</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            간단한 3단계로 USANA 제품을 무료로 받아보세요!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className={`${step.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold`}>
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  <div className={`${step.bgColor} p-4 rounded-lg`}>
                    <Icon className={`${step.color.replace('bg-', 'text-')} mx-auto h-8 w-8 mb-2`} />
                    <p className={`text-sm ${step.textColor} font-medium`}>{step.time}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button className="gradient-usana-cta text-white px-8 py-4 text-lg font-semibold h-auto hover:opacity-90">
            <Rocket className="mr-2 h-5 w-5" />
            무료 구독 시작하기
          </Button>
          <p className="text-gray-500 mt-4">* 무료 체험은 1인 1회 한정이며, 언제든지 해지 가능합니다.</p>
        </div>
      </div>
    </section>
  );
}
