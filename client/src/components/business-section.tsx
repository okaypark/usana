import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Home, Users as UsersIcon, TrendingUp, Handshake } from "lucide-react";

export default function BusinessSection() {
  const incomeStructure = [
    { label: "직접 판매 수수료", amount: "50~100만원" },
    { label: "팀 건설 보너스", amount: "100~150만원" },
    { label: "리더십 보너스", amount: "50~80만원" }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "시간 자유",
      description: "본업과 병행 가능한 유연한 시간 운영",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Home,
      title: "장소 자유",
      description: "집에서, 카페에서 어디든 가능한 사업",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: UsersIcon,
      title: "팀 지원",
      description: "체계적인 교육과 멘토링 시스템",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "성장 가능성",
      description: "노력에 따른 무제한 수익 성장",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const successStories = [
    {
      name: "김민정",
      title: "골드 파트너",
      testimonial: "6개월 만에 월 250만원 수익을 달성했어요. 건강도 챙기고 경제적 자유도 얻게 되어 정말 감사합니다.",
      image: "https://images.unsplash.com/photo-1494790108755-2616c6d4e6e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "박준호",
      title: "플래티넘 파트너",
      testimonial: "본업을 유지하면서도 월 300만원 추가 수익을 만들 수 있어서 가족들과 더 많은 시간을 보낼 수 있게 되었습니다.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "이수연",
      title: "다이아몬드 파트너",
      testimonial: "처음에는 반신반의했지만, 체계적인 교육과 지원으로 1년 만에 다이아몬드 등급까지 올랐어요. 이제는 권리소득으로 여유로운 삶을 살고 있습니다.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  return (
    <section id="business" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">💰 추가수익 200~300만원 창출 기회</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            USANA와 함께 건강한 사업을 시작하여 권리소득을 만들어보세요. 
            정직하고 투명한 수익 구조로 지속 가능한 부업을 제안드립니다.
          </p>
        </div>

        {/* Income Potential */}
        <Card className="gradient-usana-income text-white mb-16">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">월 수익 구조</h3>
                <div className="space-y-4">
                  {incomeStructure.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
                      <span className="text-lg">{item.label}</span>
                      <span className="text-xl font-bold">{item.amount}</span>
                    </div>
                  ))}
                  <div className="border-t-2 border-white border-opacity-30 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">월 총 수익</span>
                      <span className="text-3xl font-bold">200~330만원</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                  alt="사업 성공"
                  className="rounded-2xl shadow-2xl mb-6 w-full"
                />
                <p className="text-lg opacity-90">* 개인의 노력과 상황에 따라 수익은 달라질 수 있습니다.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className={`${benefit.color} p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Success Stories */}
        <Card className="bg-gray-50">
          <CardContent className="p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">성공 파트너 이야기</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={story.image}
                        alt={`${story.name} 파트너`}
                        className="w-16 h-16 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{story.name}</h4>
                        <p className="text-gray-600 text-sm">{story.title}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">"{story.testimonial}"</p>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button className="gradient-usana-cta text-white px-8 py-4 text-lg font-semibold h-auto hover:opacity-90">
            <Handshake className="mr-2 h-5 w-5" />
            사업 기회 상담받기
          </Button>
          <p className="text-gray-500 mt-4">* 무료 사업 설명회 참석 후 신중한 결정을 도와드립니다.</p>
        </div>
      </div>
    </section>
  );
}
