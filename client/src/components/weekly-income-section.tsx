import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function WeeklyIncomeSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const incomeGrades = [
    {
      title: "다이아몬드 디렉터",
      icon: "🏆",
      weeklyIncome: "주급 최대 500만원",
      description: "최고 등급 달성 시 받는 프리미엄 수당"
    },
    {
      title: "에메랄드 디렉터", 
      icon: "💎",
      weeklyIncome: "주급 최대 200만원",
      description: "안정적인 고수익 창출 단계"
    },
    {
      title: "골드 디렉터",
      icon: "🏅", 
      weeklyIncome: "주급 최대 100만원",
      description: "본격적인 수익 창출 시작 단계"
    },
    {
      title: "실버 디렉터",
      icon: "🥉",
      weeklyIncome: "주급 최대 50만원", 
      description: "초기 성과 달성 단계"
    },
    {
      title: "스타터 단계",
      icon: "⭐",
      weeklyIncome: "주급 최대 20만원",
      description: "누구나 쉽게 시작할 수 있는 첫 단계"
    }
  ];

  const additionalBenefits = [
    {
      icon: "🔄",
      title: "지속성과 자동화",
      description: "한 번 구축된 네트워크를 통한 자동화된 수익 창출 시스템"
    },
    {
      icon: "💰", 
      title: "추가 수당 혜택",
      description: "다양한 수당 지급 시스템으로 지속적인 수익 창출이 가능하며, 새로운 혜택이 계속 업데이트됩니다."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            WEEKLY INCOME SYSTEM
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            주급 시스템으로<br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              매주 받는 안정 수입
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            월급이 아닌 주급으로 받는 새로운 수익 모델<br />
            영업 압박 없이 자연스러운 소개로 시작하는<br />
            스마트한 부수익 창출 시스템
          </p>
        </div>

        {/* 토글 버튼 */}
        <div className="text-center mb-8">
          <Button
            onClick={toggleExpanded}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold px-8 py-4 text-lg shadow-xl transition-all duration-200"
          >
            등급별 주급 시스템 자세히 보기
            {isExpanded ? (
              <ChevronUp className="ml-2 h-5 w-5" />
            ) : (
              <ChevronDown className="ml-2 h-5 w-5" />
            )}
          </Button>
        </div>

        {/* 확장 가능한 콘텐츠 */}
        {isExpanded && (
          <div className="space-y-8 animate-in slide-in-from-top-4 duration-300">
            {/* 등급별 주급 시스템 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {incomeGrades.map((grade, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{grade.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{grade.title}</h3>
                    <div className="text-lg font-semibold text-blue-600 mb-3">{grade.weeklyIncome}</div>
                    <p className="text-gray-600 text-sm leading-relaxed">{grade.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 추가 수당 혜택 */}
            <div className="mt-12">
              <div className="grid md:grid-cols-2 gap-6">
                {additionalBenefits.map((benefit, index) => (
                  <Card key={index} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white border-0 shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl flex-shrink-0">{benefit.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                          <p className="text-white/90 leading-relaxed">{benefit.description}</p>
                          {benefit.title === "추가 수당 혜택" && (
                            <Button 
                              variant="outline" 
                              className="mt-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                            >
                              추가수당 자세히 보기
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}