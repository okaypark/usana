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
    <section id="business" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-usana-blue-500/20 to-usana-blue-600/15 border-2 border-usana-blue-500/30 rounded-full mb-6 shadow-lg shadow-usana-blue-500/20">
            <span className="text-usana-blue-700 text-sm font-bold tracking-wider uppercase">돈버는 영양제구독 혁신</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-usana-blue-900 mb-6 tracking-tighter">
            <span className="text-usana-blue-600">매월 200~300만원</span><br />
            <span className="font-light">구독소개 수익</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-usana-blue-700 max-w-4xl mx-auto leading-relaxed font-light">
            건강을 위해 영양제를 구독하는 똑똑한 소비자들에게<br />
            <span className="text-usana-blue-600 font-semibold">구독할수록 돈이 되는 특별한 혜택</span>을 제공합니다.
          </p>
        </div>

        {/* Income Potential */}
        <Card className="gradient-usana-luxury text-white mb-20 shadow-2xl border border-usana-blue-400/20">
          <CardContent className="p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-1 h-12 bg-usana-blue-400 mr-4"></div>
                  <h3 className="text-4xl font-bold tracking-tight">건강구독 수익 구조</h3>
                </div>
                <div className="space-y-5">
                  {incomeStructure.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                      <span className="text-lg font-medium tracking-wide">{item.label}</span>
                      <span className="text-xl font-bold text-usana-blue-400">{item.amount}</span>
                    </div>
                  ))}
                  <div className="border-t border-usana-blue-400/30 pt-6 mt-8">
                    <div className="flex justify-between items-center bg-usana-blue-400/20 border border-usana-blue-400/30 rounded-xl p-6">
                      <span className="text-xl font-bold tracking-wide">월 총 구독소개수익</span>
                      <span className="text-4xl font-bold text-usana-blue-400">200~300만원</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                  alt="Executive Business Success"
                  className="rounded-3xl shadow-2xl mb-8 w-full border border-white/20"
                />
                <p className="text-sm font-light text-usana-blue-200 tracking-wide">* 개인별 네트워크와 상황에 따라 무료구독 달성 시점이 달라질 수 있습니다</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-usana-platinum-100 border border-usana-platinum-200 p-6 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <Icon className="text-usana-blue-600 h-10 w-10" />
                </div>
                <h4 className="text-2xl font-bold text-usana-blue-900 mb-3 tracking-tight">{benefit.title}</h4>
                <p className="text-usana-blue-600 font-medium leading-relaxed">{benefit.description}</p>
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
          <Button 
            className="gradient-usana-cta text-white px-8 py-4 text-lg font-semibold h-auto hover:opacity-90"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Handshake className="mr-2 h-5 w-5" />
            사업 기회 상담받기
          </Button>
          <p className="text-gray-500 mt-4">* 무료 사업 설명회 참석 후 신중한 결정을 도와드립니다.</p>
        </div>
      </div>
    </section>
  );
}
